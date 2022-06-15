import { supabase } from '../lib/initSupabase'
import { Sidebar_Admin } from '../components/Sidebar_Admin'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function AjouterProfesseur() {

    const [ nomA, setNomA ] = useState('')
    const [ emailA, setEmailA ] = useState('')
    const [ universitéA, setUniversitéA ] = useState('')
    const [ nom, setNom ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ université, setUniversité ] = useState('')
    const [ code, setCode ] = useState('')

    const router = useRouter()

    useEffect(() => {
        getAdminRecord()
      })
    
      async function getAdminRecord() {
          const { data: admin, error } = await supabase
          .from('admin')
          .select('nom, email, code, université')
          .eq('nom', "test")
          setNomA(admin[0].nom)
          setEmailA(admin[0].email)
          setUniversitéA(admin[0].université)
    
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        const { data, error } = await supabase
        .from("professeur")
        .insert([
            {'nom': nom, 'université': université, "email": email, "code": code}
        ])
        setTimeout(() => router.push('/professeurs'), 1500)
      }

    return (
        <div className="flex flex-row relative">
            <Sidebar_Admin nom={nomA} email={emailA} université={universitéA} bgNewProfColor="bg-gray-100" />
            <div className="main-content flex-1 bg-orange-100 pb-24 md:pb-5">
            <div className="bg-gray-800 pt-3">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">Ajouter un professeur</h3>
                </div>
            </div>
            <form className="m-5 flex flex-col">
                <label htmlFor="name" className="mr-3">Nom & Prénom:</label>
                <input 
                  type="text" id="name" name="name" 
                  value={nom} onChange={e => setNom(e.target.value)} required 
                  className="w-128 mb-4" 
                />
                
                <label htmlFor="université" className="mr-3">Université:</label>
                <select 
                  className="w-128 mb-4" name="université" id="université" 
                  value={université} onChange={e => setUniversité(e.target.value)}
                >
                <option>---</option>
                    <option value="Université Chouaib Doukkali - Fac de Sciences">
                        Université Chouaib Doukkali - Fac de Sciences
                    </option>
                    <option value="Université Chouaib Doukkali - Fac de lettres">
                        Université Chouaib Doukkali - Fac de Lettres
                    </option>
                </select>
                
                <label htmlFor="email" className="mr-3">Email:</label>
                <input 
                  type="email" id="email" name="email" 
                  value={email} onChange={e => setEmail(e.target.value)} required 
                  className="w-128 mb-4" 
                />
                <label htmlFor="code" className="mr-3">Code:</label>
                <input 
                  type="text" id="code" name="code" 
                  value={code} onChange={e => setCode(e.target.value)} 
                  required className="w-128 mb-4" 
                />
                <button type="submit" onClick={handleSubmit} 
                  className="rounded-lg bg-green-500 px-3 py-2 w-40 text-Light font-extrabold text-lg"
                >Ajouter</button>
            </form>
            </div>
        </div>
    )
}