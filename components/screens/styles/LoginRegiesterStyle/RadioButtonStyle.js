import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts, ColorTheme, Strings, widthPercent } from '../../utils';
export default  StyleSheet.create({
    radio: {
        flexDirection: 'row',
      },
      img: {
        height: 18,
        width: 18,
        marginHorizontal: 5,
      },
      btn: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      },
      buttonText: {
        fontFamily: Fonts.Poppins_Medium,
        color: '#263238',
        fontSize: SF(18),
        lineHeight: SF(24),
        fontWeight: '500',
        fontStyle: 'normal',
        left: SF(6)
      },
      buttonContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: '1%',
        marginBottom: '0%',  
      },
    
    flexrowradiobutton: {
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
    }
});