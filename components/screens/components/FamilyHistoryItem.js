import { View, Text, TouchableOpacity } from "react-native"
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

const FamilyHistoryItem = ({data, handleUpdate, handleDelete}) =>{
    // console.log('iiiittttmmmm ====', data);
    return(
        <Card style={pahrmecyItemStyle}>
            <View style={wrapperStyle}>
                <View style={starStyle}>
                    <Text>{data.member}</Text>
                    <View style={bottomStyle}>
                        <Text style={halfWidth}>{data.illness}</Text>
                        <Text style={halfWidth}>{data.onset_age}</Text>
                    </View>
                </View>
                <View style={boxRightStyle}>
                    <TouchableOpacity onPress={()=>handleUpdate(data)}>
                        <Icon name="pencil" size={18} color="#030303" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 12}} onPress={()=>handleDelete(data.id)}>
                        <Icon name="trash" size={18} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    )
}

export default FamilyHistoryItem;
const pahrmecyItemStyle = {paddingHorizontal: 16, paddingVertical: 8, paddingBottom: 10, backgroundColor: '#fff', marginHorizontal: 15, marginBottom: 12, borderRadius: 8}
const wrapperStyle = {flexDirection: 'row'}
const starStyle={flex: 1}
const bottomStyle = {flexDirection: 'row', justifyContent: 'space-between'}
const halfWidth = {width:'42%'}
const boxRightStyle = {alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}