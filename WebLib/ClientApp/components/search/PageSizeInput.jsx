import * as React from 'react';

//export class PageSizeInput extends React.Component<{
//    updateFilter
//}, {}> {
export class PageSizeInput extends React.Component {
    render() {
        return <div className="search-item">
            <div>Колличество страниц: </div>
            <div className="row">
                <div className="col-xs-4">
                    <input type="text" className="form-control" onChange={this.props.updateFilter} name="minYear" />
                </div>
                <div className="col-xs-1">стр.</div>
                <div className="col-xs-4" >
                    <input type="text" className="form-control" onChange={this.props.updateFilter} name="minYear" />
                </div>
                <div className="col-xs-1">стр.</div>
            </div>
        </div>;
    }
}