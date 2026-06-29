"use client";

import { useState } from "react";

const fakeUsers = [
  { email: "a@test.com", password: "1234" },
  { email: "b@test.com", password: "abcd" },
];

function checkLogin(email:string, password:string){
    return fakeUsers.some(u=> u.email === email && u.password === password)
}

export default function FakeLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState<string | null>(null);

    return(
        <div>
            <h1>Exercise 4: Fake login check</h1>
            <input value={email} onChange={e=> setEmail(e.target.value)} placeholder="Enter email"></input>
            <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter password" />
            
            <button onClick={()=> setResult(checkLogin(email,password) ? 'valid' : 'invalid')}>Check</button>

            {result && <p>{result}</p>}
        </div>
    )
    
}
