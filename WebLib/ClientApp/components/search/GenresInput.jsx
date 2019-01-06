import * as React from 'react';
import { GenresList } from './GenresList';

//export class GenresInput extends React.Component<{
//    updateFilter
//}, {}> {
export class GenresInput extends React.Component{
    updateInput(evt) {
        
        //(this.refs.genre as HTMLElement).innerHTML = evt.target.innerText;
        this.refs.genre.innerHTML = evt.target.innerText;
    }
    onChange(evt) {
        //this.props.updateFilter
        //
        //(this.refs.genre as HTMLElement).innerHTML = evt.target.innerText;
    }
    render() {
        return <div className="search-item" >

            <button type="button" className="btn btn-primary btn-lg " data-toggle="modal" data-target="#myModal">
                Жанры
            </button>

            <div className="modal fade" id="myModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">Жанры</h4>
                        </div>

                        <div className="modal-body">
                            <GenresList />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
        //return <div className="search-item" >
        //    <div>Жанры</div>
        //    <div className="dropdown menu-justify" >
        //        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu_genre" data-toggle="dropdown"
        //            aria-haspopup="true" aria-expanded="true">
        //            <input ref="genre" type="hidden" name="genre" id="ganresValue" onChange={this.props.updateFilter} />
        //            <span className="dropdownCaption">Жанры</span>
        //            <span className="caret"></span>
        //        </button>
        //        <ul className="dropdown-menu" aria-labelledby="dropdownMenu_genre" id="ganreslist" onClick={this.updateInput.bind(this)} >
        //            <li><a>Драма</a></li>
        //            <li><a>Боевики</a></li>
        //            <li><a>Роман</a></li>
        //            <li><a>Фантастика</a></li>
        //        </ul>
        //    </div>
        //</div>;
    }
}