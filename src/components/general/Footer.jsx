import Cat from "../../images/cat.png"

export default function Footer(){
    return (
        <footer>
            Copyright ©2024 "PAPER API". Все права защищены.
            <img src={Cat} className="footer-cat" alt="cat-image"/>
        </footer>
    )
}