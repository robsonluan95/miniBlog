//Import CSS
import styles from "./About.module.css"
import { Link } from "react-router-dom"

const About = () => {
  return (
    <div className={styles.about}>
        <h2>
          Sobre o Mini <span>Blog</span>
        </h2>
        <p>Esse projeto consiste em um blog Feito com React no Front-End e Firebase no back-end </p>
        <Link to={"/Posts/Create"} className="btn">Criar Post</Link>
    </div>
  )
}

export default About