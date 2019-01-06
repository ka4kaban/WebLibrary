import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class Supplier extends React.Component {

    render() {
        return (<div id="suppliers" className="col-12">
            <p className="lead">Информация о поставщике:
                            </p>
            <table className="table  table-striped">
                <thead>
                    <tr>
                        <th>
                            <div>#</div>
                        </th>
                        <th>
                            <div>Наименование</div>
                        </th>
                        <th>
                            <div>Адрес:</div>
                        </th>
                        <th>
                            <div>ИНН</div>
                        </th>
                        <th>
                            <div>КПП</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div>1</div>
                        </td>
                        <td>
                            <div><a href="/supplier/inn=7724053916&amp;kpp=390503001" target="_blank">фирма "Центр внедрения "Протек"</a></div>
                        </td>
                        <td>
                            <div>
                                <span data-toggle="tooltip" data-placement="top" title="" data-original-title="Показать на карте">
                                    <a href="#supplierMap1" className="supplier-map" role="button" data-toggle="modal" adress="236006, г.Калинград, ул.Правая набережная, 9 лит.Н">
                                        236006, г.Калинград, ул.Правая набережная, 9 лит.Н
                          <i className="fa fa-map-marker"></i>
                                    </a>
                                </span>
                            </div>
                        </td>
                        <td>
                            <div className="inn-check">7724053916</div>

                        </td>
                        <td>
                            <div>390503001</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
        </div>)
    }
}