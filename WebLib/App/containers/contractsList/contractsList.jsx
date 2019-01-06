import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContractPreview from './components/contractPreview.jsx';
import { requestContracts } from './contractsListActions.jsx';
import TableHead from '@material-ui/core/TableHead';
import ContractsSearch from './contractsSearch.jsx';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class ContractsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'id',
            selected: [],
            data: [
            ],
            page: 0,
            rowsPerPage: 5,
        };

    }

    componentDidMount() {
        const parsed = queryString.parse(location.search);
        if (parsed) {
            this.props.requestContracts();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.query != location.search) {
            this.setState({ query: location.search });
            this.props.requestContracts();
        }
    }

    render() {
        var contracts = this.props.contracts;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        if (contracts && contracts.length > 0) {
            var rows = contracts.map(contract => {
                return (<ContractPreview key={contract.id} contract={contract} />)
            })
        }

        //<EnhancedTableToolbar numSelected={selected.length} />
        //<EnhancedTableHead
        //    numSelected={selected.length}
        //    order={order}
        //    orderBy={orderBy}
        //    onSelectAllClick={this.handleSelectAllClick}
        //    onRequestSort={this.handleRequestSort}
        //    rowCount={data.length}
        ///>
        return (<div><Paper className="root">
            <ContractsSearch requestContracts={this.props.requestContracts.bind(this)} />
            <Table className="table">
                <TableHead className="purchase-grid-table-head">
                    <TableRow className="purchase-grid-table-row">
                        <TableCell className="purchase-grid-table-cell">name</TableCell>
                        <TableCell numeric className="purchase-grid-table-cell">sum</TableCell>
                        <TableCell className="purchase-grid-table-cell">contractCreateDate</TableCell>
                        <TableCell className="purchase-grid-table-cell">registrationNumber</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
        </Paper></div>);

       

    }

    handleChangePage = (event, page) => {
        //this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        //this.setState({ rowsPerPage: event.target.value });
    };
    handleSelectAllClick = event => {
        //if (event.target.checked) {
        //    this.setState(state => ({ selected: state.data.map(n => n.id) }));
        //    return;
        //}
        //this.setState({ selected: [] });
    };
    //render() {
    //    return (<div>
    //        ContractsList
    //        {this.renderPreviews()}
    //    </div>);
    //}
};

let mapProps = (state) => {
    return {
        contracts: state.contracts.data
    }
}


let mapDispatch = (dispatch) => {
    return {
        requestContracts: bindActionCreators(requestContracts, dispatch)

    }
}

export default connect(mapProps, mapDispatch)(ContractsList) 