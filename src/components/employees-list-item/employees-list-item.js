import React from 'react';
import './employees-list-item.css';

class EmployeesListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            increase: false,
            promotion: false
        }
    }

    onIncrease = () => {
        this.setState(({increase}) => ({
            increase: !increase             // две пары желтых скобок это коллбек, чтобы не писать "this.state." деструктуризируют; вторые желтые скобки чтобы не писать return
        }))
    }

    onPromotion = () => {
        this.setState(({promotion}) => ({
            promotion: !promotion            
        }))
    }
    
    render() {
        const {name, salary} = this.props;
        const {increase, promotion} = this.state;        

        let classNames = "list-group-item d-flex justify-content-between"
        if (increase) {
            classNames += " increase";
        }
        if (promotion) {
            classNames += ' like';
        }
        // можно было и так, но это не очень красиво
        // <li className={(increase ? 'increase ':'') + "list-group-item d-flex justify-content-between"}>
    
        return (
            <li className={classNames}>
                <span className="list-group-item-label" onClick={this.onPromotion}>{name}</span>
                <input 
                    type="text" 
                    name="" 
                    id="" 
                    className="list-group-item-input"
                    defaultValue={salary + '$'}/>
                <div className="d-flex justife-content-center align-items-center">
                    <button 
                        type="button"
                        className="btn-cookie btn-sm"
                        onClick={this.onIncrease}>
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
}

export default EmployeesListItem;