import * as React from 'react';
import { BookList } from './BookList';
//import { BookPreview } from './BookPreview';
//import * as BookStore from '../../store/books';

export class Autor extends React.Component {
    render() {
        return <div className="book island card">
            <h1 style={{ textAlign: "center" }}>Автор</h1>
            <div>
                Фото, биография список книг
                дата рождения
                домашняя страница
                средняя оценка книг
                колличество просмотров
                <BookList />
            </div>
        </div>
    }
}