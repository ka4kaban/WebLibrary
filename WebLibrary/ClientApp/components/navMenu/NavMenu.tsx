import * as React from 'react';
//import { NavLink } from 'react-router-dom';
import { NavMenuItem } from './NavMenuItem';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <nav className="navbar navbar-brand">
            <div className="container-fluid">
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav nav-pills nav-justified">
                        <li>
                            <NavMenuItem url="/genres" caption="Жанры" />
                        </li>
                        <li>
                            <NavMenuItem url="/autors" caption="Авторы" />
                        </li>
                        <li>
                            <NavMenuItem url="/" caption="Книги" />
                        </li>
                        <li>
                            <NavMenuItem url="/series" caption="Серии" />
                        </li>
                        <li>
                            <NavMenuItem url="/users" caption="Пользователи" />
                        </li>
                        <li>
                            <NavMenuItem url="/admin" caption="Админка" />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>;
    }
}            