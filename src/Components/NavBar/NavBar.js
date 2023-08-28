import { NavLink,  } from "react-router-dom"
import styles from "./NavBar.module.css"

//import para fazer a função de autenticação
import { useAuthentication } from "../../hooks/useAuthentication";

//import para pegar valor do contexto
import { useAuthValue } from "../../context/AuthContext";

const NavBar = () => { 
  const {user} = useAuthValue();
  const{ logout}=useAuthentication();

  return (
    <nav className={styles.navbar} >
      
        <NavLink className={styles.brand} to={"/"} >
          Mini<span>Social</span>
        </NavLink>
        <ul className={styles.links_list} >
          <li>
            <NavLink to={"/"} className={({isActive})=>(isActive?styles.active:"")}>Home</NavLink> 
          </li>
          {!user &&(
            <>
              <li>
                <NavLink to={"/Login"} className={({isActive})=>(isActive? styles.active:"")} >Login</NavLink>
              </li>
              <li>
                <NavLink to={"/Register"} className={({isActive})=>(isActive?styles.active:"")}>Cadastrar</NavLink>
              </li>
           </>
          )}
          {user &&(
            <>
              <li>
                <NavLink to={"/Posts/Create"} className={({isActive})=>(isActive? styles.active:"")} >Novo Post</NavLink>
              </li>
              <li>
                <NavLink to={"/Dashboard"} className={({isActive})=>(isActive?styles.active:"")}>Meus Posts</NavLink>
              </li>
           </>
          )}
          <li>
          <NavLink to={"/About"} className={({isActive})=>(isActive?styles.active:"")}>Sobre</NavLink> 
          </li>
          {user && (
            <li>
              <button onClick={logout} >Sair</button>
            </li>
          )}
        </ul>
        
    </nav>
  )
}

export default NavBar