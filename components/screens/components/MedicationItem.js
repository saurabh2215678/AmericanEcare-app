import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import DeleteConfirm from "./commonComponents/DeleteConfirm"; //DeleteConfirm 0
import { useEffect, useRef, useState } from "react";

const MedicationItem = ({data, deleteMedication, deleting}) =>{
    const [deleteModal, setDeleteMoal] = useState(false); //DeleteConfirm 1

    return(
        <Card style={pahrmecyItemStyle}>
              <DeleteConfirm deleteModal={deleteModal} setDeleteMoal={setDeleteMoal} deletefn={()=>deleteMedication(data.id)}/>
           {/* DeleteConfirm 4 */}
            <View style={wrapperStyle}>
                <View style={starStyle}>
                    <Text>Drug Name : {data['drugs_name']}</Text>
                    <Text>Strength : {data['strength']}</Text>
                </View>
                <View>
                    {deleting === data.id ?
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

export default MedicationItem;
const pahrmecyItemStyle = {paddingHorizontal: 16, paddingVertical: 8, paddingBottom: 10, backgroundColor: '#fff', marginHorizontal: 15, marginBottom: 12, borderRadius: 8}
const wrapperStyle = {flexDirection: 'row'}
const starStyle={flex: 1}