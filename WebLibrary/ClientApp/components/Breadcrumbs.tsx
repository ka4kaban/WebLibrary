import * as React from 'react';

export class Breadcrumbs extends React.Component<{}, {}> {
    public render() {
        return <ol className="breadcrumb">
            <li><a href="#">Home</a></li>
            <li><a href="#">Library</a></li>
            <li className="active">Data</li>
        </ol>;
    }
}
