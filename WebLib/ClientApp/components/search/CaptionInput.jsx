import * as React from 'react';

//export class CaptionInput extends React.Component<{
//    updateFilter
//}, {}> 
export class CaptionInput extends React.Component {
    handleKeyPress(evt) {
        if (evt.key === 'Enter') {
            this.props.updateFilter(evt);
        }
    }
    render() {
        return <div className="search-item">
            <span>Название книги или автор</span><input onKeyDown={this.handleKeyPress.bind(this)} type="text" name="captionAutor" className="form-control" />
        </div>;
    }
}