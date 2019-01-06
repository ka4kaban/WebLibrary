import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { NavMenu } from '../components/navMenu/NavMenu';
import { ApplicationState } from '../store';
import * as BookBodyState from '../store/BookBody';

type BooksContainerProps =
    BookBodyState.BookBodyState
    & typeof BookBodyState.actionCreators
    & RouteComponentProps<{ bookId: number }>;

//class BookBodyContainer extends React.Component<BooksContainerProps, {}> {
class BookBodyContainer extends React.Component {
    componentWillMount() {
        this.props.getBookTextByID(this.props.match.params.bookId);
    }
   
    render() {
        return <div>
            <span>themes switcher</span>
            <div className='row island'>
                <Breadcrumbs />
                <NavMenu />
            </div>
            <div className='row'>
                {this.props.bookText}
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.bookBody, // Selects which state properties are merged into the component's props
    BookBodyState.actionCreators                 // Selects which action creators are merged into the component's props
)(BookBodyContainer) as typeof BookBodyContainer;


