/*
Компонент вывода карточки с получением кода по email и отправлением токена в систему, 
объединяет два последних запроса из задания 
*/

import { useEffect, useState } from "react";
import { SetData, Converter, checkEmail, TakeCode, maskString } from "./Functions";
import Copy from "../images/copy-icon.png"
import Button from "./Button";

export default function TakeCodeCard(props) {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [alertText, setAlertText] = useState('');
    const [loading, setLoading] = useState(false);

    //нашел решение для переотправления запроса через строки, что не очень удачно (пожалуйста не ругайте), 
    //тк может поменяться вывод, но без жесткого сравнения, 
    //а решения через ответ от fetch не очень хотелось
    useEffect(() => {
        let inputValues;
        let apicode = "/api/set-status/";
        if (alertText && (alertText === "Установлен статус increased" || alertText==="Установка")) {
            inputValues = {
                token: Converter(email, atob(code)),
                status: "increased"
            };
            SetData(inputValues, apicode, setAlertText, setLoading);
        } else if(alertText === "Статус increased зафиксирован. Задание выполнено"){
            setEmail("");
            setCode("");
            setAlertText("");
        }
    }, [alertText]);

    //при изменении inputa email принудительно сбрасывать код, так как он теряет актуальность
    const handleInputChange = (e) => {
        setEmail(e.target.value);
        setCode("");
    };

    //получение кода по email
    const handleSubmit = (e) => {
        e.preventDefault();
        if(checkEmail(email)){
            TakeCode(email, setCode, setLoading);
        }else{
            alert("Похоже, что Вы не указали существующий email.");
        }
    }

    //вызов useEffecta через нажатие на кнопку
    const handleSetStatus = (e) => {
        e.preventDefault();
        setAlertText("Установка");
    }

    //здесь все те же локальные инпуты без объединения в компонент
    //здесь еще предусмотрел разный вывод при разных статусах работы с карточкой
    return (
        <div className="card autorization">
            <h2>{props.title}</h2>
            <input 
                type="email" 
                name="email"
                placeholder="Введите ваш email"
                onChange={handleInputChange}
                value={email}
            />
            {(code)?(
                <div className="code-block">
                    <div className="inner-code-block">
                        <input
                            type="text"
                            name="personal-code"
                            value={maskString(atob(code))}
                            readOnly
                        />
                        <button 
                            type="button"
                            className="copy-button" 
                            onClick={() => {
                                navigator.clipboard.writeText(atob(code))
                                .then(() => alert('Код скопирован в буфер обмена'));
                            }}
                        >
                            <img 
                                src={Copy} 
                                alt="copy-icon"
                            />
                        </button>
                    </div>
                    <Button name="Обновить статус" onClick={handleSetStatus} status={loading}/>
                </div>
            )
            :(
                <Button name="Получить код" onClick={handleSubmit} status={loading}/>
            )}   
        </div>
    );

}