import { useState } from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';
import Home from 'pages/home';
import Posts from 'pages/posts';
import PostPage from 'pages/posts/detail';
import NewPost from 'pages/posts/new';
import EditPost from 'pages/posts/edit';
import ProfilePage from 'pages/profile';
import Login from 'pages/login';
import Signup from 'pages/signup';

interface RouterProps {
  isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/posts' element={<Posts />} />
            <Route path='/posts/:id' element={<PostPage />} />
            <Route path='/posts/new' element={<NewPost />} />
            <Route path='/posts/edit/:id' element={<EditPost />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='*' element={<Navigate replace to='/' />} />
          </>
        ) : (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='*' element={<Login />} />
          </>
        )}
      </Routes>
    </>
  );
}
