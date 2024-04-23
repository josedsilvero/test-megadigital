"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import * as XLSX from "xlsx";

const users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setUsers(data);
            });
    }, []);

    function exportUsers() {
        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "Users.xlsx");
    }


    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='flex justify-between p-4'>
                <h2>Users</h2>
                <h2>Bienvenido, Jose</h2>
            </div>
            <div className='p-4'>
                <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={exportUsers} className="group relative h-12 overflow-hidden rounded-md bg-blue-500 px-6 text-neutral-50 transition hover:bg-blue-600">
                            <span className="relative">
                                Export
                            </span>
                            <div className="animate-shine-infinite absolute inset-0 -top-[20px] flex h-[calc(100%+40px)] w-full justify-center blur-[12px]">
                                <div className="relative h-full w-8 bg-white/30">
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                        <span>Name</span>
                        <span className='sm:text-left text-right'>Email</span>
                        <span className='hidden md:grid'>Phone</span>
                        <span className='hidden sm:grid'>WebPage</span>
                    </div>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                                <div className='flex items-center'>
                                    <div className='bg-purple-100 p-3 rounded-lg'>
                                        <Link href={'/${id}'}>{user.name}</Link>
                                    </div>
                                </div>
                                <p className='text-gray-600 sm:text-left text-right'>{user.email}</p>
                                <p className='hidden md:flex'>{user.phone}</p>
                                <p className='hidden md:flex'>{user.website}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default users;