import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts, ColorTheme, Strings, widthPercent } from '../../utils';
export default  StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: ColorTheme.sp_Theme,
    },
    inputSmall: {
        width: '100%',
        fontSize: SF(17),
        fontFamily: Fonts.Poppins_Regular
    },
    genderLabelStyle: {
        marginRight:20,
        fontSize: SF(20),
        color: '#000',
        lineHeight: SH(24),
        fontFamily: Fonts.Poppins_Medium
    },
    redioButtonVide: {
        width: '45%',
        marginRight: SH(190),
        marginTop: SH(12)
    },
    inputRextArea: {
        marginTop: SH(13),
        width: '100%',
        height: SH(100),
        paddingLeft:15,
        color:'gray',
        fontSize: SF(17),
        textAlignVertical: 'top',
        borderRadius:7,
        fontFamily: Fonts.Poppins_Medium,
        backgroundColor:'white',
    },
    button: {
        marginHorizontal: widthPercent('5%'),
        marginTop: SH(30),
        width: '90%',
        height : SH(50)
    },
    textStyle: {
        color: '#263238',
        fontSize: 17,
        fontFamily: Fonts.Poppins_Medium,
        marginTop: SH(20),
        lineHeight: 24,
    },
    registerTextStyle: {
        color: '#046665',
        fontSize: 17,
        fontFamily: Fonts.Poppins_Bold,
        marginTop: SH(50),
        lineHeight: 24
    },
    dobView : {
        marginHorizontal: widthPercent('5%'),
        marginTop: SH(12),
        width: '100%',
        borderRadius: SH(7),
        minHeight: SH(45),
        backgroundColor: "white",
    },
    dobStyle: {
        width: '100%',
        borderRadius: SH(20),
        fontSize: SF(20),
        color: '#263238',
        fontWeight: '400',
        paddingVertical: SH(8),
        paddingHorizontal: SH(15),
    },
    setinputwidth: {
        width:'48%',
    },
    setinputwidthfull: {
        width:'100%',
    },
    setbuttonview: {
        marginTop:20,
        width:'100%'
    },
    inputviewstyle: {
        marginHorizontal: '5%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    setgenderview: {
        flexDirection:'row',
        justifyContent:'flex-start',
        width:'100%',
        alignItems:'center'
    }

});