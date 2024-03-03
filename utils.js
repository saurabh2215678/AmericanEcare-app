import axios from "axios";
import { Strings } from "./components/screens/utils";
import moment from "moment";

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
                name: 'Personal Information x',
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
            {
                name: 'Primary Doctor',
                icon: 'user-md',
                navigateTo: null
            },
            {
                name: 'Insurance',
                icon: 'universal-access',
                navigateTo: 'InsuranceScreen'
            },
            {
                name: 'Pharmacy',
                icon: 'hospital-o',
                navigateTo: 'PharmacyScreen'
            },
            {
                name: 'Immunization',
                icon: 'linode',
                navigateTo: 'ImmunizationScreen'
             
            },
            {
                name: 'Medication',
                icon: 'leaf',
                navigateTo: 'MedicationScreen'
            },
            {
                name: 'Allergy',
                icon: 'forumbee',
                navigateTo: 'AllergyScreen'
            },
            {
                name: 'Diagnosis',
                icon: 'file-text',
                navigateTo: 'DiagnosisScreen'
            },
            {
                name: 'Past Medical History',
                icon: 'medium',
                navigateTo: 'MedicalHistoryScreen'
            },
            {
                name: 'Past Surgery Histroy',
                icon: 'leaf',
                navigateTo: 'PastSurgeryScreen'
            },
            {
                name: 'Patient Social Histroy',
                icon: 'forumbee',
                navigateTo: 'PatientSocialHistory'
            },
            {
                name: 'OBGYN',
                icon: 'universal-access',
                navigateTo: 'ObgynHistory'
            },
            {
                name: 'Family History',
                icon: 'leaf',
                navigateTo: 'FamilyHistory'
            },
            {
                name: 'Vital History',
                icon: 'linode',
                navigateTo: 'VitalHistory'
             
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