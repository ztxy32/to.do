import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, TextInput, Image, StyleSheet} from "react-native";
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
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleEditing(){
        setIsEditing(true);
    }
    function hanleCancelEditing(){
        setNewTitle(task.title);
        setIsEditing(false);
    }
    function handleSubmitEditing(){
        editTask(task.id, newTitle);
        setIsEditing(false);
    }
    useEffect( () => {
        if(textInputRef.current){
            if(isEditing){
                textInputRef.current.focus();
            }else{ textInputRef.current.blur(); }
        }
    },[isEditing])

    return(
        <>
            <View>
                <TouchableOpacity activeOpacity={0.7} style={styles.taskButton} onPress={() => toggleTaskDone(task.id)} disabled={isEditing}>
                    <View style={task.done ? styles.taskMarkerDone: styles.taskMarker}>
                        { task.done && (<Icon name="check" size={12} color="#FFF"/>)}
                    </View>
                    <TextInput 
                        style={task.done ? styles.taskTextDone: styles.taskText}
                        value={newTitle}
                        onChangeText={setNewTitle}
                        editable={isEditing}
                        onSubmitEditing={handleSubmitEditing}
                        ref={textInputRef}
                        />
                </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                
                {isEditing ? 
                    <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={hanleCancelEditing}>
                        <Image source={xIcon} />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={handleEditing}>
                        <Image source={editIcon} />
                    </TouchableOpacity>  
                }
                <View style={{width: 1, height: 28, backgroundColor:"#C4C4C4"}}/>
                <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => removeTask(task.id)} disabled={isEditing}>
                    <Image source={trashIcon} style={{opacity: isEditing ? .3 : 1}} />
                </TouchableOpacity>  
                
               

                
            </View>
      </>
    );
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center',
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