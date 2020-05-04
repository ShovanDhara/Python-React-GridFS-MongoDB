import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as productActions from '../actions/productActions';

class AddEditComponent extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedProductID: this.props.match.params.id ? this.props.match.params.id : '',
            isEdit: this.props.match.params.id ? true : false,
            fields: {
                name: '',
                description: '',
                price: '',
                img_url: ''
            },
            errors: {}
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    file_obj = new FormData()

    static get contextTypes() {
        return {
            router: PropTypes.object.isRequired
        };
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }
        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[A-Za-z\s]+$/)) {
                formIsValid = false;
                errors["name"] = "Only letters";
            }
        }
        //Price
        if (!fields["price"]) {
            formIsValid = false;
            errors["price"] = "Cannot be empty";
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    componentDidMount() {
        if (this.state.isEdit) {
            this.getProduct(this.state.selectedProductID);
        }
    }

    handleChange(event) {
        const fieldName = event.target.name;
        const fields = this.state.fields;
        if (fieldName === 'img_url') {
            this.file_obj = new FormData();
            this.file_obj.append('filename', event.target.value);
            this.file_obj.append('file', event.target.files[0]);
            fields[fieldName] = event.target.value;
            this.setState({ fields });
        } else {
            fields[fieldName] = event.target.value;
            this.setState({ fields });
        }
    }

    getProduct(id) {
        let fields = {};
        this.props.actions.findProduct(id).then((data) => {
            if (data) {
                fields["name"] = data.name;
                fields["description"] = data.description;
                fields["price"] = data.price;
                this.setState({ fields: fields });
            }
        })
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.handleValidation()) {
            if (!this.state.isEdit) {
                this.addNewItem();
            } else {
                this.updateProduct();
            }
        }
    }

    updateProduct() {
        const updatedProduct = {
            name: this.state.fields.name,
            description: this.state.fields.description,
            price: parseInt(this.state.fields.price),
            img_url: "images/building.png",
        };
        this.props.actions.updateProduct(updatedProduct, this.state.selectedProductID);
    }

    getImageName = (imgurl) => {
        if (imgurl) {
            return imgurl.split('\\').pop().split('/').pop();
        }
        return ''
    }

    addNewItem() {
        const newProduct = {
            name: this.state.fields.name,
            description: this.state.fields.description,
            price: parseInt(this.state.fields.price),
            img_url: this.getImageName(this.state.fields.img_url)
        };
        if (newProduct.img_url) {
            this.props.actions.createProductImage(this.file_obj).then((response) => {
                if (response)
                    this.props.actions.createProduct(newProduct)
            })
        } else {
            this.props.actions.createProduct(newProduct)
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <form className="add-edit-form" onSubmit={this.onSubmit} ref={form => (this.formEl = form)} >
                        <div className="form-group">
                            <label htmlFor="name">Product Name</label>
                            <input type="text" className="form-control" autoComplete="off" placeholder="Name" name="name" onChange={this.handleChange} value={this.state.fields["name"]} />
                            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" className="form-control" autoComplete="off" placeholder="Description" onChange={this.handleChange} name="description" value={this.state.fields["description"]} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input type="number" className="form-control" autoComplete="off" placeholder="Price" onChange={this.handleChange} name="price" value={this.state.fields["price"]} />
                            <span style={{ color: "red" }}>{this.state.errors["price"]}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Product Image</label><br />
                            <input type="file" placeholder="Product Image" onChange={this.handleChange} name="img_url" />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                        <button type="button" className="btn btn-info ml-3"><Link to={'/productList'}>Back</Link></button>
                    </form>
                </div>
            </div>
        );
    }
}

AddEditComponent.propTypes = {
    fields: PropTypes.object,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    onSubmit: PropTypes.func,
    handleChange: PropTypes.func
};
const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(productActions, dispatch)
    };
};

const mapStateToProps = (state, ownProps) => {
    return {};
};

AddEditComponent.propTypes = {
    actions: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(AddEditComponent);