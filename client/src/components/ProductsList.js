import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchAllProducts, createProduct, deleteProduct} from '../actions/products'
import {Link} from 'react-router-dom'
import ProductForm from './ProductForm'

class ProductsList extends PureComponent {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })).isRequired
  }

  createProduct = (product) => {
    this.props.createProduct(product)
  }

  deleteProduct = (productId) => {
    this.props.deleteProduct(productId)
  }

  componentWillMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const {products, currentUser} = this.props
    return (
      <div>
        <h1>All products</h1>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { products.map(product => (<tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <Link to={ `/products/${product.id}` }>{product.name}</Link>
              </td>
              <td>&euro; {product.price}.00</td>
              {currentUser && <td><button onClick={ () => this.deleteProduct(product.id) }>X</button></td>}
            </tr>)) }
          </tbody>
				</table>
        {currentUser && <h1>Create a new product</h1> &&

        <ProductForm onSubmit={this.createProduct}/>
      }

        {!currentUser && <p>Please <Link to="/login">login</Link> or <Link to="/signup">sign up</Link></p> }

      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    products: state.products,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, {
  fetchAllProducts,
  createProduct,
  deleteProduct
})(ProductsList)
