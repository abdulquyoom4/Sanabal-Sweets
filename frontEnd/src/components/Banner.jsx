import sweets from '../assets/bannerpic.webp'

const Banner = () => {
  return (
  <>
    <div className='flex flex-col md:flex-row mt-5'>
        <div className="left md:w-1/2 md:mt-15 order-2 md:order-1 flex flex-col md:pl-3">
            <h3 className='font-bold text-5xl font-cursive '>Satisfy your sweets craving with love and  <span className='text-yellow-500'>Sanabal Sweets</span></h3>
            <p className='font-sans mt-5 hidden md:block text-md'>Welcome to Sanabal Sweets – the place where every bite brings joy! We craft our sweets with love, using only the finest ingredients to make each treat unforgettable. From traditional classics to modern delights, our desserts are perfect for celebrations, gifts, or simply indulging yourself. Come and experience the magic of flavors, where every sweet moment becomes a cherished memory</p>
        </div>
        <div className="right md:w-1/2 flex justify-end order-1 md:order-2 self-center" >
            <img className='w-98 mt-20' src={sweets} alt="" />
        </div>
    </div>
  </>
  )
}

export default Banner
