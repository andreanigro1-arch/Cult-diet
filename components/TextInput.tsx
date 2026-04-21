import React from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Colors from '../constants/colors';

interface CustomTextInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  placeholder?: string;
  error?: string;
  fullWidth?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  variant?: 'primary' | 'secondary'; // na przyszłość więcej wariantów
}

export const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  placeholder,
  error,
  fullWidth = true,
  containerStyle,
  inputStyle,
  variant = 'primary',
  ...rest
}) => {
  const borderColor = error
    ? Colors.light.danger
    : variant === 'primary'
    ? Colors.light.tint
    : Colors.light.border;

  return (
    <View style={[styles.container, fullWidth && styles.fullWidth, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <RNTextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.light.placeholder}
        style={[
          styles.input,
          { borderColor },
          error && styles.inputError,
          inputStyle,
        ]}
        {...rest}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
    marginBottom: 6,
  },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: Colors.light.surface,
    color: Colors.light.text,
  },
  inputError: {
    borderWidth: 2,
  },
  errorText: {
    fontSize: 13,
    color: Colors.light.danger,
    marginTop: 4,
    marginLeft: 4,
  },
});
