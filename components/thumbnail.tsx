import React from 'react'
import Image from 'next/image'
import { Movie } from 'types'

interface Props {
  movie: Movie
}

const Thumbnail: React.FC<Props> = ({ movie }) => {
  return (
    <div className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105'>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${
          movie.backdrop_path || movie.poster_path
        }`}
        className='rounded-sm object-cover md:rounded'
        layout='fill'
      />
    </div>
  )
}

export default Thumbnail