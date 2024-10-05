import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import tailwind from 'twrnc';

export default function PlayerSelection({ navigation }) {
  const [numPlayers, setNumPlayers] = useState(0);
  const [playerNames, setPlayerNames] = useState({});

  const renderPlayerInputs = () => {
    const inputs = [];
    for (let i = 1; i <= numPlayers; i++) {
      inputs.push(
        <View key={i} style={tailwind`mb-4`}>
          <Text style={tailwind`text-white text-xl mb-2`}>Player {i}</Text>
          <TextInput
            style={tailwind`border border-green-600 bg-gray-700 text-white rounded-lg p-3 text-lg`}
            placeholder={`Player ${i} Name`}
            placeholderTextColor="#aaa"
            onChangeText={(text) => setPlayerNames({ ...playerNames, [`player${i}`]: text })}
          />
        </View>
      );
    }
    return inputs;
  };

  const handleStartMatch = () => {
    navigation.navigate('MatchScreen', { numPlayers, playerNames });
  };

  return (
    <ScrollView
      contentContainerStyle={tailwind`flex-grow p-6 bg-gray-900`}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={tailwind`text-3xl font-bold text-center text-white mb-6`}>Select Number of Players</Text>
      <View style={tailwind`mb-6`}>
        <CheckBox
          title="Two Players"
          checked={numPlayers === 2}
          onPress={() => setNumPlayers(2)}
          containerStyle={tailwind`bg-transparent border-0`}
          textStyle={tailwind`text-white`}
          checkedColor="#4CAF50"
          uncheckedColor="#fff"
        />
        <CheckBox
          title="Three Players"
          checked={numPlayers === 3}
          onPress={() => setNumPlayers(3)}
          containerStyle={tailwind`bg-transparent border-0`}
          textStyle={tailwind`text-white`}
          checkedColor="#4CAF50"
          uncheckedColor="#fff"
        />
        <CheckBox
          title="Four Players"
          checked={numPlayers === 4}
          onPress={() => setNumPlayers(4)}
          containerStyle={tailwind`bg-transparent border-0`}
          textStyle={tailwind`text-white`}
          checkedColor="#4CAF50"
          uncheckedColor="#fff"
        />
      </View>
      {renderPlayerInputs()}
      <Button title="Start Match" onPress={handleStartMatch} color="#4CAF50" />
    </ScrollView>
  );
}
