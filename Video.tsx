/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Text,
} from 'react-native';

import VideoPlayer from 'react-native-video-player';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import FTP from 'react-native-ftp';

const Video = ({route, navigation}) => {
  const {filename} = route.params;
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('useEffect...');
    // Update the document title using the browser API
    FTP.setup('raspberrypi', 21); //Setup host
    FTP.login('pi', 's3@h0rs3').then(
      () => {
        console.log('downloading...');
        //TODO: check if file is already downloaded.
        FTP.downloadFile(
          './files/' + filename,
          './data/data/com.moonlightexpress.alarmobot',
        ).then((result: any) => {
          console.log('ftp download result:');
          console.log(result);
          setLoading(false);
        });
      },
      (error: string) => {
        console.log('ERROR: ' + error);
        setLoading(false);
      },
    );
  }, [filename]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {loading && <Text>Loading...</Text>}
          {!loading && <Text>{filename}</Text>}
          {!loading && (
            <VideoPlayer
              video={{
                uri: './data/data/com.moonlightexpress.alarmobot/' + filename,
              }}
              videoWidth={320}
              videoHeight={240}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Video;
