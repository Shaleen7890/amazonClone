import React from 'react'
import Product from './Product'

function ProductFeed({products}) {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
     
         {products?.slice(0,4).map(({title,id,image,price,category,description}) => (
            <Product key={id} id={id} title={title} image={image} price={price} category={category} description={description} />
         ))}

         <img src="https://links.papareact.com/dyz" className='md:col-span-full' alt="" />

         <div className='md:col-span-2'>
         {products?.slice(4,5).map(({title,id,image,price,category,description}) => (
            <Product key={id} id={id} title={title} image={image} price={price} category={category} description={description} />
         ))}
         </div>

         {products?.slice(5,products.length-1).map(({title,id,image,price,category,description}) => (
            <Product key={id} id={id} title={title} image={image} price={price} category={category} description={description} />
         ))}
    </div>
  )
}

export default ProductFeed