import { supabase } from '../lib/initSupabase'
import { useState, createContext } from 'react'
import { useRouter } from 'next/router'


export default function Login() {

  const [ emailP, setEmailP ] = useState('')
  const [ emailAdmin, setEmailAdmin ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ université, setUniversité ] = useState('')
  const [ catégorie, setCatégorie ] = useState('')
  const [ codeP, setCodeP ] = useState('')
  const [ codeAdmin, setCodeAdmin ] = useState('')
  const [ suivantClicked, setSuivantClicked ] = useState(false)

  const UserContext = createContext()

  const [ emailGot, setEmailGot ] = useState('')

  const router = useRouter()
 

  async function getProfRecord() {
    const { data: professeur, error } = await supabase
    .from('professeur')
    .select('email, code')
    .eq('nom', firstName)
    
    if (professeur[0].code == codeP && professeur[0].email == emailP) {
      console.log("welcome to your dashboard")
      setTimeout(() => router.push('/professeur-dashboard'), 1000)
    } else if (professeur[0].code == codeP && professeur[0].email != emailP) {
      console.log("wrong email")
    } else if (professeur[0].code != codeP && professeur[0].email == emailP) {
      console.log("wrong code")
    } else if (professeur[0].code != codeP && professeur[0].email != emailP) {
      console.log("wrong credentials")
    }
  }

  async function getAdminRecord() {
    const { data: admin, error } = await supabase
    .from('admin')
    .select('email, code')
    .eq('nom', firstName)
    console.log(admin[0].code)
    if (admin[0].code == codeAdmin && admin[0].email == emailAdmin) {
      console.log("welcome to your dashboard")
      setTimeout(() => router.push('/admin-dashboard'), 1000)
    } else if (admin[0].code == codeAdmin && admin[0].email != emailAdmin) {
      console.log("wrong email")
    } else if (admin[0].code != codeAdmin && admin[0].email == emailAdmin) {
      console.log("wrong code")
    } else if (admin[0].code != codeAdmin && admin[0].email != emailAdmin) {
      console.log("wrong credentials")
    }
  }

  function loginProf() {
    getProfRecord()    
  }

  function loginAdmin() {
    getAdminRecord()
  }


  async function signInWithEmail() {
    const { user, error } = await supabase.auth.signIn({
      email: email
    })
  }


    function greet() {
        let date = new Date()
        let hours = date.getHours()
        if (hours < 18) {
            return "Bonjour"
        } else {
            return "Bonsoir"
        }
    }

    var message = greet()

    return (
      <>
      {
        (suivantClicked == false) &&
        <div className="flex flex-col absolute justify-center items-center w-full h-full bg-orange-300">
          
            <div className="bg-optimistBrand absolute w-full h-full flex justify-center items-center">
              <div className="flex flex-col lg:flex-row h-2/3 shadow-lg relative w-4/5 lg:w-1/3">
                <div className="h-full w-full flex flex-col justify-center items-center bg-white px-1 xl:px-4 py-8 rounded-xl">
                <>
                  <div className="w-1/2 mb-3">
                    <label labelfor="fullname" className="text-md font-bold mb-8 text-gray-800">
                      Nom et Prénom
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        name="fullname"
                        id="fullname"
                        autoComplete="off"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        className="focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 mb-3">
                    <p className="text-md text-gray-800 font-bold mb-3">Etes vous administrateur, professeur ou étudiant?</p>
                    <div onChange={e => setCatégorie(e.target.value)}>
                    <input type="radio" id="admin" name="catégorie" value="Administrateur" className="mr-3" />
                    <label labelfor="admin">Administrateur </label><br />
                    <input type="radio" id="professeur" name="catégorie" value="Professeur" className="mr-3" />
                    <label labelfor="professeur">Professeur </label><br />
                    <input type="radio" id="etudiant" name="catégorie" value="Etudiant" className="mr-3" />
                    <label labelfor="étudiant">Etudiant </label>
                    </div>
                  </div>
                  <div className="w-1/2 mt-3 mb-24 mx-auto">
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
                     onClick={() => setSuivantClicked(true)}
                      type="button"
                      className="rounded-3xl bg-amber-400 hover:bg-amber-300 focus:ring-4 focus:outline-none focus:ring-offset-2 focus:ring-amber-300 w-4/5 xl:w-1/2 py-2 px-5"
                  >
                      <a className="text-gray-800 text-center mx-auto font-Ubuntu text-lg font-semibold">
                        Suivant
                      </a> 
                    </button>
                    </>
                  
                  
                </div>
            </div>
          </div>
        
       
        </div>
        }
        { 

          (suivantClicked && catégorie == "Professeur") &&
        
          <div className="flex flex-col absolute justify-center items-center w-full h-full bg-orange-300">
            <div className="bg-optimistBrand absolute w-full h-full flex justify-center items-center">
              <div className="flex flex-col lg:flex-row h-2/3 shadow-lg relative w-4/5 lg:w-1/3">
                <div className="h-full w-full flex flex-col justify-center items-center bg-white px-1 xl:px-4 py-8 rounded-xl">
                <div className="flex flex-col items-start justify-center mx-auto mb-8 w-1/2">
                <p className="text-2xl mb-5 font-extrabold font-Ubuntu w-full text-gray-700">{message} {firstName}</p>
                <label labelfor="email" className="text-md text-gray-800 font-bold mb-3">Votre Email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  autoComplete="off"
                  className="focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md" 
                  value={emailP}
                  onChange={e => setEmailP(e.target.value)}
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
                  value={codeP}
                  onChange={e => setCodeP(e.target.value)}
                />
              </div>
              
                <div className="mx-auto flex flex-row w-2/3 items-center justify-center">
              <button 
                type="button"
                   onClick={loginProf}
                  className="rounded-3xl bg-amber-400 hover:bg-amber-300 focus:ring-4 focus:outline-none focus:ring-offset-2 focus:ring-amber-300 w-1/2 py-2 px-5"
              >
                  <a className="text-gray-800 text-center mx-auto font-Ubuntu text-lg font-semibold">
                    Authentifier
                  </a> 
                </button>
                </div>
                </div>
              </div>
            </div>
          </div>
       
        }
        {
          (suivantClicked && catégorie == "Administrateur") && 
          <div className="flex flex-col absolute justify-center items-center w-full h-full bg-orange-300">
          <div className="bg-optimistBrand absolute w-full h-full flex justify-center items-center">
            <div className="flex flex-col lg:flex-row h-2/3 shadow-lg relative w-4/5 lg:w-1/3">
              <div className="h-full w-full flex flex-col justify-center items-center bg-white px-1 xl:px-4 py-8 rounded-xl">
              <div className="flex flex-col items-start justify-center mx-auto mb-8 w-1/2">
              <p className="text-2xl mb-5 font-extrabold font-Ubuntu w-full text-gray-700">{message} {firstName}</p>
              <label labelfor="email" className="text-md text-gray-800 font-bold mb-3">Votre Email</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                autoComplete="off"
                className="focus:ring-indigo-500 focus:border-indigo-500 w-full sm:text-sm border-gray-300 rounded-md" 
                value={emailAdmin}
                onChange={e => setEmailAdmin(e.target.value)}
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
                value={codeAdmin}
                onChange={e => setCodeAdmin(e.target.value)}
              />
            </div>
            
              <div className="mx-auto flex flex-row w-2/3 items-center justify-center">
            <button 
              type="button"
                 onClick={loginAdmin}
                className="rounded-3xl bg-amber-400 hover:bg-amber-300 focus:ring-4 focus:outline-none focus:ring-offset-2 focus:ring-amber-300 w-1/2 py-2 px-5"
            >
                <a className="text-gray-800 text-center mx-auto font-Ubuntu text-lg font-semibold">
                  Authentifier
                </a> 
              </button>
              </div>
              </div>
            </div>
          </div>
        </div>
        }
        </>
    )
}