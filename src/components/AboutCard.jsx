export default function About(props){
    return(
        <div className="card about">
            <h2>{props.title}</h2>
            <p>Если вдруг у Вас возник вопрос, кто же это сделал,
                то обратиться напрямую к разработчику можно через GitHub: 
                <a href="https://github.com/krepillah" className="email">
                    krepillah
                </a>. Спасибо за классное задание, было интересно даже для себя сделать хорошо. 
                Постарался все учесть, открыт к критике, очень жду обратную связь!
            </p>
        </div>
    );
}