import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default class WelcomeHeader extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Everything starts from here</Text>
                <Button
                    raised
                    icon={{name: 'home', size: 32}}
                    buttonStyle={{backgroundColor: 'red', borderRadius: 10}}
                    textStyle={{textAlign: 'center'}}
                    title={`Welcome to\nReact Native Elements`}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
