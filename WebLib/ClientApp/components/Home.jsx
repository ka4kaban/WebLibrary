import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';
import { NavMenu } from './navMenu/NavMenu';

//export class Home extends React.Component<RouteComponentProps<{}>, {}> {
export class Home extends React.Component {
    render() {
        return <div>
            <span>themes switcher</span>
            <div className='row island'>
                <Breadcrumbs />
                <NavMenu />
            </div>
            <div className='row'>
                <div className='col-sm-3 island'>
                </div>
                <div className='col-sm-9'>
                </div>
            </div>
        </div>;
    }
}