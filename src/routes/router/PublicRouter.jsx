import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../pages/header/Header'
import Footer from '../../components/common/Footer'
import LottieAnimations from '../../components/common/LottieAnimations'
import SuspenseWrapper from '../../components/common/SuspenseWrapper'
import HeartsBackground from '../../components/common/Hearts'

const PublicRouter = () => {
  const hideFooterRoutes = ["/chat", "/login", "/register","/nextstep",  "/payment"];
  const shouldHideLayout = hideFooterRoutes.includes(location.pathname);

  return (
   <>
      {/* <Preloader /> */}
      <HeartsBackground />
      <LottieAnimations />
      {!shouldHideLayout && <Header />}
      <SuspenseWrapper>
        <Outlet />
      </SuspenseWrapper>
     {!shouldHideLayout && <Footer />}
    </>
  )
}

export default PublicRouter