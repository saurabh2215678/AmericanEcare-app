import { View, Text, TouchableOpacity } from "react-native"
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

const MedicalHistoryItem = ({data}) =>{
    return(
        <Card style={pahrmecyItemStyle}>
            <View style={wrapperStyle}>
                <View style={starStyle}>
                    <Text>data1</Text>
                    <Text>data2</Text>
                    <View style={bottomStyle}>
                        <Text style={halfWidth}>data3</Text>
                        <Text style={halfWidth}>data4</Text>
                    </View>
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

export default MedicalHistoryItem;
const pahrmecyItemStyle = {paddingHorizontal: 16, paddingVertical: 8, paddingBottom: 10, backgroundColor: '#fff', marginHorizontal: 15, marginBottom: 12, borderRadius: 8}
const wrapperStyle = {flexDirection: 'row'}
const starStyle={flex: 1}
const bottomStyle = {flexDirection: 'row', justifyContent: 'space-between'}
const halfWidth = {width:'42%'}