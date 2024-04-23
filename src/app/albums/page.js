"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link';

const albums = () => {

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setAlbums(data);
            });
    }, []);
    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex justify-between p-4'>
                <h2>Albums</h2>
                <h2>Bienvenido, Jose</h2>
            </div>
            <div className='grid lg:grid-cols-6 gap-4 p-4'>
                {albums.map((album) => (
                    <article key={album.id} className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                        <div className='flex flex-col w-full pb-4'>
                            <div className='bg-purple-100 p-3 rounded-lg'>
                                <Link href={'/photos/?id=' + album.id}>{album.title}</Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default albums