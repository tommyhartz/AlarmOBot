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
  StatusBar,
  useColorScheme,
  View,
  FlatList,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import FTP from 'react-native-ftp';

const List = ({navigation}) => {
  const [files, setFiles] = useState(new Array<any>());

  useEffect(() => {
    console.log('useEffect...');
    // Update the document title using the browser API
    FTP.setup('raspberrypi', 21); //Setup host
    FTP.login('pi', 's3@h0rs3').then(
      () => {
        FTP.list('./files').then((result: any) => {
          console.log('ftp results:');
          console.log(result);
          setFiles(JSON.parse(result).results);
        });
      },
      (error: string) => {
        console.log('ERROR: ' + error);
      },
    );
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <FlatList
          data={files}
          renderItem={({item}) => (
            <View style={{margin: 10}}>
              <Button
                title={item.name}
                onPress={() =>
                  navigation.navigate('Watch', {
                    filename: item.name,
                  })
                }
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;
