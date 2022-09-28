import {Component} from 'react';
import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            name: '',
            salary: ''
        }
    }

    // отслеживание ввода в инпутах
    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value, // мы даобвили инпутам атрибут name и через него обращаемся к нужным нам полям ввода
        }) 
    }

    render() {
        const {name, salary} = this.state;

        return(
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form 
                    action=""
                    className="add-form d-flex">
                        <input 
                            type="text"
                            className="form-control new-post-label"
                            placeholder="ФИО"
                            name='name'
                            value={name}
                            onChange={this.onValueChange}/>
                        <input 
                            type="number"
                            className="form-control new-post-label"
                            placeholder="З/П в $"
                            name='salary'
                            value={salary}
                            onChange={this.onValueChange}/>
                        <button 
                            type="submit"
                            className="btn btn-outline-light">
                                Добавить
                        </button>
                </form>
            </div>
        )
    }
}

export default EmployeesAddForm;