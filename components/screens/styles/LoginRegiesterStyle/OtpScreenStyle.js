
import { StyleSheet } from 'react-native';
import { Fonts,colorsset } from '../../utils';


export default StyleSheet.create({
  paregraphotpbottom: {
    color: 'gray',
    //fontFamily: Fonts.Poppins_Medium,
    fontSize: 13,
    marginBottom: '8%',
    marginRight: 10,
  },
  minstyleviewphotograpgy: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  keybordtopviewstyle: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minviewsigninscreen: {
    width: '90%',
    marginHorizontal: '5%',
    marginTop: '5%',
  },
  minflexview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  paregraph: {
    color: 'hsl(0, 0%, 31.4%)',
    //fontFamily: Fonts.Poppins_Medium,
    fontSize: 11,
  },

  textInputContainer: {
    marginTop: '5%',
  },
  roundedTextInput: {
    borderWidth: 4,
    color: 'grey',
  },
  signuptextview: {
    textAlign: 'center',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 12,
    paddingLeft: 5,
    paddingRight: 5,
  },
  signintextset: {
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 15,
    color: 'hsl(216.8, 90.7%, 38%)',
    //fontFamily: 'DMSans-Bold',
  },
  
  otpStyle: {
    width: '100%',
    height: 65,
    alignSelf: 'center',
  },
  accountbutton: {
    width: '100%',
    marginBottom: 15,
  },
  buttonset: {
    borderWidth: 1,
    borderColor: 'hsl(216.8, 90.7%, 38%)',
    backgroundColor: 'hsl(216.8, 90.7%, 38%)',
    width: '100%',
    borderRadius: 7,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTextStyleSignWithNumber: {
    color: 'hsl(216.8, 90.7%, 38%)',
    //fontFamily: 'DMSans-Bold',
    fontSize: 18,
  },
  buttonTextStyleSignWithNumber2: {
    color: 'white',
    //fontFamily: 'DMSans-Bold',
    fontSize: 18,
  },
  buttonTextStyleSignWithNumbermodal: {
    color: 'white',
    //fontFamily: 'DMSans-Bold',
    fontSize: 18,
  },
  buttonTextStyleSignWithNumber2modasl: {
    color: 'hsl(216.8, 90.7%, 38%)',
    //fontFamily: 'DMSans-Bold',
    fontSize: 18,
  },
  resendtextbold: {
    fontFamily: 'DMSans-Bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'gray',
    opacity: Platform.OS === 'ios' ? 1 : 0.9,
  },
  icomvlose: {
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    top: -15,
    left: -12,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 7,
    width: '90%',
    shadowColor: "#000",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  setshadowstylemodaltwo: {
    backgroundColor: "white",
    paddingTop: 1.5,
    paddingBottom: 1.5,
    borderRadius: 177,
    width: '99%',
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
    textAlign: "center"
  },
  modalText: {
    textAlign: "center",
    color: 'black',
    fontSize: 22,
    fontWeight: '700',
    marginTop: -10,
  },
  togglrswitchflex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  bordersetchekicon: {
    borderWidth: 2,
    borderRadius: 222,
    borderColor: 'hsl(214.3, 83.2%, 51%)',
    height: 80,
    width: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpsuccessfulltextmodal: {
    color: 'black',
    fontSize: 20,
    //fontFamily: 'DMSans-Medium',
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center'
  },
  flexrowsettext: {
    flexDirection: 'row',
  },
  buttonsetmoddletwobutton: {
    marginBottom: 20,
    marginTop: 10,
    width: '50%',
    marginHorizontal: '25%'
  },
  icomcloseset: {
    marginTop: 7,
    position: 'relative',
    top: 20,
  },
  flexrowjusticenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 10,
  },
  logoimage: {
    height: 150,
    width: 150,
  },
  entersixdigittext: {
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 15,
    color: colorsset.theme_backgound,
   // fontFamily: Fonts.Poppins_Medium,
  },
  otpvistyleset:{
    width: '100%', 
    height: 100 
  },
  otpinstyletype: {
    width: 50,
    height: 61,
    borderWidth: 2.5,
    fontSize: 28,
    fontWeight: '700',
    borderRadius: 7,
  },
  otpheightstyle: {
    borderWidth: 2.5,
    fontSize: 28,
    fontWeight: '700',
    borderRadius: 7,
  }
});
