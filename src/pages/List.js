import React, { useState, useEffect } from 'react';
import { SafeAreaView, Image, ScrollView, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';

import SpotList from '../components/SpotList';
import logo from  '../assets/logo.png';

export default function List({ navigation }) {
    const [ techs, setTechs ] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const arrayTechs = storageTechs.split(',').map(tech => tech.trim());
            setTechs(arrayTechs);
        })
    }, []);

    function handleLogout() {
        AsyncStorage.clear();
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image source={logo} style={styles.logo} />
            </TouchableOpacity>

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
    },
})