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
                navigateTo: null
            },
            {
                name: 'Immunization',
                icon: 'linode',
                navigateTo: null
            }
        ]
    }
]