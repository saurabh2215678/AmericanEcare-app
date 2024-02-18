import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts, ColorTheme, Strings, widthPercent, colorsset } from '../../utils';
export default StyleSheet.create({
    container: {
        width: '100%',
        height:'100%',
        paddingLeft:20,
        justifyContent: 'flex-start',
        backgroundColor: colorsset.theme_backgound_second,
    },
    titelText: {
        marginTop: SH(15),
        fontFamily: Fonts.Poppins_Bold,
        fontWeight: '700',
        fontStyle: 'normal',
        color: '#263238',
        fontSize: SF(20),
        lineHeight: SF(30)
    },
    flatelist: {
        width: '100%',
        height: 'auto',
        marginTop: SH(10),
    },
    item: {
        width: '100%',
        marginTop: SH(2)
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
        fontSize: SF(17),
        lineHeight: SF(24),
        color: '#666A6C',
        fontWeight: '500'
    },
    headerImg: {
        width: SH(25),
        height: SH(14),
        left: SH(15),
        top: SH(5)
    },
    bring_all: {
        textAlign: 'left',
        fontFamily: Fonts.Poppins_Bold,
        fontSize: SF(20),
        lineHeight: SF(28),
        fontWeight: '700',
        color: '#263238',
    },
    horizontalView: {
        width: '100%',
        flexDirection: 'row',
        padding: SH(2),
        marginTop: SH(10)
    },
    bring_point: {
        marginHorizontal: SH(1),
        textAlign: 'left',
        fontFamily: Fonts.Poppins_Bold,
        fontSize: SF(18),
        lineHeight: SF(25),
        color: '#263238',
        fontWeight: '600',
        left: SH(12)
    },
    if_text: {
        marginTop: SH(12),
        color: '#F38831',
        fontFamily: Fonts.Poppins_Medium,
        fontSize: SF(16),
        lineHeight: SH(24),
        fontWeight: '500'
    },
    textcontactus: {
        fontFamily: Fonts.Poppins_Bold,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: SF(19),
        lineHeight: SF(27),
        color: 'blue'
    },
    setviewstyle: {
        width: '90%',
        height: 'auto',
        justifyContent: 'center',
        padding: SH(15),
        borderRadius: SH(5),
        marginTop: SH(25),
        marginBottom: SH(8),
        backgroundColor: 'white'
    },
    textstyle: {
        color: '#F38831',
        fontFamily: Fonts.Poppins_Medium,
        fontSize: SF(17),
        lineHeight: SH(24),
        fontWeight: '600',
        margin: SH(5)
    },
    setviewstyletwo: {
        width: '90%',
        height: SH(1),
        backgroundColor: 'rgba(188, 188, 188, 0.58)',
        marginVertical: SH(10)  
    }
});