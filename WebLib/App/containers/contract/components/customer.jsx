import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class Customer extends React.Component {

    render() {
        return (<table className="table">
            <tbody>
                <tr className="first">
                    <td><b>Наименование заказчика:</b></td>
                    <td><a href="/customer/03353000369/">ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ ЗДРАВООХРАНЕНИЯ КАЛИНИНГРАДСКОЙ ОБЛАСТИ "ПИОНЕРСКАЯ ГОРОДСКАЯ БОЛЬНИЦА"</a></td>
                </tr>
                <tr>
                    <td><b>
                        <a href="/page/about/glossary/#inn" target="_blank">ИНН<span className="tooltip-info" data-toggle="tooltip" title="" data-original-title="Идентификационный номер налогоплательщика"><sup><i className="fa fa-info-circle"></i></sup></span></a>
                        /

<a href="/page/about/glossary/#kpp" target="_blank">КПП<span className="tooltip-info" data-toggle="tooltip" title="" data-original-title="Код причины постановки на учет"><sup><i className="fa fa-info-circle"></i></sup></span></a> :</b></td>
                    <td><span className="inn-check">3910003400</span> / 391001001</td>
                </tr>
                <tr>
                    <td><b>Кол-во контрактов (94/44-ФЗ):</b></td>
                    <td>707</td>
                </tr>
                <tr>
                    <td><b>Сумма контрактов (94/44-ФЗ):</b></td>
                    <td>374&nbsp;446&nbsp;900 RUB</td>
                </tr>
            </tbody>
        </table>)
    }
}