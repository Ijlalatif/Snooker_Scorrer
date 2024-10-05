import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import tailwind from 'twrnc';

export default function ScoreScreen({ route, navigation }) {
  const { playerKey, playerName, updateScore, currentScore } = route.params;
  const [score, setScore] = useState(currentScore);
  const [history, setHistory] = useState([]);

  const handleScoreChange = (scoreChange) => {
    const newHistoryEntry = {
      id: history.length.toString(),
      change: scoreChange,
      timestamp: new Date().toLocaleTimeString(),
    };

    setScore(score + scoreChange);
    setHistory([...history, newHistoryEntry]);
    updateScore(playerKey, scoreChange);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastChange = history[history.length - 1].change;
      setScore(score - lastChange);
      setHistory(history.slice(0, -1));
      updateScore(playerKey, -lastChange);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={tailwind`flex-1 p-4 bg-gray-900 items-center`}>
      <Text style={tailwind`text-white text-2xl font-bold mb-4`}>
        Update Score for {playerName}
      </Text>
      <Text style={tailwind`text-white text-lg mb-4`}>
        Current Score: {score}
      </Text>
      <View style={tailwind`flex-row flex-wrap justify-center mb-4`}>
        {[2, 3, 4, 5, 6, 7].map((value) => (
          <TouchableOpacity
            key={value}
            style={tailwind`w-16 h-16 rounded-full justify-center items-center mb-4 m-1 ${value === 2 ? 'bg-yellow-500' : value === 3 ? 'bg-green-500' : value === 4 ? 'bg-yellow-900' : value === 5 ? 'bg-blue-500' : value === 6 ? 'bg-pink-500' : 'bg-black'}`}
            onPress={() => handleScoreChange(value)}
          >
            <Text style={tailwind`text-white text-lg font-bold`}>+{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={tailwind`flex-row justify-center mb-4`}>
        {[-5, -10].map((value) => (
          <TouchableOpacity
            key={value}
            style={tailwind`w-16 h-16 rounded-full justify-center items-center mb-4 m-1 bg-red-500`}
            onPress={() => handleScoreChange(value)}
          >
            <Text style={tailwind`text-white text-lg font-bold`}>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={tailwind`mb-4`}>
        <TouchableOpacity
          style={tailwind`bg-orange-500 rounded-full w-32 h-12 justify-center items-center`}
          onPress={handleUndo}
        >
          <Text style={tailwind`text-white text-lg font-bold`}>Undo</Text>
        </TouchableOpacity>
      </View>
      <View style={tailwind`w-full`}>
        <TouchableOpacity
          style={tailwind`bg-blue-600 rounded-full w-full h-12 justify-center items-center`}
          onPress={handleGoBack}
        >
          <Text style={tailwind`text-white text-lg font-bold`}>Go Back</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={tailwind`mt-4 w-full`}
        data={history}
        renderItem={({ item }) => (
          <Text style={tailwind`text-white text-lg border-b border-gray-700 pb-2`}>
            {item.timestamp} - {item.change > 0 ? `+${item.change}` : item.change}
          </Text>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
