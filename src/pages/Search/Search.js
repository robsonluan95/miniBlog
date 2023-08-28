import { Link } from 'react-router-dom'
import styles from './Search.module.css'
//Importando hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
import PostDetail from '../../Components/PostDetail/PostDetail'



const Search = () => {
    //Obteendo os parametros da URL
    const query=useQuery()
    //Aqui estamos capturando e mudando a varivel do link
    const search = query.get("q")

    const {documents : posts}=useFetchDocuments("posts", search)
  return (
    <div className={styles.search_container}>
        <h2>Buscas!</h2>
        <div className={styles.noposts}>
            {posts && posts.length === 0 &&(
                <div>
                    <p>Não encontrado posts...</p>
                    <Link to="/ " className="btn btn-outline" >Voltar</Link>
                </div>
                )}
            {posts && posts.map((post)=><PostDetail key={post.id}  post={post}/> )}
        </div>
    </div>
  )
}

export default Search