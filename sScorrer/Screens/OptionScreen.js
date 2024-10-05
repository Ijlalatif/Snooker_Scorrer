import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import tailwind from 'twrnc';

export default function OptionScreen({ navigation }) {
  return (
    <View style={tailwind`flex-1 bg-gray-900`}>
      <View style={tailwind`flex-1 items-center justify-center`}>
        <Text style={tailwind`text-white text-2xl font-semibold mb-8`}>Score Counting App</Text>
        
        {/* Century Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Plyerselection')}
          style={tailwind`bg-green-700 active:bg-green-600 text-white py-4 px-28 rounded-full shadow-lg my-2`}
        >
          <Text style={tailwind`text-white text-lg font-bold`}>Century</Text>
        </TouchableOpacity>
        
        {/* Ten Ball Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Twoplyers')}
          style={tailwind`bg-blue-700 active:bg-blue-600 text-white py-4 px-28 rounded-full shadow-lg my-2`}
        >
          <Text style={tailwind`text-white text-lg font-bold`}>Ten Ball</Text>
        </TouchableOpacity>
        
        {/* Load History Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('LoadHistory')}
          style={tailwind`bg-red-700 active:bg-red-600 text-white py-4 px-24 rounded-full shadow-lg my-2`}
        >
          <Text style={tailwind`text-white text-lg font-bold`}>Load History</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={tailwind`items-center pb-4`}>
        <Text style={tailwind`text-gray-400 text-sm`}>Developed by Ijlalatif</Text>
        <Text style={tailwind`text-gray-400 text-sm`}>Contact: mijlalatif10@gmail.com</Text>
      </View>

      <StatusBar style="light" />
    </View>
  );
}
