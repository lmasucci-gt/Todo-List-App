import React from 'react';
import { Button, FlatList, Text, View, StyleSheet, Dimensions } from 'react-native';

export default ({ closeModal }) => {
    return (
        <>
            <View style={styles.button}>
                <Button title='Cerrar' onPress={closeModal}/>
            </View>
        </>
    )
}

const styles = StyleSheet.create ({
    list : {
        height: Dimensions.get('window').height - 250,
    },
    item: {
        borderBottomWidth:1,
        borderColor: '#ccc',
        height: 50,
        justifyContent: 'center',
        padding: 15,
    },
    button: {
        paddingBottom:15,
    }
})