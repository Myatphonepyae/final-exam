import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import AddCustomer from './components/AddCustomer';
import UpdateCustomer from './components/UpdateCustomer';
import CustomerDetail from './components/CustomerDetail';

const App = () => {
    return (
        <Router>
            <div>
                <h1>Customer Management</h1>
                <Switch>
                    <Route path="/" exact component={CustomerList} />
                    <Route path="/add" component={AddCustomer} />
                    <Route path="/update/:id" component={UpdateCustomer} />
                    <Route path="/customer/:id" component={CustomerDetail} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
