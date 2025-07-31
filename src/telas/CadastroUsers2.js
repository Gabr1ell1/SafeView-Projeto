import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Alert,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import style from '../style';
import Input from '../components/Input';
import Select from '../components/Select';
import FundoDegrade from '../components/FundoDegrade';
import Botao from '../components/Botao';

function validarSenha(senha) {
  const temMinimo15 = senha.length >= 15;
  const temMinimo6ComRegras =
    senha.length >= 6 &&
    /[A-Z]/i.test(senha) &&
    /[0-9]/.test(senha) &&
    /[@#!%&*]/.test(senha);
  return temMinimo15 || temMinimo6ComRegras;
}

function getForcaSenha(s) {
  if (s.length === 0) return '';
  if (s.length < 6) return 'Fraca';
  if (validarSenha(s)) {
    if (s.length >= 10) return 'Forte';
    return 'Aceitável';
  }
  return 'Fraca';
}

function Formulario({
  veiculo,
  setVeiculo,
  veiculoOutro,
  setVeiculoOutro,
  altura,
  setAltura,
  comprimento,
  setComprimento,
  senha,
  setSenha,
  isLargeScreen,
  onSubmit,
}) {
    const forcaSenha = getForcaSenha(senha);
    const corForcaSenha =
    forcaSenha === 'Forte'
      ? '#0f0'
      : forcaSenha === 'Aceitável'
      ? '#FFA500'
      : forcaSenha === 'Fraca'
      ? '#f00'
      : '#D5E3ED';

  return (
    <View style={isLargeScreen ? styles.card : styles.formMobile}>
      <Text style={[style.titulo, styles.cardtitulo]}>
        Sobre seu veículo
      </Text>

      <View>
        <View style={styles.PickerContainer}>
          {veiculo !== 'Outro' ? (
            <Select
              label="Veículo:"
              selectedValue={veiculo}
              onValueChange={setVeiculo}
              options={[
                { label: 'Hyundai HR Baú', value: 'Hyundai HR Baú' },
                { label: 'Fiat Ducato Baú', value: 'Fiat Ducato Baú' },
                { label: 'Renault Master Baú', value: 'Renault Master Baú' },
                { label: 'Iveco Daily 35S14 Baú', value: 'Iveco Daily 35S14 Baú' },
                { label: 'Mercedes-Benz Sprinter 415 Baú', value: 'Mercedes-Benz Sprinter 415 Baú' },
                { label: 'Mercedes-Benz Sprinter 515 Baú', value: 'Mercedes-Benz Sprinter 515 Baú' },
                { label: 'Volkswagen Delivery 9.170 Baú', value: 'Volkswagen Delivery 9.170 Baú' },
                { label: 'Volkswagen Delivery 11.180 Baú', value: 'Volkswagen Delivery 11.180 Baú' },
                { label: 'Mercedes-Benz Accelo 1016 Baú', value: 'Mercedes-Benz Accelo 1016 Baú' },
                { label: 'Ford Cargo 1119 Baú', value: 'Ford Cargo 1119 Baú' },
                { label: 'Iveco Tector 11-190 Baú', value: 'Iveco Tector 11-190 Baú' },
                { label: 'Agrale 8700 Baú', value: 'Agrale 8700 Baú' },
                { label: 'Mercedes-Benz Atego 1719 Baú', value: 'Mercedes-Benz Atego 1719 Baú' },
                { label: 'Mercedes-Benz Atego 2426 Baú', value: 'Mercedes-Benz Atego 2426 Baú' },
                { label: 'Volkswagen Constellation 17.230 Baú', value: 'Volkswagen Constellation 17.230 Baú' },
                { label: 'Ford Cargo 2429 Baú', value: 'Ford Cargo 2429 Baú' },
                { label: 'Iveco Tector 240E25 Baú', value: 'Iveco Tector 240E25 Baú' },
                { label: 'Scania R440 Baú', value: 'Scania R440 Baú' },
                { label: 'Scania R450 Baú', value: 'Scania R450 Baú' },
                { label: 'Volvo FH 460 Baú', value: 'Volvo FH 460 Baú' },
                { label: 'Volvo FH 540 Baú', value: 'Volvo FH 540 Baú' },
                { label: 'Outro', value: 'Outro' },
              ]}
            />
          ) : (
            <Input
              label="Veículo:"
              placeholder="Ex: Mercedes-Benz 1215 Baú"
              value={veiculoOutro}
              onChangeText={setVeiculoOutro}
            />
          )}
        </View>

        <View style={styles.metade}>
          <Input
            label="Altura:"
            placeholder="Ex: 3.5"
            value={altura}
            keyboardType="numeric"
            onChangeText={(text) => {
              const onlyNumbers = text.replace(/[^0-9.,]/g, '');
              setAltura(onlyNumbers);
            }}
          />
        </View>
      </View>
      <Input
        label="Comprimento do baú:"
        placeholder="Ex: 2.4 x 4.0"
        value={comprimento}
        onChangeText={(text) => {
          const filtered = text.replace(/[^0-9x.,]/gi, '');
          setComprimento(filtered);
        }}
      />

      <Input
      label="Crie uma senha:"
      placeholder="Ex: C@rro2024!Blindado"
      value={senha}
      onChangeText={setSenha}
      secureTextEntry={true}
      />
      <Text
        style={[styles.regrasSenha,]}
      >
        A senha deve ter pelo menos 15 caracteres OU pelo menos 6 caracteres,
        incluindo um número, letra e símbolo (ex: @, #, !, %)
      </Text>

      {forcaSenha !== '' && (
        <Text style={{ color: corForcaSenha }}>
          Senha: {forcaSenha}
        </Text>
      )}

      <Botao label="Entrar" onPress={onSubmit} />
    </View>
  );
}

export default function Cadastro2({ navigation, route }) {
  const { nome, email, ano, cnh } = route.params;
  const [veiculo, setVeiculo] = useState('');
  const [altura, setAltura] = useState('');
  const [comprimento, setComprimento] = useState('');
  const [senha, setSenha] = useState('');
  const [veiculoOutro, setVeiculoOutro] = useState('');
  const { width } = useWindowDimensions();
  const isLargeScreen = width > 768;

  const salvarDados = async () => {
    try {
      await addDoc(collection(db, 'usuarios'), {
        nome,
        email,
        ano,
        cnh,
        veiculo: veiculo === 'Outro' ? veiculoOutro : veiculo,
        altura,
        comprimento,
        senha,
      });
      Alert.alert('Sucesso', 'Cadastro realizado!');
      navigation.navigate('CadastroUsers');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
      console.log(error);
    }
  };


  return (
    <FundoDegrade>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={Platform.OS === 'ios' ? 100 : 20}>
        <View style={[styles.container, isLargeScreen && styles.containerRow]}>
            {isLargeScreen && (
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/logo-truck.png')}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            )}

            <View style={styles.formContainer}>
              <Text style={[style.titulo, styles.titulo]}>Olá, é um prazer!</Text>
              <Text style={[style.texto, styles.subtitulo]}>
                Que tal começar uma nova jornada?
              </Text>

              <Formulario
                veiculo={veiculo}
                setVeiculo={setVeiculo}
                veiculoOutro={veiculoOutro}
                setVeiculoOutro={setVeiculoOutro}
                altura={altura}
                setAltura={setAltura}
                comprimento={comprimento}
                setComprimento={setComprimento}
                senha={senha}
                setSenha={setSenha}
                isLargeScreen={isLargeScreen}
                onSubmit={salvarDados}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
    </FundoDegrade>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { 
    flexGrow: 1, 
    padding: 20 
  },
  container: { flex: 1 },
  containerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  imageContainer: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20 
  },
  image: { 
    width: '100%', 
    height: Platform.OS === 'web' ? 300 : 200 },
  formContainer: { flex: 1 },
  formMobile: { 
    width: '100%', 
    marginTop: 15 
  },
  titulo: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  subtitulo: { 
    fontSize: 18, 
    textAlign: 'center', 
    marginBottom: 20 
  },
  card: {
    borderColor: '#0F1A2C',
    borderWidth: 0.5,
    borderRadius: 12,
    padding: 25,
    marginTop: 20,
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  cardtitulo: { 
    textAlign: 'center', 
    marginBottom: 20, 
    fontSize: 22 
  },
  regrasSenha: { 
    fontSize: 14, 
    marginBottom: 10, 
    color: '#D5E3ED' 
  },
});
