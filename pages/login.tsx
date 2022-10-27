import Head from 'next/head'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import useAuth from 'context/auth'

interface Inputs {
  email: string
  password: string
}

const Login = () => {
  const { signin } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = data =>
    signin(data.email, data.password)

  return (
    <div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
      <Head>
        <title>Login - Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Image
        src='/login-bg.jpg'
        layout='fill'
        className='-z-10 !hidden opacity-60 sm:!inline'
        objectFit='cover'
      />

      <img
        src='/netflix.svg'
        alt='netflix-logo'
        height={100}
        width={100}
        className='absolute left-4 top-4 md:left-10 md:top-6 cursor-pointer object-contain'
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'>
        <h1 className='text-4xl font-semibold'>Sign In</h1>
        <div className='space-y-4'>
          <label className='inline-block w-full'>
            <input
              type='email'
              placeholder='Email'
              className='input'
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className='p-1 text-[13px] font-sm text-orange-500'>
                Please enter valid email
              </span>
            )}
          </label>

          <label className='inline-block w-full'>
            <input
              type='password'
              placeholder='Password'
              className='input'
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className='p-1 text-[13px] font-sm text-orange-500'>
                Please enter a password
              </span>
            )}
          </label>
        </div>

        <button
          type='submit'
          className='w-full rounded bg-[#e50914] py-3 font-semibold'>
          Sign in
        </button>

        <div className='text-[gray]'>
          New to Netflix?{' '}
          <button className='text-white hover:underline'>Sign up now</button>
        </div>
      </form>
    </div>
  )
}

export default Login
