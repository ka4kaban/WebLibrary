import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/loginForm.jsx';
import { login, logout, showLoginForm, inputLogin, inputPassword } from './headerActions.jsx'
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

class Header extends React.Component {
    render() {
        return (<div>
            <div className="root">
                <AppBar position="static">
                    <Toolbar>
                        {/*- <IconButton className="menuButton" color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className="grow">
                            News
          </Typography> */}
                        <Button color="inherit" className='app-menu-item'>Закупки</Button>
                        <Button color="inherit" className='app-menu-item'>Аналитика</Button>
                        <Button color="inherit" className='app-menu-item'>Пылесос</Button>
                        <Button color="inherit" className='app-menu-item'>Отчеты</Button>
                        <Button color="inherit" className='app-menu-item'>Личный кабинет</Button>
                    </Toolbar>
                </AppBar>
            </div>
        </div>);
    }
    //render() {
    //    let newPostButton = this.props.header.isLogged ?
    //        <div className="menu">
    //            <ul>
    //                <li>
    //                    <Link className="link" to="/blog/new">Новая запись</Link>
    //                </li>
    //                <li>
    //                    <a className="link" onClick={() => { if (confirm('Вы уверены что хотите выйти?')) this.props.logout()}}>Выход</a>
    //                </li>
    //            </ul>
    //        </div>:
    //        '';
    //    let loginButton = this.props.header.isLogged ?
    //        <span className="nameLabel">Привет, {this.props.header.name}</span> :
    //        <a className="link" onClick={() => { this.props.showLoginForm(!this.props.header.isLoginFormShowed); }}>Логин</a>
    //    let loginForm = this.props.header.isLoginFormShowed ?
    //        <LoginForm onLogin={this.props.login} login={this.props.header.name} password={this.props.header.password} onChangeLogin={this.props.inputLogin} onChangePassword={this.props.inputPassword} /> :
    //        '';

    //    return (
    //        <header>
    //            <div id="photoTitle"></div>
    //            <div id="title">Personal Portal</div>
    //            <div className="rightMenu">
    //                {newPostButton}
    //                {loginButton}
    //                {loginForm}
    //            </div>
    //            <menu className="menu">
    //                <ul>
    //                    <li>
    //                        <Link to="/contractsList">contractsList</Link>
    //                    </li>
    //                    <li>
    //                        <Link to="/blog">Блог</Link>
    //                    </li>
    //                    <li>
    //                        <a href="https://github.com/unpub777">Github</a>
    //                    </li>
    //                    <li>
    //                        <Link to="/about">Обо мне</Link>
    //                    </li>
    //                </ul>
    //            </menu>
    //        </header>
    //    );
    //}
};

let mapProps = (state) => {
    return {
        header: state.header
    }
}

let mapDispatch = (dispatch) => {
    return {
        login: bindActionCreators(login, dispatch),
        logout: bindActionCreators(logout, dispatch),
        showLoginForm: bindActionCreators(showLoginForm, dispatch),
        inputLogin: bindActionCreators(inputLogin, dispatch),
        inputPassword: bindActionCreators(inputPassword, dispatch)
    }
}

export default connect(mapProps, mapDispatch)(Header) 
