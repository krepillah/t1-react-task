/*
Компонент для регистрации пользователя в системе
получился немного громоздким, но перекроить все после готовности проекта уже не успевал
*/

import { useEffect, useState } from "react";
import { SetData, checkEmail } from "./Functions";
import Button from "./Button";

export default function RegistrationCard(props){
    const initialInputValues = {
        last_name: '',
        first_name: '',
        email: '',
        role: ''
    };
    const [inputValues, setInputValues] = useState(initialInputValues);
    const [alertText, setAlertText] = useState('');
    const [loading, setLoading] = useState(false);

    //регистрация изменений select при выборе новой роли в компоненте с ролями (синхронизация выбранной роли)
    useEffect(() => {
        if (props.selected && props.selected !== inputValues.role) {
            setInputValues({ ...inputValues, role: props.selected });
        }
    }, [props.selected]);

    //обнуление введенных данных только после успешного завершения запроса
    useEffect(() => {
        if (alertText && alertText === "Данные внесены") {
            setInputValues(initialInputValues);
            props.selectRole("");
            setAlertText("");
        }
    }, [alertText]);

    //обновление состояния после ввода
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    //нажатие кнопки
    const handleSubmit = (e) => {
        e.preventDefault();
        if(inputValues.last_name.length > 0 && inputValues.first_name.length > 0){
            let apicode = "/api/sign-up/";
            if(checkEmail(inputValues.email)){
                SetData(inputValues, apicode, setAlertText, setLoading);
            }
        } else{
            alert("Заполните все поля регистрации");
        }

    };

    //input-ы yut стал выносить в компонент, тк в них нет чего-то универсального
    // и все равно передавать все параметры, только через пропс 
    return (
        <div className="card registration">
            <h2>{props.title}</h2>
            <input 
                type="text" 
                name="last_name"
                placeholder="Фамилия"
                onChange={handleInputChange}
                value={inputValues.last_name}
            />
            <input 
                type="text" 
                name="first_name"
                placeholder="Имя"
                onChange={handleInputChange}
                value={inputValues.first_name}
            />
            <input 
                type="email" 
                name="email"
                placeholder="Email"
                onChange={handleInputChange}
                value={inputValues.email}
            />
            <select name="role" value={props.selected} onChange={(event) => props.selectRole(event.target.value)}>
                <option value="">-- Выберите роль --</option>
                {(props.roles)?(
                    props.roles.map((role, index) => (
                    <option key={index} value={role}>{role}</option>
                )))
                :("")    
                } 
            </select>

            <Button name={props.buttonName} onClick={handleSubmit} status={loading}/> 
        </div>
    );
}