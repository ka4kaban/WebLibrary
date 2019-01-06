import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Book } from '../book/Book';
import { BooksListSorter } from './BooksListSorter';
import * as BooksStore from '../../store/Books';

//export class BooksList extends React.Component<{
//    books: BooksStore.BookInfo[],
//    sortBooks: typeof BooksStore.actionCreators.sortBooks
//}, {}> {
export class BooksList extends React.Component{
    renderBooks() {
        let resArr = [];
        if (!this.props.books)
            return resArr;
        for (let i = 0; i < this.props.books.length; i++) {
            let book = this.props.books[i];
            resArr.push(<Book key={i} imageUrl={book.imageUrl} autor={book.autor.toString()} caption={book.caption} series={book.series}
                bookId={book.bookId} description={book.description}
                assessment={book.assessment} genre={book.genre} language={book.language} pageCount={book.pageCount}
                uploadDate={book.uploadDate} commentCount={book.commentCount} />);
        }
        return resArr;
    }
    render() {
        return <div>
            <div className='row island'>
                <BooksListSorter sortBooks={this.props.sortBooks} />
            </div>
            {this.renderBooks()}
        </div>;
    }
}