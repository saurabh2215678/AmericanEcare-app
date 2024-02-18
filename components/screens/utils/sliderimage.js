import React from 'react';
import { Rating } from 'react-native-ratings';
import images from '../images';
import { Image } from "react-native";
import Styles from '../styles/DefoltScreenStyle/DoctoreMapStyle';
import Icon from 'react-native-vector-icons/dist/Octicons';

export const carouselItems = [
    {
        title: 'Dr.Gita Chaudhary',
        paregraphtitle: 'Cardiac Surgeon',
        paregraphtitletwo: 'Apple Hospital',
        Exp: 'Exp.',
        Fees: '22 Years',
        Exptwo: '$60',
        Feestwo: 'Fees',
        rating: <Rating
            type='custom'
            ratingColor='hsl(27.7, 73.8%, 62.5%)'
            ratingBackgroundColor='#c8c7c8'
            ratingCount={5}
            tintColor={'white'}
            imageSize={17}
            startingValue={4.5}
            isDisabled={false}
        />,
        digittext: '(300)',
        setprofileimage: <Image source={images.Doctore_Width__30} style={Styles.logoimage} />,

    },
    {
        title: 'Dr.Nikita Thakor',
        paregraphtitle: 'Cardiac Psychologist',
        paregraphtitletwo: 'Gita Hospital',
        Exp: 'Exp.',
        Fees: '22 Years',
        Exptwo: '$40',
        Feestwo: 'Fees',
        rating: <Rating
            type='custom'
            ratingColor='hsl(27.7, 73.8%, 62.5%)'
            ratingBackgroundColor='#c8c7c8'
            ratingCount={5}
            tintColor={'white'}
            imageSize={17}
            startingValue={4.5}
            isDisabled={false}
        />,
        digittext: '(300)',
        setprofileimage: <Image source={images.Doctore_Width__30} style={Styles.logoimage} />,

    },
    {
        title: 'Dr.Joseph Williamson',
        paregraphtitle: 'Cardiac Pharmacist',
        paregraphtitletwo: 'Amit Jaggi Hospital',
        Exp: 'Exp.',
        Fees: '26 Years',
        Exptwo: '$45',
        Feestwo: 'Fees',
        rating: <Rating
            type='custom'
            ratingColor='hsl(27.7, 73.8%, 62.5%)'
            ratingBackgroundColor='#c8c7c8'
            ratingCount={5}
            tintColor={'white'}
            imageSize={17}
            startingValue={4.5}
            isDisabled={false}
        />,
        digittext: '(300)',
        setprofileimage: <Image source={images.Doctore_Width__30} style={Styles.logoimage} />,
    },
    {
        title: 'Dr.Shubha Agarwal',
        paregraphtitle: 'Cardiac Surgeon',
        paregraphtitletwo: 'Aditya Hospitals',
        Exp: 'Exp.',
        Fees: '26 Years',
        Exptwo: '$80',
        Feestwo: 'Fees',
        rating: <Rating
            type='custom'
            ratingColor='hsl(27.7, 73.8%, 62.5%)'
            ratingBackgroundColor='#c8c7c8'
            ratingCount={5}
            tintColor={'white'}
            imageSize={17}
            startingValue={4.5}
            isDisabled={false}
        />,
        digittext: '(500)',
        setprofileimage: <Image source={images.Doctore_Width__30} style={Styles.logoimage} />,

    },
    {
        title: 'Dr.Sejal Patel',
        paregraphtitle: 'Cardiac Veterinarian',
        paregraphtitletwo: 'AHN Grove Hospital',
        Exp: 'Exp.',
        Fees: '25 Years',
        Exptwo: '$40',
        Feestwo: 'Fees',
        rating: <Rating
            type='custom'
            ratingColor='hsl(27.7, 73.8%, 62.5%)'
            ratingBackgroundColor='#c8c7c8'
            ratingCount={5}
            tintColor={'white'}
            imageSize={17}
            startingValue={4.5}
            isDisabled={false}
        />,
        digittext: '(400)',
        setprofileimage: <Image source={images.Doctore_Width__30} style={Styles.logoimage} />,

    },
];
export const NewssliderScreen = [
    {
        title: 'Health',
        paregraphtitle: 'Covid - 19 Symptoms what are they and should i see a doctore?',
        paregraphtitletwo: 'Dimitri - March 9.2020',
        setprofileimage: <Image source={images.Doctore_width__150} style={Styles.setimagerstylewidth} />,
        doticon: <Icon name="dot-fill" size={20} color={'red'} />,
        liveicon: 'Live',
    },
    {
        title: 'Paramedic',
        paregraphtitle: 'Is the Pandemic Over? If Only It Were That Simple.',
        paregraphtitletwo: 'Dimitri - March 9.2020',
        setprofileimage: <Image source={images.Doctore_width__150} style={Styles.setimagerstylewidth} />,
        doticon: <Icon name="dot-fill" size={20} color={'red'} />,
        liveicon: 'Live',
    },
    {
        title: 'Dentist',
        paregraphtitle: 'President Bidens claim has caused the debate over COVID-19 to explode yet again. ',
        paregraphtitletwo: 'Dimitri - March 9.2020',
        setprofileimage: <Image source={images.Doctore_width__150} style={Styles.setimagerstylewidth} />,
        doticon: <Icon name="dot-fill" size={20} color={'red'} />,
        liveicon: 'Live',
    },
    {
        title: 'Veterinarian',
        paregraphtitle: 'New Dads Brains Shrink COVID Boosters and Open Door Wards',
        paregraphtitletwo: 'Dimitri - March 9.2020',
        setprofileimage: <Image source={images.Doctore_width__150} style={Styles.setimagerstylewidth} />,
        doticon: <Icon name="dot-fill" size={20} color={'red'} />,
        liveicon: 'Live',
    },
    {
        title: 'Health',
        paregraphtitle: 'Covid - 19 Symptoms what are they and should i see a doctore?',
        paregraphtitletwo: 'Dimitri - March 9.2020',
        setprofileimage: <Image source={images.Doctore_width__150} style={Styles.setimagerstylewidth} />,
        doticon: <Icon name="dot-fill" size={20} color={'red'} />,
        liveicon: 'Live',
    },
];
