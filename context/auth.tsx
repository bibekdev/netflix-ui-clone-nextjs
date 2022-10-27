import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'
import { toast } from 'react-hot-toast'

interface AuthProviderProps {
  children: React.ReactNode
}

interface IAuth {
  user: User | null
  signin: (email: string, password: string) => Promise<void>
  signout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signin: async (email: string, password: string) => {},
  signout: async () => {},
  error: null,
  loading: false,
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [initalLoading, setInitialLoading] = useState<boolean>(true)
  const router = useRouter()

  // PERSISTING THE USER
  useEffect(
    () =>
      onAuthStateChanged(auth, user => {
        if (user) {
          // LOGGED IN
          setUser(user)
          setLoading(false)
        } else {
          // NO LOGGED IN
          setUser(null)
          setLoading(true)
          router.push('/login')
        }
        setInitialLoading(false)
      }),
    [auth]
  )

  const signin = async (email: string, password: string) => {
    setLoading(true)
    await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setUser(userCredential.user)
        router.push('/')
        setLoading(false)
      })
      .catch(error => toast.error('Something went wrong'))
      .finally(() => setLoading(false))
  }

  const signout = async () => {
    setLoading(true)

    signOut(auth)
      .then(() => setUser(null))
      .catch(error => alert(error.message))
      .finally(() => setLoading(false))
  }

  const memoedValue = useMemo(
    () => ({
      user,
      signin,
      loading,
      signout,
      error,
    }),
    [user, loading]
  )

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initalLoading && children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)
export default useAuth
