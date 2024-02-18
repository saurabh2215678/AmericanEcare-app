import React, { useState, useRef } from 'react';
import { View, Dimensions,StyleSheet,Text } from 'react-native';
//import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
const { width } = Dimensions.get('window');
import styles from '../../styles/videostyle/VideoScreenStyle'

import RowComponent from './RowComponent';

function VideoView({ url }) {
    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
    const [screenType, setScreenType] = useState('');
    const onSeek = (seek) => {
        videoPlayer.current.seek(seek);
    };
    const onPaused = (playerState) => {
        setPaused(!paused);
        setPlayerState(playerState);
    };
    const onReplay = () => {
        setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer.current.seek(0);
    };
    const onProgress = (data) => {
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            setCurrentTime(data.currentTime);
        }
    };
    const onLoad = (data) => {
        setDuration(data.duration);
        setIsLoading(false);
    };
    const onLoadStart = (data) => setIsLoading(true);
    const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);
    const onError = () => alert('Oh! ', error);
    const exitFullScreen = () => {
        alert('Exit full screen');
    };
    const enterFullScreen = () => { };
    const onFullScreen = () => {
        setIsFullScreen(isFullScreen);
        if (screenType == 'content') setScreenType('cover');
        else setScreenType('content');
    };
    const renderToolbar = () => (
        <View>
            <Text style={styles.toolbar}> toolbar </Text>
        </View>
    );
    const onSeeking = (currentTime) => setCurrentTime(currentTime);

    return (
        <RowComponent rowStyle={styles.container}>
                <Video
                    onEnd={onEnd}
                    onLoad={onLoad}
                    onLoadStart={onLoadStart}
                    onProgress={onProgress}
                    paused={paused}
                    ref={videoPlayer}
                    resizeMode={screenType}
                    onFullScreen={isFullScreen}
                    source={{ uri: url }}
                    style={styles.mediaPlayer}
                    volume={10}
                />
                <MediaControls
                    duration={duration}
                    isLoading={isLoading}
                    mainColor="#333"
                    onFullScreen={onFullScreen}
                    onPaused={onPaused}
                    onReplay={onReplay}
                    onSeek={onSeek}
                    onSeeking={onSeeking}
                    playerState={playerState}
                    progress={currentTime}
                    toolbar={renderToolbar()}
                />
        </RowComponent>
    );
}
export default VideoView;