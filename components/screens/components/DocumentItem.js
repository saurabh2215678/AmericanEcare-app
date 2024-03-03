import { View, Text, TouchableOpacity } from "react-native"
import { Card } from "react-native-paper";
import { downloadFile } from "../../../utils";


const DocumentItem = ({data}) =>{

    return(
        <Card style={pahrmecyItemStyle}>
            <View style={wrapperStyle}>
                <View style={starStyle}>
                    <View style={{flexDirection: "row", width: "100%", marginBottom: 5}}>
                        <View style={{flex: 1}}>
                            <Text>Lab Result</Text>
                            {data.lab_result_doc && <TouchableOpacity onPress={()=>downloadFile(data.lab_result_doc)}>
                                <Text style={downloadbtnStyle}>Download</Text>
                            </TouchableOpacity>}
                        </View>
                        <View style={{flex: 1}}>
                            <Text>Lab Image</Text>
                            {data.lab_pic && <TouchableOpacity onPress={()=>downloadFile(data.lab_pic)}>
                                <Text style={downloadbtnStyle}>Download</Text>
                            </TouchableOpacity>}
                        </View>
                    </View>
                    
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
const downloadbtnStyle = {color: "#1c8da6"}