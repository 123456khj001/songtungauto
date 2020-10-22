import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

function Brands() {
  const brands = useSelector(({products}) => products.brands)
  return (
    <div className="border">
      <div className="bg-red-800 text-white uppercase p-2 font-bold shadow-lg">
        danh mục sản phẩm
      </div>
      <div className="list-disc">
        {!!brands ? brands.map((brand, index) => (
          <Link to={`/brands/${brand.slug}`} key={index} className="flex hover:text-white items-center border pt-4 pb-4 uppercase cursor-pointer hover:bg-red-400">
            <img className="w-10 h-auto mr-4 ml-8" src={`/images/${brand.image}`} alt="logo"/>
            <div className='font-bold'>{brand.name}</div>
          </Link>
        )) : null }
      </div>
    </div>
  )
}

export default Brands
