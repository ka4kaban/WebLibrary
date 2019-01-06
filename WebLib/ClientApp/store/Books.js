import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import { Book } from '../components/book/Book';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface BooksState {
    isLoading: boolean;
    filter?: string;
    books: BookInfo[];
    carouselBooks: BookInfo[];
}
export interface BookInfo {
    imageUrl: string;
    bookId: number;
    autor: string;
    caption: string;
    description: string;
    genre: Array<string>;
    series: string;
    assessment: any;
    language: string;
    pageCount: number;
    commentCount: number;
    uploadDate: Date;
}
export enum BooksSortType {
    Date,
    Raiting,
    Views,
    Comments,
}

interface RequestCarouselBooksAction {
    type: 'REQUEST_CAROUSEL_BOOKS';
    carouselBooks: BookInfo[];
}

interface RequestBooksAction {
    type: 'REQUEST_BOOKS';
    filter: string;
}

interface ReceiveBooksAction {
    type: 'RECEIVE_BOOKS';
    filter: string;
    books: BookInfo[];
}

interface SortBooksAction {
    type: 'SORT_BOOKS',
    sortType: BooksSortType;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestBooksAction | ReceiveBooksAction | SortBooksAction | RequestCarouselBooksAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    sortBooks: (sortType: BooksSortType) => <SortBooksAction>{ type: 'SORT_BOOKS', sortType: sortType },

    requestBooks: (filter: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (filter !== getState().books.filter) {
            let fetchTask = fetch(`api/SampleData/Books?filter=${filter}`)
                .then(response => response.json() as Promise<BookInfo[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_BOOKS', filter: filter, books: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            //dispatch({ type: 'REQUEST_BOOKS', filter: filter });
        }
    },
    requestCarouselBooks: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch(`api/SampleData/CarouselBooks`)
            .then(response => response.json() as Promise<BookInfo[]>)
            .then(data => {
                dispatch({ type: 'REQUEST_CAROUSEL_BOOKS', carouselBooks: data });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

//const unloadedState: BooksState = { books: [], isLoading: false };
const unloadedState: BooksState = { books: [], isLoading: false, filter: "null", carouselBooks: [] };

class BooksSorter {
    static sortBooks(state: BooksState, incomingAction: SortBooksAction) {
        state.books.sort(this.getComparerFunction(incomingAction.sortType));
        return state.books;
    }
    static raitingComparer(a: BookInfo, b: BookInfo) {
        let aWeight = (a.assessment.average * 2) * a.assessment.assessmentsCount;
        let bWeight = (b.assessment.average * 2) * b.assessment.assessmentsCount;
        if (aWeight > bWeight) return -1;
        if (aWeight < bWeight) return 1;
        return 1;
    }
    static dateComparer(a: BookInfo, b: BookInfo) {
        if (a.uploadDate > b.uploadDate) return -1;
        if (a.uploadDate < b.uploadDate) return 1;
        return 1;
    }
    static commentsComparer(a: BookInfo, b: BookInfo) {
        if (a.commentCount > b.commentCount) return -1;
        if (a.commentCount < b.commentCount) return 1;
        return 1;
    }
    static getComparerFunction(sortType: BooksSortType) {
        switch (sortType) {
            case BooksSortType.Date:
                return this.dateComparer;
            case BooksSortType.Raiting:
                return this.raitingComparer;
            case BooksSortType.Comments:
                return this.commentsComparer;
            default:
                return this.dateComparer;
        }
    }
}


export const reducer: Reducer<BooksState> = (state: BooksState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SORT_BOOKS':
            return {
                filter: state.filter,
                books: BooksSorter.sortBooks(state, action),
                carouselBooks: state.carouselBooks,
                isLoading: !state.isLoading
            };
        case 'REQUEST_BOOKS':
            return {
                filter: action.filter,
                books: state.books,
                carouselBooks: state.carouselBooks,
                isLoading: true
            };
        case 'RECEIVE_BOOKS':
            return {
                filter: action.filter,
                books: action.books,
                carouselBooks: state.carouselBooks,
                isLoading: !state.isLoading//false
            };

        case 'REQUEST_CAROUSEL_BOOKS':
            return {
                filter: state.filter,
                books: state.books,
                carouselBooks: action.carouselBooks,
                isLoading: !state.isLoading//false
            };;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
