import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Colors from '../constants/colors';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ];

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={buttonStyle}>
      <Text style={[styles.label, styles[`${size}Label`]]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: Colors.light.tint,
  },
  secondary: {
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  danger: {
    backgroundColor: Colors.light.danger,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontWeight: '600',
  },
  smallLabel: {
    fontSize: 12,
    color: Colors.light.text,
  },
  mediumLabel: {
    fontSize: 14,
    color: Colors.light.text,
  },
  largeLabel: {
    fontSize: 16,
    color: Colors.light.text,
  },
});
