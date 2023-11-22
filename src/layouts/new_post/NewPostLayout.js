import Header from '../../components/partials/Header';
import Footer from '../../components/partials/Footer';
import { Outlet } from 'react-router-dom';
import { MyContextProvider} from '../../components/project/context/MyContextProvider';

const NewPostLayout = () => {

    return (
        <MyContextProvider>
            <>
                <Header isShowBtnPublish={true} />
                <Outlet />
                <Footer />
            </>
        </MyContextProvider>
    );
}


export default NewPostLayout;