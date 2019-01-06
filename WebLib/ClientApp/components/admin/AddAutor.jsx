import * as React from 'react';
//import { BookPreview } from './BookPreview';
//import * as BookStore from '../../store/books';

export class AddAutor extends React.Component {
    render() {
        return <div className="book island card">
            <h1 style={{ textAlign: "center" }}>Добавление автора</h1>
              <div className="row">
                <div className="col-lg-6">
                    <span>Имя</span><input type="text" name="caption" className="form-control" />
                </div>
                <div className="col-lg-6">
                    <span>Фамилия</span><input type="text" name="autor" className="form-control" />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <span>Отчество</span><input type="text" name="caption" className="form-control" />
                </div>
                <div className="col-lg-6">
                    <span>Год рождения</span><input type="text" name="autor" className="form-control" />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <span>Пол</span><input type="text" name="caption" className="form-control" />
                </div>
                <div className="col-lg-6">
                    <span>Фото</span><input type="text" name="autor" className="form-control" />
                </div>
            </div>
        </div>
    }
}