import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import tailwind from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadHistory = () => {
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    const fetchGameHistory = async () => {
      try {
        const tenballData = await AsyncStorage.getItem('gameHistory');
        const centuryData = await AsyncStorage.getItem('matchHistory');
        const tenballHistory = tenballData ? JSON.parse(tenballData) : [];
        const centuryHistory = centuryData ? JSON.parse(centuryData) : [];
        const combinedHistory = [...tenballHistory, ...centuryHistory];
        combinedHistory.sort((a, b) => new Date(b.date) - new Date(a.date)); 
        setGameHistory(combinedHistory);
      } catch (error) {
        console.error('Error loading game history:', error);
      }
    };

    fetchGameHistory();
  }, []);

  const deleteGameHistory = async () => {
    try {
      await AsyncStorage.removeItem('gameHistory');
      await AsyncStorage.removeItem('matchHistory');
      setGameHistory([]);
      Alert.alert('Success', 'Game history deleted successfully!');
    } catch (error) {
      console.error('Error deleting game history:', error);
    }
  };

  return (
    <View style={tailwind`flex-1 p-5 bg-gray-900`}>
      <View style={tailwind`flex-row justify-between items-center mb-5`}>
        <Text style={tailwind`text-2xl font-bold text-white`}>Game History</Text>
        <Button title="Delete All" onPress={deleteGameHistory} color="#DC2626" />
      </View>
      <FlatList
        data={gameHistory}
        renderItem={({ item }) => (
          <View style={tailwind`mb-5 border border-gray-700 p-4 rounded-lg bg-gray-800`}>
            <Text style={tailwind`text-lg text-white mb-1`}>Title: {item.title}</Text>
            <Text style={tailwind`text-lg text-white mb-1`}>Winner: {item.winner}</Text>
            <Text style={tailwind`text-lg text-white mb-1`}>Date: {item.date}</Text>
            <Text style={tailwind`text-lg text-white mb-1`}>Total Time: {Math.floor(item.elapsedTime / 60)}:{item.elapsedTime % 60}</Text>
            {item.playerScores && Object.keys(item.playerScores).map((playerKey, index) => (
              <Text key={index} style={tailwind`text-lg text-white mb-1`}>
                Player {index + 1}: {item.playerNames[playerKey]} - {item.playerScores[playerKey]} points
              </Text>
            ))}
            {item.score1 !== undefined && (
              <View>
                <Text style={tailwind`text-lg text-white mb-1`}>Player 1: {item.playerOneName} - {item.score1} points</Text>
                <Text style={tailwind`text-lg text-white`}>Player 2: {item.playerTwoName} - {item.score2} points</Text>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={tailwind`flex-1 items-center justify-center`}>
            <Text style={tailwind`text-lg text-gray-400`}>No game history available</Text>
          </View>
        )}
      />
    </View>
  );
};

export default LoadHistory;
