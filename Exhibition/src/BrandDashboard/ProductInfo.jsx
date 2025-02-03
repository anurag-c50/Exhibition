import React from 'react'

export default function ProductInfo({ProductData}) {
    console.log(ProductData)
  return (
        <div className='w-full flex justify-around  flex-col items-center bg-white rounded-lg shadow-lg'>
            {ProductData&&ProductData.map((item)=>{return(
                <div className='w-[80%] my-2 pl-1 border-[2px]  border-gray-400 rounded-lg bg-white shadow-lg'>
                <div className='flex flex-col'>
                    <label className='text-sm font-medium text-gray-600' htmlFor='productName'>Product Name:</label>
                    <p id='productName' className='m-0 text-lg font-medium text-gray-800'>{item?.productName}</p>
                </div>
                <div className='flex flex-col'>
                    <label className='text-sm font-medium text-gray-600' htmlFor='productDescription'>Product Description:</label>
                    <p id='productDescription' className=' m-0 text-base text-gray-700'>
                       {item?.productDescription}
                    </p>
                </div>
                <div className='flex flex-col'>
                    <label className='text-sm font-medium text-gray-600' htmlFor='productPrice'>Product Price:</label>
                    <p id='productPrice' className='text-lg m-0 font-medium text-gray-800'>{item?.productPrice} per Product</p>
                </div>
                <div className='flex flex-col'>
                    <label className='text-sm font-medium text-gray-600' htmlFor='productStock'>Product Stock:</label>
                    <p id='productStock' className='text-lg m-0 font-medium text-gray-800'>{item?.productStockQuantity
                    }</p>
                </div>
                <div className='flex flex-col'>
                    <label className='text-sm font-medium text-gray-600' htmlFor='staffPositions'>Product Shell Available Staff Positions:</label>
                    <p id='staffPositions' className='text-lg m-0 font-medium text-gray-800'>50</p>
                </div>
                <div className='m-2 flex justify-center'>
                    <input type='button' className='w-[34%] hover:cursor-pointer px-4 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300' onClick={() => {}} value="Add Visitor Feedback"/>  
                </div>
            </div>)})}
            </div>
  )
}
