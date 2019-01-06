import * as React from 'react';

//export class BooksListSortButton extends React.Component<{
//    sortTypeCaption: string,
//    onButtonClick,
//    isActive: boolean
//}, {}> {
export class BooksListSortButton extends React.Component {
    getButtonClassName = () => {
        return "btn dropdown-toggle " + (this.props.isActive ? "btn-primary" : "btn-default");
    }
    renderButton = () => {
        return <button onClick={this.props.onButtonClick} className={this.getButtonClassName()} type="button"
            id={"dropdownMenu" + this.props.sortTypeCaption} data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            {this.props.sortTypeCaption}
        </button>
    }
    render() {
        return <div className="sortBtn">
            <div className="dropdown" style={{ display: "inline" }}>
                {this.renderButton()}

            </div>
        </div>;
    }
}
                //<ul className="dropdown-menu" aria-labelledby={"dropdownMenu" + this.props.sortTypeCaption}>
                //    <li><a href="#">неделя</a></li>
                //    <li><a href="#">месяц</a></li>
                //    <li><a href="#">год</a></li>
                //    <li><a href="#">все время</a></li>
                //</ul>