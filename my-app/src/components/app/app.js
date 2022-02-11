import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearhPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {name: 'Sergey T.', salary: 800, increase: false, star: true, id: 1},
                {name: 'Andrew T.', salary: 3000, increase: true, star: false, id: 2},
                {name: 'Igor T.', salary: 4500, increase: false, star: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }

        this.maxId = 4;
    }
   
    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
            
        })
    }

    useItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            star: false,
            id: this.maxId++
        }

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleIncrease = (id) => {
        

        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, increase: !item.increase}
                }
                return item;
            })
        }))
    }

    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, star: !item.star}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.star);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className='app'>
                <AppInfo employees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearhPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList 
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleIncrease={this.onToggleIncrease}
                onToggleRise={this.onToggleRise} />

                <EmployeesAddForm onAdd={this.useItem}/>
    
            </div>
        );
    }
    
}

export default App;