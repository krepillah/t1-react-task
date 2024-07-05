export default function Task(props){
    return(
        <div className="card task">
            <h2>{props.title}</h2>
            <p>
            Реализуй страницу на <span className="highlighted">HTML/CSS/JS/React</span> для вызова всех методов предоставленного API (включая твой метод) и отображения результатов вызова каждого метода.<br/><br/>
            1. Один из компонентов React должен выводить роли, полученные методом /api/get-roles.<br/><br/>
            2. Компонент для отображения токена должен показывать email и маскировать код и полученный токен.<br/><br/>
            </p>
        </div>
    );
}