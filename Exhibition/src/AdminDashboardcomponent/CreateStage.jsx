import React from 'react'

export default function CreateStage() {
  return (
    <>
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-[16px] text-center font-semibold text-blue-600 mb-6">Create New Stage</h2>
      
      <div className="space-y-6">
        <div className="flex justify-center">
          <input type="text" className="w-[80%] md:w-[100%] text-center border-[2px] border-gray-300 rounded-lg p-2" name="exhibitionName" placeholder="Enter Exhibition Name" />
        </div>
        <div className="flex justify-center">
          <input type="number" className="w-[100%] text-center border-[2px] border-gray-300 rounded-lg p-2"  placeholder="Enter number of staff required" />
        </div>

        <div className="flex justify-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-[7px] hover:bg-blue-500 transition">Create Stage </button>
        </div>
      </div>
    </div>    
    </>
  )
}
