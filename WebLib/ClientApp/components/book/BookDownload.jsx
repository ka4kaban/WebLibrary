import * as React from 'react';
import { fetch } from 'domain-task';

export class BookDownload extends React.Component<{
    bookId: number,
    bookCaption: string
}, {}> {
    downloadFile() {
        let download: any = require('../../dist/download.min');
        var thos = this;
        let fetchTask = fetch(`api/SampleData/GetBookTextByID?bookId=${this.props.bookId}`)
            .then(function (resp) {
                return resp.blob();
            }).then(function (blob) {
                download(blob, thos.props.bookCaption + ".txt", "text/plain");
            });
    }
    public render() {
        let groupName = "downloadFormat" + this.props.bookId;
        return <div>
            <div>
                Формат
            </div>
            <div style={{ display: "inline" }}>
                <input style={{ display: "inline" }} className="" type="radio" name={groupName} id="fb2Id" value="fb2" defaultChecked />
                <label className="label label-default" htmlFor="fb2Id">fb2</label>
            </div>
            <div style={{ display: "inline", paddingLeft: "10px" }}>
                <input style={{ display: "inline" }} className="radio" type="radio" name={groupName} id="epubId" value="epub" />
                <label className="label label-default" htmlFor="epubId">epub</label>
            </div>
            <div>
                <button className="btn" onClick={this.downloadFile.bind(this)}>
                    <span className='glyphicon glyphicon-download-alt'></span> Скачать</button>
            </div>
        </div>;
    }
}