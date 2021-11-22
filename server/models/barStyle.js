"use strict";

/**
 * Module dependencies.
 */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/**
 * Free Shipping Bar Schema
 */

const BarStyleSchema = new Schema({
    bgColor: {type: String, trim:true, default:"#7e7e7e", maxlength: 10},
    textColor: {type: String, trim:true, default:"#fff", maxlength: 10},
    specialTextColor: {type: String, trim:true, default:"red", maxlength: 10},
    bgOpacity: {type: Number, trim:true, default:1, maxlength: 5},
    fontFamily:  {type: String, trim:true, default:"Roboto", maxlength: 20},
    fontSize:  {type: Number, trim:true, default:16, maxlength: 5},
    barPadding:  {type: Number, trim:true, default:10, maxlength: 5},
    bar:  { type: Schema.ObjectId, ref: "Bar" },
    user: { type: Schema.ObjectId, ref: "User" },
});



/**
 * Pre-remove hook
 */

 BarStyleSchema.pre("remove", function (next) {
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

 BarStyleSchema.methods = {
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

 BarStyleSchema.statics = {
  
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

const BarStyle = mongoose.model("BarStyle", BarStyleSchema);

module.exports = BarStyle;
