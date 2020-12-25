import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import TrackPlayer, { TrackPlayerEvents, STATE_PLAYING } from 'react-native-track-player';
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import {useTrackPlayerEvents} from 'react-native-track-player/lib/hooks';
import Icon from 'react-native-vector-icons/Feather';
import Slider from '@react-native-community/slider';

async function trackPlayerInit() {
  await TrackPlayer.setupPlayer();

  TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    ],
  });

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
 const [sliderValue, setSliderValue] = useState(0);
 const [isSeeking, setIsSeeking] = useState(false);
 const {position, duration} = useTrackPlayerProgress(250);
 
 useEffect(() => {
   async function startPlayer() {
      let isInit =  await trackPlayerInit();
      console.log(isInit);
      setIsTrackPlayerInit(isInit);
   }
   startPlayer();
 }, []);

 useEffect(() => {
  if (!isSeeking && position && duration) {
    setSliderValue(position / duration);
  }
}, [position, duration]);

useTrackPlayerEvents([TrackPlayerEvents.PLAYBACK_STATE], (event: any) => {
  if (event.state === STATE_PLAYING) {
    setIsPlaying(true);
  } else {
    setIsPlaying(false);
  }
});

function handlePlay() {
  if (!isPlaying) {
    TrackPlayer.play();
    setIsPlaying(true);
  } else {
    TrackPlayer.pause();
    setIsPlaying(false);
  }
};

const slidingStarted = () => {
  setIsSeeking(true);
};

const slidingCompleted = async (value: number) => {
  await TrackPlayer.seekTo(value * duration);
  setSliderValue(value);
  setIsSeeking(false);
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

      <Slider 
         style={{width: 400, height: 40}}
         minimumValue={0}
         maximumValue={1}
         value={sliderValue}
         minimumTrackTintColor="#111000"
         maximumTrackTintColor="#000000"
         onSlidingStart={slidingStarted}
         onSlidingComplete={slidingCompleted}
      />
    </View>
  )
};

export default App;