import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BooksList } from '../components/booksList/BooksList';
import { BookCarousel } from '../components/carousel/BookCarousel';
import { NavMenu } from '../components/navMenu/NavMenu';
import { BooksSearch } from '../components/search/BooksSearch';
import { ApplicationState } from '../store';
import * as BooksState from '../store/Books';
import { AddBook } from '../components/admin/AddBook';
//type BooksContainerProps =
//    BooksState.BooksState
//    & typeof BooksState.actionCreators
//    & RouteComponentProps<{ startDateIndex: string }>;

//export default class AdminContainer extends React.Component<RouteComponentProps<{}>, {}> {
export default class AdminContainer extends React.Component {
    //componentWillMount() {
    //    this.props.requestBooks("");
    //    this.props.requestCarouselBooks();
    //}

    render() {
        
        return <div>
            <AddBook />
        </div>;
    }
}

//export default connect(
//    (state: ApplicationState) => state.books, // Selects which state properties are merged into the component's props
//    BooksState.actionCreators                 // Selects which action creators are merged into the component's props
//)(BooksContainer) as typeof BooksContainer;



