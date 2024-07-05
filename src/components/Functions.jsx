/*
Переиспользуемые функции. Некоторые из них используются единожды, 
но при расширении проекта логичнее их было вынести во внешний файл и вызывать при необходимости
*/

const URL = "http://193.19.100.32:7000"; 

//Получение ролей
export const TakeRoles = (setRoles) => {
    fetch(`${URL}/api/get-roles`, {
        method: "GET"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        setRoles(data.roles);
    })
    .catch(error => {
        console.error(error.message);
    });
}

//Получение персонального кода
export const TakeCode = (email, setCode, setLoading) => {
    setLoading(true);
    fetch(`${URL}/api/get-code?email=${email}`, {
        method: "GET"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }
        return response.text();
    })
    .then(text => {
        setCode(btoa(text.replace(/"/g, '')));
        setLoading(false);
    })
    .catch(error => {
        console.error(error.message);
        alert("Не удалось ничего найти по указанному адресу.");
        setLoading(false);
    });
}

//Установка персональных данных
export const SetData = (inputValues, apicode, setAlertText, setLoading) => {
    setLoading(true);
    fetch(URL+apicode, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputValues, null, 2),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error status: ${response.status}`);
        }
        return response.text();
    })
    .then(text => {
        if(setAlertText){
            setAlertText(text.replace(/"/g, ''));
            setLoading(false);
        }
        alert(text.replace(/"/g, ''));
    })
    .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
    });
}

//Проверка валидности email'a
export const checkEmail = (email) => {
    if(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(email)){
        return(true);
    }
}

//Маскировка строки: 
//если длина <6, то показываются последние 4 символа, 
//иначе последние 4 и первые 2
export function maskString(str) {
    if(str){
        let firstTwo = "";
        let maskedSection = "";
        const lastFour = str.slice(-4);

        if (str.length > 6) {
            firstTwo = str.slice(0, 2);
            maskedSection = '*'.repeat(str.length - 6);
        } else {
            maskedSection = '*'.repeat(str.length - 4);
        }

        return firstTwo + maskedSection + lastFour;
    }

}

//Конвертация email:code в токен пользователя
export function Converter(email, code){            
    let str = email + ':' + code;
    let convertedStr = btoa(str);
    return convertedStr;
}