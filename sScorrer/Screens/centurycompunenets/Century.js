import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tailwind from 'twrnc';

export default function MatchScreen({ route, navigation }) {
  const { numPlayers, playerNames } = route.params;
  const [playerScores, setPlayerScores] = useState({});
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const initialScores = {};
    for (let i = 1; i <= numPlayers; i++) {
      initialScores[`player${i}`] = 0;
    }
    setPlayerScores(initialScores);

    // Start the stopwatch
    intervalRef.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [numPlayers]);

  useEffect(() => {
    Object.keys(playerScores).forEach((playerKey) => {
      if (playerScores[playerKey] >= 100) {
        Alert.alert(
          'We have a Winner!',
          `${playerNames[playerKey]} has reached 100 points!`,
          [{ text: 'OK', onPress: handleFinishGame }],
          { cancelable: false }
        );
      }
    });
  }, [playerScores]);

  const updateScore = (playerKey, scoreChange) => {
    setPlayerScores((prevScores) => ({
      ...prevScores,
      [playerKey]: prevScores[playerKey] + scoreChange,
    }));
  };

  const handleFinishGame = async () => {
    clearInterval(intervalRef.current);

    Alert.alert(
      'Finish Game',
      'Are you sure you want to finish the game?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: async () => {
            const winnerKey = Object.keys(playerScores).reduce((a, b) => playerScores[a] > playerScores[b] ? a : b);
            const winnerName = playerNames[winnerKey];
            const matchData = {
              playerNames,
              playerScores,
              winner: winnerName,
              title: 'Century',
              date: new Date().toISOString(),
              elapsedTime, 
            };
            try {
              const data = await AsyncStorage.getItem('matchHistory');
              const matchHistory = data ? JSON.parse(data) : [];
              matchHistory.push(matchData);
              await AsyncStorage.setItem('matchHistory', JSON.stringify(matchHistory));
              Alert.alert(
                'Game Finished',
                `Congratulations ${winnerName}! The match data has been saved.`,
                [{ text: 'OK', onPress: () => navigation.goBack() }],
                { cancelable: false }
              );
            } catch (error) {
              console.error('Error saving match data:', error);
              Alert.alert('Error', 'There was an error saving the match data.');
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const renderPlayerInputs = () => {
    const inputs = [];
    for (let i = 1; i <= numPlayers; i++) {
      const playerKey = `player${i}`;
      inputs.push(
        <View key={i} style={tailwind`mb-4`}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ScoreScreen', { playerKey, playerName: playerNames[playerKey], updateScore, currentScore: playerScores[playerKey] })}
            style={tailwind`bg-teal-600 p-4 rounded-lg shadow-md`}
          >
            <Text style={tailwind`text-white text-lg font-semibold mb-2`}>Player {i}: {playerNames[playerKey]}</Text>
            <TextInput
              style={tailwind`border border-blue-300 bg-white text-black rounded-lg p-3 text-lg`}
              value={playerScores[playerKey]?.toString()}
              editable={false}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return inputs;
  };

  return (
    <ScrollView contentContainerStyle={tailwind`flex-1 p-6 bg-gray-900`}>
      <Text style={tailwind`text-3xl font-bold text-center text-white mb-4`}>Match Screen</Text>
      <Text style={tailwind`text-xl text-center text-white mb-6`}>Clock: {Math.floor(elapsedTime / 60)}:{elapsedTime % 60}</Text>
      {renderPlayerInputs()}
      <TouchableOpacity onPress={handleFinishGame} style={tailwind`bg-indigo-600 p-4 rounded-lg shadow-md mt-6`}>
        <Text style={tailwind`text-white text-lg font-semibold text-center`}>Finish Match</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
