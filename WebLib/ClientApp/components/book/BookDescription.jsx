import * as React from 'react';

export class BookDescription extends React.Component<{
description: string}, {}> {
    public render() {
        return <div style={{ height: "150px", overflow : "hidden" }}>
            {this.props.description}
        </div>;
    }
}
