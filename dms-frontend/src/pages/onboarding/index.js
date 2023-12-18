import React, { useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import AddOrganizationForm from 'src/views/onboarding/AddOrganizationForm';
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
    } else {
        return <AddOrganizationForm setOrganization={setOrganization} />
    }
}

export default index