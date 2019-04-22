import React from "react";
import { View, Text, ScrollView } from 'react-native'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      message: ""
    };
  }
  componentDidCatch(err) {
    this.setState({
      error: true,
      message: err.toString()
    });
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.errorContainer}>
            <ScrollView>
              <Text style={{ textAlign: "center", fontSize: 18, padding: 10 }}>
                Something Went Wrong!
              </Text>
              <Text style={{ textAlign: "center", fontSize: 12, padding: 10 }}>
                  {this.state.message}
              </Text>
            </ScrollView>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = {
  errorContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '90%'
  }
};