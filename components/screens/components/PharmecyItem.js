import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import DeleteConfirm from "./commonComponents/DeleteConfirm"; //DeleteConfirm 0
import { useEffect, useRef, useState } from "react";


const PharmecyItem = ({data,  handleDelete, deleting}) =>{
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
           {/* DeleteConfirm 4 */}
            <Text>Pharmacy Name:{data.pharmacy_name}</Text>
            <View style={wrapperStyle}>
                <View style={starStyle}>
                    <Text>Address : {data['pharmacy_address']}</Text>
                    <Text>Zip : {data['patient_pharmacy_zip']}</Text>
                </View>
                
                <View>
                {deleteLoading ?
                    <TouchableOpacity style={{marginLeft: 12}} onPress={()=>{}}>
                        <ActivityIndicator size="small" color="red" />
                    </TouchableOpacity>:
                    <TouchableOpacity onPress={()=>setDeleteMoal(true)}>
                        <Icon name="trash" size={20} color="red" />
                    </TouchableOpacity>}
                </View>
            </View>
        </Card>
    )
}

export default PharmecyItem;
const pahrmecyItemStyle = {paddingHorizontal: 16, paddingVertical: 8, paddingBottom: 10, backgroundColor: '#fff', marginHorizontal: 15, marginBottom: 12, borderRadius: 8}
const wrapperStyle = {flexDirection: 'row'}
const starStyle={flex: 1}
const lastStyle={alignItems: 'flex-end'}
