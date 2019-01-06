import * as React from 'react';

export class CaptionInput extends React.Component<{
    updateFilter: any
}, {}> {
    handleKeyPress(evt: any) {
        if (evt.key === 'Enter') {
            this.props.updateFilter(evt);
        }
    }
    public render() {
        return <div className="search-item">
            <span>Название книги или автор</span><input onKeyDown={this.handleKeyPress.bind(this)} type="text" name="captionAutor" className="form-control" />
        </div>;
    }
}