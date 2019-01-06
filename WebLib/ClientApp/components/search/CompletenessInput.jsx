import * as React from 'react';

export class CompletenessInput extends React.Component<{
    updateFilter: any
}, {}> {
    public render() {
        return <div className="search-item">
            <div>Законченность</div>
            <div className="dropdown menu-justify" >
                <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="true">
                    <span className="dropdownCaption">Закончен</span>
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu " aria-labelledby="dropdownMenu1">
                    <li><a href="#">Закончен</a></li>
                    <li><a href="#">Пишется</a></li>
                    <li><a href="#">Заморожен</a></li>
                </ul>
            </div>
            <input type="hidden" name="completeness" />
        </div>;
    }
}
