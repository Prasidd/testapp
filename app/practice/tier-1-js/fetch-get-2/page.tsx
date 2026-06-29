'use client';

import { useState } from "react";

export default function FetchGetPractice2Page(){
    const[data,setData] = useState<any[] | null>(null);

    async function handleFetch(){
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await res.json();

        setData(users);
    }

    return (
        <div>
            <h1>Exercise 1b : Fetch GET</h1>
            <button onClick={handleFetch}>FETCH USERS</button>

            {data &&
            (
                <div>
                    <h1>Total number of users : {data.length}</h1>
                    <p>8th users comapny catchphrase : {data[7].company.catchPhrase}</p>
                    <p>4th users latitude : {data[4].address.geo.lat}</p>
                </div>
            )}
        </div>
    )
}

