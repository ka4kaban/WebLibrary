import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import BooksContainer from './containers/BooksContainer';
import BookBodyContainer from './containers/BookBodyContainer';
import { Home } from './components/Home';

//import FetchData from './components/FetchData';
//import Counter from './components/Counter';

export const routes = <Layout>
    <Route exact path='/' component={BooksContainer} />
    <Route exact path='/bookContent/:bookId?' component={BookBodyContainer} />
</Layout>;

    //<Route path='/counter' component={Counter} />
    //<Route path='/fetchdata/:startDateIndex?' component={ FetchData } />
