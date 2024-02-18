import { StyleSheet } from 'react-native';
import { SF, SH, SW, Fonts, ColorTheme, Strings, heightPercent, widthPercent } from '../../utils';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    paddingBottom:50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: ColorTheme.sp_Theme,
  },
  smaili: {
    width: SH(110),
    height: SH(110),
    borderRadius:100,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    // fontFamily: Fonts.Poppins_Bold,
    fontWeight: '700',
    color: '#263238',
    fontSize: SF(30),
    lineHeight: SF(40),
    fontStyle: 'normal',
    marginTop: SF(15),
  },
  textStyle: {
    width: '75%',
    textAlign: 'center',
    // fontFamily: Fonts.Poppins_Medium,
    fontWeight: '400',
    color: '#263238',
    fontSize: SF(18),
    lineHeight: SF(24),
    fontStyle: 'normal',
    marginTop: SF(15),
  },
  bring_all: {
    textAlign: 'left',
    // fontFamily: Fonts.Poppins_Bold,
    fontSize: SF(20),
    lineHeight: SF(28),
    fontWeight: '700',
    color: '#263238',
    width:'100%'
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
    // fontFamily: Fonts.Poppins_Bold,
    fontSize: SF(18),
    lineHeight: SF(25),
    color: '#263238',
    fontWeight: '600',
    left: SH(12)
  },
  if_text: {
    marginTop: SH(12),
    color: '#F38831',
    // fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(16),
    lineHeight: SH(24),
    fontWeight: '500',
    position:'relative',
    top:6,
  },
  smailitextminview: {
    width: '100%',
    height: SH(1),
    backgroundColor: '#E5E5E5',
    marginVertical: SW(18)
  },
  lasttextwhiteboxview: {
    width: '100%',
    justifyContent: 'center',
    borderRadius: SH(5),
    marginTop: SH(25),
    marginBottom: SH(30),
    backgroundColor: 'white'
  },
  textStylesimple: {
    color: '#F38831',
    // fontFamily: Fonts.Poppins_Medium,
    fontSize: SF(17),
    lineHeight: SH(24),
    fontWeight: '600',
    margin: SH(5),
    marginBottom: 25,
  }
});