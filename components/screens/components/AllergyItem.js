import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

const AllergyItem = ({data, deleteAllergy, deleting}) =>{
    return(
        <Card style={pahrmecyItemStyle}>
            <View style={wrapperStyle}>
                <View style={starStyle}>
                    <Text>{data.medical_allergies}</Text>
                    <Text>{data.severity_name}</Text>
                    <View style={bottomStyle}>
                        <Text style={halfWidth}>{data.reaction_type}</Text>
                        <Text style={halfWidth}>{data.notes}</Text>
                    </View>
                </View>
                <View>
                    {deleting === data.id ? 
                    <TouchableOpacity style={{marginLeft: 12}} onPress={()=>{}}>
                        <ActivityIndicator size="small" color="red" />
                    </TouchableOpacity>:
                    <TouchableOpacity onPress={()=>deleteAllergy(data.id)}>
                        <Icon name="trash" size={20} color="red" />
                    </TouchableOpacity>}
                </View>
            </View>
        </Card>
    )
}

export default AllergyItem;
const pahrmecyItemStyle = {paddingHorizontal: 16, paddingVertical: 8, paddingBottom: 10, backgroundColor: '#fff', marginHorizontal: 15, marginBottom: 12, borderRadius: 8}
const wrapperStyle = {flexDirection: 'row'}
const starStyle={flex: 1}
const bottomStyle = {flexDirection: 'row', justifyContent: 'space-between'}
const halfWidth = {width:'42%'}