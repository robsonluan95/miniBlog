// Import Rotas
import {BrowserRouter , Routes, Route ,Nvagate, UNSAFE_DataRouterContext, Navigate} from "react-router-dom"

//imports do FIREBASE
import { onAuthStateChanged } from "firebase/auth";

//hooks
import { useState,useEffect } from "react";
//import custonHooks
import { useAuthentication} from './hooks/useAuthentication'

import './App.css';
//Import Context 
import {AuthProvider} from "./context/AuthContext"

// Impost Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import NavBar from "./Components/NavBar/NavBar";
import Footer from "./Components/Footer/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreatePost from "./pages/CreatePost/CreatePost";
import Dashboard from "./pages/Dashboard/Dashboard";
import Search from "./pages/Search/Search";
import Post from "./pages/Post/Post";
import EditPost from "./pages/EditPost/EditPost";

function App() {

  //Monitorando o usuario 
  const [user,setUser]= useState(undefined)
  const {auth} = useAuthentication()
  
  //Atribuindo ao estado de carregamento do usuario o valor do usuario( caso seja underfine ele ta carregando )
  const  loadingUser = user === undefined

  useEffect(()=>{
    //Setando o usuario com autenticação
    onAuthStateChanged(auth,(user)=>{
      setUser(user)
    })
  },[auth])

  // Nessa parte gerando uma pagina de carregamento antes do app carregar da API
  if (loadingUser){
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
        <NavBar/>
        <div className="container">
          <Routes>
            //ROTAS PUBLICAS
            
            <Route path="/" element={<Home/>}/>
            <Route path="/Search" element={<Search/>}/>
            <Route path="/About" element={<About/>}/>
            <Route path="/Post/:id" element={<Post/>} />
           {/**<Route path="*" element={<NotFound/>}/> */}
            //ROTAS PRIVADAS
            <Route path="/Login" element={!user? <Login/>: <Navigate to="/"/>}/>
            <Route path="/Register" element={user ? <Navigate to="/"/>:<Register/>}/>
            <Route path="/Posts/Create" element={!user ?<Navigate to="/Login" /> : <CreatePost/>}/>
            <Route path="/Dashboard" element={user? <Dashboard/>: <Navigate to="/Login"/>}/>
            <Route path="/Posts/Edit/:id" element={user?<EditPost/>:<Navigate to="/Login"/>}/>

           
          </Routes>
        </div>
        <Footer/>
        </BrowserRouter>  
      </AuthProvider>
        
    </div>
  );
}

export default App;
