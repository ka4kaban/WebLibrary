import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from '../routes/route.jsx';
import Header from './header/header.jsx';
import Button from '@material-ui/core/Button';

export default class App extends React.Component {

    //render() {
    //    return (
    //        <Router basename="PersonalPortal">
    //            <div>
    //                <button type="button" className="btn btn-primary">Primary</button>
    //                <Button variant="contained" color="primary">
    //                  Hello World
    //                </Button>
    //                <Header />
    //                <Routing />
    //            </div>
    //        </Router>
    //    );
    //}

    render() {
        return (
            <Router basename="">
                <div>
                    <Header />
                    <Routing />
                </div>
            </Router>
        );
    }
};
