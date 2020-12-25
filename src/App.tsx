import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StatusBar, Image } from 'react-native';
import TrackPlayer, { TrackPlayerEvents, STATE_PLAYING } from 'react-native-track-player';
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import {useTrackPlayerEvents} from 'react-native-track-player/lib/hooks';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';

import { Container, ActionsContainer, ControlButtons, ImageContainer, SongDetails, SongName, BandName } from './styles';

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
    <Container>

      <SongDetails>
        <SongName>Caution</SongName>
        <BandName>The Killers</BandName>
      </SongDetails>

      <ImageContainer>
        <Image 
          source={{
            uri: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/mixtape-album-cover-art-design-template-68450756e786f85861314fa7d49d8366.jpg?ts=1586223871',
          }}
          resizeMode="contain"
          style={{ flex: 1, borderRadius: 15 }}
        />
      </ImageContainer>

      

      <ActionsContainer>

      <Slider 
         style={{width: 300, height: 40}}
         minimumValue={0}
         maximumValue={1}
         value={sliderValue}
         minimumTrackTintColor="#A6206A"
         maximumTrackTintColor="#777777"
         thumbTintColor="#A6206A"
         onSlidingStart={slidingStarted}
         onSlidingComplete={slidingCompleted}
      />

        <ControlButtons>
          <TouchableOpacity>
            <Icon name="ios-play-skip-back-outline" size={35} color='#777777'/>  
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePlay}>
            {(isPlaying) ? (
              <Icon name="pause-circle" size={70} color="#A6206A"/>
            ) : (
              <Icon name="md-play-circle" size={70} color="#A6206A"/>
            )}
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="play-skip-forward-outline" size={35} color='#777777'/>
          </TouchableOpacity>
        </ControlButtons>
      </ActionsContainer>

      <StatusBar backgroundColor='#181818' barStyle='light-content' />
    </Container>
  )
};

export default App;