"use-client";

import axios from "axios";
import React, { useState, useCallback, useEffect } from 'react';
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

import { toast } from "react-hot-toast";
import AuthSocialButton from "./AuthSocialButton";
import Input from "../../components/inputs/Input";
import Button from "@/app/components/Button";
import { BsGithub, BsGoogle  } from 'react-icons/bs';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {

    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(session?.status === 'authenticated') {
            router.push('/conversations');
        } else {
            setVariant('LOGIN');
        }
    },[session?.status, router]);

    const toggleVariant = useCallback(() => {
        if(variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            axios.post('/api/register', data)
            .then(() => signIn('credentials', {
                ...data,
                redirect: false,
            }))
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid credentials!');
                }

                if (callback?.ok) {
                    toast.success("Register successfully 😊");
                    router.push('/conversations')
                }
            })
            .catch(() => toast.error('Something went wrong 😞'))
            .finally(() => setIsLoading(false))
        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid credentials 😞');
                }

                if (callback?.ok) {
                    toast.success("Login is successfully 😊");
                    router.push('/conversations')
                }
            })
            .finally(() => setIsLoading(false))
        }
    };

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, {
            redirect: false,
        })
            .then((callback) => {
                if(callback?.error) {
                    toast.error("Invalid credentials 😞");
                }

                if(callback?.ok) {
                    toast.success("Login is successfully 😊");
                    router.push("/conversations");
                }
            }).finally(() => setIsLoading(false));
    };

    return (
        <>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md form-container'>
                <div
                    className='bg-white px-4 py-8 shadow-lg
                    sm:rounded-lg sm:px-10'
                >
                    <form
                        className='space-y-6'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {variant === 'REGISTER' && (
                            <Input
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required="Please enter the field"
                                id="name"
                                label="Name"
                            />
                        )}
                        <Input
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required="Please enter the field"
                            id="email"
                            label="Email address"
                            type="email"
                        />
                        <Input
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required={""}
                            id="password"
                            label="Password"
                            type="password"
                        />
                        <div>
                            <Button
                                disabled={isLoading}
                                fullWidth
                                type="submit"
                            >
                                {variant === 'LOGIN' ? 'Sign In' : 'Register'}
                            </Button>
                        </div>
                    </form>

                    {/* Social Media Auth */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                        </div>
                        <div className="relative flex justify-center text-lg">
                            <span
                                className="bg-white mt-2 px-2
                                text-gray-500 font-semibold cursor-pointer"
                            >
                                Or continue with
                            </span>
                        </div>
                        <div className="mt-6 flex gap-2">
                            <AuthSocialButton
                                icon={BsGithub}
                                onClick={() => socialAction('github')}
                            />
                            <AuthSocialButton
                                icon={BsGoogle}
                                onClick={() => socialAction('google')}
                            />
                        </div>
                    </div>
                    <div
                        className="flex gap-2 justify-center text-sm
                        mt-6 px-2 text-gray-bg-secondary-500"
        >
                        <div>
                            {variant === 'LOGIN'
                                ? 'New to Messenger?'
                                : 'Already have an account?'
                            }
                        </div>
                        <div
                            onClick={toggleVariant}
                            className="underline cursor-pointer text-[#fb8500]"
                        >
                            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthForm;
