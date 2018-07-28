import * as React from 'react';
import { BookPreview } from './BookPreview';
import * as BookStore from '../../store/books';

export class Book extends React.Component<BookStore.BookInfo, {}> {
    public render() {
        return <div className="book island card">
            <h1 style={{ textAlign: "center" }}>{this.props.caption}</h1>
            <BookPreview {...this.props} />
        </div>;
    }
}