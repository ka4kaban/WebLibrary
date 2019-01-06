    import React from 'react';
    import ReactDOM from 'react-dom';
    import { Link } from 'react-router-dom';

    export default class Lots extends React.Component {

        render() {
            return (<div id="products" className="col-12">
            <p className="lead">Предмет контракта:</p>
            <table className="table  table-striped">
                <thead>
                    <tr>
                        <th>
                            <div>#</div>
                        </th>
                        <th>
                            <div>
                                Наименование товара, работ, услуг
                                    </div>
                        </th>
                        <th>
                            <div>Код продукции</div>
                        </th>
                        <th>
                            <div>Единицы измерения</div>
                        </th>
                        <th>
                            <div>Цена за единицу</div>
                        </th>
                        <th>
                            <div>Количество</div>
                        </th>
                        <th>
                            <div>Сумма,
                                        руб</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div>1</div>
                        </td>
                        <td>
                            <div>
                                лекарственные средства
                                        </div>
                        </td>
                        <td>
                            <div>
                                <span data-toggle="tooltip" data-placement="top" title="" data-original-title="ОКДП">2423210</span>
                            </div>
                        </td>
                        <td>
                            <div>Упаковка</div>
                        </td>
                        <td>
                            <div>0</div>
                        </td>
                        <td>
                            <div></div>
                        </td>
                        <td>
                            <div>498,9</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>);
    }
}