import { useState } from 'react'

export function EmailSignIn() {
    const [ email, setEmail ] = useState('')
    const [ loading, setLoading ] = useState(false)
    {
        /*
         const handleLogin = async (email) => {
            try {
              setLoading(true)
              const { error } = await supabase.auth.signIn({ email })
              if (error) throw error
              alert('Check your email for the login link')


          } catch (error) {
            alert(error.error_description || error.message)
          } finally {
            setLoading(false)
          }
        }
         */
    }
    

    return (
        <>
          <div className="flex flex-col items-start justify-center w-4/5 xl:w-1/2 mb-10">
            <label labelFor="email" className="text-md text-gray-800 font-bold mb-3">Email</label>
            <input 
                type="email" 
                name="email" 
                id="email" 
                autoComplete="off"
                className="focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md" 
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
          </div>
          
        </>  
    )
}