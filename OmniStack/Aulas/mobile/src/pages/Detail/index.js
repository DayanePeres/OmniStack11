import React from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import * as MailComposer from 'expo-mail-composer';


import logoImg from '../../assets/logo.png';

import styles from './style';
import { setAutoFocusEnabled } from 'expo/build/AR';

export default function Detail(){

    const navigation = useNavigation();
    const message= 'Olá. Teste de mobile OMNISTACK';

    function navigationBack(){
        navigation.goBack();
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject: 'Herói do caso: Cadelinha',
            recipients: ['dayfer_peres@hotmail.com'],
            body: message,
        })
    }

    function seanWhatsApp(){
        Linking.openURL(`whatsapp://send?text=${message}&phone=${5518996631006}`);
    }

    return (
        <View style={styles.container} >
             <View style={styles.header}>
                <Image source={logoImg} />
                
                <TouchableOpacity onPress={navigationBack}>
                    <Feather name="arrow-left" size={28} color="#e82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>APAD</Text>

                <Text style={styles.incidentProperty}>Caso:</Text>
                <Text style={styles.incidentValue}>Cadelinha</Text>

                <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>R$ 120,00</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia! </Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso. </Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                < View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={seanWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}