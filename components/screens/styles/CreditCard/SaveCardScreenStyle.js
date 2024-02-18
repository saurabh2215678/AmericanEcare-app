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
  setstyleinputtexttwo:  {
    backgroundColor:'white',
    paddingLeft:15,
    paddingRight:15,
    borderRadius:7,
    paddingTop:5,
    paddingBottom:5,
    width:'48%',
    marginRight:15,
    marginTop:18,
  },
  minviewsigninscreen: {
    width:'90%',
    marginHorizontal:'5%',  
  },
  inputstyle: {
    padding:0,
    color:'black',
    width:200,
    // fontFamily: Fonts.Poppins_Medium,
  },
  
  textstyle: {
    color:'black',
    // fontFamily: Fonts.Poppins_Medium,
  },
  flexrowsetcemera: {
    flexDirection:'row',
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between'
  },
  flexrowsetinput: {
    flexDirection:'row',
  },
  setbuttonstyle: {
    marginTop:26,
  },
  setwidthimage: {
    height:230,
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
    marginTop:10,
  },
  creditcard: {
    height:210,
    flexDirection:'row',
    justifyContent:'center',
    width:420,
  },
  minstyleviewphotograpgy: {
    flexDirection:'row',
    paddingBottom:70,
    justifyContent:'center',
    height:'100%'
},
});