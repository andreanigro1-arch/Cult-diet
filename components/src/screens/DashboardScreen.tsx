import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button } from '../../Button';
import Colors from '../../Colors';
import { useDietStore } from '../../DietStore';   // ← zakładam, że masz plik DietStore z useDietStore

const { width } = Dimensions.get('window');

const DashboardScreen: React.FC = () => {
  const { userData, getTodaysMeals } = useDietStore();

  const todaysMeals = getTodaysMeals();

  // Oblicz aktualne makra z dzisiejszych posiłków
  const currentMacros = todaysMeals.reduce(
    (acc, meal) => {
      acc.protein += meal.totalMacros.protein;
      acc.carbs += meal.totalMacros.carbs;
      acc.fat += meal.totalMacros.fat;
      acc.calories += meal.totalMacros.calories;
      return acc;
    },
    { protein: 0, carbs: 0, fat: 0, calories: 0 }
  );

  const target = userData?.targetMacros || { protein: 180, carbs: 250, fat: 80, calories: 2500 };

  const progress = {
    calories: Math.min((currentMacros.calories / target.calories) * 100, 100),
    protein: Math.min((currentMacros.protein / target.protein) * 100, 100),
    carbs: Math.min((currentMacros.carbs / target.carbs) * 100, 100),
    fat: Math.min((currentMacros.fat / target.fat) * 100, 100),
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Nagłówek */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Cześć, {userData?.name || 'Trenerze'}! 👋</Text>
        <Text style={styles.date}>{new Date().toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })}</Text>
      </View>

      {/* Progress kalorii (duży okrągły) */}
      <View style={styles.caloriesCard}>
        <View style={styles.caloriesCircle}>
          <Text style={styles.caloriesBig}>{Math.round(currentMacros.calories)}</Text>
          <Text style={styles.caloriesLabel}>z {target.calories} kcal</Text>
        </View>
        <Text style={styles.progressText}>{Math.round(progress.calories)}% zużyto</Text>
      </View>

      {/* Makra w poziomie */}
      <View style={styles.macroContainer}>
        <MacroBar label="Białko" value={currentMacros.protein} target={target.protein} unit="g" color="#00C853" />
        <MacroBar label="Węglowodany" value={currentMacros.carbs} target={target.carbs} unit="g" color="#FF9800" />
        <MacroBar label="Tłuszcze" value={currentMacros.fat} target={target.fat} unit="g" color="#FF5252" />
      </View>

      {/* Dzisiejsze posiłki */}
      <Text style={styles.sectionTitle}>Dzisiejsze posiłki ({todaysMeals.length})</Text>

      {todaysMeals.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Nie dodałeś jeszcze żadnego posiłku dzisiaj</Text>
          <Button label="Dodaj pierwszy posiłek" onPress={() => {}} fullWidth />
        </View>
      ) : (
        todaysMeals.map((meal) => (
          <View key={meal.id} style={styles.mealCard}>
            <Text style={styles.mealName}>{meal.name}</Text>
            <Text style={styles.mealMacros}>
              {meal.totalMacros.protein}g B • {meal.totalMacros.carbs}g W • {meal.totalMacros.fat}g T • {meal.totalMacros.calories} kcal
            </Text>
          </View>
        ))
      )}

      {/* Przycisk szybkiego dodania */}
      <Button
        label="➕ Dodaj posiłek"
        onPress={() => console.log('Przejdź do LogMealScreen')}
        size="large"
        fullWidth
        style={{ marginTop: 20 }}
      />
    </ScrollView>
  );
};

/* === POMOCNICZY KOMPONENT MACRO BAR === */
const MacroBar: React.FC<{
  label: string;
  value: number;
  target: number;
  unit: string;
  color: string;
}> = ({ label, value, target, unit, color }) => {
  const percent = Math.min((value / target) * 100, 100);
  return (
    <View style={styles.macroRow}>
      <View style={styles.macroLabelContainer}>
        <Text style={styles.macroLabel}>{label}</Text>
        <Text style={styles.macroValue}>
          {value}/{target} {unit}
        </Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${percent}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.light.background },
  scrollContent: { padding: 20, paddingBottom: 100 },
  header: { marginBottom: 24 },
  greeting: { fontSize: 28, fontWeight: '700', color: Colors.light.text },
  date: { fontSize: 16, color: Colors.light.textSecondary, marginTop: 4 },

  caloriesCard: {
    alignItems: 'center',
    backgroundColor: Colors.light.surface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  caloriesCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 12,
    borderColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  caloriesBig: { fontSize: 42, fontWeight: '700', color: Colors.light.text },
  caloriesLabel: { fontSize: 16, color: Colors.light.textSecondary },
  progressText: { fontSize: 18, fontWeight: '600', color: Colors.light.tint },

  macroContainer: { marginBottom: 32 },
  macroRow: { marginBottom: 16 },
  macroLabelContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  macroLabel: { fontSize: 15, fontWeight: '600', color: Colors.light.text },
  macroValue: { fontSize: 15, color: Colors.light.textSecondary },
  progressBarBackground: {
    height: 12,
    backgroundColor: Colors.light.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: { height: '100%', borderRadius: 6 },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 12,
  },

  mealCard: {
    backgroundColor: Colors.light.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  mealName: { fontSize: 17, fontWeight: '600', color: Colors.light.text, marginBottom: 4 },
  mealMacros: { fontSize: 14, color: Colors.light.textSecondary },

  emptyState: {
    backgroundColor: Colors.light.surface,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default DashboardScreen;
