import * as React from 'react';
//import { BookPreview } from './BookPreview';
//import * as BookStore from '../../store/books';

export class AddBook extends React.Component {
    //constructor() {
    //    this.state
    //}
    sendBook() {
        var customer = { contact_name: "Scott", company_name: "HP" };
        var model = {
            Name: "Shyju",
            Id: 123,
            Tags: [{ Id: 12, Code: "C" }, { Id: 33, Code: "Swift" }]
        };
        fetch("api/SampleData/AddBook", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(/*{ a: 1, b: 'Textual content' }*/model)
        });
            //.then(function (date) {
            //    
            //});

        //.then(res => res.json())
        //    .then(res => console.log(res));
    }
    uploadImage() {
        var input = document.getElementById("bookImage") as HTMLInputElement;
        var blobFile = input!.files![0];

        var reader = new FileReader();
        reader.onload = function () {
            var dataURL = reader.result;
            var output = document.getElementById('myImg') as HTMLImageElement;
            output.src = dataURL;
        };
        reader.readAsDataURL(blobFile);
    }
    uploadBook() {
        var input = document.getElementById("bookContent") as HTMLInputElement;
        var blobFile = input!.files![0];

        var reader = new FileReader();
        reader.onload = function () {
            var dataURL = reader.result;
            //var output = document.getElementById('myImg') as HTMLImageElement;
            //output.src = dataURL;
        };
        reader.readAsDataURL(blobFile);
    }
   
    render() {
        return <div className="book island card">
            <h1 style={{ textAlign: "center" }}>Загрузка файла</h1>
            <div className="row">
                <div className="col-lg-6">
                    <span>Название книги</span><input type="text" name="caption" className="form-control" />
                </div>
                <div className="col-lg-6">
                    <span>Имя Автора</span><input type="text" name="autor" className="form-control" />
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <span>Жанр</span><input type="text" name="genre" className="form-control" />
                    </div>
                    <div className="col-lg-6">
                        <span>Год</span><input type="text" name="year" className="form-control" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <span>Серия</span><input type="text" name="serie" className="form-control" />
                    </div>
                    <div className="col-lg-6">
                        <span>Страниц</span><input type="text" name="pageCount" className="form-control" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <span>Описание</span><input type="text" name="Description" className="form-control" />
                    </div>
                    <div className="col-lg-6">
                        <span>Заргузить</span><input type='file' id="bookContent"  onChange={this.uploadBook.bind(this)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <span>Изображение</span><input type="text" name="Description" className="form-control" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <span>Заргуженное Изображение</span><input type="text" name="Description" className="form-control" />
                    </div>
                </div>
                <div>
                    <input type='file' id="bookImage" accept='image/*' onChange={this.uploadImage.bind(this)} />
                    Предварительное изображение no Image?
                    <img id="myImg" src="#" alt="your image" style={{ width: "200px", height: "200px" }} />
                </div>
                Далее переход на форму предпросмотра
            </div>

            <button className="btn" onClick={this.sendBook}>
            <span className='glyphicon glyphicon-download-alt'></span> Загрузить книгу</button>
        </div>
    }
}