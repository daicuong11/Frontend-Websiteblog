import Header from '../../components/partials/Header';
import Footer from '../../components/partials/Footer';
import { Outlet } from 'react-router-dom';
import { useMycontext } from '../../components/project/context/MyContextProvider';
import { useEffect } from 'react';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import { useState } from 'react';

const NewPostLayout = () => {
    const { currentUser, setCurrentUser, listDataContent, setListDataContent, isModalOpenLogin, setIsModalOpenLogin, isUnauthorized, setUnauthorized, resetUnauthorized } = useMycontext();

    // console.log( 'current',isUnauthorized);

    useEffect(() => {
        if(isUnauthorized){
            setIsModalOpenLogin(true);
        }
    }, []);

    if (isUnauthorized) {
        return <>
            <Header />
            <div className='text-center mt-[25%] text-orange-600'>Vui lòng đăng nhập</div>
        </>;
    }

    return (
        <>
            <Header isShowBtnPublish={true} />
            <div className=''>
            <Outlet />
            </div>
            <Footer />
        </>
    );
}


export default NewPostLayout;