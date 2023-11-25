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


function App() {
  return (
    <MyContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path='/article/:articleID' element={<ArticleDetailsPage />} />
            <Route path='/user/info/:userID' element={<InfoPage />} />
          </Route>
          <Route path='/' element={<NewPostLayout />}>
            <Route path='/new_post/blog' element={<NewPostPage typePost={'blog'} />} />
            <Route path='/new_post/entertainment' element={<NewPostPage typePost={'entertainment'} />} />
          </Route>
          <Route path='/admin' element={<HomeLayout />}>
            <Route index element={<UserManagement />} />
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
