///server/routes/index.js
const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const orderController = require('../controllers/orderController');
const subtypeRouter = require('./subtypeRouter');
const orderRouter = require('./orderRouter');
const courierRouter = require("./courierRouter");
const warehouseRouter = require("./warehouseRouter");

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.post('/create', orderController.createOrder);
router.use('/subtype', subtypeRouter);
router.use('/order', orderRouter);
router.use("/couriers", courierRouter);
router.use("/warehouse", warehouseRouter);

module.exports = router