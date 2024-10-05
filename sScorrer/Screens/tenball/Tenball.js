import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tailwind from 'twrnc';
import Player from './Plyer';

export default function Tenball({ route, navigation }) {
  const { playerOneName, playerTwoName } = route.params || {};
  const [score1, setScoreOne] = useState(0);
  const [score2, setScoreTwo] = useState(0);

  const finishGame = async () => {
    let winner = '';
    if (score1 > score2) {
      winner = playerOneName;
    } else if (score2 > score1) {
      winner = playerTwoName;
    } else {
      winner = 'No one, it\'s a tie!';
    }

    const gameData = {
      title: 'Tenball', 
      players: [
        { name: playerOneName, score: score1 },
        { name: playerTwoName, score: score2 }
      ],
      winner,
      date: new Date().toISOString(),
    };

    try {
      const data = await AsyncStorage.getItem('gameHistory');
      const gameHistory = data ? JSON.parse(data) : [];
      gameHistory.push(gameData);
      await AsyncStorage.setItem('gameHistory', JSON.stringify(gameHistory));
      Alert.alert(
        'Game Over',
        `Congratulations ${winner}!`,
        [{ text: 'OK', onPress: () => navigation.goBack() }],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error saving game data:', error);
      Alert.alert('Error', 'There was an error saving the game data.');
    }
  };

  return (
    <ScrollView contentContainerStyle={tailwind`flex-grow justify-center bg-gray-900 p-4`}>
      <View style={tailwind`items-center`}>
        <Text style={tailwind`text-3xl font-bold text-white mb-6`}>
          Tenball Match
        </Text>

        <View style={tailwind`w-full max-w-xs mb-6`}>
          <Player 
            name={playerOneName} 
            score={score1} 
            setScore={setScoreOne} 
            style={tailwind`mb-4`}
          />
          
          <View style={tailwind`h-1 bg-gray-700 my-4`} />

          <Player 
            name={playerTwoName} 
            score={score2} 
            setScore={setScoreTwo} 
            style={tailwind`mb-4`}
          />
        </View>

        <TouchableOpacity
          style={tailwind`bg-green-700 rounded-lg p-4 w-full max-w-xs`}
          onPress={finishGame}
        >
          <Text style={tailwind`text-white text-lg font-bold text-center`}>
            Finish Game
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
