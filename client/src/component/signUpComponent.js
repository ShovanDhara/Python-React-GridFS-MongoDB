import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions';

class SignUpComponent extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            fields: {
                fullname: '',
                email: '',
                password: ''
            },
            errors: {
                fullname: '',
                email: '',
                password: ''
            },
            formIsValid: false,
            successMsg: '',
            errorMsg: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    static get contextTypes() {
        return {
            router: PropTypes.object.isRequired
        };
    }
    componentDidMount() {
        // this.clearState()
    }
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        this.setState({ formIsValid: true });
        //Name
        if (!fields["fullname"]) {
            this.setState({ formIsValid: true });
            errors["fullname"] = "Fullname is required";
        }
        //Email
        if (fields["email"]) {
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                this.setState({ formIsValid: true });
                errors["email"] = "Email is not valid";
            }
        } else {
            this.setState({ formIsValid: true });
            errors["email"] = "Email is Required";
        }
        if (!fields["password"]) {
            this.setState({ formIsValid: true });
            errors["password"] = "Password is required";
        } else if (fields["password"]) {
            if (fields["password"].length < 5) {
                errors["password"] = "Password is too short";
                this.setState({ formIsValid: true });
            }
        }
        this.setState({ errors: errors });
    }
    onSubmit(event) {
        event.preventDefault();
        this.handleValidation();
        if (this.state.formIsValid) {
            this.addUser();
        }
    }
    addUser() {
        const newUser = {
            fullName: this.state.fields.fullname,
            email: this.state.fields.email,
            password: this.state.fields.password
        };
        this.props.actions.registerUser(newUser)
            .then((data) => {
                this.setState({ successMsg: 'New user added' });
                setTimeout(() => this.setState({ successMsg: '' }), 2000);
            })
            .catch(error => {
                this.setState({ errorMsg: error });
                setTimeout(() => this.setState({ errorMsg: '' }), 2000);
            });
    }
    handleChange(event) {
        const fieldName = event.target.name;
        let fields = this.state.fields;
        fields[fieldName] = event.target.value;
        this.setState({ fields });
        this.handleValidation();
    }
    render() {
        return (
            <div className="wrapper fadeInDown">
                <div className="formContent">
                    <div>
                        <h2 className="inactive underlineHover">Sign Up </h2>
                        <form onSubmit={this.onSubmit}>
                            <input type="text" className="submit-input" name="fullname" placeholder="Full Name" onChange={this.handleChange}
                                value={this.state.fields["fullname"]} />
                            {this.state.errors["fullname"] ?
                                <div className="error-msg">
                                    <label className="validation-message">{this.state.errors["fullname"]}</label>
                                </div> : null
                            }
                            <input type="text" className="submit-input" name="email" placeholder="Email" onChange={this.handleChange} />
                            {this.state.errors["email"] ?
                                <div className="error-msg">
                                    <label className="validation-message">{this.state.errors["email"]}</label>
                                </div> : null
                            }
                            <input type="password" className="submit-input" name="password" placeholder="Password" onChange={this.handleChange} />
                            {this.state.errors["password"] ?
                                <div className="error-msg">
                                    <label className="validation-message">{this.state.errors["password"]}</label>
                                </div> : null
                            }
                            <input type="submit" value="Sign Up" />
                        </form>
                    </div>
                    <div className="have-account">
                        <p>Already have account <Link to={'/login'}>Login Here</Link></p>
                    </div>
                    {this.state.errorMsg ?
                        <div className="alert">
                            {this.state.errorMsg}
                        </div> : null}
                    {this.state.successMsg ?
                        <div className="success">
                            {this.state.successMsg}
                        </div> : null}
                </div>
            </div>
        );
    }
}
SignUpComponent.propTypes = {
    fields: PropTypes.object,
    fullname: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    onSubmit: PropTypes.func,
    handleChange: PropTypes.func
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(userActions, dispatch)
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        
    };
};

SignUpComponent.propTypes = {
    actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);

