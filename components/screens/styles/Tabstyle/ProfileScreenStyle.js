import { StyleSheet } from 'react-native';
import { colors } from 'react-native-elements';
import { SF, SH, SW, Fonts, ColorTheme, colorsset, widthPercent } from '../../utils';
export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: ColorTheme.sp_Theme,
      
    },
    topBg: {
        height: SH(200),
        width: '100%',
    },
    profileText: {
        width: 'auto',
        position: 'absolute',
        marginTop: SH(50),
        //fontFamily: Fonts.Poppins_Bold,
        color: '#FFFFFF',
        fontSize: SF(24),
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: SF(36)
    },
   
    cardView: {
        width: '100%',
        height: 'auto',
        position:'relative',
        zIndex:453212,
        marginTop:30,
        backgroundColor: '#FFFFFF',
        borderRadius: SW(7),
        paddingHorizontal: SH(15),
        paddingVertical: SH(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionView: {
        width: '100%',
        padding: SH(5),
        flexDirection: 'row',
        marginVertical: SH(5)
    },
    iconStyle: {
        height: SH(22),
        width: SH(20),
        tintColor: '#263238',
        paddingTop: SW(2)
    },
    leblaStyle: {
        width: '80%',
        marginLeft: SW(15),
        //fontFamily: Fonts.Poppins_Regular,
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: SF(16),
        lineHeight: SF(24),
        color: '#263238'
    },
    editLableStyle: {
        //fontFamily: Fonts.Poppins_Bold,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: SF(19),
        lineHeight: SF(27),
    },
    changePasswordView: {
        width: '100%',
        height: 'auto',
       marginBottom:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SH(12),
        paddingVertical: SH(10),
        borderRadius: SH(7)
    },
    changePasswordlabel: {
        color: "#FFF",
          //fontFamily: Fonts.Poppins_Medium,
          fontSize: SF(19),
          fontWeight: '600',
          lineHeight: SH(24),
          marginLeft:10
    },
    nextIcon: {
        height: SH(22),
        width: SH(20),
        right: SH(10)
    },
    settwobuttonset: {
        marginTop:35,
        width:'100%'
    },
    setbgcolorviewtop: {
        position:'absolute',
        top:0,
        height:100,
        width:'100%',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
        
    }
});