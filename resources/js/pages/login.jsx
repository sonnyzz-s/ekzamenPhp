
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   async function login(e) {
    e.preventDefault();

    await fetch('/sanctum/csrf-cookie', {
        credentials: 'include'
    });

    const response = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    });

    const data = await response.json();

   if (response.ok) {
    router.visit('/tasks');
    } 
    else {
        alert(data.message);
    }
}
    return (
        <>
            <Head title="login" />

            <div className="mx-auto max-w-md p-6">

                <h1 className="mb-6 text-3xl font-bold">login </h1>

                <form onSubmit={login} className="space-y-4">

                    <div>
                        <label className="block mb-1"> name </label>

                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded border px-3 py-2"/>
                    </div>

                    <div>
                        <label className="block mb-1">email </label>

                        <input  type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded border px-3 py-2"/>
                    </div>

                    <div>
                        <label className="block mb-1"> password </label>

                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}className="w-full rounded border px-3 py-2"/>
                    </div>

                    <button type="submit" className="rounded bg-blue-500 px-5 py-2 text-white">Login</button>

                </form>

            </div>
        </>
    );
}

