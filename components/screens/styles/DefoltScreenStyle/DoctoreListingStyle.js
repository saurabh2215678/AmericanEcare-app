import { StyleSheet } from 'react-native';
import { SH, Fonts, ColorTheme, colorsset, } from '../../utils';
export default StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: ColorTheme.sp_Theme,
  },
  minviewallcontent: {
    width:'100%',
    paddingHorizontal:10,
    paddingBottom:120,
  },
  minstyleviewphotograpgy: {
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor:colorsset.theme_backgound_second,
  },
  setwhitebox: {
    backgroundColor: 'white',
    width:'100%',
    borderRadius:7,
    padding:10,
    marginBottom:8,
  },
  imagsetstyle: {
    width: 70,
    height: 70,
    borderRadius:7,
  },
  flexrowsetimage: {
    flexDirection:'row',
  },
  imagecenterstyle: {
    marginRight:10,
    width:'23%',
  },
  imagecenterstyleset: {
    width:'77%',
  },
  textsetdoctore: {
    fontSize: 15,
    // fontFamily: Fonts.Poppins_Bold,
  },
  textsetdoctoretwo: {
    color: 'gray',
    fontSize: 12,
    // fontFamily: Fonts.Poppins_Medium,
  },
  setwidth: {
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingRight:17,
  },
  blackcolorsettext: {
    color:'black'
  },
  flexrowsettextview: {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingBottom:3,
    paddingTop:1,
    width:'100%',
  },
  setwidthgstar: {
    flexDirection:'row',
    justifyContent:'flex-end',
    paddingRight:15,
  },
  bgcolorsetwhitetextinput: {
    backgroundColor:'white',
    borderRadius:100,
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:10,
    height:50,
    marginBottom:20,
  },
  paddibnglefttextstyle: {
    paddingLeft:10,
    color: 'gray',
    width:260,
    padding:0,
    fontSize: 15,
    // fontFamily: Fonts.Poppins_Medium,
  }
});