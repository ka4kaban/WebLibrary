import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class MainInfo extends React.Component {

    render() {
        let contract = this.props.contract || {};
        let { registrationNumber, sum, contractCreateDate, createDateTime, fulfillmentDate } = contract;

        return (<table className="table">
                <tbody>
                    <tr className="first">
                        <td className="col-3"><b>Номер контракта:</b></td>
                        <td>{registrationNumber}</td>
                    </tr>
                    <tr>
                        <td><b>Сумма контракта:</b></td>
                        <td>{sum} RUB(?)</td>
                    </tr>
                    <tr>
                        <td><b>Регион:</b></td>
                        <td>Калининградская область</td>
                    </tr>
                    <tr>
                        <td><b>Способ размещения заказа:</b></td>
                        <td><i>Нет сведений</i></td>
                    </tr>
                    <tr>
                        <td><b>Дата проведения аукциона:</b></td>
                        <td> createDateTime {createDateTime} </td>
                    </tr>
                    <tr>
                        <td><b>Дата заключения контракта:</b></td>
                        <td>{fulfillmentDate} fulfillmentDate?</td>
                    </tr>
                    <tr>
                        <td><b>Дата публикации:</b></td>
                        <td>{contractCreateDate} contractCreateDate</td>
                    </tr>
                    <tr>
                        <td><b>Срок исполнения контракта:</b></td>
                        <td>7-2011</td>
                    </tr>
                    <tr>
                        <td><b>Федеральный закон:</b></td>
                        <td>94-ФЗ</td>
                    </tr>
                    <tr>
                        <td><b>Ссылка на zakupki.gov.ru:НЕРАБОТАЕТ</b></td>
                        <td>
                            <p><a href="http://zakupki.gov.ru/pgz/public/action/contracts/info/common_info/show?source=epz&amp;contractInfoId=1790813">Сведения о
                                            контракте</a></p>
                            <p><a href="http://zakupki.gov.ru/pgz/printForm?type=CONTRACT_INFO&amp;id=1790813">Печатная форма
                                            сведений</a></p>
                        </td>
                    </tr>
                    <tr>
                        <td><b>Ссылка на .json файл контракта:НЕРАБОТАЕТ</b></td>
                        <td><a href="http://openapi.clearspending.ru/restapi/v3/contracts/get/?regnum=0335300036911000008" target="_blank">
                            Перейти</a></td>
                    </tr>
                    <tr>
                        <td><b>Количество поставщиков:</b></td>
                        <td>1 <a href="#suppliers">
                            Показать <i className="fa fa-angle-down"></i></a></td>
                    </tr>
                </tbody>
            </table>);
    }
};