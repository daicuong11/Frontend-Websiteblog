import Header from '../../components/partials/Header';
import Footer from '../../components/partials/Footer';
import { Outlet } from 'react-router-dom';

const NewPostLayout = () => {

    return (
        <>
            <Header isShowBtnPublish={true} />
            <Outlet />
            <Footer />
        </>
    );
}


export default NewPostLayout;