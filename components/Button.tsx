import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Colors from '../constants/colors';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  style,
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.label,
    styles[`${size}Label`],
    styles[`${variant}Label`],        // ← nowy styl dla koloru tekstu
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={buttonStyle}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },

  // === Warianty przycisku ===
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

  // === Rozmiary ===
  small: { paddingVertical: 8, paddingHorizontal: 16 },
  medium: { paddingVertical: 12, paddingHorizontal: 20 },
  large: { paddingVertical: 16, paddingHorizontal: 24 },

  disabled: {
    opacity: 0.5,
  },

  // === Tekst ===
  label: {
    fontWeight: '600',
  },
  smallLabel: { fontSize: 12 },
  mediumLabel: { fontSize: 14 },
  largeLabel: { fontSize: 16 },

  // Kolory tekstu w zależności od wariantu
  primaryLabel: { color: '#FFFFFF' },
  secondaryLabel: { color: Colors.light.text },
  dangerLabel: { color: '#FFFFFF' },
});
