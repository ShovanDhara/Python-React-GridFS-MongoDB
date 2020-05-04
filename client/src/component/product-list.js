import React from 'react';
import ProductView from './product-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productActions from '../actions/productActions';
// import * as userActions from '../actions/userActions';

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        if (window.sessionStorage.getItem('token')) {
            this.props.actions.loadProducts();
        }
    }

    onDelete(product) {
        this.props.actions.deleteProduct(product).then((res) => {
            if (res) {
                this.props.actions.loadProducts();
            }
        })
    }

    render() {
        const productViews = this.props.products ? this.props.products.length ? this.props.products.map(product => {
            return (
                <ProductView key={product.id} product={product} onDelete={this.onDelete} />
            )
        }) : "No product available" : "No product available"
        return (
            <div className="row">
                <div className="col-lg-12">
                    <h5 className="w-100 text-center">Product List</h5>
                    {this.props.products.length > 0 ? productViews :
                        <div className="alert alert-warning text-center mt-4" role="alert">
                            {productViews}
                        </div>
                    }
                </div>
            </div>
        )
    }

}

function mapStateToProps(state, ownProps) {
    return {
        products: state.products,
        isLoggedIn: state.user.isLoggedIn
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(productActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);