import { StarIcon } from '@heroicons/react/solid';
import React from 'react'
import CurrencyFormat from 'react-currency-format';
import Image from 'next/image'
import { addToBasket, selectItems,removeFromBasket } from '../slices/basketSlice';
import { useDispatch } from 'react-redux';

function CheckoutProduct({ id, title, price, image, category, description, hasPrime, rating }) {
    const dispatch = useDispatch();
    const addItemToBasket = (basket) => {
        // const product={id:{id},title:{title}, price:{price}, rating:{rating}, image:{image}, category:{category},description:{description},hasPrime};
        const product = { id, title, rating, price, image, category, description, hasPrime }
        dispatch(addToBasket(product))
    }
    const removeItemFromBasket = (basket) => {
        //remove particular item from redux
        dispatch(removeFromBasket({id}))
    }
    return (
        <div className='grid grid-cols-5'>
            <img src={image} alt='...' height={200} width={200} objectFit='contain' />
            <div className='col-span-3 mx-5'>
                <p>{title}</p>
                <div className='flex'>{Array(rating).fill().map((_, i) => (
                    <StarIcon className='h-5 text-yellow-500' />
                ))}</div>
                <p className='text-sm my-2 line-clamp-2'>{description}</p>
                <CurrencyFormat value={price} prefix={'$'} />
                {hasPrime && (
                    <div className='flex items-center space-x-2'>
                        <img loading='lazy' src='https://links.papareact.com/fdw' alt='...' className='w-12' />
                        <p className='text-xs text-gray-500'>Free Next-day Delivery</p>
                    </div>
                )}
            </div>
            <div className='flex-col flex space-y-2 my-auto justify-self-end'>
                <button className='button' onClick={addItemToBasket}>Add to Basket</button>
                <button className='button' onClick={removeItemFromBasket}>Remove from Basket</button>
            </div>


        </div>
    )
}

export default CheckoutProduct