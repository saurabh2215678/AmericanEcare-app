
import { StyleSheet, Dimensions,Platform } from 'react-native';
import { SH, Fonts, ColorTheme,} from '../../utils';

export default StyleSheet.create({
  minstyleviewphotograpgy: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  minstyleviewphotograpgytwo: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
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
  },
  minflexview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  inputUnderLine: {
    backgroundColor: 'white',
    width: '100%',
    color:'black',
    borderRadius: 7,
    shadowColor: "black",
    shadowColor: "black",
    fontFamily: 'DMSans-Medium',
    flexDirection:'row',
    justifyContent:'center',
    paddingLeft: 12,
    height:50,
    marginBottom: 12,
    paddingRight: 15,
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 2 : 25,
    },
    shadowOpacity: 0.58,
    shadowRadius: Platform.OS === 'ios' ? 2 : 25,
    elevation: Platform.OS === 'ios' ? 1 : 2,
  },
  inputUnderLinereviews: {
    backgroundColor: 'white',
    width: '100%',
    color:'black',
    borderRadius: 7,
    shadowColor: "black",
    fontFamily: 'DMSans-Medium',
    paddingLeft: 12,
    marginBottom: 12,
    paddingTop:20,
    paddingBottom:20,
    paddingRight: 15,
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 2 : 25,
    },
    shadowOpacity: 0.58,
    shadowRadius: Platform.OS === 'ios' ? 2 : 25,
    elevation: Platform.OS === 'ios' ? 1 : 2,
  },
  textpassworedsert: {
    color: "black",
    fontFamily: 'DMSans-Medium',
    width:'80%',
  },
  inputspaceset: {
    marginTop: '8%'
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
    paddingBottom: 15,
    paddingLeft: 5,
    color: 'hsl(216.8, 90.7%, 38%)',
    fontFamily: 'DMSans-Bold',
    textAlign:'center'
  },

  accountbutton: {
    width: '100%',
    marginTop: 10,
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
    backgroundColor: 'white',
    color: 'hsl(216.8, 90.7%, 38%)',
    fontFamily: 'DMSans-Bold',
    fontSize: 18,
  },
  buttonTextStyleSignWithNumber2: {
    color: 'white',
    fontFamily: 'DMSans-Bold',
    fontSize: 18,
  },
  inputviewset: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  eyeiconset: {
    color:'gray'
  },
  accounttext: {
    fontSize:25,
    fontFamily: Fonts.Poppins_Medium,
    textAlign:'center'
  },
  accounttexttwo: {
    color:'black',
    fontSize:23,
    fontFamily: Fonts.Poppins_Medium,
    fontFamily: 'DMSans-Medium',
    textAlign:'center'
  },
  succefullimgviewsethre: {
    flexDirection:'row',
    justifyContent:'center',
    
  },
  stariconstyle: {
    color: 'hsl(27.7, 73.8%, 62.5%)',
    flexDirection: 'row',
    opacity:0.7,
},
  accounttextsuccessfully: {
    fontSize:17,
    textAlign:'center',
    fontFamily: 'DMSans-Medium',
    paddingTop:20,
    paddingBottom:20,
    color:'gray'
  },
  accounttextsuccessfullytwo: {
    fontSize:17,
    textAlign:'center',
    fontFamily: 'DMSans-Medium',
    paddingBottom:20,
    color:'gray'
  },
  succefullyimg: {
    width:150,
    height:150,
    borderRadius:100,
  },
  succefullimgview: {
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
    paddingBottom:25,
    marginTop:-40,
  },
  succefullimgviewtwo: {
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
    paddingBottom:20,
    paddingTop:40
  },
  flexrowsetstarsignup: {
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:15,
    paddingBottom:15,
  },
  positionsetstyleinput: {
    position:'relative',
    top:-25,
  },
  starimagestyle: {
    width:80,
    height:170,
    tintColor:'red'
  },
  succefullimgviewsrtwo: {
    marginBottom:40,
  },
  logoimage: {
    height: 150,
    width: 150,
},
centerlogo: {
  flexDirection:'row',
  justifyContent:'center'
}
});
