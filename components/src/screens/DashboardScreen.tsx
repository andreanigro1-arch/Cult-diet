import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../../Button';        // ← to jest poprawne dla Twojej struktury

const DashboardScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>
        Dashboard RP Diet
      </Text>
      <Text style={{ marginBottom: 20 }}>Tu będzie progress makr + dzisiejsze posiłki</Text>
      
      <Button 
        label="Dodaj posiłek" 
        onPress={() => console.log('Przycisk kliknięty!')} 
      />
    </View>
  );
};

export default DashboardScreen;
