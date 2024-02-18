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
    width: '90%',
    height:'100%',
    marginHorizontal: '5%',
  },
  minflexview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingBottom:200,
    paddingTop:5,
  },
  settextinputwidth: {
    backgroundColor:'white',
    borderRadius:7,
    paddingBottom:100,
    paddingLeft:10,
    paddingRight:10,
    color:'gray',
    fontFamily:Fonts.Poppins_Medium,
  },
  settextinputtext: {
    fontFamily:Fonts.Poppins_Medium,
    color:'gray',
    fontSize:16,
    marginTop:20,
  },
  setbuttonstyle: {
    position:'absolute',
    bottom:0,
    width:'100%',
    paddingHorizontal:20,
    paddingBottom:5,
  }
});
