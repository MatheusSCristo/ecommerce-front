import FirstBox from './components/FirstBox'
import SecondBox from './components/SecondBox'
import ThirdBox from './components/ThirdBox'

const Home = () => {
  return (
    <div className='flex gap-2 flex-col min-h-screen md:p-5'>
      <FirstBox/>
      <SecondBox/>
      <ThirdBox/>
    </div>
  )
}

export default Home