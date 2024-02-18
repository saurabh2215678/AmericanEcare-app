import React, {useState} from "react";
import images from '../images';

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordVisibilitytwo, setPasswordVisibilitytwo] = useState(true);
  const [passwordVisibilitytwoth, setPasswordVisibilitytwoth] = useState(true);
  const [passwordVisibilitytfour, setpasswordVisibilitytfour] = useState(true);
  const [rightIcon, setRightIcon] = useState('microphone-slash');
  const [rightIcontwo, setRightIcontwo] = useState('eye-off');
  const [rightIcontwoth, setRightIcontwoth] = useState('eye-off');
  const [rightIconfour, setrightIconfour] = useState('camera-outline');
  const [text, setText] = useState('Camera-on');
  const [imageset, setImage] = useState(images.speker_off);

  const handlePasswordVisibility = () => {
    if (rightIcon === 'microphone-slash') {
      setRightIcon('microphone');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'microphone') {
      setRightIcon('microphone-slash');
      setPasswordVisibility(!passwordVisibility);
    }
  };
  const handlePasswordVisibilitytwo = () => {
    if (rightIcontwo === 'eye-off') {
      setRightIcontwo('eye');
      setPasswordVisibilitytwo(!passwordVisibilitytwo);
    } else if (rightIcontwo === 'eye') {
      setRightIcontwo('eye-off');
      setPasswordVisibilitytwo(!passwordVisibilitytwo);
    }
  };
  const handlePasswordVisibilitytwoth = () => {
    if (rightIcontwoth === 'eye-off') {
      setRightIcontwoth('eye');
      setPasswordVisibilitytwoth(!passwordVisibilitytwoth);
    } else if (rightIcontwoth === 'eye') {
      setRightIcontwoth('eye-off');
      setPasswordVisibilitytwoth(!passwordVisibilitytwoth);
    }
  };


  const handlePasswordVisibilityfour = () => {
    if (rightIconfour === 'camera-outline')  {
      setrightIconfour('camera-off-outline');
      setpasswordVisibilitytfour(!passwordVisibilitytfour);
      setText('camera-off')
      setImage(images.speker_off)
    } else if (rightIconfour === 'camera-off-outline') {
      setrightIconfour('camera-outline');
      setpasswordVisibilitytfour(!passwordVisibilitytfour);
      setText('Camera-on')
      setImage(images.speker_on)
    }
  };

  const handlePasswordVisibilityfive = () => {
    if (rightIconfour === 'camera-outline')  {
      setrightIconfour('camera-off-outline');
      setpasswordVisibilitytfour(!passwordVisibilitytfour);
      setText('camera-off')
      setImage(images.speker_on)
    } else if (rightIconfour === 'camera-off-outline') {
      setrightIconfour('camera-outline');
      setpasswordVisibilitytfour(!passwordVisibilitytfour);
      setText('Camera-on')
      setImage(images.speker_off)
    }
  };
  
  // const handlePasswordVisibilityfour = () => {
    

  return {
    passwordVisibilitytwo,
    passwordVisibilitytwoth,
    passwordVisibility,
    passwordVisibilitytfour,
    rightIcon,
    rightIcontwo,
    rightIconfour,
    rightIcontwoth,
    text,
    imageset,
    handlePasswordVisibility,
    handlePasswordVisibilitytwo,
    handlePasswordVisibilitytwoth,
    handlePasswordVisibilityfour,
    handlePasswordVisibilityfive,
  };
};