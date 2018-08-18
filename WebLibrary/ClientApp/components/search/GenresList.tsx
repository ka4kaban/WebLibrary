import * as React from 'react';
export class GenresList extends React.Component<{}, {}> {
    public getGenres(): string[] {
        return ["Фантастика и Фэнтези", "Детективы и Триллеры", "Поэзия и драматургия", "Юмор", "Старинная литература",
            "Дом и Семья", "Научно-образовательная", "Деловая литература", "Проза", "Компьютеры и Интернет", "Прочее", "Драматургия"];

    }
    private renderItems() {
        return this.getGenres().map((genre, index) => <div className="col-lg-6">
            <label>
                <input type="checkbox" aria-label="..." />
                {genre}
            </label>
        </div>)
    }

    public render() {
        return <div>
            <div className="row" >
                <div className="col-lg-6">
                    <label>
                        <input type="checkbox" aria-label="..." />
                        {this.renderItems()}
                    </label>
                </div>
            </div>
        </div>;
    }
}