import React, {useState} from "react";

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordVisibilitytwo, setPasswordVisibilitytwo] = useState(true);
  const [passwordVisibilitytwoth, setPasswordVisibilitytwoth] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye-off');
  const [rightIcontwo, setRightIcontwo] = useState('eye-off');
  const [rightIcontwoth, setRightIcontwoth] = useState('eye-off');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye') {
      setRightIcon('eye-off');
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
  return {
    passwordVisibilitytwo,
    passwordVisibilitytwoth,
    passwordVisibility,
    rightIcon,
    rightIcontwo,
    rightIcontwoth,
    handlePasswordVisibility,
    handlePasswordVisibilitytwo,
    handlePasswordVisibilitytwoth
  };
};