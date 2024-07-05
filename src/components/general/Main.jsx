import CardList from "../CardList";

export default function Main(){
    return(
        <main>
            <div className="title-block">
                <h1>Добро пожаловать на <span className="highlighted">Paper API.</span></h1>
                <p>Здесь Вы можете протестировать запросы и зарегистрироваться в системе.</p>
            </div>
            <CardList/>
        </main>
    );
}