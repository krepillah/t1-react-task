/*
Компонент для вывода всех карточек, через useEffect выполняется предварительный запрос 
для получения ролей, чтобы пользователь видел контент страницы полностью
*/

import { useState, useEffect} from "react"
import { TakeRoles } from "./Functions";
import About from "./AboutCard";
import TakeRolesCard from "./TakeRolesCard";
import RegistrationCard from "./RegistrationCard";
import TakeCodeCard from "./TakeCodeCard";
import Task from "./TaskCard";

export default function CardList(props){
    const [roles, setRoles] = useState([]);
    const [selected, selectRole] = useState("");

    useEffect(() => {
        TakeRoles(setRoles);
    }, []);

    return (
        <div className="card-block">
            <TakeRolesCard 
                title="Список направлений" 
                buttonName="Показать роли" 
                roles={roles} 
                takeRoles={setRoles}
                selected={selected} 
                selectRole={selectRole}

            />
            <RegistrationCard 
                title="Регистрация" 
                buttonName="Зарегистрироваться" 
                roles={roles} 
                selected={selected} 
                selectRole={selectRole}
            />
            <TakeCodeCard 
                title="Авторизация"
            />
            <About title="О разработчике"/>
            <Task title="Задание"/>
        </div>
    );
}