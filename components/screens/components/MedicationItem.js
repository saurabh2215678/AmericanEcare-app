import { View, Text, TouchableOpacity } from "react-native"
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

const MedicationItem = ({data, deleteMedication}) =>{
    return(
        <Card style={pahrmecyItemStyle}>
            <View style={wrapperStyle}>
                <View style={starStyle}>
                    <Text>Drug Name : {data['drugs_name']}</Text>
                    <Text>Strength : {data['strength']}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>deleteMedication(data.id)}>
                        <Icon name="trash" size={20} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    )
}

export default MedicationItem;
const pahrmecyItemStyle = {paddingHorizontal: 16, paddingVertical: 8, paddingBottom: 10, backgroundColor: '#fff', marginHorizontal: 15, marginBottom: 12, borderRadius: 8}
const wrapperStyle = {flexDirection: 'row'}
const starStyle={flex: 1}