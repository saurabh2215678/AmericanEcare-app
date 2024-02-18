import React from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Styles from '../../styles/DefoltScreenStyle/DoctoreMapStyle';
import { carouselItems } from '../../utils/sliderimage';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import RouteName from '../../routes/RouteName';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 5;
const entryBorderRadius = 8;
const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

const FirstSliderimageScreen = ({ _slider1Ref }) => {
    const navigation = useNavigation();
    const { colorrdata } = useSelector(state => state.commonReducer) || {};
    const _renderItem = ({ item, index }) => {
        return (
            <View style={Styles.sliderminview}>
                <TouchableOpacity style={Styles.rounftextview} onPress={() => navigation.navigate(RouteName.HOME_SCREEN)}>
                    <View style={Styles.flexrowsetimage}>
                        <View>
                            {item.setprofileimage}
                        </View>
                        <View>
                            <Text style={[Styles.textContainer,{color:colorrdata}]}>
                                {item.title}
                            </Text>
                        </View>
                    </View>
                    <View style={Styles.flexfeestect}>
                        <View style={Styles.textContainertwo}>
                            <Text style={Styles.textContainertwo}>
                                {item.paregraphtitle}
                            </Text>
                            <Text style={Styles.textContainerthree}>
                                {item.paregraphtitletwo}
                            </Text>
                        </View>
                        <View>
                            <View style={Styles.flexsettext}>
                                <Text style={Styles.settextstyle}>{item.Feestwo}</Text>
                                <Text style={Styles.boldtextstyle}>{item.Exptwo}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={Styles.setminflexstard}>
                        <View style={Styles.setminflexview}>
                            <View style={Styles.flexstar}>
                                {item.rating}
                            </View>
                            <View>
                                <Text style={Styles.settextstyletwo}>{item.digittext}</Text>
                            </View>
                        </View>
                        <View style={Styles.flexrowsettitle}>
                            <View style={Styles.flexsettext}>
                                <Text style={Styles.settextstyle}>{item.Exp}</Text>
                                <Text style={Styles.boldtextstyle}>{item.Fees}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={Styles.minbody}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                <Carousel
                    ref={c => _slider1Ref = c}
                    data={carouselItems}
                    renderItem={_renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={false}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    containerCustomStyle={Styles.slider}
                    contentContainerCustomStyle={{ alignItems: 'center' }}
                    loop={false}
                    autoplay={false}
                    enableSnap={true}
                    bounces={false}
                    lockScrollWhileSnapping={true}
                />
            </View>
        </View>
    );
};
export default FirstSliderimageScreen;