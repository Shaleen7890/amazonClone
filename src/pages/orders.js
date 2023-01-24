import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import Header from '../components/Header'

function Orders({orders}) {
    const { data: session } = useSession();
    return (
        <div className=''>
            <Header />
            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Your Orders</h1>
                {session ? (
                    <h2>x Orders</h2>
                ): (
                    <h2>Please sign In to see your orders</h2>
                )}
                <div className='mt-5 space-y-4'>
                    
                </div>
            </main>
        </div>
    )
}

export default Orders

// export async function getServerSideProps(context){
//     const session= getSession(context)
//     if(!session){
//         return {
//             props:{},
//         }
//     }
// }
