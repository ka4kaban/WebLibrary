import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import Button from '@material-ui/core/Button';
import Utils from '../../Utils/utils'

export default class ContractsSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            purchaseNumber: "",
            purchaseDate: this.getStartDate(), //TODO janyary?
            budget: -1,
            region:-1,
            sumStart: "",
            sumEnd: ""
        }
    }
    getStartDate() {
        return Utils.formatDate(new Date().setMonth(new Date().getMonth() - 1));
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    onSearch() {
        this.props.requestContracts(this.state);
    }

    render() {
        return (<Paper className="root">
            <div className="row">
                <div className="col-md-3 align-middle">
                    <TextField
                        id="standard-purchaseNumber-flexible"
                        label="Номер контракта"
                        multiline
                        rowsMax="4"
                        value={this.state.purchaseNumber}
                        onChange={this.handleChange('purchaseNumber')}
                        className="textField"
                        margin="normal"
                    />
                </div>
                <div className="col-md-3 align-middle">
                    {/*<form className="container" noValidate>*/}
                    <TextField
                        id="purchaseDate"
                        label="Дата заключения контракта"
                        type="date"
                        onChange={this.handleChange('purchaseDate')}
                        value={this.state.purchaseDate}
                        //defaultValue="2017-05-24"
                        className="textField"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {/*</form>*/}
                </div>
                <div className="col-md-3 align-middle">
                    <TextField
                        id="sumStart"
                        label="Сумма контракта от"
                        className="textField"
                        value={this.state.sumStart}
                        onChange={this.handleChange('sumStart')}
                        margin="normal"
                    />
                </div>
                <div className="col-md-3 align-middle">
                    <TextField
                        id="sumEnd"
                        label="Сумма контракта до"
                        className="textField"
                        value={this.state.sumEnd}
                        onChange={this.handleChange('sumEnd')}
                        margin="normal"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <FormControl className="formControl">
                        <InputLabel htmlFor="region-simple">Регион госзаказчика</InputLabel>
                        <Select
                            value={this.state.region}
                            onChange={this.handleChange('region')}
                            inputProps={{
                                name: 'region',
                                id: 'region-simple',
                            }}
                        >
                            <MenuItem value="-1">
                                <em>Россия</em>
                            </MenuItem>
                            <MenuItem value={1}>Тула</MenuItem>
                            <MenuItem value={2}>Москва</MenuItem>
                            <MenuItem value={3}>Питер</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="col-md-3">
                    <FormControl className="formControl">
                        <InputLabel htmlFor="age-simple">бюджет</InputLabel>
                        <Select
                            value={this.state.budget}
                            onChange={this.handleChange('budget')}
                            inputProps={{
                                name: 'budget',
                                id: 'budget-simple',
                            }}
                        >
                            <MenuItem value="-1">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>федеральный бюджет</MenuItem>
                            <MenuItem value={2}>Бюджет субъекта Российской Федерации</MenuItem>
                            <MenuItem value={3}>местный бюджет</MenuItem>
                            <MenuItem value={4}>бюджет Пенсионного фонда Российской Федерации</MenuItem>
                            <MenuItem value={5}>бюджет Федерального фонда обязательного медицинского страхования</MenuItem>
                            <MenuItem value={6}>бюджет Фонда социального страхования Российской Федерации</MenuItem>
                            <MenuItem value={7}>бюджет территориального государственного внебюджетного фонда</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="col-md-3">

                    <Button variant="contained" color="secondary" className="button" onClick={this.onSearch.bind(this)}>
                        ПОИСК
                    </Button>

                </div>
                <div className="col-md-3">
                    Сортировать
                  Адрес:
              ИНН заказчика
              КПП заказчика
              ИНН поставщика
              КПП поставщика
                </div>
            </div>
        </Paper>);
    }
    //render() {
    //    return (<Paper className="root">
    //        <div className="row">
    //            <div className="col-md-3">
    //                <TextField
    //                    id="standard-purchaseNumber-flexible"
    //                    label="Номер контракта"
    //                    multiline
    //                    rowsMax="4"
    //                    value={this.state.purchaseNumber}
    //                    onChange={this.handleChange('purchaseNumber')}
    //                    className="textField"
    //                    margin="normal"
    //                />
    //            </div>
    //            <div className="col-md-3">
    //                {/*<form className="container" noValidate>*/}
    //                    <TextField
    //                        id="purchaseDate"
    //                        label="Дата заключения контракта"
    //                        type="date"
    //                        onChange={this.handleChange('purchaseDate')}
    //                        value={this.state.purchaseDate}
    //                        //defaultValue="2017-05-24"
    //                        className="textField"
    //                        InputLabelProps={{
    //                            shrink: true,
    //                        }}
    //                    />
    //                {/*</form>*/}
    //            </div>
    //            <div className="col-md-3">
    //                <TextField
    //                    id="sumStart"
    //                    label="Сумма контракта от"
    //                    className="textField"
    //                    value={this.state.sumStart}
    //                    onChange={this.handleChange('sumStart')}
    //                    margin="normal"
    //                />
    //            </div>
    //            <div className="col-md-3">
    //                <TextField
    //                    id="sumEnd"
    //                    label="Сумма контракта до"
    //                    className="textField"
    //                    value={this.state.sumEnd}
    //                    onChange={this.handleChange('sumEnd')}
    //                    margin="normal"
    //                />
    //            </div>
    //        </div>
    //        <div className="row">
    //            <div className="col-md-3">
    //                <FormControl className="formControl">
    //                    <InputLabel htmlFor="region-simple">Регион госзаказчика</InputLabel>
    //                    <Select
    //                        value={this.state.region}
    //                        onChange={this.handleChange('region')}
    //                        inputProps={{
    //                            name: 'region',
    //                            id: 'region-simple',
    //                        }}
    //                    >
    //                        <MenuItem value="-1">
    //                            <em>Россия</em>
    //                        </MenuItem>
    //                        <MenuItem value={1}>Тула</MenuItem>
    //                        <MenuItem value={2}>Москва</MenuItem>
    //                        <MenuItem value={3}>Питер</MenuItem>
    //                    </Select>
    //                </FormControl>
    //            </div>
    //            <div className="col-md-3">
    //                <FormControl className="formControl">
    //                    <InputLabel htmlFor="age-simple">бюджет</InputLabel>
    //                    <Select
    //                        value={this.state.budget}
    //                        onChange={this.handleChange('budget')}
    //                        inputProps={{
    //                            name: 'budget',
    //                            id: 'budget-simple',
    //                        }}
    //                    >
    //                        <MenuItem value="-1">
    //                            <em>None</em>
    //                        </MenuItem>
    //                        <MenuItem value={1}>федеральный бюджет</MenuItem>
    //                        <MenuItem value={2}>Бюджет субъекта Российской Федерации</MenuItem>
    //                        <MenuItem value={3}>местный бюджет</MenuItem>
    //                        <MenuItem value={4}>бюджет Пенсионного фонда Российской Федерации</MenuItem>
    //                        <MenuItem value={5}>бюджет Федерального фонда обязательного медицинского страхования</MenuItem>
    //                        <MenuItem value={6}>бюджет Фонда социального страхования Российской Федерации</MenuItem>
    //                        <MenuItem value={7}>бюджет территориального государственного внебюджетного фонда</MenuItem>
    //                    </Select>
    //                </FormControl>
    //            </div>
    //            <div className="col-md-3">

    //                <Button variant="contained" color="secondary" className="button" onClick={this.onSearch.bind(this)}>
    //                    ПОИСК
    //                </Button>

    //            </div>
    //            <div className="col-md-3">
    //                Сортировать
    //              Адрес:
    //          ИНН заказчика
    //          КПП заказчика
    //          ИНН поставщика
    //          КПП поставщика
    //            </div>
    //        </div>
    //    </Paper>);
    //}

};