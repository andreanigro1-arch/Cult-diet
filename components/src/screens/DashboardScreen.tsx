import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../components/Button'; // dostosuj ścieżkę jeśli masz inaczej

const DashboardScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>
        Dashboard RP Diet
      </Text>
      <Text>Tu będzie progress makr + dzisiejsze posiłki</Text>
      <Button label="Dodaj posiłek" onPress={() => {}} />
    </View>
  );
};

export default DashboardScreen;
