import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface BookBodyState {
    bookId: number;
    bookText: string;
}

interface ReceiveBookBodyAction {
    type: 'RECEIVE_BOOK_BODY';
    bookId: number;
    bookText: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = ReceiveBookBodyAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    getBookTextByID: (bookId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch(`api/SampleData/GetBookTextByID?bookId=${bookId}`)
            .then(response => response.json() as Promise<string>)
            .then((data: any) => {
                dispatch({ type: 'RECEIVE_BOOK_BODY', bookId: bookId, bookText: data.text });
            });
        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

//const unloadedState: BooksState = { books: [], isLoading: false };
const unloadedState: BookBodyState = { bookId: 0, bookText: "" };

export const reducer: Reducer<BookBodyState> = (state: BookBodyState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'RECEIVE_BOOK_BODY':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                bookId: action.bookId,
                bookText: action.bookText
            }
        default:
            break;
        // The following line guarantees that every action in the KnownAction union has been covered by a case above
        //const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
