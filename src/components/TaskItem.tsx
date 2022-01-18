import React, { useState } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet} from "react-native";
import trashIcon from '../assets/icons/trash/trash.png';
import xIcon from '../assets/icons/x/X.png';
import editIcon from '../assets/icons/edit/edit.png';
import Icon from 'react-native-vector-icons/Feather';
import { Task } from "./TasksList";

interface taskItemProps{
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (TaskId: number, TaskNewTitle: string) => void;
}


export default function TaskItem({task, toggleTaskDone, removeTask, editTask}:taskItemProps){
    const [isEditing, setIsEditing] = useState();
    return(
        <>
            <View>
                <TouchableOpacity activeOpacity={0.7} style={styles.taskButton} onPress={() => toggleTaskDone(task.id)}>
                    <View style={task.done ? styles.taskMarkerDone: styles.taskMarker}>
                        { task.done && (<Icon name="check" size={12} color="#FFF"/>)}
                    </View>
                    <Text style={task.done ? styles.taskTextDone: styles.taskText  }> {task.title} </Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => editTask(task.id, task.title)} style={{paddingHorizontal: 10}}>
                    <Image source={isEditing ? xIcon : editIcon}/>
                </TouchableOpacity>
                
                <View style={{width: 1, height: 28, backgroundColor:"#C4C4C4"}}/>

                <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => removeTask(task.id)}>
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>
      </>
    );
}



const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }
  })