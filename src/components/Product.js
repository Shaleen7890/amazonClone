import React, { useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import CurrencyFormat from 'react-currency-format'
import { addToBasket } from '../slices/basketSlice'
import { useDispatch } from 'react-redux';

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, image, category, description }) {
  const dispatch = useDispatch();
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const addItemToBasket = (basket) => {
    const product = ({ id:id, title:title, price:price, image:image, category:category, description:description,hasPrime,rating });
    //Sending the product as an action to the redux store 
    dispatch(addToBasket(product))
  }
  const [hasPrime] = useState(Math.random() < 0.5)
  return (
    <div className='relative flex-col flex  m-5 bg-white z-30 p-10'>
      <p className='absolute top-2 right-0 italic text-xs text-gray-400'>{category}</p>
      <img src={image} height={200} width={200} alt='...' objectFit='contain' />
      <h4 className='my-3'>{title}</h4>

      <p className='flex'>{Array(rating).fill().map((_, i) => (
        <StarIcon className='h-5 text-yellow-500' />
      ))}</p>
      <p className='text-xs my-2 line-clamp-2'>{description}</p>
      <div className='mb-5'>
        <CurrencyFormat value={price} prefix={'Rs.'} />
      </div>
      {hasPrime && (
        <div className='flex items-center space-x-2 -mt-5'>
          <img className='w-14' src='https://links.papareact.com/fdw' alt='...' />
          <p className='text-xs text-gray-500'>Free Next-day Delivery</p>
        </div>
      )}
      <button className='mt-auto button button' onClick={addItemToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product