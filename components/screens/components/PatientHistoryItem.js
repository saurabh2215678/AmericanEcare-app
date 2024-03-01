import { View, Text, TouchableOpacity } from "react-native"
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

const PatientHistoryItem = ({data, handleUpdate}) =>{
    return(
        <Card style={pahrmecyItemStyle}>
            <View style={wrapperStyle}>
                <View style={starStyle}>

                    <View style={bottomStyle}>
                        <Text style={halfWidth}>Did you use tobacco?</Text>
                        <Text style={notesStyle}>Notes:</Text>
                    </View>
                    <View style={bottomStyle}>
                        <Text style={halfWidth}>{data.use_tobacco}</Text>
                        <Text style={notesStyle}>{data.tobacco_notes}</Text>
                    </View>
                    <View style={spacer}></View>

                    <View style={bottomStyle}>
                        <Text style={halfWidth}>Did you use alcohol?</Text>
                        <Text style={notesStyle}>Notes:</Text>
                    </View>
                    <View style={bottomStyle}>
                        <Text style={halfWidth}>{data.use_alcohal}</Text>
                        <Text style={notesStyle}>{data.alcohal_notes}</Text>
                    </View>
                    <View style={spacer}></View>

                    <View style={bottomStyle}>
                        <Text style={halfWidth}>Did you use recreational drugs?</Text>
                        <Text style={notesStyle}>Notes:</Text>
                    </View>
                    <View style={bottomStyle}>
                        <Text style={halfWidth}>{data.use_recreational_drugs}</Text>
                        <Text style={notesStyle}>{data.drugs_notes}</Text>
                    </View>
                    <View style={spacer}></View>

                    <View style={bottomStyle}>
                        <Text style={halfWidth}>Recent travel out of country?</Text>
                        <Text style={notesStyle}>Notes:</Text>
                    </View>
                    <View style={bottomStyle}>
                        <Text style={halfWidth}>{data.travel_out_of_country}</Text>
                        <Text style={notesStyle}>{data.out_country_notes}</Text>
                    </View>
                    
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

export default PatientHistoryItem;
const pahrmecyItemStyle = {paddingHorizontal: 16, paddingVertical: 8, paddingBottom: 10, backgroundColor: '#fff', marginHorizontal: 15, marginBottom: 12, borderRadius: 8}
const wrapperStyle = {flexDirection: 'row'}
const starStyle={flex: 1}
const bottomStyle = {flexDirection: 'row', justifyContent: 'space-between'}
const halfWidth = {width:'50%'}
const notesStyle = {width:'50%', paddingLeft: 12}
const boxRightStyle = {alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'row'}
const spacer = {padding: 10}