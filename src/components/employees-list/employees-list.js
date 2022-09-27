import EmployeesListItem from "../employees-list-item/employees-list-item"
import './employees-list.css';

const EmployeesList = ({data}) => {

    const elements = data.map(item => {
        return (
            // <EmployeesListItem name={item.name} salary={item.salary} />
            // используем spread оператор, которы разворачивает объект
            <EmployeesListItem {...item} />
        )
    })

    return(
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}

export default EmployeesList;