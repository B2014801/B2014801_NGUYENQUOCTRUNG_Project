const express = require('express');
const router = express.Router();
const path = require('path');

const product = require('../controllers/Product/product.controller');
const cart = require('../controllers/cart/cart.controller');
const invoice = require('../controllers/invoice/invoice.controller');
const authController = require('../controllers/authController/auth.controller');
const authMiddleware = require('../controllers/authController/auth.middlewares');
const uploadMiddleware = require('../middlewares/multer');
const user = require('../controllers/user/user.controller');

router.route('/').get(product.home);

//product
router
    .route('/product')
    .get(product.getAllProduct)
    .post(authMiddleware.isAuth, uploadMiddleware.single('img'), product.create);

// router.use('/api/petshop/product/img/:id', express.static(path.join(__dirname, '../store/img')));

// router.route('/product/img/:id').get(product.getProductImg);
router
    .route('/product/:id')
    .put(authMiddleware.isAuth, uploadMiddleware.single('img'), product.update)
    .delete(authMiddleware.isAuth, product.deleteProduct)
    .get(product.findById)
    .post(authMiddleware.isAuth, cart.create);

//cart
// router.route('/cart').get(authMiddleware.isAuth, cart.getAll);
router
    .route('/cart/:id')
    .get(authMiddleware.isAuth, cart.getAllOfOneUser)
    .post(authMiddleware.isAuth, authMiddleware.isAuth, cart.updateAmount);
router.route('/cart/deleteOneProduct').delete(cart.deleteOneProduct);

// router.get('/profile', authMiddleware, async (req, res) => {
//     res.send(req.user);
// });

// auth
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/refresh', authController.refreshToken);
//user
router.route('/user/:id').get(user.findById).post(user.update);
router.get('/user', user.findAll);
router.route('/user/update').put(uploadMiddleware.single('img'), user.update);

// checkout
router
    .route('/invoice')
    .post(authMiddleware.isAuth, invoice.create)
    .get(authMiddleware.isAuth, invoice.getAllInvoiceOfOneUser)
    .put(authMiddleware.isAuth, invoice.updateStatus);
// user

//
router.route('/invoice/all').get(authMiddleware.isAuth, invoice.getAllInvoice);
router.route('/invoice/revenue').get(invoice.getRevenue);
//

//
//voucher

// Routes
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

module.exports = router;
