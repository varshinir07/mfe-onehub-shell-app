import React from 'react';

const ModemAuthorization = React.lazy(() => import('remote1/ModemAuthorization'));
const SecurityPackage = React.lazy(() => import('remote1/SecurityPackage'));

const LabourHourHold = React.lazy(() => import('remote2/LabourHourHold'));
const MobileService = React.lazy(() => import('remote2/MobileService'));

const Card = React.lazy(() => import('remote1/Card'));


const Dashboard = () => {
    return (
        <div style={styles.dashboard}>
            <React.Suspense fallback={<div>Loading...</div>}>
                <ModemAuthorization />
                <SecurityPackage />
                <LabourHourHold />
                <MobileService />

                {/*Using Card from Remote App*/}
                <Card
                    topic="OneHUB"
                    description="Welcome to OneHUB"
                />
            </React.Suspense>

        </div>
    );
};

const styles = {
    dashboard: {
        display: 'flex',
        padding: '20px',
        backgroundColor: '#1e1e1e',
        minHeight: '100vh',
        gap: '20px',
    },
};

export default Dashboard;


