import React from 'react'
import { View, Text, Button, SafeAreaView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let callStartTime;
export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      callTime: "00:00",
      freecallTime: "00:00",
      countDown:"00:00",
      runTimer:false
    };

  }
   
    componentDidMount() {
      if(this.props.type == "timer"){
        callStartTime = new Date().getTime();
        this.startTimerInterval();
      }else{
      this.startTimerIntervalFreeMinutes();

      }
     
    }
    componentWillUnmount() {
      if (this.intervalTime) {
        clearInterval(this.intervalTime);
      }
      if (this.timerId) {
        clearInterval(this.timerId);
      }
    }


    msToTime(duration) {
      var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
  
      if (hours) {
        this.setState({ callTime: `${minutes}:${seconds}` });
      } else {
        this.setState({ callTime: `${minutes}:${seconds}` });
      }
      AsyncStorage.setItem('callDuration',`${minutes}:${seconds}`)
      if(this.props.freeminutes && this.props.freeminutes >= minutes){
      var checkMinute = this.props.freeminutes?this.props.freeminutes - minutes:'';
      if(checkMinute === 2){
        this.props.setFreeMinute('2')

        // console.log('successs',checkMinute)

      }
      }
    }
  
    startTimerInterval = () => {
      this.intervalTime = setInterval(() => {
        const currentTime = new Date().getTime();
        this.msToTime(currentTime - callStartTime);
      }, 100);
    };

    startTimerIntervalFreeMinutes = () => {
        this.setState({ countDown:60 * this.props.freeminutes });
        this.timerId = setInterval(() => {
          let checkCount = this.state.countDown - 1
          if (checkCount < 0) {
            this.setState({ countDown: 0 });
            clearInterval(this.timerId);
            this.props.setFreeMinute('')
          }else{
            let seconds = String(checkCount % 60).padStart(2, 0);
            let minutes = String(Math.floor(checkCount / 60)).padStart(2, 0);
            this.setState({ countDown: checkCount,freecallTime:minutes+":"+seconds});
          }
        }, 1000);
    };
    render() {
      if(this.props.type == "timer"){
        return (
          this.state.callTime
        )
      }else{
  return (
    'Free Minutes '+this.state.freecallTime
  )
      }
    }
}
