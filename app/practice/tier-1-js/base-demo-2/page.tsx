'use client';

import { useState } from "react";

export default function Base64PracticePage(){
    const[encoded, setEncoded] = useState('');
    const [decoed, setDecoded] = useState('')

    function handleEncode(){
        const obj = {subject : 'Nepali', difficulty : 'easy'};
        const jsonString = JSON.stringify(obj);
        const result = btoa(jsonString);
        setEncoded(result);
    }

    function handleDecode(){
        const jsonString = atob(encoded);
        const obj = JSON.parse(jsonString);
        setDecoded(JSON.stringify(obj))
    }

    return(
        <div>
            <h1>Exercise 5b : Base64 Practice</h1>
            <button onClick={handleEncode}>Encode</button>
            <p  style={{ wordBreak: 'break-all' }}>Encoded : {encoded}</p>
             <button onClick={handleDecode}>Decode</button>
            <p  style={{ wordBreak: 'break-all' }}>Decoded : {decoed}</p>
        </div>
    )
}