import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestContractByRegNumber } from '../contractsList/contractsListActions.jsx';
import MainInfo from './components/mainInfo.jsx';
import Lots from './components/lots.jsx';
import Supplier from './components/supplier.jsx';
import Customer from './components/customer.jsx';

class Contract extends React.Component {
    constructor(props) {
        super(props);
        this.state = { query: location.search };
    }
    componentDidMount() {
        this.requestContract();
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.query != location.search) {
            this.setState({ query: location.search });
            this.requestContract();
        }
    }
    requestContract() {
        let regNumber;
        const parsed = queryString.parse(location.search);
        if (parsed) {
            regNumber = parsed['regNumber'];
        }
        this.props.requestContractByRegNumber(regNumber);
    }
    render() {
        //let contract = this.props.contract || {};
        if (this.props.contract)
            debugger
        //let { registrationNumber, sum, contractCreateDate, createDateTime, fulfillmentDate } = contract;
        return (<div id="content">
            <div className="row clearfix">
                <div className="col-md-6 align-middle">
                    <h4>Сведения о контракте</h4>
                    <MainInfo {...this.props} />
                </div>
                <div className="col-md-6 align-middle">
                    <h4>Заказчик</h4>
                    <Customer />
                </div>
            </div>

            <div className="row">
                <Lots />
            </div>

            <div className="row">
                <Supplier />
            </div>
        </div>)
    }
};


let mapProps = (state) => {
    return {
        contract: state.contracts.contract
    }
}


let mapDispatch = (dispatch) => {
    return {
        requestContractByRegNumber: bindActionCreators(requestContractByRegNumber, dispatch)

    }
}

export default connect(mapProps, mapDispatch)(Contract) 