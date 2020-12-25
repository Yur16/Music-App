import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Icon from 'react-native-vector-icons/Feather';

async function trackPlayerInit() {
  await TrackPlayer.setupPlayer();

  await TrackPlayer.add({
    id: '1',
    url:
      'https://audio-previews.elements.envatousercontent.com/files/103682271/preview.mp3',
    type: 'default',
    title: 'My Title',
    album: 'My Album',
    artist: 'Rohan Bhatia',
    artwork: 'https://picsum.photos/100',
  });
  return true;
 };

const App: React.FC = () => { 
 const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
 const [isPlaying, setIsPlaying] = useState(false);
 
 useEffect(() => {
   async function startPlayer() {
      let isInit =  await trackPlayerInit();
      console.log(isInit);
      setIsTrackPlayerInit(isInit);
   }
   startPlayer();
 }, []);

function handlePlay() {
  if (!isPlaying) {
    TrackPlayer.play();
    setIsPlaying(true);
  } else {
    TrackPlayer.pause();
    setIsPlaying(false);
  }
};


return (
    <View>
      <TouchableOpacity onPress={handlePlay}>
        {(isPlaying) ? (
          <Icon name="pause-circle" size={60} color="#000"/>
        ) : (
          <Icon name="play-circle" size={60} color="#000"/>
        )}
        
      </TouchableOpacity>
    </View>
  )
};

export default App;