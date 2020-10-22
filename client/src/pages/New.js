import React from 'react'
import { useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import {formatDate} from '../utils/formatDate'

function New() {
  const {id} = useParams()

  const news = useSelector(({products}) => products.news)

  let _new
  if(news) {
    _new = news.find(e => e._id == id)
  }

  return (
    <div className="min-height-main pl-2 pr-2 xl:pl-24 xl:pr-24 lg:pl-24 lg:pr-24">
      {_new ? <div className="flex flex-col my-4">
            <div>
              <div className='uppercase text-xl font-semibold hover:text-red-400'>{_new.title}</div>
              <div className="uppercase text-xl text-gray-600 my-2">{formatDate(_new.createdAt)}</div>
            </div>
            <img 
            className='w-2/3 object-cover mx-auto'
            src={`/images/${_new.image}`} alt="img"/>
            <div className='my-4'>{_new.content}</div>
            <div>
              <div>Đăng bởi : {_new.authorId.name}</div>
            </div>
          </div> : <div>Loading...</div>}
    </div>
  )
}

export default New
