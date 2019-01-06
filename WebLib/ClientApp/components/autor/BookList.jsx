import * as React from 'react';
//import { BookPreview } from './BookPreview';
//import * as BookStore from '../../store/books';

export class BookList extends React.Component<{}, {}> {
    public render() {
        return <div className="book island card">
            <h1 style={{ textAlign: "center" }}>Автор</h1>
            <div>
                Книга 1 
                книга 2 
                книга 3 
            </div>
        </div>
    }
}