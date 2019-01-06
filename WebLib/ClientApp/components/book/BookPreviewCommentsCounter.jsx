import * as React from 'react';

//export class BookPreviewCommentsCounter extends React.Component<{
//    commentCount: number;
//}, {}> {
export class BookPreviewCommentsCounter extends React.Component {
    render() {
        return <div>
            Комментарии ({this.props.commentCount})
        </div>;
    }
}
