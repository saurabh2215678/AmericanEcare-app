import axios from "axios";
import { Strings } from "./components/screens/utils";
import moment from "moment";
import mime from 'react-native-mime-types';
// import RNFetchBlob from 'rn-fetch-blob';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import {shareAsync} from "expo-sharing"

export const SideBarData = [
    {
        name: 'Dashboard',
        icon: 'circle',
        navigateTo: 'DashboardScreen'
    },
    {
        name: 'My Information',
        icon: 'user-circle',
        submenu:[
            {
                name: 'Personal Information',
                icon: 'id-card',
                navigateTo: 'EditProfileScreen'
            },
            {
                name: 'Demographic',
                icon: 'free-code-camp',
                navigateTo: 'DemographicScreen'
            },
            {
                name: 'Dependents',
                icon: 'users',
                navigateTo: 'DependentScreen'
            }
        ]
    },
    {
        name: 'My Health Record',
        icon: 'circle',
        submenu:[
            // {
            //     name: 'Primary Doctor',
            //     icon: 'user-md',
            //     navigateTo: null
            // },
            {
                name: 'Insurance',
                icon: 'universal-access',
                navigateTo: 'Insurance'
            },
            {
                name: 'Pharmacy',
                icon: 'hospital-o',
                navigateTo: 'Pharmacy'
            },
            {
                name: 'Immunization',
                icon: 'linode',
                navigateTo: 'Immunization'
             
            },
            {
                name: 'Medication',
                icon: 'leaf',
                navigateTo: 'Medication'
            },
            {
                name: 'Allergy',
                icon: 'forumbee',
                navigateTo: 'Allergy'
            },
            {
                name: 'Diagnosis',
                icon: 'file-text',
                navigateTo: 'Diagnosis'
            },
            {
                name: 'Past Medical History',
                icon: 'medium',
                navigateTo: 'Past Medical History'
            },
            {
                name: 'Past Surgery Histroy',
                icon: 'leaf',
                navigateTo: 'Past Surgery Histroy'
            },
            {
                name: 'Patient Social Histroy',
                icon: 'forumbee',
                navigateTo: 'Patient Social Histroy'
            },
            {
                name: 'OBGYN',
                icon: 'universal-access',
                navigateTo: 'OBGYN'
            },
            {
                name: 'Family History',
                icon: 'leaf',
                navigateTo: 'Family History'
            },
            {
                name: 'Vital History',
                icon: 'linode',
                navigateTo: 'Vital History'
             
            },
            {
                name: 'Documents',
                icon: 'universal-access',
                navigateTo: 'Documents'
            }
        ]
    }
]

export const HitApi = async ({endpoint, data, withStatus = false}) => {
    const API_URL = Strings.baseUrl.url;
    let axiosConfig = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    };

    try {
        const response = await axios.post(API_URL + endpoint, data, axiosConfig);
        if(withStatus){
            const responseData = response.data;
            return responseData;
        }else{
            const responseData = response.data.data;
            return responseData;
        }
    } catch (error) {
        console.error(`Error for endpoint ${endpoint}:`, error);
        throw error;
    }
}

export const calculateAge = ({ AgeString }) => {
    const now = moment();
    const birthDate = moment(AgeString, 'MM/DD/YYYY');
    
    const years = now.diff(birthDate, 'years');
    const months = now.diff(birthDate, 'months') % 12;
    const days = now.diff(birthDate, 'days');
    const hours = now.diff(birthDate, 'hours');
    const minutes = now.diff(birthDate, 'minutes');
    const seconds = now.diff(birthDate, 'seconds');

    let age = '';

    if (years > 0) {
        age = `${years} year`;
    } else if (months > 0) {
        age = `${months} month`;
    } else if (days > 0) {
        age = `${days} day`;
    } else if (hours > 0) {
        age = `${hours} hour`;
    } else if (minutes > 0) {
        age = `${minutes} minute`;
    } else {
        age = `${seconds} second`;
    }

    // Add plural form if the value is greater than 1
    if (age !== '1 second') {
        age += 's';
    }

    return age;
};

export const focusNextInput = (nextInputRef) => {
    nextInputRef.focus();
  };

  const getFileExtension = (fileUrl) => {
    return fileUrl.split('.').pop();
};

export const downloadFile = async (fileUrl) => {
    try {
        const fileExtension = getFileExtension(fileUrl);
        if (!fileExtension) {
            console.error('Could not get the file\'s extension.');
            return null;
        }

        const fileUri = FileSystem.documentDirectory + `downloadedFile.${fileExtension}`;

        
        const { uri } = await FileSystem.downloadAsync(fileUrl, fileUri);
        shareAsync(uri);

        // console.log('File downloaded to:', uri);

        
        // const { status } = await MediaLibrary.requestPermissionsAsync();
        
        // if (status === 'granted') {
        //     const asset = await MediaLibrary.createAssetAsync(uri, {
        //         useLegacyExternalStorage: true,
        //       });
        //     await MediaLibrary.createAlbumAsync('Downloads', asset, false, { useLegacyExternalStorage: true });
        //     console.log('File saved to media library.', asset);
        // } else {
        //     console.error('Permission to save to media library denied');
        // }

        // return uri;
    } catch (error) {
        console.error('Error downloading file:', error);
        throw error;
    }
};


// export const downloadFile = (fileUrl) => {
//   // Get the file name from the URL
//   const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);

//   // Get the mime type based on the file extension
//   const mimeType = mime.lookup(fileName) || 'application/octet-stream';

//   // Start downloading the file
//   RNFetchBlob.config({
//     fileCache: true,
//     addAndroidDownloads: {
//       useDownloadManager: true,
//       notification: true,
//       title: fileName,
//       description: 'Downloading file...',
//       mime: mimeType,
//       mediaScannable: true,
//     },
//   })
//     .fetch('GET', fileUrl, {})
//     .then((res) => {
//       // The file has been downloaded successfully
//       console.log('File downloaded:', res.path());
//     })
//     .catch((error) => {
//       // Handle errors during the download
//       console.error('Error downloading file:', error);
//     });
// };