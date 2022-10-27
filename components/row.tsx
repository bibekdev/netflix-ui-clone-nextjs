import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import React, { useRef, useState } from 'react'
import { Movie } from 'types'
import Thumbnail from './thumbnail'

interface Props {
  title: string
  movies: Movie[]
}

const Row: React.FC<Props> = ({ title, movies }) => {
  const [isMoved, setIsMoved] = useState<boolean>(false)
  const rowRef = useRef<HTMLDivElement>(null)

  const handleClick = (direction: string) => {
    setIsMoved(true)

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div className='h-40 space-y-0.5 md:space-y-2'>
      <h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl'>
        {title}
      </h2>

      <div className='group relative md:-ml-2'>
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer transition hover:scale-125 opacity-0 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
          onClick={() => handleClick('left')}
        />
        <div
          ref={rowRef}
          className='flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2'>
          {movies?.map(movie => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className='absolute top-0 bottom-0 right-2 z-40 m-auto h-10 w-10 cursor-pointer transition hover:scale-125 opacity-0 group-hover:opacity-100'
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  )
}

export default Row
