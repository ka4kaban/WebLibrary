import * as React from 'react';
import { BookAssessment } from './BookAssessment';
import * as BookStore from '../../store/books';

//export class PreviewDescription extends React.Component<BookStore.BookInfo, {}> {
export class PreviewDescription extends React.Component{
    renderBookAssessment() {
        if (this.props.assessment) {
            return <BookAssessment average={this.props.assessment.average} assessmentsCount={this.props.assessment.assessmentsCount} />
        }
        return null;
    }

    render() {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };

        return <div className="previewGroup">
            <div style={{ textAlign: "right" }}>
                Дата добавления: {new Date(this.props.uploadDate).toLocaleDateString("ru-RU", options)} &nbsp;
            </div>
            <div>
                {this.renderBookAssessment()}
            </div>
            <br />
            <br />
            <div>
                <span className='desc1'> Автор:</span> {this.props.autor}
            </div>
            <div>
                <span className='desc1'> Жанр:</span> {this.props.genre.join(", ")}
            </div>
            <div>
                <span className='desc1'> Серия:</span> {this.props.series}
            </div>
            <div>
                <span className='desc1'> Язык книги:</span> {this.props.language}
            </div>
            <div>
                <span className='desc1'> Страниц:</span> {this.props.pageCount}
            </div>
        </div>
    }
}
