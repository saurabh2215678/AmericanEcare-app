import { View, Text, TouchableOpacity } from "react-native"
import { Card } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import { downloadFile } from "../../../utils";


const DocumentItem = ({data}) =>{

    return(
        <Card style={pahrmecyItemStyle}>
            <View style={wrapperStyle}>
                <View style={starStyle}>
                    <Text>Lab Result</Text>
                    {data.lab_result_doc && <TouchableOpacity onPress={()=>downloadFile(data.lab_result_doc)}>
                        <Text style={downloadbtnStyle}>Download</Text>
                    </TouchableOpacity>}
                    
                    <Text>Lab Image</Text>
                    {data.lab_pic && <TouchableOpacity onPress={()=>downloadFile(data.lab_pic)}>
                        <Text style={downloadbtnStyle}>Download</Text>
                    </TouchableOpacity>}
                    
                    <Text>Other Medical Document</Text>
                    {data.other_doc && <TouchableOpacity onPress={()=>downloadFile(data.other_doc)}>
                        <Text style={downloadbtnStyle}>Download</Text>
                    </TouchableOpacity>}
                </View>
            </View>
        </Card>
    )
}

export default DocumentItem;
const pahrmecyItemStyle = {paddingHorizontal: 16, paddingVertical: 8, paddingBottom: 10, backgroundColor: '#fff', marginHorizontal: 15, marginBottom: 12, borderRadius: 8}
const wrapperStyle = {flexDirection: 'row'}
const starStyle={flex: 1}
const boxRightStyle = {alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}
const downloadbtnStyle = {color: "#1c8da6"}