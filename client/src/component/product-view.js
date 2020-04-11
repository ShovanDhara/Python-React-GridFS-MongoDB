import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class ProductView extends React.Component {
    constructor(props) {
        super(props)
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete() {
        const { onDelete } = this.props;
        const product = this.props.product;
        onDelete(product);
    }

    render() {
        const { img_url, name, description, price, id } = this.props.product;
        return (
            <div className="card">
                <img className="card-img-top" src={img_url} alt="Card imagalte cap" />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text">{price}</p>
                    <button className="btn btn-primary mr-2 edit-btn"><Link to={'/edit/' + id}>Edit</Link></button>
                    <button className="btn btn-denger" onClick={this.onDelete}>Delete</button>
                </div>
            </div>
        );
    }
}
ProductView.propTypes = {
    product: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default ProductView;

