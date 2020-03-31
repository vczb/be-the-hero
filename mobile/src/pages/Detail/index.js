import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View,Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';

import logoImg from '../../assets/logo.png';
import Incidents from '../Incidents';


export default function Detail(){

    const navigation = useNavigation();
    
    const route = useRoute(); 
    const incident = route.params.incident;
    
    const valueBRL = Intl.NumberFormat('pt-BR', {
        style: 'currency', 
        currency: 'BRL'
    }).format(incident.value);

    const message = `Olá ${incident.name}, Estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${valueBRL}`;

  
    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }
    
    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}?&text=${message}`);
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity>
                    <Feather name="arrow-left" size={28} 
                      onPress={navigateBack}  color="#e82041"/>
                </TouchableOpacity>
            </View>

            <View style={styles.incident} >
                
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>
                <Text style={styles.incidentValue}>{incident.city}/{incident.uf}  </Text>
                
                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>
                
                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                    {
                        valueBRL
                    }
                </Text>

            </View>

            <View style={styles.contactBox} >

                <Text style={styles.heroTitle} >Salve o dia!</Text>
                <Text style={styles.heroTitle} >Seja o heroi desse caso.</Text>

                <Text style={styles.heroDescription} >Entre em contato:</Text>

                <View style={styles.actions}>

                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText} >WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText} >E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}