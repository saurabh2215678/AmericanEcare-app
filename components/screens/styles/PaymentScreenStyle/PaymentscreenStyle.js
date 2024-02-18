import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts, ColorTheme, Strings, widthPercent } from '../../utils';
export default StyleSheet.create({
    container: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: ColorTheme.sp_Theme,
    },
    topBg: {
        height: SH(150),
        width: '100%',
    },
    title: {
        marginTop: SH(50),
        width: '100%',
        position: 'absolute',
        fontFamily: Fonts.Poppins_Bold,
        color: '#FFFFFF',
        fontSize: SF(24),
        fontStyle: 'normal',
        fontWeight: '600',
        textAlign:'center',
        lineHeight: SF(36)
    },
    chideContainer: {
        width: '85%',
        marginTop: SH(100),
        paddingHorizontal: SH(18),
        paddingVertical: SH(20),
        backgroundColor: 'white',
        borderRadius: SW(7)
    },
    sectionView: {
        width: '100%',
        padding: SH(5),
        flexDirection: 'row',
        marginVertical: SH(5)
    },
    iconStyle: {
        height: SH(20),
        width: SH(20),
        paddingTop: SW(2)
    },
    leblaStyle: {
        width: '80%',
        marginLeft: SW(15),
        fontFamily: Fonts.Poppins_Regular,
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: SF(16),
        lineHeight: SF(24),
        color: '#263238'
    },
    leblaBoldStyle: {
        width: '100%',
        fontFamily: Fonts.Poppins_Medium,
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize:17,
        textAlign:'left',
       paddingLeft:30,
       paddingTop:20,
       paddingBottom:10,
    },
    app_icon: {
        width: SH(45),
        height: SH(45),
        marginRight:30,
        borderRadius:5,
    },
    app_icontwo: {
        width: SH(30),
        height: SH(30),
        marginRight:25,
        borderRadius:5,
        position:'relative',
        top:7,
        left:8,
    },
    app_iconthree: {
        width: SH(50),
        height: SH(50),
        marginRight:25,
        borderRadius:5,
        color:'#046665',
        position:'relative',
        top:8,
        left:9,
    },
    upi_label: {
        fontFamily: Fonts.Poppins_Medium,
        fontWeight: '400',
        fontSize: SF(17),
        lineHeight: SF(24),
        color: '#263238'
    },
    setviewstyle: {
        height: '100%',
        width: '95%',
        marginHorizontal: '2.5%',
        marginVertical: '2.5%',
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
    setwidthpaypal: {
        flexDirection:'row',
        alignItems:'center',
        marginTop:-10,
    },
    setimagewidth: {
        height:40,
        width:40,
        marginRight:10,
        position:'relative',
        left:-8
    },
    flexrowsetnew: {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        width:'85%',
        borderRadius:7,
        paddingLeft:20,
        padding:5,
        marginBottom:15,
    },
    setbgcolor: {
        backgroundColor: '#e3f2f0'
    },
    setbgcolorviewtop: {
        position:'absolute',
        top:0,
        height:150,
        width:'100%',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    }
});