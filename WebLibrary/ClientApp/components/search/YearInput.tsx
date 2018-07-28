import * as React from 'react';

export class YearInput extends React.Component<{
    updateFilter: any
}, {}> {
    public render() {
        return <div className="search-item">
            <div>Год:</div>
            <div className="row">
                <div className="col-xs-4">
                    <input type="text" className="form-control" onChange={this.props.updateFilter} name="minYear"/>
                </div>
                <div className="col-xs-1"> г.</div>
                <div className="col-xs-4">
                    <input type="text" className="form-control" onChange={this.props.updateFilter} name="maxYear"/>
                </div>
                <div className="col-xs-1"> г.</div>

            </div>
        </div>;
    }
}