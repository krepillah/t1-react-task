/*
Компонент для получения и вывода ролей, если useEffect не загрузил роли, 
то пользователь получит кнопку, по которой может загрузить их самостоятельно
*/

import { TakeRoles } from "./Functions";
import Button from "./Button";

export default function TakeRolesCard(props) {
    const HandleClick = () => {
        TakeRoles(props.takeRoles);
    }

    return (
        <div className="card list">
            <h2>{props.title}</h2>
            <ul>
                {(props.roles) ? 
                    (props.roles.map((role, index) => (
                        <li
                            key={index}
                            className={`role-item ${role === props.selected ? 'selected' : ''}`}
                            onClick={() => props.selectRole(role)}
                        >{role}
                        </li>
                    ))
                    ) : (<p>{props.error}</p>)
                }
            </ul>
            {props.roles && props.roles.length === 0 && (
                <Button name={props.buttonName} onClick={HandleClick}/>
            )}
        </div>
    );
}