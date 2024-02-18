import { StyleSheet } from 'react-native';
import { SH, Fonts, ColorTheme, } from '../../utils';
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
    paddingBottom:40,
  },
  minstyleviewphotograpgy: {
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent: 'center',
    height: '100%',
    marginTop:20,
  },
  setwhitebox: {
    backgroundColor: 'white',
    borderRadius:7,
    padding:10,
    marginBottom:15,
  },
  imagsetstyle: {
    width: 85,
    height: 85,
    borderRadius:7,
  },
  flexrowsetimage: {
    flexDirection:'row',
  },
  imagecenterstylesetminview: {
    width:80,
  },
  imagecenterstyle: {
    flexDirection:'row',
    justifyContent:'center'
  },
  textsetdoctore: {
    fontSize: 12,
    paddingTop:7,
    textAlign:'center',
    fontFamily: Fonts.Poppins_Medium,
  },
  textsetdoctoretwo: {
    color: 'gray',
    fontSize: 12,
    paddingTop:3,
    fontFamily: Fonts.Poppins_Medium,
  },
  blackcolorsettext: {
    color:'black'
  },
  flexrowsettextview: {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingBottom:3,
    paddingTop:1,
  },
  setwidthgstar: {
    width:'100%',
    flexDirection:'row',
    justifyContent:'flex-start'
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
    fontFamily: Fonts.Poppins_Medium,
  },
  setimagetopspace: {
    flexDirection:'row',
    marginBottom:20,
    justifyContent:'space-between',
    paddingHorizontal:20,
  },
  margintopspaceset: {
    marginTop:30,
  }
});