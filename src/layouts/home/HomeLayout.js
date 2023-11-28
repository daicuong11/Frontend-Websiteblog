import Header from '../../components/partials/Header';
import Footer from '../../components/partials/Footer';
import { Outlet } from 'react-router-dom';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import { useState } from 'react';

const HomeLayout = () => {

    const [isLoading, setIsLoading] = useState(true);

    setTimeout(() => {
        setIsLoading(false)
    }, 1000);

    if (isLoading) {
        return (
            <div className='fixed top-[50%] left-[50%]'>
                <div className='flex items-center justify-center'>
                    <LoadingSpinner className={'w-6 h-6'} />
                </div>
            </div>
        )
    }

    return (
        <>
            <Header
                isShowSearch={true}
            />
            <div className='min-h-screen mt-[66px]'>
            <Outlet />
            </div>
            <Footer />
        </>
    );
}


export default HomeLayout;