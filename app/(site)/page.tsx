"use client"

import React from 'react';
import Image from 'next/image';

// AddComponents
import AuthForm from './components/AuthForm';

const Auth = () => {
  return (
    <>
      <div
        className='flex min-h-full flex-col justify-center
        py-12 sm:px-6 lg:px-8 font-inter bg-primary-600'
      >
        <div className='sm:mx-auto sm:w-full sm:max-w-md '>
          <Image
            src="/images/logo.png"
            width="48"
            className="mx-auto w-auto"
            height="48"
            alt="Logo"
          />
          <h2
            className="mt-6 text-center text-3xl
            font-bold tracking-tight text-white font-inter
            bg-gradient-to-r from-purple-500 to-blue-500
            text-transparent bg-clip-text"
          >
            Sign in to your account
          </h2>
        </div>
        <AuthForm />
      </div>
    </>
  );
};

export default Auth;
