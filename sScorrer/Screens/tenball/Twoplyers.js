import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import tailwind from 'twrnc';

export default function TwoPlayers({ navigation }) {
  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');
  const [error, setError] = useState('');

  const handleInput = () => {
    if (playerOne.trim() === '' || playerTwo.trim() === '') {
      setError('Please fill in both fields');
    } else {
      setError('');
      navigation.navigate('tenball', {
        playerOneName: playerOne,
        playerTwoName: playerTwo,
      });
    }
  };

  return (
    <View style={tailwind`flex-1 justify-center items-center bg-gray-900 p-6`}>
      <Text style={tailwind`text-4xl font-bold text-white mb-6`}>
        Snooker Match
      </Text>

      <View style={tailwind`w-full max-w-xs`}>
        <Text style={tailwind`text-xl font-semibold text-white mb-3`}>
          Player One
        </Text>
        <TextInput
          style={tailwind`border ${playerOne.trim() === '' && error ? 'border-red-500' : 'border-gray-400'} bg-gray-800 rounded-lg p-3 text-lg text-white mb-4`}
          onChangeText={setPlayerOne}
          value={playerOne}
          placeholder="Enter Player One Name"
          placeholderTextColor="gray"
        />

        <Text style={tailwind`text-xl font-semibold text-white mb-3`}>
          Player Two
        </Text>
        <TextInput
          style={tailwind`border ${playerTwo.trim() === '' && error ? 'border-red-500' : 'border-gray-400'} bg-gray-800 rounded-lg p-3 text-lg text-white mb-4`}
          onChangeText={setPlayerTwo}
          value={playerTwo}
          placeholder="Enter Player Two Name"
          placeholderTextColor="gray"
        />

        {error ? (
          <Text style={tailwind`text-red-500 text-sm mb-4 text-center`}>
            {error}
          </Text>
        ) : null}

        <TouchableOpacity
          style={tailwind`bg-green-700 rounded-lg p-4 w-full mt-4`}
          onPress={handleInput}
        >
          <Text style={tailwind`text-white text-lg font-bold text-center`}>
            Start Match
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
