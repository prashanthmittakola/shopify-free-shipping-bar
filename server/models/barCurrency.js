"use strict";

/**
 * Module dependencies.
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Free Shipping Bar Schema
 */

const BarCurrencySchema = new Schema({
    currency: { type: String, default: "", trim: true, maxlength: 100 },
    currencySymbolPosition: { type: String, default: "before the amount", trim: true, maxlength: 100 },
    bar: { type: Schema.ObjectId, ref: "Bar" },
    user: { type: Schema.ObjectId, ref: "User" },
});



/**
 * Pre-remove hook
 */

 BarCurrencySchema.pre("remove", function (next) {
  // const imager = new Imager(imagerConfig, 'S3');
  // const files = this.image.files;

  // if there are files associated with the item, remove from the cloud too
  // imager.remove(files, function (err) {
  //   if (err) return next(err);
  // }, 'metafield');

  next();
});

/**
 * Methods
 */

 BarCurrencySchema.methods = {
  /**
   * Save metafield and upload image
   *
   * @param {Object} images
   * @api private
   */

  uploadAndSave: function (/*image*/) {
    const err = this.validateSync();
    if (err && err.toString()) throw new Error(err.toString());
    return this.save();

    /*
    if (images && !images.length) return this.save();
    const imager = new Imager(imagerConfig, 'S3');

    imager.upload(images, function (err, cdnUri, files) {
      if (err) return cb(err);
      if (files.length) {
        self.image = { cdnUri : cdnUri, files : files };
      }
      self.save(cb);
    }, 'metafield');
    */
  },
};

/**
 * Statics
 */

 BarCurrencySchema.statics = {
  
  load: function (_id) {
    return (
      this.findOne({ _id })
        .exec()
    );
  },

  list: function (options) {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 30;
    return (
      this.find(criteria)        
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(limit * page)
        .exec()
    );
  },
};

const BarCurrency = mongoose.model("BarCurrency", BarCurrencySchema);

module.exports = BarCurrency;
