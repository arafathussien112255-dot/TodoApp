import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, TextInput, TouchableOpacity,
  FlatList, StatusBar, StyleSheet, Keyboard
} from 'react-native';

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const title = taskText.trim();
    if (!title) return;
    setTasks(prev => [{ id: Date.now().toString(), title, completed: false }, ...prev]);
    setTaskText('');
    Keyboard.dismiss();
  };

  const toggleTask = id => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = id => setTasks(prev => prev.filter(task => task.id !== id));
  const remaining = tasks.filter(task => !task.completed).length;

  const renderTask = ({ item }) => (
    <View style={styles.taskCard}>
      <TouchableOpacity style={styles.checkButton} onPress={() => toggleTask(item.id)}>
        <Text style={[styles.checkText, item.completed && styles.checkedText]}>
          {item.completed ? '✓' : ''}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.taskTitle, item.completed && styles.completedTask]}>
        {item.title}
      </Text>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#101827" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>YOUR DAILY PLANNER</Text>
            <Text style={styles.heading}>My Tasks <Text style={styles.headingDot}>.</Text></Text>
            <Text style={styles.subtitle}>Small steps, big progress.</Text>
          </View>
          <View style={styles.counter}>
            <Text style={styles.counterNumber}>{remaining}</Text>
            <Text style={styles.counterLabel}>LEFT</Text>
          </View>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="What needs to be done?"
            placeholderTextColor="#8290a5"
            value={taskText}
            onChangeText={setTaskText}
            onSubmitEditing={addTask}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>＋</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>TASK LIST</Text>
          <Text style={styles.taskCount}>{tasks.length} total</Text>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={renderTask}
          contentContainerStyle={tasks.length === 0 ? styles.emptyContainer : styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>✦</Text>
              <Text style={styles.emptyTitle}>Nothing on your list</Text>
              <Text style={styles.emptyText}>Add a task above and get started.</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
        <Text style={styles.footer}>STAY FOCUSED • YOU’VE GOT THIS</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#101827' },
  container: { flex: 1, paddingHorizontal: 22, paddingTop: 28, backgroundColor: '#101827' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  eyebrow: { color: '#8c9ab0', fontSize: 11, letterSpacing: 2, fontWeight: '700', marginBottom: 10 },
  heading: { color: '#f7f9fc', fontSize: 34, fontWeight: '800' },
  headingDot: { color: '#7c6cff' },
  subtitle: { color: '#9aa7b9', fontSize: 14, marginTop: 6 },
  counter: { width: 68, height: 68, borderRadius: 22, backgroundColor: '#252f43', alignItems: 'center', justifyContent: 'center' },
  counterNumber: { color: '#a99fff', fontSize: 25, fontWeight: '800' },
  counterLabel: { color: '#9aa7b9', fontSize: 9, fontWeight: '800', letterSpacing: 1.5, marginTop: 2 },
  inputRow: { flexDirection: 'row', backgroundColor: '#202b3d', borderRadius: 17, padding: 7, marginBottom: 28, borderWidth: 1, borderColor: '#2d394d' },
  input: { flex: 1, paddingHorizontal: 14, color: '#f7f9fc', fontSize: 14, minHeight: 48 },
  addButton: { width: 48, borderRadius: 13, backgroundColor: '#7c6cff', alignItems: 'center', justifyContent: 'center' },
  addButtonText: { color: 'white', fontSize: 29, fontWeight: '400', marginTop: -3 },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  listTitle: { color: '#e7ebf3', fontSize: 12, fontWeight: '800', letterSpacing: 1.5 },
  taskCount: { color: '#8794a8', fontSize: 12 },
  listContent: { paddingBottom: 20 },
  taskCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#202b3d', borderRadius: 15, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#2c384c' },
  checkButton: { width: 25, height: 25, borderRadius: 8, borderWidth: 1.5, borderColor: '#7c6cff', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  checkText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  checkedText: { color: '#a99fff' },
  taskTitle: { flex: 1, color: '#edf1f8', fontSize: 14 },
  completedTask: { color: '#7f8ba0', textDecorationLine: 'line-through' },
  deleteButton: { marginLeft: 10, width: 28, height: 28, borderRadius: 9, backgroundColor: '#3a2b3a', alignItems: 'center', justifyContent: 'center' },
  deleteText: { color: '#ff8caa', fontSize: 23, lineHeight: 25 },
  emptyContainer: { flexGrow: 1, justifyContent: 'center' },
  emptyState: { alignItems: 'center', paddingBottom: 40 },
  emptyIcon: { color: '#7c6cff', fontSize: 35, marginBottom: 12 },
  emptyTitle: { color: '#e9edf5', fontSize: 17, fontWeight: '700' },
  emptyText: { color: '#8794a8', fontSize: 13, marginTop: 7 },
  footer: { color: '#657287', fontSize: 9, fontWeight: '700', letterSpacing: 1.7, textAlign: 'center', paddingVertical: 15 },
});
