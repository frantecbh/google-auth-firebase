import { GoogleLogo } from 'phosphor-react'

import {GoogleAuthProvider, signInWithPopup, User, signOut} from 'firebase/auth'

import './styles.scss'
import { auth } from '../../services/firebaser'
import { useState } from 'react'


export const Singin = () => {

  const [user, setUser] = useState<User | null>(null)

  function handleGoogleSingOut(){
    signOut(auth).then(() => {
      setUser(null)     
    }).catch((error) => {
      // An error happened.
    });
  }



  function handleGoogleSingIn() {
   
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
    .then((result) => {
      setUser(result.user)
     
    }).catch((error) =>{
      console.log(error)
    })
    

  }


  return (
    <div className="container">

      {
        user !== null ? 

        <div className="userContainer">
        {
          user.photoURL !== null ? <img src={user.photoURL} alt="Foto User" /> :
         
          <img src="" alt="" />
        }
        
  
        <div className='userProfile'>
        <strong>{user.displayName}</strong>
        <small>{user.email}</small>
        </div>
        <button type="button" className="button" onClick={handleGoogleSingOut}>
           Sair
        </button>
       </div>
        
        
        : <> <h1>Acesse sua conta</h1>

        <span>Utilizando a autenticação social com google você <br />
          facilita sua vida permitindo utilizar sua aplicação sem fazer cadastro.
        </span>
        <button type="button" className="button" onClick={handleGoogleSingIn}>
          <GoogleLogo /> Entrar com Google
        </button></>
      }



     
    </div>

  )
}
