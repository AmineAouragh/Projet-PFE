import { supabase } from '../lib/initSupabase'
import { Sidebar_Admin } from '../components/Sidebar_Admin'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ajouter from '../public/plus.png'
import modifier from '../public/setting.png'
import supprimer from '../public/delete.png'
import Image from 'next/image'

export default function AjouterProfesseur() {

    const [ nomA, setNomA ] = useState('')
    const [ emailA, setEmailA ] = useState('')
    const [ universitéA, setUniversitéA ] = useState('')
    const [ nom, setNom ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ université, setUniversité ] = useState('')
    const [ code, setCode ] = useState('')
    const [ addClicked, setAddClicked ] = useState(false)
    const [ updateClicked, setUpdateClicked ] = useState(false)
    const [ deleteClicked, setDeleteClicked ] = useState(false)

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


      const addProf = async () => {
        const { data, error } = await supabase
        .from("professeur")
        .insert([
          {'nom': nom, 'université': université, "email": email, "code": code}
        ])
        router.push('/professeurs')
      }

      const updateProf = async () => {
        const { data, error } = await supabase
        .from('professeur')
        .update({"université": université, "email": email, "code": code })
        .match({ "nom": nom })
        router.push('/professeurs')
      }

      const deleteProf = async () => {
        const { data, error } = await supabase
        .from('professeur')
        .delete()
        .match({ "nom": nom, "code": code })
        router.push('/professeurs') 
      }

    return (
        <div className="flex flex-row relative">
            <Sidebar_Admin nom={nomA} email={emailA} université={universitéA} bgNewProfColor="bg-gray-100" />
            <div className="main-content flex-1 bg-orange-100 pb-24 md:pb-5">
            <div className="bg-gray-800 pt-3">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">
                     {addClicked && <span>Ajouter un professeur</span>}
                     {updateClicked && <span>Modifier un professeur</span>}
                     {deleteClicked && <span>Supprimer un professeur</span>}
                    </h3>
                </div>
            </div>
            {(addClicked == false && updateClicked == false && deleteClicked == false) && 
            <div className="m-5">
              <ul className="mb-10">
                <li className="text-lg">- Pour créer un nouveau compte professeur, cliquez sur "Ajouter" puis remplissez le formulaire avec les infos convenables.</li>
                <li className="text-lg">- Pour modifier un compte professeur déjà créé, cliquez d'abord sur "Modifier", saisissez le nom du professeur que vous voulez modifier et puis remplissez le formulaire</li>
                <li className="text-lg">- Pour supprimer un compte professeur, cliquez sur "Supprimer"</li>
              </ul>
            <div className="flex flex-col">
            <button type="submit" onClick={() => setAddClicked(true)} className="flex items-center justify-center rounded-lg bg-green-500 hover:bg-green-400 px-3 py-3 w-60 text-Light font-extrabold text-lg mb-3">
                <Image src={ajouter} width={20} height={20} alt="" />
                <span className="ml-3">Ajouter</span>
            </button>
            <button type="submit" onClick={() => setUpdateClicked(true)} className="flex items-center justify-center rounded-lg bg-amber-500 hover:bg-amber-400 px-3 py-3 w-60 text-Light font-extrabold text-lg mb-3">
                <Image src={modifier} alt="" height={20} width={20} />
                <span className="ml-3">Modifier</span>
            </button>
            <button type="submit" onClick={() => setDeleteClicked(true)} className="flex items-center justify-center rounded-lg bg-red-500 hover:bg-red-400 px-3 py-3 w-60 text-Light font-extrabold text-lg">
                <Image src={supprimer} width={20} height={20} alt="" />
                <span className="ml-3">Supprimer</span>
            </button>
            </div>
            </div>
            }
            {
              addClicked &&
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
                <button type="submit" onClick={addProf} 
                  className="rounded-lg bg-green-500 px-3 py-2 w-40 text-Light font-extrabold text-lg"
                >Ajouter</button>
            </form>
            }
            {
              updateClicked &&
              <form className="m-5 flex flex-col">
              <label htmlFor="name" className="mr-3 text-lg font-bold mb-3">Nom & Prénom du professeur à modifier</label>
              <input 
                type="text" id="name" name="name" 
                value={nom} onChange={e => setNom(e.target.value)} required 
                className="w-128 mb-4" 
              />
              <p className="text-lg my-5 font-bold">Maintenant remplissez les informations pour ce professeur</p>
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
              <button type="submit" onClick={updateProf} 
                className="rounded-lg bg-amber-500 hover:bg-amber-600 px-3 py-2 w-40 text-Light font-extrabold text-lg"
              >Modifier</button>
              </form>
            }
            {
              deleteClicked &&
              <form className="m-5 flex flex-col">
              <label htmlFor="name" className="mr-3 text-lg font-bold mb-3">Nom & Prénom du professeur à supprimer</label>
              <input 
                type="text" id="name" name="name" 
                value={nom} onChange={e => setNom(e.target.value)} required 
                className="w-128 mb-4" 
              />
              <p className="mr-3 text-lg font-bold mb-3">Code du professeur à supprimer</p>
              <input 
                type="text" id="code" name="code" 
                value={code} onChange={e => setCode(e.target.value)} 
                required className="w-128 mb-4" 
              />
              <button type="submit" onClick={deleteProf} 
                className="rounded-lg bg-red-500 hover:bg-red-600 px-3 py-2 w-40 text-Light font-extrabold text-lg"
              >Supprimer</button>
              </form> 
            }
            </div>
        </div>
    )
}