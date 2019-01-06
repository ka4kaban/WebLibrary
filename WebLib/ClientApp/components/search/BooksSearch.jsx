import * as React from 'react';
import { CaptionInput } from './CaptionInput';
import { CompletenessInput } from './CompletenessInput';
import { GenresInput } from './GenresInput';
import { HideReadedBookInput } from './HideReadedBookInput';
import { LanguageInput } from './LanguageInput';
import { PageSizeInput } from './PageSizeInput';
import { YearInput } from './YearInput';

type BooksSearchState = {
    captionAutor?: string,
    genre?: string,
    language?: string,
    minPageCount?: number,
    maxPageCount?: number,
    minYear?: number,
    maxYear?: number
}

export class BooksSearch extends React.Component<{
    requestBooks: any
}, BooksSearchState> {
    constructor(props: any) {
        super(props);
        this.state = {
            captionAutor: undefined,
            genre: undefined,
            language: undefined,
            minPageCount: 0, //undefined
            maxPageCount: undefined,
            minYear: 0,//undefined
            maxYear: undefined
        }
    }
    filterBooks = (newState: any) => {
        this.props.requestBooks(JSON.stringify(newState || this.state));
    }
    updateFilter(evt: any) {
        debugger
        let newState: any = {};
        Object.assign(newState, this.state);
        newState[evt.target.name] = evt.target.value;
        this.setState(newState);
    }
    componentWillUpdate(nextProps: any, nextState: any) {
        this.filterBooks(nextState);
    }
    updateFilterByEnterKeyPress(evt: any) {
        if (evt.key === 'Enter') {
            this.updateFilter(evt);
        }
    }
    public render() {
        return <div>
            <div>
                <h3>Поиск книг</h3>
                <CaptionInput updateFilter={this.updateFilter.bind(this)} />
                <GenresInput updateFilter={this.updateFilter.bind(this)} />
                <LanguageInput updateFilter={this.updateFilter.bind(this)} />
                <YearInput updateFilter={this.updateFilter.bind(this)} />
                <PageSizeInput updateFilter={this.updateFilter.bind(this)} />
                <CompletenessInput updateFilter={this.updateFilter.bind(this)} />
                <HideReadedBookInput updateFilter={this.updateFilter.bind(this)} />
                Колличество комментариев 
                колличество просмотров
                хорошая придумка двухуровневая обертка оболжки
                состояние книги закончена пишется выложена неполностью
            </div>
        </div>;
    }
}          