import { View, Text, TouchableOpacity } from "react-native"
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

const PastsurgeryItem = ({data}) =>{
    return(
        <Card style={pahrmecyItemStyle}>
            <Text>Surgery Name: xxx {data.surgery_name}</Text>
            <View style={wrapperStyle}>
                <View style={starStyle}>
                    <Text>Surgery : {data['pharmacy_address']}</Text>
                    <Text>Zip : {data['patient_pharmacy_zip']}</Text>
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

export default PastsurgeryItem;
const pahrmecyItemStyle = {paddingHorizontal: 16, paddingVertical: 8, paddingBottom: 10, backgroundColor: '#fff', marginHorizontal: 15, marginBottom: 12, borderRadius: 8}
const wrapperStyle = {flexDirection: 'row'}
const starStyle={flex: 1}
const lastStyle={alignItems: 'flex-end'}
