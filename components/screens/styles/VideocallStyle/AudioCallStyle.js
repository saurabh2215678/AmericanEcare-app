import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts, ColorTheme, Strings, heightPercent, widthPercent } from '../../utils';

export default StyleSheet.create({
    flex: {
        flex: 1,
    },
    setbgimage: {
        height: '100%',
        borderRadius: 0,
        width: '100%',
      position:'absolute'
    },
    setusertopimage: {
        height: 150,
        width: 150,
        borderRadius: 7
    },
    flexrowtextimage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 50,

    },
    flexrowsetaudiocall: {
        height:'100%',
        flexDirection:'row',
        paddingTop:30,
    },
    calldirationstyle: {
        backgroundColor: '#046665',
        color: 'white',
        padding: 9,
        borderRadius: 100,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 15,
        fontFamily: Fonts.Poppins_Medium
    },
    setwhitetextnornal: {
        color: 'white',
        fontSize: 16,
        fontFamily: Fonts.Poppins_Medium,
        position: 'relative',
        top: -4,
    },
    seticonview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginHorizontal: '9%',
    },
    seticonviewsettwo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginHorizontal: '4%',
    },
    iconpositionset: {
        backgroundColor: 'red',
        height: 60,
        width: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
    },
    microphone: {
        backgroundColor: 'gray',
        height: 60,
        width: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 200,
    },
    microphonetext: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        textAlign:'center'
    },
    iconpositionsettext: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    setmutecolortext: {
        color: 'white',
        fontFamily: Fonts.Poppins_Medium,
        fontSize: 14,
        textAlign:'center',
        paddingTop:10,
    },
    setmutecolortexttwo: {
        color: 'white',
        fontFamily: Fonts.Poppins_Medium,
        fontSize: 16,
        position: 'relative',
        left: 7,
    },
    buttoncolorset: {
        backgroundColor: 'lightgray',
    },
    setbuttontrxt: {
        color: 'white'
    },
    setspekerbutton: {
        backgroundColor: '#046665',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 100,
        width: '46%',
        marginRight: 25
    },
    minbuttonview: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: 30,
    },
    setcemeratextstyle: {
        color: 'white',
        marginLeft: 10,
        fontFamily: Fonts.Poppins_Medium
    },
    spekerimage: {
        tintColor: 'white',
        width: 30,
        height: 30,
    },
    usernametext: {
        color:'white',
        fontSize:30,
        fontFamily: Fonts.Poppins_Medium
    },
    buttonset: {
        borderWidth: 1,
        borderColor: '#046665',
        backgroundColor: '#046665',
        width: '100%',
        borderRadius: 227,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:15,
      }, 
      buttonTextStyleSignWithNumber: {
        color: '#046665',
        fontFamily: Fonts.Poppins_Medium,
        position:'relative',
        top:3,
      },
      buttonTextStyleSignWithNumber2: {
        color: 'white',
        fontFamily: Fonts.Poppins_Medium,
        position:'relative',
        top:3,
      }, 
      setbgcolorflexrow: {
          flexDirection:'row'
      },
      iconsizecolor: {
        color: '#046665',
        fontFamily: Fonts.Poppins_Medium,
        marginRight:15
      },
      iconsizecolorset: {
        color: 'white',
        fontFamily: Fonts.Poppins_Medium,
        marginRight:15
      },
      flextwobutton: {
          flexDirection:'row',
          width:'47.5%',
          marginTop:'5%'
      },
      setimagstyle: {
        tintColor:'#046665',
        width: 30,
        height: 30,
      },
      setimagstyletwo: {
        tintColor:'white',
        width: 30,
        height: 30,
      },
      setspacediv: {
        position:'absolute',
        bottom:20,
      },
      container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: ColorTheme.sp_Theme,
    },
    login: {
        color: '#263238',
        fontSize: 30,
        fontFamily: Fonts.Poppins_Medium,
        marginTop: SH(60),
        lineHeight: 36,
        paddingBottom: SH(20),
    },
    button: {
        marginTop: SH(20),
        width: '100%',
    },
    textStyle: {
        color: '#263238',
        fontSize: 17,
        fontFamily: Fonts.Poppins_Medium,
        marginTop: SH(7),
        lineHeight: 24,
    },
    registerTextStyle: {
        color: '#046665',
        fontSize: 17,
        fontFamily: Fonts.Poppins_Bold,
        marginTop: SH(50),
        lineHeight: 24
    },
    buttonviewsettopspace: {
        marginTop: SH(20),
        width: '100%',
    },
    viewtextStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%',
    },
    logoimage: {
        height: 150,
        width: 150,
    },
    minstyleviewphotograpgy: {
        flexDirection:'row',
        justifyContent:'center',
        height:'100%'
    },
    
    customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-secondary',
    },
    
    success: {
        confirmButtonColor: 'red',
    },
    activedot: {
        borderTopWidth:2,
         width: "100%", 
         height: "100%",
          borderColor: 'red',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
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
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      textcenterview: {
          flexDirection:'row',
          justifyContent:'center',
          position:'relative',
          top:-30,
          left:-7,
      },
    //   flexrowsetaudiocall: {
    //     flexDirection:'row',
    //    alignItems:'center',
    //    paddingTop:60,
      
    // },
    seimagstyle: {
      width:70,
      height:70,
      borderRadius:100,
  },
  seimagstyleendcall: {
    width:100,
    height:100,
    borderRadius:250,
},
  marginrightset: {
      marginRight:15,
    },
    setharrytext: {
        color:'white',
        fontSize:25,
        fontFamily: Fonts.Poppins_Medium
    },
    setwhitetextnornal: {
      color:'white',
      fontSize:16,
      fontFamily: Fonts.Poppins_Medium,
      position:'relative',
      top:-4,
    },
    setflexview: {
        width:'100%',
      },
      seimagstyleendcall: {
        width:100,
        height:100,
        borderRadius:250,
    },
    leftimage: {
        position:'relative',
        right:20,
      },
      flexcentertext: {
        width:'100%',
        marginTop:20,
        marginBottom:30,
      },
      callendtext: {
        color:'white',
        textAlign:'center',
        fontFamily: Fonts.Poppins_Medium,
        fontSize:17,
      },
      flexrowsetcenter: {
        flexDirection:'row',
        justifyContent:'center',
        marginTop:55,
      },
      marginbottomspace: {
        marginTop:20,
      },
      setbuttoncolor: {
        backgroundColor:'white',
      }
});