import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'gray',
    opacity:0.9  ,
  },
  centeredViewtwo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 7,
  paddingHorizontal:5.7,
    paddingBottom:30,
    alignItems: "center",
    width:'92%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  setheight: {
    height:300,
  },
  setbuttonwidth :{
      paddingTop:30,
      width:'100%'
  },
  setcolorwhite: {
    color:'white',
    paddingTop:15,
    paddingLeft:15,
    fontSize:20,
  },
  colorpickerpickerimagwidth: {
    width:30,
    height:30,
    marginRight:10,
  }
});