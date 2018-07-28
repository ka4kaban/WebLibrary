import * as React from 'react';

export class BookPreviewCommentsCounter extends React.Component<{
    commentCount: number;
}, {}> {
    public render() {
        return <div>
            Комментарии ({this.props.commentCount})
        </div>;
    }
}
