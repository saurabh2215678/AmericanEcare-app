import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts, ColorTheme, Strings, heightPercent, widthPercent } from '../../utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: ColorTheme.sp_Theme,
  },
  smaili: {
    width: SH(110),
    height: SH(110),
  },
  setstyleinputtext:  {
    backgroundColor:'white',
    paddingLeft:15,
    paddingRight:15,
    borderRadius:7,
    paddingTop:5,
    paddingBottom:5,
  },
  
  minviewsigninscreen: {
    width:'90%',
    marginHorizontal:'5%',  
  },
  inputstyle: {
    padding:0,
    color:'black',
    width:200,
    //fontFamily: Fonts.Poppins_Medium,
  },
  textstyle: {
    color:'gray',
    //fontFamily: Fonts.Poppins_Medium,
  },
  creditcard: {
    height:100,
    width:100,
    borderRadius:7,
  },
  minflexview: {
    width:'90%',
    marginHorizontal:'5%',  
  },
  imagetextflex: {
    flexDirection:'row'
  },
  setimagewidth: {
    marginRight:15,
  },
  settextstyle: {
    fontSize:17,
    fontWeight:'600',
    opacity:0.9,
    //fontFamily: Fonts.Poppins_Medium,
  },
  colorblack: {
    color:'black',
  },
  textcolorgray: {
    color:'black',
    fontSize:17,
    fontWeight:'600',
    opacity:0.9,
    paddingTop:14,
    //fontFamily: Fonts.Poppins_Medium,
  },
  setwhitecolor: {
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:15,
    paddingRight:15,
    borderRadius:7,
    paddingTop:12,
    paddingBottom:12,
    marginTop:25,
    alignItems:'center'
  },
  setstartext: {
    color:'gray',
    fontSize:17,
    fontWeight:'600',
    opacity:0.9,
    //fontFamily: Fonts.Poppins_Medium,
  },
  flexrowiocn: {
   flexDirection:'row',
   alignItems:'center',
   alignItems:'center'
  },
  flexrowiocntwo: {
    flexDirection:'row',
    alignItems:'center',
    alignItems:'center',
    marginTop:20,
  },
  setpositionicon: {
    position:'relative',
    top:-2,
  },
  setapplyacoupon: {
    color:'black',
    fontSize:17,
    fontWeight:'600',
    opacity:0.9,
    //fontFamily: Fonts.Poppins_Medium,
  },
  flexdierationtext: {
    flexDirection:'row',
   justifyContent:'space-between',
    marginBottom:15,
  },
  flexdierationtextwo: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:15,
    borderTopWidth:1,
    paddingTop:15
  },
  margintopset: {
    marginTop:'50%'
  },
  textcolorblack: {
    color:'black',
    fontSize:17,
    fontWeight:'600',
    //fontFamily: Fonts.Poppins_Medium,
  },
  textcolorblacktwo: {
    color:'black',
    fontSize: 20,
    fontWeight:'600',
    //fontFamily: Fonts.Poppins_Medium,
  },
  textcolorgrays: {
    color:'black',
    fontSize:17,
    fontWeight:'700',
    //fontFamily: Fonts.Poppins_Medium,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
   
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 7,
    shadowColor: "#000",
    paddingBottom:0,
    paddingLeft:15,
    paddingRight:15,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:'95%'
  },
  setbgcolorgrsay: {
    backgroundColor:'gray',
    height:'100%',
    alignItems:'center',
    flexDirection:'row',
    opacity:0.9,
},
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22,
},
closeIcon: {
  position: 'absolute',
  right: 15,
  top: 16,
  height: 40,
  width: 40,
  backgroundColor: '#046665',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 7,
},
setbutton: {
  paddingTop:20,
  paddingBottom:0,
},
iconclosestyle: {
  color: 'white',
  paddingBottom: 3,
},
});