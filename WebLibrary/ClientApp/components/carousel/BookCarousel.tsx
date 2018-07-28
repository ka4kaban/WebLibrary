import * as React from 'react';
import { CarouselItem } from './Carouselitem';
import * as BooksStore from '../../store/Books';

export class BookCarousel extends React.Component<{
    books: BooksStore.BookInfo[],
}, { startIndex: number }> {
    constructor(props: any) {
        super(props);
        this.state = {
            startIndex: 0
        };
    }
    renderItems() {
        let result = [];
        for (let i = 0; i < 7; i++) {
            let book = this.props.books[i];
            result.push(<CarouselItem key={i} imageSrc={book ? book.imageUrl : ""} />);//TODO
        }
        return result;
    }
    public render() {
        return <div >
            <div> Бестцеллеры месяца: </div>
            <div className="carousel" style={{ width: "100%" }}>
                {this.renderItems()}
            </div>
        </div>;
    }
    //       <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev"
    //    onClick={this.movePrevItems.bind(this)}>
    //    <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    //    <span className="sr-only">Previous</span>
    //</a>
    //    <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next"
    //        onClick={this.moveNextItems}>
    //        <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    //        <span className="sr-only">Next</span>
    //    </a>
    //moveNextItems = () => {
    //    this.setState({
    //        startIndex: this.state.startIndex + 7
    //    });
    //}
    //movePrevItems() {
    //    this.setState({
    //        startIndex: this.state.startIndex - 7
    //    });
    //}
}
