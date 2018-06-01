const Router = require('express').Router
const Product = require('./model')

const router = new Router()

const requireUser = (req, res, next) => {
	if (req.user) next()
	else res.status(401).send({
		message: 'Please login'
	})
}

router.get('/products/:id', (req, res) => {
	const productId = req.params.id
	Product.findById(productId)
	  .then(result => {
	  	if (!result) {
	  		res.status(404).send({error: 'Does not exist'})
	  	}
	  	else {
	  		res.send(result)
	  	}
	  })
	  .catch(err => {
	    res.status(500).send({error: 'Something went wrong with Postgres'})
	  })
})

router.get('/products', (req, res) => {
	Product.findAll({
	  attributes: ['id', 'name', 'price']
	})
	  .then(result => {
	    // do something with result
	    res.send({
	    	products: result
	    })
	  })
	  .catch(err => {
	    // there was an error, return some HTTP error code
	    res.status(500).send({error: 'Something went wrong with Postgres'})
	  })
})


router.post('/products', requireUser, (req, res) => {
  const product = req.body

  Product.create(product).then(entity => {
    res.status(201).send(entity)
  })
})

router.put('/products/:id', requireUser, (req, res) => {
  const productId = Number(req.params.id)
  const updates = req.body

  // find the product in the DB
  Product.findById(req.params.id)
    .then(entity => {
      // change the product and store in DB
      return entity.update(updates)
    })
    .then(final => {
      // respond with the changed product and status code 200 OK
      res.send(final)
    })
    .catch(error => {
      res.status(500).send({
        message: `Something went wrong`,
        error
      })
    })

})

router.delete('/products/:id', requireUser, (req, res) => {
  const productId = Number(req.params.id)

  Product.findById(req.params.id)
	  .then(entity => {
	    // change the product and store in DB
	    return entity.destroy()
	  })
	  .then(_ => {
	    // respond with the changed product and status code 200 OK
	    res.send({
	      message: 'The product was deleted succesfully'
	    })
	  })
	  .catch(error => {
	    res.status(500).send({
	      message: `Something went wrong`,
	      error
	    })
	  })
})


module.exports = router
