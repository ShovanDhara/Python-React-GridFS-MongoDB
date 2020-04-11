import React from 'react';
import { Link } from 'react-router-dom'
import * as userActions from '../actions/userActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class HeaderComponent extends React.Component {
    constructor(props, context) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }
    static get contextTypes() {
        return {
            router: PropTypes.object.isRequired
        };
    }

    onLogout() {
        this.props.actions.logoutUser();
        this.context.router.history.push('/');
    }

    render() {
        return (
            <div className="header-wrapper">
                <header className="App-header mb-5">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <h4 className="navbar-brand">Product List App</h4>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <Link className="nav-link" to='/productList' >Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/add' >Edit/Add</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/about' >About</Link>
                                </li>
                            </ul>
                        </div>
                        <button className="btn-logout btn btn-danger" type="button" onClick={this.onLogout}>
                            <span>Logout</span>
                        </button>
                    </nav>
                </header>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);