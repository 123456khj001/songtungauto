import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Footer() {
  const location = useLocation()

  const isAdminRoute = location.pathname.includes('/admin')
  return (
    <>
      {!isAdminRoute ? <div className="relative">
      <div className="mt-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 pl-24 pr-24 pt-4 pb-4 bg-red-800 text-white font-base">
        <div className="pr-4">
          <div>VỀ CHÚNG TÔI</div>
          <p>Sơn Tùng Auto</p>
          <p>Địa chỉ:Số 2 Tôn Thất Thuyết, P. Mỹ Đình 2, Quận Nam Từ Liêm, TP. Hà Nội</p>
        </div>
        <div className="pr-4">
          <div>HƯỚNG DẪN</div>
          <p>ĐẶT HÀNG : 098.590.8888</p>
          <p>GIỜ LÀM VIỆC T2 - CN : 8H00 - 22H00</p>
        </div>
        <div className="pr-4">
          <div>BAN DO</div>
          {/* <p>Sơn Tùng Auto</p>
          <p>Địa chỉ:Số 2 Tôn Thất Thuyết, P. Mỹ Đình 2, Quận Nam Từ Liêm, TP. Hà Nội</p> */}
        </div>
        <div>
          <div>FANPAGE</div>
          {/* <p>Sơn Tùng Auto</p>
          <p>Địa chỉ:Số 2 Tôn Thất Thuyết, P. Mỹ Đình 2, Quận Nam Từ Liêm, TP. Hà Nội</p> */}
        </div>
      </div>
    </div> : null}
    </>
  )
}

export default Footer
