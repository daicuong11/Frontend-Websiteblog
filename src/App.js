import './index.css';
import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import HomeLayout from './layouts/home/HomeLayout';
import HomePage from './pages/home/HomePage';
import UserManagement from './pages/admin/UserManagement';
import ArticleDetailsPage from './pages/article_details/ArticleDetailsPage';
import NotFound from './components/project/not_found/NotFound';
import NewPostPage from './pages/new_post/NewPostPage';
import NewPostLayout from './layouts/new_post/NewPostLayout';
import { ToastContainer } from 'react-toastify';
import { MyContextProvider } from './components/project/context/MyContextProvider';
import InfoPage from './pages/info/InfoPage';
import AccountManagement from './pages/admin/Account/AccountManagement';
import AccountEdit from './pages/admin/Account/AccountEdit';
import ArticleManagement  from './pages/admin/Article/ArticleManagement';
import AdminLayout from './layouts/Admin/AdminLayout';
import MyPage from './pages/my_page/MyPage';
import ChangePassword from './pages/change-password/ChangePassword';
function App() {
  return (
    <MyContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path='/article/:articleID' element={<ArticleDetailsPage />} />
            <Route path='/user/info/:userID' element={<InfoPage />} />
            <Route path='/user/change-password' element={<ChangePassword />} />
            <Route path='/user/saved-article' element={<MyPage />} />
          </Route>
          <Route path='/not-found' element={<NotFound />} />
          <Route path='/' element={<NewPostLayout />}>
            <Route path='/new_post/blog' element={<NewPostPage typePost={'blog'} />} />
            <Route path='/new_post/entertainment' element={<NewPostPage typePost={'entertainment'} />} />
          </Route>
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AccountManagement />} />
            <Route path='user/edit/:userID' element={<AccountEdit/>} /> 
            <Route path='user/add' element={<AccountEdit/>} />
          </Route>
          <Route path='/admin/articles' element={<AdminLayout />}>
            <Route index element={<ArticleManagement />} />
            <Route path='article/edit/:userID' element={<AccountEdit/>} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <div>
        <ToastContainer />
      </div>
    </MyContextProvider>

  );
}

export default App;
