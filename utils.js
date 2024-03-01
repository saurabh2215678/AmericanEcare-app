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

export const calculateAge = ({AgeString}) => {
    const now = moment();
    const birthDate = moment(AgeString);
    const years = now.diff(birthDate, 'years');
    const months = now.diff(birthDate, 'months') % 12;
    // const age = `${years} year(s), ${months} month(s)`;
    const age = `${years} year`;
    return age;
}