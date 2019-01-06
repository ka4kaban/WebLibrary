import * as React from 'react';

export class LanguageInput extends React.Component<{
    updateFilter: any
}, {}> {
    public render() {
        return <div className="search-item">
            <div>Язык</div>
            <div className="dropdown menu-justify" >
                <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu_language" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="true">
                    <span className="dropdownCaption">Язык</span>
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu " aria-labelledby="dropdownMenu_language" onClick={this.props.updateFilter}>
                    <li><a href="#">Русский</a></li>
                    <li><a href="#">Английский</a></li>
                    <li><a href="#">Немецкий</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Французский</a></li>
                </ul>
            </div>
            <input type="hidden" name="language" />

        </div>
    }
}