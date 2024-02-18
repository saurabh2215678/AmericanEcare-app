import React, { useState, useRef } from 'react';
import { Text, View, Dimensions, } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Styles from '../../../styles/DefoltScreenStyle/NewssliderScreen';
import { NewssliderScreen } from '../../../utils/sliderimage';
import { colorsset } from '../../../utils';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}
const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const SLIDER_WIDTH = viewportWidth;
export const ITEM_WIDTH = slideWidth + itemHorizontalMargin * 8;

const entryBorderRadius = 8;
const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

const App = ({ _slider1Ref }) => {
    const [index, setIndex] = useState(0);
    const renderItem = ({ item, index }) => {
        return (
            <View style={Styles.setwidthminview}>
                <View style={Styles.rounftextview}>
                    <View style={Styles.setwidthsaw}>
                        <View>
                            {item.setprofileimage}
                        </View>
                        <View style={Styles.setpositionabsolute}>
                            <View style={Styles.bgcolorred}>
                            <Text style={Styles.textContainer}>{item.title}</Text>
                            </View>
                            <Text style={Styles.textContainertwo}>{item.paregraphtitle}</Text>
                            <Text style={Styles.textContainertwo}>{item.paregraphtitletwo}</Text>
                        </View>
                        <View style={Styles.positionabsolutedotlive}>
                        <Text style={Styles.textContainertwo}>{item.doticon}</Text>
                            <Text style={Styles.textContainertwosetlive}>{item.liveicon}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };
    return (
        <View style={Styles.exampleContainer}>
            <Carousel
                ref={c => _slider1Ref = c}
                data={NewssliderScreen}
                renderItem={renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                inactiveSlideScale={0.94}
                inactiveSlideOpacity={0.7}
                containerCustomStyle={Styles.slider}
                contentContainerCustomStyle={Styles.sliderContentContainer}
                loop={false}
                loopClonesPerSide={3}
                enableSnap={true}
                autoplay={false}
                autoplayDelay={500}
                autoplayInterval={3000}
                onSnapToItem={index => setIndex(index)}
            />
            <Pagination
                dotsLength={NewssliderScreen.length}
                activeDotIndex={index}
                carouselRef={c => _slider1Ref = c}
                containerStyle={Styles.paginationContainer}
                dotColor={'hsl(171.8, 44%, 80.4%)'}
                dotStyle={Styles.paginationDot}
                inactiveDotStyle={Styles.setdotactive}
                inactiveDotColor={colorsset.theme_backgound}
                inactiveDotOpacity={1}
                enableSnap={true}
                dotOpacity={0.5}
            />
        </View>
    );
};

export default App;