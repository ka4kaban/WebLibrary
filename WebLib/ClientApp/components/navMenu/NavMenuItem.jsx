import * as React from 'react';
import { NavLink } from 'react-router-dom';

//export class NavMenuItem extends React.Component<{
//    caption: string,
//    url: string
//}, {}> {
export class NavMenuItem extends React.Component{
    render() {
        return <NavLink to={this.props.url} activeClassName='active'>
            {this.props.caption}
        </NavLink>
    }
}            