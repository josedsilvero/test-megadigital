"use client"

import React, { useEffect, useState } from 'react'

const photos = () => {
    const [photos, setPhotos] = useState([]);
    const [albumName, setAlbumName] = useState();
    let id = 0;
    if (typeof window !== 'undefined')
        id = new URLSearchParams(window.location.search).get('id')
    if (!id)
        //todo: setear rutas para renderizar
        id = 1;
    console.log(id);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums?id=${id}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setAlbumName(data[0]?.title)
            })
    }, []);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setPhotos(data);
            });
    }, []);

    return (
        <div>
            Album:{albumName}
            <div className='grid lg:grid-cols-6 gap-4 p-4'>
                {photos.map((photo) => (
                    <img key={photo.id} src={photo.url} alt={photo.title} width={100} />
                ))}
            </div>
        </div>
    )
}

export default photos