
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { SF, SH, SW, Fonts, ColorTheme, colorsset,Strings, widthPercent, colorssetset } from '../../utils';

export default StyleSheet.create({
  minstyleviewphotograpgy: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor:colorsset.theme_backgound_second,
  },
  minviewsigninscreen: {
    width: '100%',
    // marginHorizontal: '5%',
  },
 
  minflexview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  whiteboxshadow: {
    height:254,
    width:'100%',
    overflow:'hidden',
    borderBottomRightRadius:30,
    flexDirection:'row',
    alignItems:'center',
    borderBottomLeftRadius:30,
    backgroundColor:'white',
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: {
      width: 345,
      height: Platform.OS === 'ios' ? 2 : 25,
    },
    shadowOpacity: 0.58,
    shadowRadius: Platform.OS === 'ios' ? 2 : 25,
    elevation: Platform.OS === 'ios' ? 1 : 2,
  },
  setimagviewlogin: {
    width:'100%',
    flexDirection:'row',
    justifyContent:'center'
  },
  imagesetus: {
    width:100,
    height:100,
    borderRadius:100,
  },
  bgcolortabset: {
  justifyContent:'space-between',
    position:'absolute',
    bottom:10,
    width:'100%',
    flexDirection:'row',
    paddingHorizontal:62,
  },
  tabsettext: {
    fontSize:18,
    fontWeight:'700',
    fontFamily:Fonts.Poppins_Bold,
  },
  bordersetactive: {
    position: 'absolute',
    height: Platform.OS === 'ios' ? 3 : 3,
    width: 100,
    left:Platform.OS === 'ios' ? 20 : 40,
    top: Platform.OS === 'ios' ? -3 : -3,
    borderRadius:40,
},
bordersetactivetwo: {
  position: 'absolute',
  height: Platform.OS === 'ios' ? 3 : 3,
  width: 130,
  top: Platform.OS === 'ios' ? -3 : -3,
  right: Platform.OS === 'ios' ? 60 : 45,
  borderRadius:40,
},
paddingbottom: {
  paddingBottom:10,
},
// forget password 
setpatintlogin: {
  fontSize: 25,
  // color: colorsset.theme_backgound,
  fontWeight: '700',
  textAlign:'center',
  marginTop:25,
  marginBottom:20,
  fontFamily: Fonts.Metropolis_Medium,
},
});
