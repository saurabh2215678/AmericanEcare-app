import { View, Text, TouchableOpacity } from "react-native"
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

const ObgynHistoryItem = ({data, handleUpdate}) =>{
    return(
        <Card style={pahrmecyItemStyle}>
            <View style={wrapperStyle}>
                <View style={starStyle}>

                    <View style={bottomStyle}>
                        <Text style={halfWidth}>Last Period Date</Text>
                        <Text style={notesStyle}>Pregnacy Chance</Text>
                    </View>
                    <View style={bottomStyle}>
                        <Text style={halfWidth}>{data.last_period_date}</Text>
                        <Text style={notesStyle}>{data.pregnacy_change}</Text>
                    </View>
                    <View style={spacer}></View>

                    <View style={bottomStyle}>
                        <Text style={halfWidth}>Medication Confirm</Text>
                        <Text style={notesStyle}>Birth Control Medication</Text>
                    </View>
                    <View style={bottomStyle}>
                        <Text style={halfWidth}>{data.medication_confirm}</Text>
                        <Text style={notesStyle}>{data.birth_control_medication}</Text>
                    </View>
                    <View style={spacer}></View>
                    <Text>Other : {data.other}</Text>
                    
                </View>
                <View style={boxRightStyle}>
                    <TouchableOpacity onPress={()=>handleUpdate(data)}>
                        <Icon name="pencil" size={18} color="#030303" />
                    </TouchableOpacity>
                    
                </View>
            </View>
        </Card>
    )
}

export default ObgynHistoryItem;
const pahrmecyItemStyle = {paddingHorizontal: 16, paddingVertical: 8, paddingBottom: 10, backgroundColor: '#fff', marginHorizontal: 15, marginBottom: 12, borderRadius: 8}
const wrapperStyle = {flexDirection: 'row'}
const starStyle={flex: 1}
const bottomStyle = {flexDirection: 'row', justifyContent: 'space-between'}
const halfWidth = {width:'40%'}
const notesStyle = {width:'60%', paddingLeft: 10}
const boxRightStyle = {alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}
const spacer = {padding: 10}