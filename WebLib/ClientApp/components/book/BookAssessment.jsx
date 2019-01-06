import * as React from 'react';

//export class BookAssessment extends React.Component<{
//    average: number,
//    assessmentsCount: number
//}, {}> {
export class BookAssessment extends React.Component{
    render() {
        return <div>
            Оценка
            <br />
            <span className="glyphicon glyphicon-star" style={{ color: "red" }} />
            <span>
                &nbsp;{this.props.average} ({this.props.assessmentsCount})
            </span>
        </div>
    }
}