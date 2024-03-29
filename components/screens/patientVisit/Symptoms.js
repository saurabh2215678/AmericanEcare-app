import { FlatList, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SymptomItem = ({category, subheadings, isChecked, setChecked}) => {
  return(
    <View style={{ marginBottom: 40 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18,marginBottom: 10  }}>{category}</Text>
      {subheadings.map((subheading, index) => (
        <View
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <Checkbox
            style={styles.checkbox}
            value={isChecked.includes(subheading)}
            onValueChange={() =>
              setChecked((prevChecked) =>
                prevChecked.includes(subheading)
                  ? prevChecked.filter((item) => item !== subheading)
                  : [...prevChecked, subheading]
              )
            }
            color={isChecked.includes(subheading) ? "#4630EB" : "red"}
          />
          <Text style={{ fontWeight: "400", marginLeft: 5 }}>
            {subheading}
          </Text>
        </View>
      ))}
    </View>
  );
}

const Symptoms = ({ data }) => {
    
  const [isChecked, setChecked] = useState([]);

  const [listData, setListData] = useState([]);

  useEffect(()=>{
    const keyArray = Object.keys(data);
    const valueArray = Object.values(data);
    const listArray = [];

    for(let i = 0; i < keyArray.length; i++){
      const subheadings = Object.keys(valueArray[i].children);
      var itemObject = {name: keyArray[i], data: subheadings}
      listArray.push(itemObject);
    }
    setListData(listArray);

  },[data]);

  const renderSymptomItem = ({ item }) => {
    return Object.keys(item).map((category) => {
      const subheadings = Object.keys(item[category].children);

      return (
        <View key={category} style={{ marginBottom: 40 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18,marginBottom: 10  }}>{category}</Text>
          {subheadings.map((subheading) => (
            <View
              key={subheading}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Checkbox
                style={styles.checkbox}
                value={isChecked.includes(subheading)}
                onValueChange={() =>
                  setChecked((prevChecked) =>
                    prevChecked.includes(subheading)
                      ? prevChecked.filter((item) => item !== subheading)
                      : [...prevChecked, subheading]
                  )
                }
                color={isChecked.includes(subheading) ? "#4630EB" : "red"}
              />
              <Text style={{ fontWeight: "400", marginLeft: 5 }}>
                {subheading}
              </Text>
            </View>
          ))}
        </View>
      );
    });
  };

 // console.log("setChecked",isChecked);
 //AsyncStorage.setItem("symptoms", isChecked);
 AsyncStorage.setItem("symptoms", JSON.stringify(isChecked));


  return (
    <View style={{ margin: 50 }}>
      {listData.map((item, index) => <SymptomItem key={index} category={item.name} subheadings={item.data} isChecked={isChecked} setChecked={setChecked}/>)}
      {/* <FlatList
        data={[data]}
        renderItem={renderSymptomItem}
        keyExtractor={(item, index) => {
          const category = Object.keys(item)[0];
          return category;
        }}
      /> */}
    </View>
  );
};

export default Symptoms;

const styles = StyleSheet.create({

main_symptoms:{
    backgroundColor: '#ccc',
    padding:10,

  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  section2:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  }

});
