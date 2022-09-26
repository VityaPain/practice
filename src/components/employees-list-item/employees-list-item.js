import './employees-list-item.css';

const EmployeesListItem = () => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="list-group-item-label">Zablockii Victor</span>
            <input 
                type="text" 
                name="" 
                id="" 
                className="list-group-item-input"
                defaultValue="1000$"/>
            <div className="d-flex justife-content-center align-items-center">
                <button 
                    type="button"
                    className="btn-cookie btn-sm">
                    <i className="fas fa-cookie"></i>
                </button>

                <button 
                    type="button"
                    className="btn-trash btn-sm">
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    )
}

export default EmployeesListItem;