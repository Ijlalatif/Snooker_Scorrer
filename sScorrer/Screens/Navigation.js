import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Loadhistory from './Loadhistory';
import OptionScreen from './OptionScreen';
import Century from './centurycompunenets/Century';

import Twoplyers from './tenball/Twoplyers';
import Tenball from './tenball/Tenball';

import PlayerSelection from './centurycompunenets/PlyerSelection';
import ScoreScreen from './centurycompunenets/ScoreScreen';



const Stack = createNativeStackNavigator();
function Navigation(){
    return(
        
               <NavigationContainer>
                <Stack.Navigator>
               <Stack.Screen name="OptionScreen" component={OptionScreen} options={{headerShown:false}}/>

            <Stack.Screen name='Twoplyers' component={Twoplyers}  options={{headerShown:false}}/>
            <Stack.Screen name='LoadHistory' component={Loadhistory} options={{headerShown:false}} />
            <Stack.Screen name='tenball' component={Tenball} options={{headerShown:false}}/>
            <Stack.Screen name='Plyerselection' component={PlayerSelection} options={{headerShown:false}}/>
            <Stack.Screen name='MatchScreen' component={Century}  options={{headerShown:false}}/>
           <Stack.Screen name='ScoreScreen' component={ScoreScreen} options={{headerShown:false}}/>
            </Stack.Navigator>
            </NavigationContainer>
        

    )
}
export default Navigation;