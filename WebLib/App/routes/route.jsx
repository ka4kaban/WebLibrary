import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
//import Blog from '../containers/blog/blog.jsx';
//import About from '../containers/about/about.jsx';
//import Comments from '../containers/comments/comments.jsx';
//import NewPost from '../containers/newPost/newPost.jsx';
import ContractsList from '../containers/contractsList/contractsList.jsx';
import Contract from '../containers/contract/contract.jsx';

export default class Routing extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route path="/contractsList" component={ContractsList} />
                    <Route path="/contract" component={Contract} />
                    <Route exact path="/" render={() => (<Redirect to="/contractsList" />)} />
                </Switch>
            </main>
        );
    }



    //render() {
    //    return (
    //        <main>
    //            <Switch>
    //                <Route path="/contractsList" component={ContractsList} />
    //                <Route path="/about" component={About} />
    //                <Route path="/blog/new" component={NewPost} />
    //                <Route path="/blog/post" component={Comments} />
    //                <Route path="/blog" component={Blog} />
    //                <Route exact path="/" render={() => (<Redirect to="/blog" />)} />
    //            </Switch>
    //        </main>
    //    );
    //}
};
