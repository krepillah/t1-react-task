import Logo from "../../images/bird-logo.png"

export default function Header(){
    return (
       <header>
            <img src={Logo} alt="logo with bird" className="image-logo"/>
            <a 
                href="http://193.19.100.32:7000/docs" 
                target="_blank" 
                title="Ссылка на документацию" 
                className="documentation-button" rel="noreferrer">Документация</a>
        </header> 
    );
}