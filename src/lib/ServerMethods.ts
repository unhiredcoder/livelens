import { headers } from 'next/headers'


export async function getPosts() {
    const headersList = headers()

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts`, { cache: "no-store", headers: headersList })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const Response = await res.json()
    return Response?.data;
}


export async function getUserPosts() {
    const headersList = headers()

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/post`, { cache: "no-store", headers: headersList })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const Response = await res.json()
    return Response?.data;
}

export async function getUsers() {
    const headersList = headers()
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`, { cache: "no-store", headers: headersList })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const Response = await res.json()
    return Response?.data;
}

// getting single post based on id

export async function getPost(id:number) {
    const headersList = headers()

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${id}`, { cache: "no-store", headers: headersList })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const Response = await res.json()
    return Response?.data;
}


export async function getUserComments() {
    const headersList = headers()
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/comment`, { cache: "no-store", headers: headersList })
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }
    const Response = await res.json()
    return Response?.data;
}