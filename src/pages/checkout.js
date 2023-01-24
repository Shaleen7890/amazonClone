import React from 'react'
import Header from '../components/Header'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { selectItems, selectTotal } from '../slices/basketSlice'
import CheckoutProduct from '../components/CheckoutProduct'
import CurrencyFormat from 'react-currency-format'
import { useSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
// const stripePromise = loadStripe(process.env.stripe_public_key);

function loadScript(src){
    return new Promise((resolve)=> {
        const script = document.createElement('script')
        script.src=src
        script.onload=()=>{
            resolve(true)
        }
        script.onerror= ()=>{
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

function Checkout() {
    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const { data: session } = useSession();

    const loadRazorPay = async () => {
        const res= await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            alert('Razorpay script not loaded make sure to check your internet connection. Are you online?')
            return;
        }
        const options = {
            "key": "rzp_test_FrCF6fMx4En7r6", // Enter the Key ID generated from the Dashboard
            "name": session.user?.name,
            "description": "Test Transaction",
            // "callback_url":"https://www.google.com",
            "amount":"3500",
            // "currency":data.currency,
            // "amount":data.amount,
            "handler": function (response){
                window.location.replace("http://localhost:3000/success");
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
            },
            "prefill": {
                "name": session.user?.name,
                "email": session.user?.email,
            },
            "theme": {
                "color": "#181818"
            }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    
    
        // const stripe = await stripePromise;
  
        //call the backend to create the checkout session
                // const checkoutSession= await axios.post('/api/create-checkout-session',
                // {
                //     items: items,
                //     email: session.user.email
                // }).then(function(response){
                //     return response.json();
                // }).then(function(session){
                //     return stripe.redirectToCheckout({sessionId:checkoutSession.data.id})
                // }).then(function(error){
                //     alert(result.error.message)
                // })

        // Redirect user/customer to stripe checkout
        // const result = await stripe._apiKey.redirectToCheckout({
            
        //     sessionId: checkoutSession.data.id,
        // })
        // if (result.error)
        //     alert(result.error.message)
    }
    return (
        <div className='bg-gray-100'>
            <Header />
            <main className='lg:flex max-w-screen-xl mx-auto'>
                <div className='flex-grow m-5 shadow-sm'>
                    <Image src='https://links.papareact.com/ikj' width={1020} height={250} objectfit='contain' />
                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>{items.length === 0 ? 'Your Basket is Empty!' : 'Shopping Basket'}</h1>
                        <div>
                            {items.map((item, i) => (
                                <CheckoutProduct key={i} id={item.id} rating={item.rating} title={item.title} price={item.price} image={item.image} category={item.category} description={item.description} hasPrime />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col bg-white p-10 shadow-md'>
                    {items.length > 0 && (
                        <>
                            <h2 className='whitespace-nowrap'>Subtotal ({items.length} items):
                                <span className='font-bold'>
                                    <CurrencyFormat value={total} prefix={'Rs.'} />
                                </span>
                            </h2>
                            <button role="link" onClick={loadRazorPay} disabled={!session} className={`button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                {!session ? 'Sign In for Checkout' : 'Proceed to Checkout'}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout
