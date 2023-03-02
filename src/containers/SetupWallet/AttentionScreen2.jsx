import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../assets/colors'

export default function AttentionScreen2() {
    return (
        <View style={styles.container}>
            <Text>AttentionScreen2</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center'
    }
})