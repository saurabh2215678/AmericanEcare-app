import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const NavigationItem = ({data}) => {
    const navigation = useNavigation();

    const [isOpen, setIsOpen] = useState(false);

    return(
        <View>
            <TouchableOpacity 
                onPress={ data.navigateTo ? 
                          ()=>navigation.navigate(data.navigateTo) : 
                          () =>setIsOpen(!isOpen)
                        }
                >
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 13, paddingVertical: 10}}>
                        <Icon style={{width: 25, textAlign: 'center'}} name={data.icon} size={23} color="#248A24" />
                        <Text style={{fontSize: 15, fontWeight: 500, marginLeft: 9}}>{data.name}</Text>
                    </View>
            </TouchableOpacity>
            {(isOpen && data.submenu) &&
                <View style={{paddingTop: 6, paddingBottom:16 }}>
                    <View style={{borderTopWidth: 1, borderColor: '#dfdfdf'}}>
                    {data.submenu.map((item, id) => 
                        <TouchableOpacity key={id} onPress={() => item.navigateTo ? navigation.navigate(item.navigateTo) : ''}>
                                <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 3, borderBottomWidth: 1, borderColor: '#dfdfdf'}}>
                                    <Icon style={{width: 25, textAlign: 'center'}} name={item.icon} size={23} color="#40B0C6" />
                                    <Text style={{fontSize: 15, fontWeight: 400, marginLeft: 9}}>{item.name}</Text>
                                </View>
                        </TouchableOpacity>
                    )}
                    </View>
                </View>
            }
        </View>
    )
}

export default NavigationItem;