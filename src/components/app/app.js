import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Victor Z.', salary: 5000, increase: false, id: uuidv4()},
                {name: 'Deku M.', salary: 999, increase: true, id: uuidv4()},
                {name: 'Gojo S.', salary: 3000, increase: false, id: uuidv4()},
                {name: 'Naruto U.', salary: 500, increase: false, id: uuidv4()}
            ],
        }
    }

    // метод для удаления, так как он повторяется, поэтому выделяет в отдельную функцию
    deleteItem = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id); // сравнения каждого элемента data (строка с данными) и id который приходит из клика


            // нельзя просто так удалить элменет с нужным нам индексом, так как менять state противоречит правилам реакта
            // если так сделать, то будут баги

                                                        // ~~~ FIRST VARIANT (строка с index тоже не нужна)~~~
            // const before = data.slice(0, index),
            //       after = data.slice(index+1);
            // const newArr = [...before, ...after];
            // return {
            //     data: newArr
            // }

                                                        // ~~~ SECOND VARIANT ~~~
            return {
                data: data.filter(item => item.id !== id)
            } 

        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary  ,
            increase: false,
            id: uuidv4()
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    render() {
        return (
            <div className="app">
                <AppInfo />
    
                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>
    
                <EmployeesList 
                    data={this.state.data}
                    onDelete={this.deleteItem}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        )
    }

}

export default App;