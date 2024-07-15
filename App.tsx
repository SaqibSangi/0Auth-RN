import React, { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet, Linking } from 'react-native';
import { useAuth0, Auth0Provider } from 'react-native-auth0';

const Home = () => {
  const { authorize, clearSession, user, error, isLoading, getCredentials } = useAuth0();
  const [authCode, setAuthCode] = useState(null);

  const onLogin = async () => {
    try {
      await authorize();
      const credentials = await getCredentials();
      setAuthCode(credentials?.accessToken);
      console.log('Authorization code:', credentials?.accessToken);
    } catch (e) {
      console.log('Authorization error', e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
      setAuthCode(null);
      console.log('Log out successful');
    } catch (e) {
      console.log('Log out cancelled', e);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const loggedIn = !!user;

  return (
    <View style={styles.container}>
      <Text>{loggedIn ? `You are logged in as ${user.name}` : 'You are not logged in'}</Text>
      {error && <Text>{error.message}</Text>}
      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
      {authCode && (
        <Text>Authorization Code: {authCode}</Text>
      )}
    </View>
  );
};

const App = () => {
  return (
    <Auth0Provider
      domain="dev-hgdgb8rwmkuq5aii.us.auth0.com"
      clientId="29K556d8gmeWz4yrjgExXq0qPCPUfeaq"
      redirectUri="com.homieapp.auth0://dev-hgdgb8rwmkuq5aii.us.auth0.com/android/com.homieapp/callback"
    >
      <Home />
    </Auth0Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;
