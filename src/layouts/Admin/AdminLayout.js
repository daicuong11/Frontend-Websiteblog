import Header from '../../components/partials/Header';
import Footer from '../../components/partials/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
import { useEffect, useState } from 'react';
import { useMycontext } from '../../components/project/context/MyContextProvider';

const AdminLayout = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser, setCurrentUser, listDataContent, setListDataContent, isModalOpenLogin, setIsModalOpenLogin, isUnauthorized, setUnauthorized, resetUnauthorized } = useMycontext();

    // console.log( 'current',currentUser);

    useEffect(() => {
        if (isUnauthorized) {
            setIsModalOpenLogin(true);
        }
    }, []);

    if (isUnauthorized) {
        return <>
            <Header />
            <div className='text-center mt-[25%] text-orange-600'>Vui lòng đăng nhập</div>
        </>;
    }

    if (currentUser && currentUser.role !== 'ADMIN' && window.location.href === 'http://localhost:3000/admin') {
        navigate("/not-found");
    }
    else if (currentUser && (currentUser.role !== 'EDITOR' && currentUser.role !== 'ADMIN') && window.location.href === 'http://localhost:3000/admin/articles') {
        navigate("/not-found");
    }
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
            <div className='min-h-screen mt-[66px] mb-5'>
                <Outlet />
            </div>
            <Footer />
        </>
    );
}


export default AdminLayout;