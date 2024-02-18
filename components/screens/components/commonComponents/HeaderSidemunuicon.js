import React from "react";
import { View, TouchableOpacity} from "react-native";
import IconE from 'react-native-vector-icons/EvilIcons';
import Styles from '../../styles/CommonStyle/Style';
import { useSelector } from "react-redux";

const NavigationDrawerStructure = (props) => {
  const { colorrdata } = useSelector(state => state.commonReducer) || {};
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };
  return (
    <View style={Styles.sethederwidth}>
      <View style={Styles.dravermarginright}>
        <View style={Styles.hometoggleflexsetview}>
          <TouchableOpacity onPress={() => toggleDrawer()}>
            <IconE style={Styles.marginrighthome}  color={colorrdata}  name="navicon"  size={35} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default NavigationDrawerStructure;