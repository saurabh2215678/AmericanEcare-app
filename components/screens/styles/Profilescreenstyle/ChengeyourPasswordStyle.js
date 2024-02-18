import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts, ColorTheme, Strings, widthPercent } from '../../utils';
export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: SH(20),
        backgroundColor: ColorTheme.sp_Theme,
    },
    inputMobile: {
        marginHorizontal: widthPercent('5%'),
        marginTop: SH(25),
        width: '90%',
        fontSize: SF(17),
        fontFamily: Fonts.Poppins_Regular
    },
    button: {
        marginHorizontal: widthPercent('5%'),
        marginTop: SH(30),
        width: '90%',
        height : SH(50)
    },
});