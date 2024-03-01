import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text} from "react-native";

const Radios = ({onChange, value, options}) => {
    const [selected, setSelected] = useState(value);

    useEffect(()=>{
        onChange(selected);
    },[selected]);

    useEffect(()=>{
        setSelected(value);
    },[value]);

    return(
    <View style={{flexDirection: "row"}}>
        {
            options.map((item, index)=>
            <TouchableOpacity key={index} onPress={()=>setSelected(item)} style={ageRadioStyle}>
                <View style={radioStyle}>{(selected === item) && <View style={selectedRadioStyle}></View>}</View>
                <Text style={AgeTextStyle}>{item}</Text>
            </TouchableOpacity>
        )}
        
    </View>
    );
}
export default Radios;
const radioStyle = { height: 15, width: 15, borderRadius: 10, borderWidth: 1, borderColor: '#33BAD8', alignItems: 'center', justifyContent: 'center', }
 const selectedRadioStyle = { height: 9, width: 9, borderRadius: 10, backgroundColor: '#33BAD8', alignItems: 'center', justifyContent: 'center', } 
 const ageRadioStyle = { flexDirection : 'row', alignItems: 'center', marginVertical: 5, marginRight: 8}
 const AgeTextStyle = { marginLeft: 3 }