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
        width:'90%',
        marginTop:'7%'
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
});