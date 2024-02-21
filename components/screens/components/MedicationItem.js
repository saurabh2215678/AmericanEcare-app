import { View, Text, TouchableOpacity } from "react-native"
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

const MedicationItem = ({data}) =>{
    return(
        <Card style={pahrmecyItemStyle}>
            <Text>Medication Name: </Text>
            <View style={wrapperStyle}>
                <View style={starStyle}>
                    <Text>Address : </Text>
                    <Text>Zip : </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>{}}>
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