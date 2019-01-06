import * as React from 'react';
import { BooksListSortButton } from './BooksListSortButton';
import * as BooksStore from '../../store/Books';

export class BooksListSorter extends React.Component<{
    sortBooks: typeof BooksStore.actionCreators.sortBooks
}, {
        sortType: BooksStore.BooksSortType
    }> {

    constructor(props: any) {
        super(props);
        this.state = {
            sortType: BooksStore.BooksSortType.Date
        }
    }
    getSortTypes() {
        return [
            { name: BooksStore.BooksSortType.Date, caption: "Дата" },
            { name: BooksStore.BooksSortType.Raiting, caption: "Рейтинг" },
            { name: BooksStore.BooksSortType.Views, caption: "Просмотры" },
            { name: BooksStore.BooksSortType.Comments, caption: "Комментарии" }
        ];
    }
    onButtonClick(value: any) {
        this.setState({
            sortType: value
        });
        this.props.sortBooks(value);
    }
    private renderButtons() {
        return this.getSortTypes().map((btn, index) =>
            <BooksListSortButton key={index} sortTypeCaption={btn.caption} onButtonClick={this.onButtonClick.bind(this, btn.name)} isActive={this.state.sortType === btn.name} />
        );
    }
    public render() {
        return <div className="booksContainerSorter">
            <div>плитка/список</div>
            <span className="sortCaption">Сортировать по:</span>
            <div className="sortBtns">
                {this.renderButtons()}
            </div>
        </div>;
    }
}