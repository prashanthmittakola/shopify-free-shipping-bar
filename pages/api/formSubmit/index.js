import Shopify from "shopify-api-node";

const mongoose = require("mongoose");
const User = mongoose.model("User");
const Bar = mongoose.model("Bar");

export default async function handler(req, res) {
  const { shopOrigin, accessToken } = req.cookies;
  const shopify = new Shopify({
    shopName: shopOrigin,
    accessToken,
  });

  const user = await User.findOne({ shop: shopOrigin });

  const { method } = req;
  if (method == "POST") {
    try {
      const { body } = await req;
      delete body.customCodeText;
      console.log(body);
      const {
        barName,
        freeShippingGoal,
        // addLinkToBarData: { addLinkToBar, linkUrl:barLink, openLinkInNewTab },
        addLinkToBarData,
        displayOnPageData,
        excludePageData,
        msgBefore: initialMsgBeforeAmount,
        msgAfter: initialMsgAfterAmount,
        progressMsgBefore: progressMsgBeforeAmount,
        progressMsgAfter: progressMsgAfterAmount,
        goalAchievedMsg,
        includeCloseButton,
        displayPosition,
        currencyValue,
        currencySymbol,
        currencySymbolPosition,
        backgroundColor,
        textColor,
        specialTextColor,
        backgroundOpacity,
        fontFamily,
        fonstSize,
        barPadding,
        disappearAfter,
        delayBeforeRepeating,
        timeToFadeInOut,
        deviceTarget,
        productTarget,
        customerTarget,
        geoLocationTarget,
        excludeGeoLocation,
        displaySchedule,
      } = await body;

      const doAll = (data) => {
        console.log("doAll", data);
      };

      // const bar = await Bar.findOneAndUpdate(
      //   {
      //     barName,
      //     user: await user.id,
      //   },
      //   {
      //     barName,
      //     freeShippingGoal,
      //     initialMsgBeforeAmount,
      //     initialMsgAfterAmount,
      //     progressMsgBeforeAmount,
      //     progressMsgAfterAmount,
      //     goalAchievedMsg,
      //     addLinkToBar,
      //     barLink,
      //     openLinkInNewTab,
      //     includeCloseButton,
      //     displayPosition,
      //     user: await user.id
      //   },
      //   { upsert: true,new:true },
      //   async function (err, bar) {
      //     if (err) return {errorr:err};

      //     return {bar:await bar};
      //   }
      // );
      return res.status(200).json({
        data: "OK",
        // ...bar,
        body: {
          barName,
          freeShippingGoal,
          addLinkToBarData,
          displayOnPageData,
          excludePageData,
          initialMsgBeforeAmount,
          initialMsgAfterAmount,
          progressMsgBeforeAmount,
          progressMsgAfterAmount,
          goalAchievedMsg,
          includeCloseButton,
          displayPosition,
          currencyValue,
          currencySymbol,
          currencySymbolPosition,
          backgroundColor,
          textColor,
          specialTextColor,
          backgroundOpacity,
          fontFamily,
          fonstSize,
          barPadding,
          disappearAfter,
          delayBeforeRepeating,
          timeToFadeInOut,
          deviceTarget,
          productTarget,
          customerTarget,
          geoLocationTarget,
          excludeGeoLocation,
          displaySchedule,
        },
      });
    } catch (error) {
      res.status(400).json({ data: error });
    }
  }

  if (method == "GET") {
    try {
      res.status(200).json({ data: "OKK" });
    } catch (error) {
      res.status(400).json({ data: "false", error });
    }
  }
}
