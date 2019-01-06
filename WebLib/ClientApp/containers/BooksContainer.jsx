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

type BooksContainerProps =
    BooksState.BooksState
    & typeof BooksState.actionCreators
    & RouteComponentProps<{ startDateIndex: string }>;

class BooksContainer extends React.Component<BooksContainerProps, {}> {
    componentWillMount() {
        this.props.requestBooks("");
        this.props.requestCarouselBooks();
    }

    public render() {
        return <div>
            <span>themes switcher</span>
            <div className='row island'>
                <BookCarousel books={this.props.carouselBooks} />
                <Breadcrumbs />
                <NavMenu />
            </div>
            <div className='row'>
                <div className='col-sm-3 island'>
                    <BooksSearch requestBooks={this.props.requestBooks} />
                </div>
                <div className='col-sm-9'>
                    <BooksList books={this.props.books} sortBooks={this.props.sortBooks} />
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.books, // Selects which state properties are merged into the component's props
    BooksState.actionCreators                 // Selects which action creators are merged into the component's props
)(BooksContainer) as typeof BooksContainer;



