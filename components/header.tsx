import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/solid'

const Header = () => {
  const [scrollY, setScrollY] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setScrollY(true)
      else setScrollY(false)
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <header className={`${scrollY && 'bg-[#141414]'}`}>
      <div className='flex items-center space-x-2 md:space-x-10'>
        <img
          src='/netflix.svg'
          alt='logo'
          width={100}
          height={100}
          className='cursor-pointer object-contain'
        />

        <ul className='hidden space-x-4 md:flex'>
          <li className='header-link'>Home</li>
          <li className='header-link'>TV Shows</li>
          <li className='header-link'>Movies</li>
          <li className='header-link'>New & Popular</li>
          <li className='header-link'>My List</li>
        </ul>
      </div>

      <div className='flex items-center space-x-4 '>
        <MagnifyingGlassIcon className='hidden h-6 w-6 sm:inline cursor-pointer' />
        <p className='hidden lg:inline cursor-pointer'>Kids</p>
        <BellIcon className='h-6 w-6 cursor-pointer' />
        <img
          src='profile.png'
          alt='profile'
          className='cursor-pointer rounded'
        />
      </div>
    </header>
  )
}

export default Header
