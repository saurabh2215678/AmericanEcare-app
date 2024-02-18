
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { SF, SH, SW, Fonts, ColorTheme, Strings, widthPercent, colorsset } from '../../utils';

export default StyleSheet.create({
  minstyleviewphotograpgy: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  minviewsigninscreen: {
    width: '100%',
    backgroundColor: 'hsl(4.9, 58.1%, 45.9%)',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 70 : 30,
    height: Platform.OS === 'ios' ? 240 : 200,

    paddingBottom: 40,
    // marginHorizontal: '5%',
  },
  setflexcenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 70,
    width: 70,
    backgroundColor: 'white',
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeimage: {
    width: 30,
    height: 30,
  },
  minflexview: {
    width: '100%',
    height: '100%',
  },
  bgwhiteview: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 2 : 25,
    },
    shadowOpacity: 0.58,
    shadowRadius: Platform.OS === 'ios' ? 2 : 25,
    elevation: Platform.OS === 'ios' ? 1 : 2,
  },
  setsearchinputbgcolor: {
    backgroundColor: '#F4F4F4',
    paddingLeft: 15,
    borderRadius: 15,
    height: 57,
    marginTop: 25,
  },
  texttype: {
    fontSize: 16,
    fontFamily: Fonts.Poppins_Medium,
    padding: 0,
    paddingTop: 15,
  },
  flexrowhomeimage: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  satyanilaym: {
    color: '#000000',
    fontSize: 17,
    fontFamily: Fonts.Poppins_Medium,
  },
  satyanilaymtwo: {
    color: '#B2B2B2',
    fontSize: 14,
    fontFamily: Fonts.Poppins_Medium,
  },
  marginright: {
    marginRight: 20,
  },
  flexrowset: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '10%',
    paddingTop: 30,
  },
  saveaddresh: {
    color: '#757575',
    fontSize: 18,
    fontFamily: Fonts.Poppins_Medium,
  },
  setbgminviewhome: {
    paddingHorizontal: '17%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  sethometext: {
    fontSize: 15,
    lineHeight: 24,
    fontFamily: Fonts.Poppins_Medium,
    color: '#2E3A59',
    paddingTop: 7,
  },
  setwhiteboxinhome: {
    width: 90,
    height: 90,
    flexDirection: 'row',
    borderRadius: 30,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 2 : 25,
    },
    shadowOpacity: 0.58,
    shadowRadius: Platform.OS === 'ios' ? 2 : 25,
    elevation: Platform.OS === 'ios' ? 1 : 2,
  },
  centerimg: {
    marginLeft: 5,
  },
  setimageborderredius: {
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    borderBottomLeftRadius: 27,
    borderBottomRightRadius: 27,
    width: '100%',
    marginTop: -36,
    marginBottom: 100,
  },
  positonabsolute: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    paddingBottom: 0,
  },
  setconformbutton: {
    backgroundColor: '#F8774A',
    marginTop: 20,
    borderRadius: 100,
  },
  textcolorsetwhite: {
    color: 'white'
  },
  positonsetdelever: {
    position: 'absolute',
    top: 20,
    zIndex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderWidth: 1,
    marginLeft: 20,
    justifyContent: 'space-between',
    borderRadius: 20,
    width: 53,
    backgroundColor: 'white',
    borderColor: 'rgba(0, 0, 0, 0.48)'
  },
  setdilivertext: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: Fonts.Poppins_Medium,
    color: 'black',
    paddingRight: 15,
    paddingTop: 3
  },
  setpencileicon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingTop: 10,
    position: 'relative',
    top: 20,
    width: 50,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    marginTop: -20,
    zIndex: 3,
  },
  centerpencileicon: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  setwhiteboxwidth: {
    width: '100%',
    paddingBottom: 10,
  },
  setwhiteboxwidthtwo: {
    width: '99%'
  },
  MainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapstyleset: {
    flex: 1,
    width: '100%',
    height: 670,
    paddingTop: 10,
    borderRadius: 20,
  },
  mapviewstyle: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mapstylesettwo: {
width:20,
height:20,
  },

  container: {
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,

  },

  titleStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  flexDirectionrowskipnext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '20%',
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  homeheadertext: {
    color: 'white',
    fontWeight: '700',
    fontSize: 25,
  },
  popularcourcetext: {
    color: 'black',
    fontFamily: 'DMSans-Bold',
    paddingLeft: 13,
    fontSize: 21,
    paddingBottom: 10,
  },
  popularcourcetexttwo: {
    color: 'black',
    fontFamily: 'DMSans-Bold',
    paddingLeft: 13,
    fontSize: 21,
  },
  popularview: {
    marginTop: -50,
    marginBottom: 25,
  },
  newcoursestext: {
    color: 'black',
    fontFamily: 'DMSans-Bold',
    paddingLeft: 13,
    fontSize: 21,
    marginTop: 20
  },
  newcoursestextview: {

  },
  instructertextsetview: {
    marginTop: -15,
  },
  instructertextset: {
    color: 'black',
    fontWeight: '700',
    paddingLeft: 13,
    fontSize: 21,
  },
  textContainer: {
    textAlign: 'left',
    fontSize: 17,
    fontFamily: Fonts.Poppins_Medium,
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  textContainertwo: {
    textAlign: 'left',
    fontSize: 15,
    fontFamily: Fonts.Poppins_Medium,
    paddingLeft: 7,
    color: 'gray',
  },
  textContainerthree: {
    textAlign: 'left',
    fontSize: 15,
    fontFamily: Fonts.Poppins_Medium,
    width: '100%',
    paddingLeft: 7,
    color: 'gray',
    position: 'relative',
    top: -5,
  },
  roundimagtitletextset: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'DMSans-Bold',
    position: 'absolute',
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    color: 'white',
  },
  rounftextview: {
    backgroundColor: 'white',
    position: 'relative',
    borderRadius: 7,
    paddingTop: 10,
    paddingBottom: 10,
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 2 : 25,
    },
    shadowOpacity: 0.58,
    shadowRadius: Platform.OS === 'ios' ? 2 : 25,
    elevation: Platform.OS === 'ios' ? 1 : 2,
    top: 50,
  },
  subtitleEven: {
    color: 'black'
  },
  subtitle: {
    marginTop: 6,
    color: 'gray',
    fontSize: 12,
    fontStyle: 'italic'
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)'
  },
  whiteshadowimgbottom: {
    backgroundColor: 'white',
    width: '90%',
    paddingBottom: 20,
    marginHorizontal: '5.5%',
    textAlign: 'center',
    borderRadius: 7,
    position: 'relative',
    right: 65,
    shadowColor: "black",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 2 : 25,
    },
    shadowOpacity: 0.58,
    shadowRadius: Platform.OS === 'ios' ? 2 : 25,
    elevation: Platform.OS === 'ios' ? 1 : 2,

  },
  whitebodyimagetextstyle: {
    fontSize: 14,
    paddingRight: 15,
    paddingTop: 10,
    fontFamily: 'DMSans-Medium',
    color: 'black',
  },
  whitebodyimagetextstyletwo: {
    fontSize: 15,
    fontFamily: 'DMSans-Bold',
    color: 'black',
  },
  whitebodyimagetextstyletwo2: {
    fontSize: 15,
    fontFamily: 'DMSans-Bold',
    color: 'black',
    paddingTop: 6,
    paddingBottom: 5,
    paddingRight: 15,
    height: 70,
  },
  whitebodyimagetextstylethree: {
    fontSize: 15,
    fontFamily: 'DMSans-Bold',
    color: 'black',
    position: 'relative',
    left: 5,
  },
  blacktitleunderlineset: {
    fontSize: 17,
    fontFamily: 'DMSans-Bold',
    color: 'black',
    paddingTop: 5,
    borderBottomWidth: 0.3,
    borderBottomColor: 'black',
    marginRight: 15,
    marginBottom: 10,
    height: 60,
  },
  whiteshadowimgbottomtwo: {
    backgroundColor: 'white',
    width: '75%',
    paddingBottom: 20,
    marginHorizontal: '5.5%',
    textAlign: 'center',
    borderRadius: 7,
    position: 'relative',
    right: 80,
    top: 25,
    shadowColor: "black",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 2 : 25,
    },
    shadowOpacity: 0.58,
    shadowRadius: Platform.OS === 'ios' ? 2 : 25,
    elevation: Platform.OS === 'ios' ? 1 : 2,
  },
  usernametext: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
    paddingTop: 15,
  },
  usernamejobtext: {
    textAlign: 'center',
    paddingTop: 5,
    fontFamily: 'DMSans-Bold',
    color: 'black',
  },
  usernamerenkintext: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
  },
  usernamerenkintexttwo: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'DMSans-Bold',
    textAlign: 'center',
    marginLeft: 5,
  },
  rendervontantstyleset: {
    position: 'absolute',
    bottom: 0,
    height: '100%',
    width: '100%',
  },
  bodytwo: {
    paddingHorizontal: 50,

  },
  flexrowsettext: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  alltextleftset: {
    paddingLeft: 15,
  },
  stariconstyle: {
    color: 'hsl(27.7, 73.8%, 62.5%)',
    flexDirection: 'row',
    position: 'relative',

  },
  chengecolorstyle: {
    color: 'hsl(27.7, 73.8%, 62.5%)',
    flexDirection: 'row',
    position: 'relative',
    fontSize: 18,
  },
  stariconimagestyle: {
    width: 50,
    height: 50,
  },
  flexrowstyleset: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  },
  minstyleviewphotograpgy: {

    height: '100%',
    width: '100%',
  },
  keybordtopviewstyle: {
    height: '100%',
    width: '100%',
  },
  minviewsigninscreen: {
    width: '100%',
    marginTop: '3%',
  },
  minflexview: {
    width: '100%',
    height: '100%',
  },
  notificationivonandimhflexview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 15,
  },
  imagstylesetprofile: {
    height: 27,
    width: 27,
    borderRadius: 1000,
    marginRight: 15,
    marginLeft: 15,
  },
  navbarheaderminview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 5,
    paddingRight: 20,
  },
  flexsettileimgview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 15,
    paddingTop: 10,
  },
  colorblseticon: {
    color: '#e1eb34',
  },
  imagsetstyle: {
    width: SW(315),
    height: 200,
    borderRadius: 7,
  },
  imagsetstylesetthreeslider: {
    width: 225,
    height: 150,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  iosstyleset: {
    marginTop: 25,
    backgroundColor: 'white',
  },

  flexiconviewset: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dravermarginright: {
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  hometoggleflexsetview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginrighthome: {
    marginRight: 10,
    position: 'relative',
    top: 1.5,
  },
  mycoursetextstyle: {
    fontSize: 23,
    fontWeight: '700',
  },
  marginleftandrightsettext: {
    marginLeft: 10,
    marginRight: 10,
  },

  checkoutimage: {
    flexDirection: 'row',
  },
  margincolorroght: {
    marginRight: 6,
  },
  flexset: {
    flexDirection: 'row',
    marginRight: 15,
  },
  flexrowsettitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    borderTopColor: 'gray',
    borderStyle: 'dashed',
  },
  flexsettext: {
    flexDirection: 'row',
  },
  settextstyle: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: Fonts.Poppins_Medium,
    color: 'gray',
    marginRight: 10,
  },
  settextstyletwo: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: Fonts.Poppins_Medium,
    color: 'gray',
    marginRight: 10,
    marginLeft: 5,
  },
  boldtextstyle: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: Fonts.Poppins_Medium,
    color: 'black',
  },
  flexstar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 15,
  },
  setminflexview: {
    flexDirection: 'row',
  },
  sliderminview: {
    borderRadius: 5,
    height: 280,
    width: '100%',
  },
  logoimage: {
    width:50,
    height:50,
    borderRadius:100,
  },
  setimagerstylewidth: {
    width:'100%',
    height:200,
    borderRadius:7,
  },
  flexrowsetimage: {
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:15,
    paddingBottom:15,
  },
  flexfeestect: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingRight:20,
    borderTopWidth:1,
    borderStyle:'dashed',
    paddingTop:10,
    borderTopColor:'lightgray'
  },
  setminflexstard: {
    flexDirection:'row',
    borderTopWidth:1,
    borderStyle:'dashed',
    borderTopColor:'lightgray',
    paddingTop:10,
  },
  setimahmapstyle: {
    height:70,
    width:70,
    borderRadius:300,
  
  },
  setimahmapstyletwo: {
    height:70,
    width:70,
    borderRadius:300,
    // position:'absolute',
    // right:'50%',
   
  },
  setimahmapstylethree: {
    height:70,
    width:70,
    borderRadius:300,
  },
  setimahmapstylefour: {
    height:70,
    width:70,
    borderRadius:300,
   
  },
  setimahmapstylefive: {
    height:70,
    width:70,
    borderRadius:300,
    marginLeft:190,
    marginTop:100,
  }
});
