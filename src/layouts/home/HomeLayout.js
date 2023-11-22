import Header from '../../components/partials/Header';
import Footer from '../../components/partials/Footer';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {


    return (
        <>
            <Header
                isShowSearch={true}
            />
            <Outlet />
            <Footer />
        </>
    );
}


export default HomeLayout;