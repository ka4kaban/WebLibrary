import * as React from 'react';
import { Link, NavLink, RouteComponentProps } from 'react-router-dom';
import * as BookStore from '../../store/books';
import { PreviewDescription } from './PreviewDescription';
import { BookDownload } from './BookDownload';
import { BookDescription } from './BookDescription';
import { BookPreviewCommentsCounter } from './BookPreviewCommentsCounter';


//export class BookPreview extends React.Component<BookStore.BookInfo, {}> {
export class BookPreview extends React.Component {
    render() {
        return <div>
            <table style={{ width: "100%" }}>
                <tbody>
                    <tr>
                        <td style={{ width: "260px" }}>
                            <img src={this.props.imageUrl} alt="bookPicture" />
                        </td>
                        <td>
                            <div className="bookPreviewDescriptionContainer">

                                <PreviewDescription {...this.props} />

                                <div className="previewGroup">
                                    <button className="btn btn-success " style={{ width: "150px" }}>
                                        <NavLink to={`/bookContent/${this.props.bookId}`} activeClassName='active'>
                                            <span className='glyphicon glyphicon-book'></span> Читать
                                        </NavLink>
                                    </button>
                                </div>
                                <div className="previewGroup">
                                    <BookPreviewCommentsCounter commentCount={this.props.commentCount} />
                                </div>
                                <div className="previewGroup">
                                    <BookDownload bookId={this.props.bookId} bookCaption={this.props.caption} />
                                </div>
                                <div className="previewGroup">
                                    <BookDescription description={this.props.description} />
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>;
    }
}