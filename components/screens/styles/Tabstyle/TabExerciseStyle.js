import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts, colorsset,  } from '../../utils';
export default StyleSheet.create({
    container: {
        width: '100%',
        height:'100%',
        backgroundColor:'red',
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
    sectionView: {
        height: 'auto',
        width: '100%',
        marginHorizontal: '5%',
        paddingBottom: SH(5),
        marginTop: SW(8)
    },
    flatelist: {
        width: '100%',
        height: 'auto',
        marginTop: SH(10),
    },
    item: {
        width: '100%',
        height: SH(80),
        marginVertical: SH(7),
        borderRadius: SH(7),
        justifyContent: 'center',
        paddingLeft:15,
        paddingRight:15,
    },
    itemChilde: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    itemText: {
        color: '#fff',
        fontFamily: Fonts.Poppins_Bold,
        fontWeight: '600',
        fontSize: SF(24),
        lineHeight: 36,
    },
    itemImg: {
        width: SH(65),
        height: SH(67),
    },
    minviewallcontent: {
        width: '89%',
    height: '100%',
   marginHorizontal:'5%',
   backgroundColor: '#e3f2f0',
    },
    minstyleviewphotograpgy: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:'100%',
        width:'100%'
    },
    
});