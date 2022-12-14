'use client';
import Head from 'next/head'
import Image from "next/image";
import {Navigation} from "../components/nav/Navigation"
import Link from "next/link";
import { useRouter } from 'next/router';


export default function Login() {
    const router = useRouter();
    // @ts-ignore
    const submitRegister = async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;
        const cPassword = event.target.cPassword.value;

        const res = await fetch('/api/register', {
            body: JSON.stringify({
                username,
                password,
                cPassword
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        console.log(res.status)
        if (res.status === 400){
            const message = await res.json();
            alert("ERROR: " + message.error);
        } else{
            alert("Account created!");
             router.push('/login')
        }

    };
    return (
        <>
            <Head>
                <title>Mars Win</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <header>
                <Navigation/>
            </header>
            <main>
                <div className={"border-2 w-8/12 ml-auto mr-auto rounded-lg flex bg-white h-96"}>
                    <Image className={"bg-slate-50 p-1"} src={"/login.svg"} width={422} height={324} alt={"login"}/>
                    <div className={"flex mr-auto ml-auto flex-col w-6/12"}>
                        <h2 className={"mr-auto mt-1 mb-2 p-5  ml-auto text-black text-2xl"}>Create Account</h2>
                        <form className={"flex flex-col"} onSubmit={submitRegister}>
                            <input className={"bg-gray-50 mb-3 text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-slate-50 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"} name={"username"} type="text" placeholder={"Username"}/>
                            <input className={"bg-gray-50 mb-3 text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-slate-50 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"} name={"password"} type="password" placeholder={"Password"}/>
                            <input className={"bg-gray-50 mb-3 text-black border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-slate-50 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"} name={"cPassword"}  type="password" placeholder={"Confirm Password"}/>
                            <input className={"m-1  mr-5 ml-5 btn-red rounded-lg"} type="submit" value={"Register"}/>
                            <Link className={"ml-auto mr-auto text-black underline mb-3"} href={"/login"}>Already account?</Link>

                        </form>
                    </div>
                </div>
            </main>

        </>
    )
}

