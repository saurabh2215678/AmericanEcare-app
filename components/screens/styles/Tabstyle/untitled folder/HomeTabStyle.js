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
    headerMainView: {
        width: '90%',
        flexDirection: 'row',
        marginHorizontal: '5%',
        marginTop: SH(80),
        position: 'absolute',
    },
    dr_imageView: {
        width: SH(100),
        height: SH(100),
        borderRadius:200,
    },
    headerTextView: {
        width: '90%',
        marginHorizontal: '5%',
        left: SH(5),
        marginBottom: SH(20),
        justifyContent: 'center'
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
    modalrtextset: {
        color: 'black',
        fontFamily: Fonts.Poppins_Bold,
        fontWeight: '400',
        fontSize: SF(16),
        fontStyle: 'normal',
        lineHeight: 24,

    },
    sectionView: {
        height: 'auto',
        width: '100%',
        marginHorizontal: '5%',
        paddingBottom: SH(5),
        marginTop: SW(8),
       
    },
    lableTextStyle: {
        fontFamily: Fonts.Poppins_Medium,
        fontSize: SF(20),
        color: '#F38831',
        fontStyle: 'normal',
        fontWeight: '600',
        lineHeight: 30
    },
    flatelist: {
        width: '100%',
        height: SH(100),
        marginTop: SH(10),
        
    },
    item: {
        width: SH(55),
        height: SH(75),
        padding: SW(0),
        right: SW(0),
        alignContent: 'center',
        justifyContent: 'flex-start'
    },
    itemText: {
        fontFamily: Fonts.Poppins_Medium,
        fontWeight: '500',
        fontSize: SF(17),
        lineHeight: 24,
        color: '#263238'
    },
    itemDateBG: {
        width: SH(40),
        height: SH(40),
        marginTop: SW(5),
        borderRadius: SW(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    sessionItem: {
        width: '45%',
        height: SH(35),
        marginHorizontal: '2.5%',
        marginVertical: SH(5),
        padding: SH(3),
        borderRadius: SW(5),
        right: SW(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: SW(1),
        borderColor: '#046665',
        backgroundColor: '#E4F3F3',
    },
    sessionText: {
        textAlign: 'center',
        fontFamily: Fonts.Poppins_Medium,
        fontWeight: '400',
        fontSize: SF(16),
        lineHeight: 22,
        color: '#263238'
    },
    flatelistGrid: {
        width: '100%',
        height: 'auto',
        marginTop: SH(10),
    },
    bookBtnView: {
        height: 'auto',
        marginTop: SH(8),
        position: 'absolute',
        alignItems: 'center',
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#046665',
        justifyContent: 'center',
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingRight: 20,
        borderRadius: SH(7),
        marginBottom: SW(10)
    },
    bookPayStyle: {
        marginLeft: SW(10),
        fontFamily: Fonts.Poppins_Regular,
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: SF(16),
        lineHeight: SF(24),
        color: '#FFFFFF',
        marginRight: 10,
    },
    nextIcon: {
        height: SH(22),
        width: SH(20),
        marginTop: SW(2.5)
    },
    modelContainer: {
        width: '100%',
        height: SH(260),
        borderRadius: SH(7),
        backgroundColor: '#FFFFFF',
        paddingTop: SH(15),

    },
    modelTitle: {
        color: '#000000',
        fontFamily: Fonts.Poppins_Medium,
        fontWeight: '700',
        fontSize: SF(20),
        lineHeight: SF(30),
        marginHorizontal: SH(15)
    },
    closeIcon: {
        position: 'absolute',
        right: 15,
        top: 17,
        height: 20,
        width: 20,
    },
    setimagewidth: {
        height: SH(25),
        width: SW(25)
    },
    closeBtn: {
        height: SH(28),
        width: SW(28)
    },
    modelBottomView: {
        width: '100%',
        height: SH(55),
        backgroundColor: 'rgba(4, 102, 101, 0.25)',
        bottom: 0,
        position: 'absolute',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    modelHorizontal: {
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    iconView: {
        width: SW(18),
        height: SH(20),
        tintColor: '#046665'
    },
    horizontalTextStyle: {
        marginLeft: SH(8),
        color: '#046665',
        fontFamily: Fonts.Poppins_Medium,
        fontSize: SF(15),
        lineHeight: SF(22),
        fontWeight: '500',
        fontStyle: 'normal'
    },
    settextcolor: {
        color: '#FFFFFF'
    },
    settextcolortwo: {
        color: '#263238'
    },
    setviewstyle: {
        height: '100%',
        width: '93%',
    },
    sectionstyle: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        marginBottom: SH(50)
    },
    setpaymentview: {
        width: '100%'
    }
});