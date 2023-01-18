import React from 'react'
import { MenuIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';

function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    const items = useSelector(selectItems);
    return (
        <header className='sticky top-0 z-50'>
            <div className='flex  items-center bg-amazon_blue pd-1 flex-grow py-2 h-13'>
                <div onClick={() => router.push('/')} className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
                    <img src='https://links.papareact.com/f90' width={150} height={40} objectFit='contain' className='cursor-pointer' />
                </div>
                <div className='hidden items-center h-10 rounded-md flex-grow cursor-pointer sm:flex bg-yellow-400 hover:bg-yellow-500'>
                    <input type='text' className='pd-2 h-full w-6 flex-grow rounded-l-md flex-shrink focus:outline-none px-4' />
                    <SearchIcon className='h-12 p-3' />
                </div>
                <div className='text-white flex items-center text-x5 space-x-6 mx-6 whitespace-nowrap'>
                    <div onClick={!session ? signIn : signOut} className='cursor-pointer link'>
                        <p >{session ? `Hello ${session?.user.name}` : 'Sign In'}</p>
                        <p className='font-bold md:text-sm'>Account & list</p>
                    </div>
                    <div className='cursor-pointer link'>
                        <p>Returns</p>
                        <p className='font-bold md:text-sm'>& Orders</p>
                    </div>
                    <div onClick={() => router.push('/checkout')} className="cursor-pointer relative link flex items-center">
                        <span className='absolute top-0 right-0 md:right-10 text-center rounded-full text-black font-bold h-5 w-5 bg-yellow-400'>{items?.length}</span>
                        <ShoppingCartIcon className='h-10' />
                        <p className='font-bold md:text-sm hidden md:inline mt-2'>Basket</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center space-x-3 pl-6 bg-amazon_blue-light text-white text-sm'>
                <p className='link flex items-center'>
                    <MenuIcon className='h-6 m-2 ' />
                    All
                </p>
                <p className=' link'>Prime Video</p>
                <p className=' link'>Amazon Business</p>
                <p className=' link'>Today's Deal</p>
                <p className='hidden lg:inline link'>Electronics</p>
                <p className='hidden lg:inline link'>Food & Grocery</p>
                <p className='hidden lg:inline link'>Prime</p>
                <p className='hidden lg:inline link'>Buy Again</p>
                <p className='hidden lg:inline link'>Shopper Toolkit</p>
                <p className='hidden lg:inline link'>Health & Personal Care</p>
            </div>
        </header>
    )
}

export default Header