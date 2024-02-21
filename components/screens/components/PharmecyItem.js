import { View, Text } from "react-native"
import { Card } from "react-native-paper";

const PharmecyItem = () =>{
    return(
        <Card style={pahrmecyItemStyle}>
            <View><Text>Hello Item</Text></View>
        </Card>
    )
}

export default PharmecyItem;
const pahrmecyItemStyle = {paddingHorizontal: 16, paddingVertical: 8, paddingBottom: 10, backgroundColor: '#fff', marginHorizontal: 15, marginBottom: 12, borderRadius: 8}