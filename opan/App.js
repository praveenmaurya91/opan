import React, { Component } from 'react';
import { View, StyleSheet, Image , WebView, TouchableOpacity, Text, NetInfo } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import call from 'react-native-phone-call';

class HomeScreen extends React.Component {

  state = { isConnected: null };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectivityChange);
    NetInfo.isConnected.fetch().done((isConnected) => { this.setState({ isConnected }); });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectivityChange);
  }

  _handleConnectivityChange = (isConnected) => {
    this.setState({ isConnected, });
  };

  _handleOpeningWebview = () => {
    if (this.state.isConnected === false) {
      alert('Sorry there is no internet connection..');
      return;
    }
    if (this.state.isConnected === true) {
      this.props.navigation.navigate('OPAN');
    }
  };

  _handleOpeningContactWebview = () => {
    if (this.state.isConnected === false) {
      alert('Sorry there is no internet connection..');
      return;
    }
    if (this.state.isConnected === true) {
      this.props.navigation.navigate('ContactUs');
    }
  };

  static navigationOptions = {
    header: null,
  };

  call = () => {
    //handler to make a call
    const args = {
      number: '1800 700 600',
      prompt: false,
    };

    call(args).catch(console.error);
  };

  render() {

    return (
      <View style={styles.container}>

       <Image
          style={styles.imageStyle}
          source={require('./assets/logo.png')} 
        />

        <TouchableOpacity style={styles.buttonStyleOPAN}
          onPress={() => { this._handleOpeningWebview() }}>
          <Text style={styles.textStyle}>{"OPAN"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyleContact}
          onPress={() => { this._handleOpeningContactWebview() }}>
          <Text style={styles.textStyle}>{"Contact Us"}</Text>
        </TouchableOpacity>

         <TouchableOpacity style={styles.buttonStyleCall}
          onPress={this.call} >
          <Text style={styles.textStyle}>{"Make a Call"}</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

class OPANScreen extends React.Component {

  render() {

    const DEFAULS_URL = 'https://opan.com.au';

    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: DEFAULS_URL }}
        />
      </View>
    );
  }
}

class ContactUscreen extends React.Component {

  render() {

    const CONTACT_URL = 'https://opan.com.au/contact-us';

    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: CONTACT_URL }}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    OPAN: { screen: OPANScreen },
    ContactUs: { screen: ContactUscreen }, 
  },
  {
    initialRouteName: 'Home',
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d1d3d5',
  },
  imageStyle: {
    marginBottom: 100,
  },
  textStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  buttonStyleOPAN: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 30,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    width: 250,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#b084bb',
  },
  buttonStyleContact: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 30,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    width: 250,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#c7dcbb',
  },
  buttonStyleCall: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 30,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    width: 250,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#d87241',
  },
});
export default createAppContainer(RootStack); 
