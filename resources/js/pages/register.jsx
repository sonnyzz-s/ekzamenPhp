import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    async function register(e) {
        e.preventDefault();

        await fetch('/sanctum/csrf-cookie', { credentials: 'include'});

        const response = await fetch('/api/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({name: name, email: email, password: password,  password_confirmation: passwordConfirmation})
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
            <Head title="register" />

            <div className="mx-auto max-w-2xl p-6">

                <h1 className="mb-6 text-3xl font-bold"> register </h1>

                <form onSubmit={register} className="space-y-4">

                    <div>
                        <label>name</label>

                        <input type="text" value={name}  onChange={(e) => setName(e.target.value)} className="w-full rounded border px-3 py-2"/>
                    </div>

                    <div>
                        <label>email</label>

                        <input  type="email" value={email}  onChange={(e) => setEmail(e.target.value)} className="w-full rounded border px-3 py-2"/>
                    </div>

                    <div>
                        <label>password</label>

                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded border px-3 py-2" />
                    </div>

                    <div>
                        <label>confirm password</label>
                        <input  type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} className="w-full rounded border px-3 py-2"/>
                    </div>

                    <button type="submit"className="rounded bg-blue-500 px-5 py-2 text-white">register</button>

                </form>

            </div>
        </>
    );
}