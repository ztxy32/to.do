import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    const alreadyExistes = tasks.find(item => item.title == newTaskTitle)
    if (alreadyExistes){
      Alert.alert("Esta task já existe", "Não podes criar duas tasks com o mesmo nome")
      return
    }else{setTasks(oldState => [...oldState, newTask])}
    
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({ ...task }))
    const itemFound = updatedTasks.find(item => item.id == id )
    if (!itemFound){
      return
    }
    itemFound.done = !itemFound.done
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert("Excluir task","Tens certeza que desejas excluir esta task?",[
      {
        text: "sim",
        onPress: () => setTasks(oldState => oldState.filter(tasks => tasks.id !== id))
      },
      {
        text: "não",
        onPress: () => {return}
      }
    ], {cancelable: true})
    
  }
  function handleEditTask(TaskId: number, TaskNewTitle: string){
    const updatedTasks = tasks.map(task => ({...task}))
    const taskItem = updatedTasks.find(item => item.id == TaskId)
    if (taskItem){
      taskItem.title = TaskNewTitle
    }else{return}
    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})