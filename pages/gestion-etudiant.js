import { supabase } from '../lib/initSupabase'
import { Sidebar_Admin } from '../components/Sidebar_Admin'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import ajouter from '../public/plus.png'
import modifier from '../public/setting.png'
import supprimer from '../public/delete.png'
import Image from 'next/image'

export default function AjouterEtudiant() {

    const [ nomA, setNomA ] = useState('')
    const [ emailA, setEmailA ] = useState('')
    const [ universitéA, setUniversitéA ] = useState('')
    const [ nom, setNom ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ cni, setCni ] = useState('')
    const [ age, setAge ] = useState('')
    const [ cne, setCne ] = useState('')
    const [ code, setCode ] = useState('')
    const [ filiere, setFiliere ] = useState('')
    const [ addClicked, setAddClicked ] = useState(false)
    const [ updateClicked, setUpdateClicked ] = useState(false)
    const [ deleteClicked, setDeleteClicked ] = useState(false)
    const [ groupe, setGroupe ] = useState([])
    const [ mods, setMods ] = useState([])
    const [ mod, setMod ] = useState('')
    const [ courses, setCourses ] = useState([])

    const textRef = useRef()

    const router = useRouter()

    useEffect(() => {
        getAdminRecord()
      })

      useEffect(() => {
        getClasseRecord()
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

      const addStudent = async () => {
        const { data, error } = await supabase
        .from("etudiant")
        .insert([
            {'CNE': cne, 'CNI': cni, "nom": nom, "age": age, "email": email, "filière": filiere, "code": code, "modules": courses}
        ])
        setTimeout(() => router.push('/etudiants'), 800)
      }

      const updateStudent = async () => {
        const { data, error } = await supabase
        .from('etudiant')
        .update({ "CNE": cne, "CNI": cni, "age": age, "email": email, "filière": filiere, "code": code, "modules": courses })
        .match({ "nom": nom })
        setTimeout(() => router.push('/etudiants'), 800)
      }

      const deleteStudent = async () => {
        const { data, error } = await supabase
        .from('etudiant')
        .delete()
        .match({ "nom": nom, "CNE": cne })
        setTimeout(() => router.push('/etudiants'), 800)
        
      }

      const handleChange = (e) => {
        const { value, checked } = e.target
        if (checked) {
            setCourses(courses => courses.concat(value))
            console.log(courses)
        }
        else {
            setCourses(  
                courses => courses.filter(e => e !== value)
            )
        }
      }

      const getClasse = async () => {
        const { data: etudiant, error } = await supabase
        .from('etudiant')
        .select(`
          nom,
          classe (
            name
          )
        `)
        .eq('nom', nom)
        console.log(etudiant[0].classe.name)
      }

      const getClasseRecord = async () => {
        const { data: filiere, error } = await supabase
        .from('filiere')
        .select('name')
        setGroupe(filiere)
      }

      const insertModules = async () => {
        const { data, error } = await supabase
        .from('etudiant')
        .insert([{ modules: ['one', 'two', 'three', 'four'] }])
        .eq('nom', nom)
      }

      const getModuleRecord = async () => {
        const { data: mod, error } = await supabase
        .from('filiere')
        .select('modules[]')
        .eq('name', filiere)
        //setMods(mod)
        setMods(mod[0].modules)
        console.log(mods)
      }

    return (
        <div className="flex flex-row relative">
            <Sidebar_Admin nom={nomA} email={emailA} université={universitéA} bgNewColor="bg-gray-100" />
            <div className="main-content flex-1 bg-orange-100 pb-24 md:pb-5">
            <div className="bg-gray-800 pt-3">
                <div className="rounded-tl-3xl bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
                    <h3 className="font-bold pl-2">Ajouter un étudiant</h3>
                </div>
            </div>
            {
              (addClicked == false && updateClicked == false && deleteClicked == false) && 
              <div className="m-5">
                <ul className="mb-10">
                    <li className="text-lg">- Pour créer un nouveau compte étudiant, cliquez sur &quot;Ajouter&quot; puis remplissez le formulaire avec les infos convenables.</li>
                    <li className="text-lg">- Pour modifier un compte étudiant déjà créé, cliquez d'abord sur &quot;Modifier&quot;, saisissez le nom de l&apos;étudiant que vous voulez modifier et puis remplissez le formulaire</li>
                    <li className="text-lg">- Pour supprimer un compte étudiant, cliquez sur &quot;Supprimer&quot;</li>
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
                <label htmlFor="name" className="mr-3">
                    Nom & Prénom:
                </label>
                <input type="text" id="name" name="name" value={nom} onChange={e => setNom(e.target.value)} required className="w-128 mb-4" />
                <label htmlFor="cni" className="mr-3">
                    CNI:
                </label>
                <input type="text" id="cni" name="cni" value={cni} onChange={e => setCni(e.target.value)} required className="w-128 mb-4" />
                <label htmlFor="cne" className="mr-3">
                    CNE:
                </label>
                <input type="text" id="cne" name="cne" value={cne} onChange={e => setCne(e.target.value)} required className="w-128 mb-4" />
           
                <label htmlFor="filiere" className="mr-3">
                  Filière
                </label>
                <select className="w-128 mb-4" name="filiere" id="filiere" value={filiere} onChange={e => setFiliere(e.target.value)}>
                  {groupe.map(grp => <option id={grp.id} key={grp.id} name={grp.name} value={grp.name}>{grp.name}</option>)}
                </select>
                
                <button type="button" className="bg-orange-400 w-60 rounded-lg px-3 py-3 font-bold text-lg" onClick={getModuleRecord}>Générer les modules</button>

                <label htmlFor="module" className="mr-3 text-lg font-bold">Modules</label>
                  {
                    mods && mods.map(cours => 
                    <div className="flex flex-row items-center mr-3" key={cours.id}> 
                      <input type="checkbox" className="mr-3 rounded-lg text-green-400" onChange={handleChange} name="modules" key={cours.id} id={cours.id} value={cours} />
                      <label htmlFor={cours.id}>{cours}</label> 
                    </div>)
                  }
                <label htmlFor="age" className="mr-3">
                    Age:
                </label>
                <input type="number" id="age" name="age" value={age} onChange={e => setAge(e.target.value)} min="17" required className="w-128 mb-4" />
                <label htmlFor="email" className="mr-3">
                    Email:
                </label>
                <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-128 mb-4" />
                <label htmlFor="code" className="mr-3">
                    Code:
                </label>
                <input type="text" id="code" name="code" value={code} onChange={e => setCode(e.target.value)} required className="w-128 mb-4" />
                <button type="submit" onClick={addStudent} className="rounded-lg bg-green-500 px-3 py-2 w-40 text-Light font-extrabold text-lg mr-3">Ajouter</button>
            </form>
            }
            {
              updateClicked &&
              <form className="m-5 flex flex-col">
                <label htmlFor="name" className="mr-3 mb-2 text-lg font-bold">
                    Nom & Prénom de l&apos;étudiant à modifier:
                </label>
                <input type="text" id="name" name="name" value={nom} onChange={e => setNom(e.target.value)} required className="w-128 mb-4" />
                <p className="text-lg my-5 font-bold">Maintenant remplissez les informations pour cet étudiant</p>
                <label htmlFor="cni" className="mr-3">
                    CNI:
                </label>
                <input type="text" id="cni" name="cni" value={cni} onChange={e => setCni(e.target.value)} required className="w-128 mb-4" />
                <label htmlFor="cne" className="mr-3">
                    CNE:
                </label>
                <input type="text" id="cne" name="cne" value={cne} onChange={e => setCne(e.target.value)} required className="w-128 mb-4" />
                <label htmlFor="filiere" className="mr-3">
                  Filière
                </label>
                <select className="w-128 mb-4" name="filiere" id="filiere" value={filiere} onChange={e => setFiliere(e.target.value)}>
                  {groupe.map(grp => <option id={grp.id} key={grp.id} name={grp.name} value={grp.name}>{grp.name}</option>)}
                </select>
                
                <button type="button" className="bg-orange-400 w-60 rounded-lg px-3 py-3 font-bold text-lg" onClick={getModuleRecord}>Générer les modules</button>

                <label htmlFor="module" className="mr-3 text-lg font-bold">Modules</label>
                  {
                    mods && mods.map(cours => 
                    <div className="flex flex-row items-center mr-3" key={cours.id}> 
                      <input type="checkbox" className="mr-3 rounded-lg text-green-400" onChange={handleChange} name="modules" key={cours.id} id={cours.id} value={cours} />
                      <label htmlFor={cours.id}>{cours}</label> 
                    </div>)
                  }
                <label htmlFor="age" className="mr-3">
                    Age:
                </label>
                <input type="number" id="age" name="age" value={age} onChange={e => setAge(e.target.value)} min="17" required className="w-128 mb-4" />
                <label htmlFor="email" className="mr-3">
                    Email:
                </label>
                <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-128 mb-4" />
                <label htmlFor="code" className="mr-3">
                    Code:
                </label>
                <input type="text" id="code" name="code" value={code} onChange={e => setCode(e.target.value)} required className="w-128 mb-4" />
                <button type="submit" onClick={updateStudent} className="rounded-lg bg-amber-500 hover:bg-amber-400 px-3 py-2 w-40 text-Light font-extrabold text-lg mr-3">Modifier</button>
            </form> 
            }
            {
                deleteClicked &&
                <form className="m-5 flex flex-col">
                <label htmlFor="name" className="mr-3 mb-2 text-lg font-bold">
                    Nom & Prénom de l&apos;étudiant à supprimer:
                </label>
                <input type="text" id="name" name="name" value={nom} onChange={e => setNom(e.target.value)} required className="w-128 mb-4" />
               
                <label htmlFor="cne" className="mr-3 text-lg font-bold">
                    CNE de l&apos;étudiant à supprimer:
                </label>
                <input type="text" id="cne" name="cne" value={cne} onChange={e => setCne(e.target.value)} required className="w-128 mb-4" />
                
                <button type="submit" onClick={deleteStudent} className="rounded-lg bg-red-500 hover:bg-red-400 px-3 py-2 w-40 text-Light font-extrabold text-lg mr-3">Supprimer</button>
            </form> 
            }
            </div>
        </div>
    )
}