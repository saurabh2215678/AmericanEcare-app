import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts, ColorTheme, Strings, widthPercent } from '../../utils';
export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: ColorTheme.sp_Theme,
    },
    topBg: {
        height: SH(150),
        width: '100%',
    },
    title: {
        left: SH(28),
        marginTop: SH(90),
        width: 'auto',
        position: 'absolute',
        fontFamily: Fonts.Poppins_Bold,
        color: '#FFFFFF',
        fontSize: SF(24),
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: SF(36)
    },
    chideContainer: {
        width: '85%',
        marginTop: SH(28),
        paddingHorizontal: SH(18),
        paddingVertical: SH(20),
        backgroundColor: 'white',
        borderRadius: SW(7)
    },
    lable: {
        width: 'auto',
        fontFamily: Fonts.Poppins_Bold,
        fontWeight: '600',
        fontSize: SF(18),
        lineHeight: SF(24),
        color: '#000',
    },
    textStyle: {
        width: '70%',
        fontFamily: Fonts.Poppins_Regular,
        fontWeight: '500',
        fontSize: SF(16),
        lineHeight: SF(24),
        color: '#000',
        marginTop: SF(5)
    },
    settwobutton: {
        width:'100%',
        marginTop:'7%',
        paddingLeft:20,
        paddingRight:20,
    },
    itemHeader: {
        width: '100%',
        flexDirection: 'row',
        padding: SH(2)
    },
    notification_msg: {
        width: '80%',
        marginHorizontal: SH(1),
        textAlign: 'left',
        fontFamily: Fonts.Poppins_Medium,
        fontSize: SF(19),
        lineHeight: SF(24),
        color: 'black',
        fontWeight: '800',
        paddingLeft:15,
        paddingTop:15,
    },
    backaerrowsert: {    
        tintColor:'white'
    },
    settoucjbleview: {
        position:'absolute',
        top:20,
        left:20,
        width:37,
        height:37,
    },
    container: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    topBg: {
        height: SH(200),
        width: '100%',
    },
    chiropractorView: {
        width: 'auto',
        flexDirection: 'row',
        position: 'absolute',
        right: SH(15),
        top: SH(15),
        alignItems: 'center'
    },
    plusImage: {
        width: SH(20),
        height: SH(20)
    },
    chiropractorText: {
        fontFamily: Fonts.Poppins_Medium,
        fontSize: SF(20),
        fontStyle: 'normal',
        color: '#fff',
        fontWeight: '500',
        marginLeft: SH(8)
    },
    dr_imageView: {
        width: SH(100),
        height: SH(100),
        borderRadius:100,
    },
    headerTextView: {
        width: '90%',
        marginHorizontal: '5%',
        left: SH(5),
        marginBottom: SH(20),
        justifyContent: 'center',
        paddingTop:10,
    },
    headerTextBold: {
        color: '#fff',
        fontFamily: Fonts.Poppins_Bold,
        fontWeight: '800',
        fontSize: SF(22),
        fontStyle: 'normal',
        lineHeight: 30
    },
    headerTextNormal: {
        color: '#fff',
        fontFamily: Fonts.Poppins_Bold,
        fontWeight: '400',
        fontSize: SF(18),
        fontStyle: 'normal',
        lineHeight: 24
    },
    setcontainer: {
        width:'100%',
    },
    containertopheader: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomRightRadius:30,
        borderBottomLeftRadius:30,
        marginBottom:10,
    },
    headerMainView: {
        width: '100%',
        flexDirection: 'row',
        marginHorizontal: '5%',
        marginTop: SH(20),
        paddingBottom: 20,
        paddingLeft: 15,
    },
    dr_imageView: {
        width: SH(100),
        height: SH(100),
        borderRadius: 100,
    },
    headerTextView: {
        width: '90%',
        marginHorizontal: '5%',
        left: SH(5),
        marginBottom: SH(20),
        justifyContent: 'center',
        paddingTop: 10,
    },
    headerTextBold: {
        color: '#fff',
        fontFamily: Fonts.Poppins_Bold,
        fontWeight: '800',
        fontSize: SF(22),
        fontStyle: 'normal',
        lineHeight: 30
    },
    headerTextNormal: {
        color: '#fff',
        fontFamily: Fonts.Poppins_Bold,
        fontWeight: '400',
        fontSize: SF(18),
        fontStyle: 'normal',
        lineHeight: 24
    },
});