import * as React from 'react';

export class Layout extends React.Component {
    render() {
        return <div className='container-fluid main-container'>
            {this.props.children}
        </div>;
    }
}
