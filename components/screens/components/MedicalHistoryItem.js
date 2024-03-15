import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect, useRef, useState } from "react";
import DeleteConfirm from "./commonComponents/DeleteConfirm"; //DeleteConfirm 0

const MedicalHistoryItem = ({data, handleUpdate, handleDelete, deleting}) =>{
    const [deleteModal, setDeleteMoal] = useState(false); //DeleteConfirm 1
    const [deleteLoading, setDeleteLoading] = useState(false);
    useEffect(()=>{
        if(!deleteModal){
          setDeleteLoading(false)
        }
      },[deleteModal]) //DeleteConfirm 2


    return(
        <Card style={pahrmecyItemStyle}>
             <DeleteConfirm deleteModal={deleteModal} setDeleteMoal={setDeleteMoal} deletefn={()=>handleDelete(data.id)}/>
            <View style={wrapperStyle}>
                <View style={starStyle}>
                    <Text>{data.illness}</Text>
                    <View style={bottomStyle}>
                        <Text style={halfWidth}>{data.onset_age}</Text>
                        <Text style={halfWidth}>{data.comment}</Text>
                    </View>
                </View>
                <View style={boxRightStyle}>
                    <TouchableOpacity onPress={()=>handleUpdate(data)}>
                        <Icon name="pencil" size={18} color="#030303" />
                    </TouchableOpacity>
                    {deleting === data.id ?
                    <TouchableOpacity style={{marginLeft: 12}} onPress={()=>{}}>
                        <ActivityIndicator size="small" color="red" />
                    </TouchableOpacity>:
                    <TouchableOpacity style={{marginLeft: 12}} onPress={()=>setDeleteMoal(true)}>
                        <Icon name="trash" size={18} color="red" />
                    </TouchableOpacity>}
                </View>
            </View>
        </Card>
    )
}

export default MedicalHistoryItem;
const pahrmecyItemStyle = {paddingHorizontal: 16, paddingVertical: 8, paddingBottom: 10, backgroundColor: '#fff', marginHorizontal: 15, marginBottom: 12, borderRadius: 8}
const wrapperStyle = {flexDirection: 'row'}
const starStyle={flex: 1}
const bottomStyle = {flexDirection: 'row', justifyContent: 'space-between'}
const halfWidth = {width:'42%'}
const boxRightStyle = {alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}