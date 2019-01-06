import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

export default class ContractPreview extends React.Component {

    //render() {
    //    return (
    //        <div>
    //            <Link className="link" to={"/contract?regNumber=" +  this.props.data.registrationNumber }>{this.props.data.registrationNumber}</Link>

    //            registrationNumber:{this.props.data.registrationNumber}
    //            name:{this.props.data.name}
    //            sum:{this.props.data.sum}
    //            contractCreateDate:{this.props.data.contractCreateDate}
    //        </div>
    //    );
    //}

    render() {
        const { contract } = this.props;
        
        return (
            <TableRow key={contract.id} className="purchase-grid-table-row">
                <TableCell component="th" scope="row" className="purchase-grid-table-cell">
                    {contract.name}
                </TableCell>
                <TableCell numeric className="purchase-grid-table-cell">{contract.sum}</TableCell>
                <TableCell numeric className="purchase-grid-table-cell">{contract.contractCreateDate}</TableCell>
                <TableCell className="purchase-grid-table-cell">
                    <Link className="link" to={"/contract?regNumber=" + contract.registrationNumber}>{contract.registrationNumber}</Link>
                </TableCell>
            </TableRow>

            //<div>
            //    <Link className="link" to={"/contract?regNumber=" + this.props.data.registrationNumber}>{this.props.data.registrationNumber}</Link>

            //    registrationNumber:{this.props.data.registrationNumber}
            //    name:{this.props.data.name}
            //    sum:{this.props.data.sum}
            //    contractCreateDate:{this.props.data.contractCreateDate}
            //</div>
        );
    }


     //return (
                //    <TableRow key={contract.id} className="purchase-grid-table-row">
                //        <TableCell component="th" scope="row" className="purchase-grid-table-cell">
                //            {contract.name}
                //        </TableCell>
                //        <TableCell numeric className="purchase-grid-table-cell">{contract.sum}</TableCell>
                //        <TableCell numeric className="purchase-grid-table-cell">{contract.contractCreateDate}</TableCell>
                //        <TableCell numeric className="purchase-grid-table-cell">{contract.registrationNumber}</TableCell>
                //    </TableRow>
                //);
};