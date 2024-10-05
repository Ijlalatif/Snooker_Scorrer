import React from 'react';
import { View, Text,TouchableOpacity,Image,TextInput } from 'react-native';
import tailwind from 'twrnc';
import Icon from 'react-native-vector-icons/AntDesign';
import ScoreInput from './ScoreInput';
import {images} from '../tenball/images'

const Player = ({ name, score, setScore }) => {
  const incrementValues = [
    { image: images.red, amount: 1 },
    { image: images.yellow, amount: 2 },
    { image: images.green, amount: 3 },
    { image: images.brown, amount: 4 },
    { image: images.blue, amount: 5 },
    { image: images.pink, amount: 6 },
    { image: images.black, amount: 7 },
  ];

  const decrementValues = [
    { amount: -4 },
    { amount: -5 },
    { amount: -6 },
    { amount: -7 },
  ];

  
  return (
    <View style={tailwind`bg-gray-800 p-6 rounded-lg w-full max-w-xs shadow-lg mb-4`}>
      <View style={tailwind`flex-row items-center mb-4`}>
        <Icon name='user' size={50} color="gold" style={tailwind`mr-4`} />
        <Text style={tailwind`text-white text-2xl font-bold`}>
          {name}
        </Text>
      </View>

      <TextInput
        value={String(score)}
        editable={false}
        style={tailwind`text-white text-4xl font-bold text-center mb-4 bg-gray-700 rounded-lg p-3 border-2 border-gray-600`}
      />

      <View style={tailwind`flex-row flex-wrap justify-around mb-4`}>
        {incrementValues.map(({ image, amount }, index) => (
          <TouchableOpacity key={index} onPress={() => setScore(score + amount)}>
            <Image
              source={image}
              style={tailwind`w-12 h-12 m-2 rounded-full border-2 border-white`}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={tailwind`flex-row justify-between`}>
        {decrementValues.map(({ amount }, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setScore(score + amount)}
            style={tailwind`bg-red-500 p-3 rounded-lg m-1 shadow-lg`}
          >
            <Text style={tailwind`text-white font-bold text-lg`}>{amount}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Player;
