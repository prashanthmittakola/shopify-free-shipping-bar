"use strict";

/**
 * Module dependencies.
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Free Shipping Bar Schema
 */

const BarSchema = new Schema({
  barName: { type: String, default: "", trim: true, maxlength: 100 },
  freeShippingGoal: { type: Number, default: "", trim: true, maxlength: 10 },
  initialMsgBeforeAmount: {
    type: String,
    default: "",
    trim: true,
    maxlength: 50,
  },
  initialMsgAfterAmount: {
    type: String,
    default: "",
    trim: true,
    maxlength: 50,
  },
  progressMsgBeforeAmount: {
    type: String,
    default: "",
    trim: true,
    maxlength: 50,
  },
  progressMsgAfterAmount: {
    type: String,
    default: "",
    trim: true,
    maxlength: 50,
  },
  goalAchievedMsg: { type: String, default: "", trim: true, maxlength: 50 },
  addLinkToBar: { type: Boolean, default: false },
  barLink: { type: String, trim: true, maxlength: 200 },
  openLinkInNewTab: { type: Boolean, default: true },
  includeCloseButton: { type: Boolean, default: true },
  displayPosition: { type: String, default: "top" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: "User" },
});

/**
 * Validations
 */

BarSchema.path("barName").required(true, "name cannot be blank");

/**
 * Pre-remove hook
 */

BarSchema.pre("remove", function (next) {
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

BarSchema.methods = {
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

BarSchema.statics = {
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

BarSchema.set("timestamps", true);
const Bar = mongoose.model("Bar", BarSchema);

module.exports = Bar;
