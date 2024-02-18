import { SH, Fonts, ColorTheme, colorsset} from '../../utils';
import { StyleSheet, Dimensions, Platform } from 'react-native';

export default StyleSheet.create({

  minstyleviewphotograpgy: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor:colorsset.theme_backgound_second,
  },
  keybordtopviewstyle: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minviewsigninscreen: {
    width: '100%',
    height:'100%',
    paddingBottom:100,
  },
  logoimage: {
    width:'100%',
    height:300,
  },
  setbgwhitecolor: {
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:10,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:10,
    marginHorizontal:5,
    borderRadius:100,
    marginTop:-40,
  },
  flexrowtextset: {
    flexDirection:'row',
    alignItems:'center',
  },
  seticonbgcolor: {
    backgroundColor:colorsset.theme_backgound_second,
    width:60,
    height:60,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:100,
    marginRight:10,
  },
  simpltextstyle: {
    fontSize:17,
    fontFamily:Fonts.Poppins_Medium,
    color:colorsset.theme_backgound,
  },
  patintstextser: {
    fontSize:13,
    fontFamily:Fonts.Poppins_Medium,
    color:'gray',
    position:'relative',
    top:-5,
  },
  toptospacetextview: {
    position:'relative',
    top:5,
  },
  setviewallcontent: {
    paddingLeft:20,
    paddingRight:10,
    paddingTop:20,
  },
  doctotertextset: {
    fontSize:17,
    fontFamily:Fonts.Poppins_Medium,
    color:colorsset.theme_backgound,
  },
  doctotertextheart: {
    fontSize:15,
    fontFamily:Fonts.Poppins_Medium,
    color:'gray',
  },
  setstarview: {
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop:-7,
    marginBottom:10,
  },
  doctotertextsettwo: {
    fontSize:17,
    fontFamily:Fonts.Poppins_Medium,
    color:'gray',
    marginLeft:10,
    marginTop:5,
  },
  settopspace: {
   paddingTop:10,
   paddingBottom:10,
    borderTopWidth:1,
    borderStyle:'dashed',
    borderTopColor:'gray',
  },
  setbgcolorwhitebottombox: {
    backgroundColor:'white',
    position:'absolute',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop:15,
    paddingHorizontal:14,
    bottom:0,
    width:'100%'
  },
  setbuttonwidth: {
    width:'70%'
  },
  setbottomiconview: {
    position:'relative',
    top:-7,
  }
});
