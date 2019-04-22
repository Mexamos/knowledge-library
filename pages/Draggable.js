import React, { Component } from "react";
import {
  StyleSheet,
  View,
  PanResponder,
  Animated
} from "react-native";

export default class Draggable extends Component {
  constructor() {
    super();
    this.state = {
        showDraggable: true,
        dropAreaValues: null,
        pan: new Animated.ValueXY(),
        opacity: new Animated.Value(1)
    };
  }

  componentWillMount() {
    this._val = { x:0, y:0 }
    // this.state.pan.addListener((value) => this._val = value);

    this.panResponder = PanResponder.create({
      onPanResponderGrant: (e, gestureState) => {
   
          console.log("ON LONG PRESS", gestureState, e)
          e.preventDefault()
          e.stopPropagation()
  
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        console.log('onMoveShouldSetPanResponderCapture', gestureState)
        return Math.abs(gestureState.dx) > 5;
      },
      onPanResponderMove: (evt, gestureState) => {
         console.log('onPanResponderMove', this, gestureState)
        //  return Math.abs(gestureState.dx) >= 1 || Math.abs(gestureState.dy) >= 1;
      },
      onPanResponderRelease: () => {
        console.log("onPanResponderRelease")
      },
      onStartShouldSetPanResponderCapture: () => true
    });
  }

  render() {

    return (
        <Animated.View
          {...this.panResponder.panHandlers}
        >
          { this.props.children }
        </Animated.View>
    );
  }
}

let CIRCLE_RADIUS = 30;
let styles = StyleSheet.create({
  circle: {
    backgroundColor: "skyblue",
    // width: CIRCLE_RADIUS * 2,
    // height: CIRCLE_RADIUS * 2,
    // borderRadius: CIRCLE_RADIUS
  }
});