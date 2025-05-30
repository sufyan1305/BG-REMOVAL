import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import BgSlider from '../components/BgSlider'
import Testimonials from '../components/Testimonials'
import Upload from '../components/Upload'
import ScrollProgressBar from '../components/ScrollProgressBar'


const Home = () => {
  return (
    <div>
      <ScrollProgressBar/>
      <Header/>
      <Steps/>
      <BgSlider/>
      <Testimonials/>
      <Upload/>
    </div>
  )
}

export default Home
