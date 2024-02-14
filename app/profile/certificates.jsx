import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, Button, useTheme, Divider } from 'react-native-paper';

import { HeaderBackButton, DeleteModal, CertificateCard, TextBox } from '../../components';
import { addCertificate, removeCertificate, setCertificate } from '../../redux/extraReducers/certificateSlice'; 

const CertificateScreen = () => {
  const [certificateEditor, setCertificateEditor] = useState(false);
  const [index, setIndex] = useState(-1);

  const [certificateName, setCertificateName] = useState("");
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
      Certificate: certificateName,
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
    setCertificateName("");
    setIssuer("");
    setIssueDate("");
    setExpirationDate("");
    setCredentialID("");
    setCredentialURL("");
    handleCertificateEditor();
  };
  
  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen 
        options={{title: "Certificates"}}
        headerLeft={() => <HeaderBackButton path="profile" theme={theme} />}
      />
      <KeyboardAwareScrollView style={styles.container}>
        { certificateEditor ? (
          <View>
            <Text
              variant='headlineMedium'
              style={styles.title}
            >
              { index === -1 ? "Add" : "Edit" } Certificate
            </Text>
            <Divider style={{backgroundColor: theme.colors.outline, marginBottom: 5}} />
            <TextBox
              label="Certificate"
              value={certificateName}
              onChangeText={text => setCertificateName(text)}
            />
            <TextBox
              label="Issuer"
              value={issuer}
              onChangeText={text => setIssuer(text)}
            />
            <TextBox
              label="Issue Date"
              value={issueDate}
              onChangeText={text => setIssueDate(text)}
            />
            <TextBox
              label="Expiration Date"
              value={expirationDate}
              onChangeText={text => setExpirationDate(text)}
            />
            <TextBox
              label="Credential ID"
              value={credentialID}
              onChangeText={text => setCredentialID(text)}
            />
            <TextBox
              label="Credential URL"
              value={credentialURL}
              onChangeText={text => setCredentialURL(text)}
            />
            <Button
              mode="contained"
              style={styles.button}
              onPress={saveCertificateData}
              disabled={certificateName === "" || issuer === ""}
            >
              Save
            </Button>
            <Button
              mode="text"
              style={styles.button}
              onPress={handleCertificateEditor}
              textColor={theme.colors.onError}
              buttonColor={theme.colors.error}
            >
              Cancel
            </Button>
          </View>
        ) : (
          <>
          { certificates.map((data, i) => (
            <CertificateCard
              key={i}
              data={data}
              style={i === 0 ? {marginVertical: 10} : {marginBottom: 10}}
            >
              <Button
                mode='text'
                textColor={theme.colors.onBackgroundVariant}
                onPress={() => {
                  setIndex(i);
                  setCertificateName(data.Certificate);
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
      { !certificateEditor && (
        <Button
          mode="contained"
          style={styles.addButton}
          contentStyle={styles.addButtonContent}
          onPress={handleCertificateEditor}
        >
          Add Certificate
        </Button>
      )}
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
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 10,
  },
  button: {
    marginTop: 10,
  },
  addButton: {
    borderRadius: 0,
  },
  addButtonContent: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default CertificateScreen;