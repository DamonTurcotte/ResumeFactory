import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';

import { HeaderBackButton } from '../../components/headerBackButton';
import { DeleteModal } from '../../components/deleteModal';
import { CertificateCard } from '../../components/cards/certificateCard';
import { addCertificate, removeCertificate, setCertificate } from '../../redux/extraReducers/certificateSlice'; 

const CertificateScreen = () => {
  const [certificateEditor, setCertificateEditor] = useState(false);
  const [index, setIndex] = useState(-1);

  const [certificate, setCertificate] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [credentialID, setCredentialID] = useState("");
  const [credentialURL, setCredentialURL] = useState("");

  const [deleteIndex, setDeleteIndex] = useState(-1);

  const certificates = useSelector(state => state.profiles[state.currentProfile].certificates.data);

  const dispatch = useDispatch();
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleCertificateEditor = () => setCertificateEditor(!certificateEditor);

  const saveCertificateData = () => {
    let data = {
      Certificate: certificate,
      Issuer: issuer,
      IssueDate: issueDate,
      ExpirationDate: expirationDate,
      CredentialID: credentialID,
      CredentialURL: credentialURL,
    };
    if (index === -1) {
      dispatch(addCertificate({ data: data }));
    } else {
      dispatch(setCertificate({ index: index, data: data }));
    }
    setCertificate("");
    setIssuer("");
    setIssueDate("");
    setExpirationDate("");
    setCredentialID("");
    setCredentialURL("");
    handleCertificateEditor();
  };
  
  return (
    <SafeAreaView style={getStyles(theme).safe}>
      <Stack.Screen 
        options={{title: "Certificates"}}
        headerLeft={() => <HeaderBackButton path="profile" theme={theme} />}
      />
      <KeyboardAwareScrollView style={styles.container}>
        { certificateEditor ? (
          <View>
            <TextInput
              mode='outlined'
              label="Certificate"
              value={certificate}
              onChangeText={text => setCertificate(text)}
            />
            <TextInput
              mode='outlined'
              label="Issuer"
              value={issuer}
              onChangeText={text => setIssuer(text)}
            />
            <TextInput
              mode='outlined'
              label="Issue Date"
              value={issueDate}
              onChangeText={text => setIssueDate(text)}
            />
            <TextInput
              mode='outlined'
              label="Expiration Date"
              value={expirationDate}
              onChangeText={text => setExpirationDate(text)}
            />
            <TextInput
              mode='outlined'
              label="Credential ID"
              value={credentialID}
              onChangeText={text => setCredentialID(text)}
            />
            <TextInput
              mode='outlined'
              label="Credential URL"
              value={credentialURL}
              onChangeText={text => setCredentialURL(text)}
            />
            <Button
              mode="contained"
              style={styles.button}
              onPress={saveCertificateData}
            >
              Save
            </Button>
          </View>
        ) : (
          <>
          { certificates.map((data, i) => (
            <CertificateCard data={data} key={i}>
              <Button
                mode='text'
                textColor={theme.colors.onBackgroundVariant}
                onPress={() => {
                  setIndex(i);
                  setCertificate(data.Certificate);
                  setIssuer(data.Issuer);
                  setIssueDate(data.IssueDate);
                  setExpirationDate(data.ExpirationDate);
                  setCredentialID(data.CredentialID);
                  setCredentialURL(data.CredentialURL);
                  handleCertificateEditor();
              }}>
                Edit
              </Button>
              <Button
                mode='text'
                textColor={theme.colors.onBackgroundVariant}
                onPress={() => setDeleteIndex(i)}
              >
                Delete
              </Button>
            </CertificateCard>
          ))}
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleCertificateEditor}
          >
            Add Certificate
          </Button>
          { deleteIndex !== -1 && (
            <DeleteModal
              visible={deleteIndex !== -1}
              hideModal={() => setDeleteIndex(-1)}
              deleteItem={() => {
                dispatch(removeCertificate({ index: deleteIndex }));
                setDeleteIndex(-1);
              }}
            />
          )}
          </>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const getStyles = (theme) => ({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  button: {
    marginTop: 10,
  }
});

export default CertificateScreen;