import React, {useState, useEffect} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {View, FlatList,  Image, Text, TouchableOpacity} from 'react-native';

import logoImg from '../../assets/logo.png';
import api from '../../Services/api';

import style from './style';

export default function Incidents(){

    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);

    function navigatToDetail(){

        navigation.navigate('Detail');
    }

    async function loadIncidents(){
          const response = await api.get('incidents');
        
          console.log(response);
          
          setIncidents(response.data);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <Text style={style.headerText} >
                    Total de <Text style={style.headerTextBold}>  5 casos. </Text>
                </Text>
            </View>

            <Text style={style.title}>Bem vindo!</Text>
            <Text style={style.description}>Escolha um dos casos abaixo e salve.</Text>
            
            <FlatList
                data={incidents}
                style={style.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: incident }) => (
                    <View style={style.incident}>
                        <Text style={style.incidentProperty}>ONG:</Text>
                        <Text style={style.incidentValue}>{incident.name}</Text>

                        <Text style={style.incidentProperty}>Caso:</Text>
                        <Text style={style.incidentValue}>{incident.title}</Text>

                        <Text style={style.incidentProperty}>Valor:</Text>
                        <Text style={style.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})}</Text>

                        <TouchableOpacity 
                            style={style.detailsButton} 
                            onPress={navigatToDetail} 
                        >

                        <Text style={ style.detailsButtonText} >Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041"/>
                        </TouchableOpacity>
                    </View>
                )}
            />                      
        </View>
    );
}