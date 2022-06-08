import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '../lib/initSupabase'
import { useRouter } from 'next/router'

export default function LoginAdmin() {

    const [ email, setEmail ] = useState('') 
    const [ université, setUniversité ] = useState('')
    const [ code, setCode ] = useState('')

    const router = useRouter()

    function login() {

        //addRecord()
          setTimeout(() => router.push('/admin-dashboard'), 1500)
   
    }
    /*
    async function addRecord() {
        const { data:admin, error } = await supabase
        .from('admin')
        .update([
            { nom: firstName, université: université, email: email, code: code }
        ]) 
        .match([
            'nom:'
        ])
    }
    */


    return (
        <div>
              

              <div className="flex flex-col items-start justify-center w-4/5 xl:w-1/2">
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
              <div className="flex flex-col items-start justify-center w-4/5 xl:w-1/2">
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
              <div className="w-1/2 my-3">
                <label labelfor="universités" className="text-md font-bold mb-3 text-gray-800">
                  Choisissez votre université
                </label>
                <select 
                  name="universités" 
                  onChange={e => setUniversité(e.target.value)} 
                  value={université} 
                  id="universités" 
                  className="relative shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="Université Chouaib Doukkali - Fac des Sciences El Jadida">
                    Université Chouaib Doukkali - Fac des Sciences El Jadida
                  </option>
                  <option value="Université Chouaib Doukkali - Fac des Lettres El Jadida">
                    Université Chouaib Doukkali - Fac des Lettres El Jadida
                  </option>
                 
                </select>
                </div>
              <button 
                   onClick={login}
                  className="rounded-3xl bg-amber-400 hover:bg-amber-300 focus:ring-4 focus:outline-none focus:ring-offset-2 focus:ring-amber-300 w-4/5 xl:w-1/2 py-2 px-5"
              >
                  <a className="text-gray-800 text-center mx-auto font-Ubuntu text-lg font-semibold">
                    Créer un compte
                  </a> 
                </button>
            
    </div>
    )
}