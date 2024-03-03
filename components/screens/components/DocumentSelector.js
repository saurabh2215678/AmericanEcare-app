// DocumentPicker.js
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const DocumentSelector = () => {
  const [pickedDocument, setPickedDocument] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      if (result.type === 'success') {
        setPickedDocument(result);
      } else {
        setPickedDocument(null);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <View>
      <Text>Selected Document: {pickedDocument ? pickedDocument.name : 'None'}</Text>
      <Button title="Pick Document" onPress={pickDocument} />
    </View>
  );
};

export default DocumentSelector;
