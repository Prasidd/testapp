import crypto from 'crypto';
import { NextResponse } from 'next/server';

const secret = 'practice-secret';

function base64url(obj : object){
 return btoa(JSON.stringify(obj)).replace(/\+/g, '-')
 .replace(/\//g, '_')
 .replace(/=/g, '');   
}

function sign (data: string){
    return crypto.createHmac('sha256',secret)
    .update(data)
    .digest('base64')
    .replace(/\+/g,'-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export async function GET(){
    const header = {alg : 'HS256', typ :'JWT'};
    const payload = {
        sub : 'nepali-dev',
        role : 'student',
        exp : Math.floor(Date.now()/1000) + 60
    }

    const encodedHeader = base64url(header);
    const encodedPayload = base64url(payload);
    const signature = sign(encodedHeader + '.' + encodedPayload);

    const token = encodedHeader + '.' + encodedPayload + '.' + signature;

    return NextResponse.json({token});
}