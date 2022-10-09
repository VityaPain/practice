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
                {name: 'Victor Z.', salary: 5000, increase: false, rise: true, id: uuidv4()},
                {name: 'Deku M.', salary: 999, increase: true, rise: false, id: uuidv4()},
                {name: 'Gojo S.', salary: 3000, increase: false, rise: false, id: uuidv4()},
                {name: 'Naruto U.', salary: 500, increase: false, rise: false, id: uuidv4()}
            ],
            term: '',
            filter: 'all'
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
            rise: false,
            id: uuidv4()
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        console.log(`Increase this ${id}`);
        // ~~~~~~~~~~~~~~~~~~~~~ HARD VARIANT ~~~~~~~~~~~~~~~~~~~~~
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id);    //получение индекса э-та, с которым производится работа

        //     const old = data[index];
        //     const newItem = {...old, increase: !old.increase};      // разворачиваю объект OLD, и все свойства записываются в него, свойства записанные после разворота будет перезаписаны
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index+1)]

        //     return {
        //         data: newArr,
        //     }

        // })
        // ~~~~~~~~~~~~~~~~~~~~~ SOFT VARIANT ~~~~~~~~~~~~~~~~~~~~~
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item; 
            })
        }))
    }

    // так как смысл работы сверху и райза одинаковый, то лучше объеденить код
    // onToggleRise = (id) => {
    //     this.setState(({data}) => ({
    //         data: data.map(item => {
    //             if (item.id === id) {
    //                 return {...item, rise: !item.rise}
    //             }
    //             return item; 
    //         })
    //     }))
    // }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});      // тоже самое что term: term
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThen1000': 
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }
    
    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    onChangeSalary = (id, newSalary) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, salary: newSalary}
                }
                return item;
            })
        }))
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase === true).length;
        // const visibleData = this.searchEmp(data, term);     // отфильтрованный массив работников
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);


        return (
            <div className="app">
                <AppInfo 
                    employees={employees}
                    increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onChangeSalary={this.onChangeSalary}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        )
    }

}

export default App;