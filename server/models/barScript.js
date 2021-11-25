"use strict";

/**
 * Module dependencies.
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Free Shipping Bar Schema
 */

const BarScriptSchema = new Schema({
  customCodeText: { type: String, trim: true, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  bar: { type: Schema.ObjectId, ref: "Bar" },
  user: { type: Schema.ObjectId, ref: "User" },
});

/**
 * Pre-remove hook
 */

BarScriptSchema.pre("remove", function (next) {
  // const imager = new Imager(imagerConfig, 'S3');
  // const files = this.image.files;
  next();
});

/**
 * Methods
 */

BarScriptSchema.methods = {
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

BarScriptSchema.statics = {
  load: function (_id) {
    return this.findOne({ _id }).exec();
  },

  list: function (options) {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 30;
    return this.find(criteria)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec();
  },
};
BarScriptSchema.set("timestamps", true);
const BarScript = mongoose.model("BarScript", BarScriptSchema);

module.exports = BarScript;
