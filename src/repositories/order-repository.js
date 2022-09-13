'use strict';
const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async () => {
    const res = await Order.find({},'number status customer items' )
    .populate('items.product','title').populate('customer');
    return res;
}

exports.create = async(data) => {
    let order = new Order(data);
    await order
        .save();
}