import React, { useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import AddOrganizationForm from 'src/views/onboarding/AddOrganizationForm';
import OrganizationNameForm from 'src/views/onboarding/OrganizationNameForm';
import OnboardingInProgressCard from 'src/views/onboarding/OnboardingInProgressCard';

function index() {
    const { user } = useAuth();
    const router = useRouter();
    const [organization, setOrganization] = useState();

    useEffect(() => {
        if (user?.organization && user?.role !== 'member') {
            router.push('/');
        }
    }, [])

    if (user?.organization && user?.role === 'member') {
        return <OnboardingInProgressCard organization={organization} />
    } else if (!user?.organization && organization?.name) {
        return <AddOrganizationForm organization={organization} />
    } else {
        return <OrganizationNameForm setOrganization={setOrganization} />
    }
}

export default index