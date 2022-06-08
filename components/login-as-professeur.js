import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/initSupabase'

export function LoginAsProfesseur(props) {

  

    const [ email, setEmail ] = useState('') 
    const [ université, setUniversité ] = useState('')
    const [ code, setCode ] = useState('')

    const router = useRouter()

    async function addRecord() {
      const { data:professeur, error } = await supabase
      .from('professeur')
      .update([
          { université: université, email: email, code: code }
      ])
      .match('nom', props.name)
    
    }

    function login() {
        addRecord()
        
          setTimeout(() => router.push('/professeur-dashboard'), 1000)
        
    }
    let date = new Date()

    console.log(date.getHours())


    function greet() {
        let date = new Date()
        console.log(date.getHours())
        let hours = date.getHours()
        if (hours < 18) {
            return "Bonjour"
        } else {
            return "Bonsoir"
        }
    }

    var message = greet()

    return (
        <div>

              <div className="flex flex-col items-start justify-center mx-auto mb-8 w-1/2">
                <p className="text-2xl mb-5 font-extrabold font-Ubuntu w-full text-gray-700">{message} {props.name}</p>
                <label labelfor="email" className="text-md text-gray-800 font-bold mb-3">Votre Email</label>
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
              <div className="flex flex-col items-start justify-center mx-auto w-1/2 mb-8">
                <label labelfor="code" className="text-md text-gray-800 font-bold mb-3">Votre Code</label>
                <input 
                  type="text" 
                  name="code" 
                  id="code" 
                  autoComplete="off"
                  className="focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md" 
                  value={code}
                  onChange={e => setCode(e.target.value)}
                />
              </div>
              
                <div className="mx-auto flex flex-row items-center justify-center">
              <button 
                type="button"
                   onClick={login}
                  className="rounded-3xl bg-amber-400 hover:bg-amber-300 focus:ring-4 focus:outline-none focus:ring-offset-2 focus:ring-amber-300 w-1/2 py-2 px-5"
              >
                  <a className="text-gray-800 text-center mx-auto font-Ubuntu text-lg font-semibold">
                    S'authentifier
                  </a> 
                </button>
                </div>
            
    </div>
    )
}