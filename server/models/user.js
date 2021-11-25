"use strict";

/**
 * Module dependencies.
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * User Schema
 */

const UserSchema = new Schema({
  shop: { type: String, default: "", trim: true, maxlength: 400 },
  accessToken: { type: String, default: "", trim: true, maxlength: 400 },
  host: { type: String, default: "", trim: true, maxlength: 400 },
  email: { type: String, default: "", trim: true, maxlength: 400 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

/**
 * Validations
 */

UserSchema.path("shop").required(true, "User shop cannot be blank");

/**
 * Pre-remove hook
 */

UserSchema.pre("remove", function (next) {
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

UserSchema.methods = {
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

UserSchema.statics = {
  /**
   * Find metafield by id
   *
   * @param {ObjectId} id
   * @api private
   */

  load: function (_id) {
    return (
      this.findOne({ _id })
        // .populate('user', 'name email username')
        // .populate('comments.user')
        .exec()
    );
  },

  /**
   * List metafields
   *
   * @param {Object} options
   * @api private
   */

  list: function (options) {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 30;
    return (
      this.find(criteria)
        // .populate('user', 'name username')
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(limit * page)
        .exec()
    );
  },
};

UserSchema.set("timestamps", true);
const User = mongoose.model("User", UserSchema);

module.exports = User;
