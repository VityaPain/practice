import EmployeesListItem from "../employees-list-item/employees-list-item"
import './employees-list.css';

const EmployeesList = ({data, onDelete}) => {

    const elements = data.map(item => {
        const {id, ...itemProps} = item;    // из item достаем id и кладем его в id, остальные свойства структуризируются в itemProps
        return (
            // <EmployeesListItem name={item.name} salary={item.salary} />
            // используем spread оператор, которы разворачивает объект
            <EmployeesListItem 
                key={id}             // использования key (id) нужен для оптимизации работы скорости приложения
                {...itemProps}       // теперь реакт обновляет те элементы, которые действительно изменились
                onDelete={() => onDelete(id)}
                />   
                                                             
        )
    })

    return(
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;