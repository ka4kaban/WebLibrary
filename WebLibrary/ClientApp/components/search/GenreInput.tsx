import * as React from 'react';

export class GenreInput extends React.Component<{
    updateFilter: any
}, {}> {
    updateInput(evt: any) {
        debugger
        (this.refs.genre as HTMLElement).innerHTML = evt.target.innerText;
    }
    onChange(evt: any) {
        //this.props.updateFilter
        //debugger
        //(this.refs.genre as HTMLElement).innerHTML = evt.target.innerText;
    }
    public render() {
        return <div className="search-item" >
            <div>Жанры</div>
            <div className="dropdown menu-justify" >
                <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu_genre" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="true">
                    <input ref="genre" type="hidden" name="genre" id="ganresValue" onChange={this.props.updateFilter} />
                    <span className="dropdownCaption">Жанры</span>
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu_genre" id="ganreslist" onClick={this.updateInput.bind(this)} >
                    <li><a>Драма</a></li>
                    <li><a>Боевики</a></li>
                    <li><a>Роман</a></li>
                    <li><a>Фантастика</a></li>
                </ul>
            </div>
        </div>;
    }
}