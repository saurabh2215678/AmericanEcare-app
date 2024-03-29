
import React from 'react';
import { useEffect, useRef, useState } from "react";
import { Text, View,TouchableOpacity, StyleSheet, Modal, Pressable, TextInput, Platform, ActivityIndicator } from "react-native";



const DeleteConfirm = ({deleteModal, setDeleteMoal, deletefn}) => {

  return (
    <>
     <Modal
    visible={deleteModal}
    animationType="fade"
    onRequestClose={()=>setDeleteMoal(false)}
    transparent
  >
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Pressable style={{height: 100, backgroundColor: '#000', opacity: 0.5, position: 'absolute', width: '100%', height: '100%'}} onPress={()=>setDeleteMoal(false)}/>
    <View style={{backgroundColor: '#FFF', borderRadius:5, paddingBottom: 25, paddingTop:10, width: '80%', alignItems: 'center', justifyContent: 'center'}}>
      <Text style={headlineStyle}>Are You Sure</Text>
      <View style={{flexDirection:'row', padding:10,}}>
        <TouchableOpacity style={buttonStyle} onPress={deletefn}>
          <Text style={buttonTextStyle}>Ok</Text>
        </TouchableOpacity>
        <View style={saperator}></View>
        <TouchableOpacity style={buttonStyle} onPress={()=>setDeleteMoal(false)} >
          <Text style={buttonTextStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
      
              
    </View>
   </View>
   </Modal>
    </>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

const saperator = {backgroundColor: '#fff', padding: 10}
const headlineStyle = {padding: 5, paddingBottom: 12, borderBottomWidth:1, borderColor: '#dedede', fontSize: 16, fontWeight: 500, color: '#666666', width: '100%', textAlign: 'center', marginBottom: 15}
const bottomStyle = {flexDirection: 'row', justifyContent: 'space-between'}
const buttonTextStyle = {color: '#fff', fontSize: 14};
const buttonStyle = {backgroundColor: '#33BAD8', flex: 1, alignItems: 'center', justifyContent: 'center', padding:10, borderRadius: 5};

export default DeleteConfirm;
