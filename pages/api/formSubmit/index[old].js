import Shopify from "shopify-api-node";

const mongoose = require("mongoose");

const User = mongoose.model("User");
const Bar = mongoose.model("Bar");
const BarCurrency = mongoose.model("BarCurrency");
const BarStyle = mongoose.model("BarStyle");
const BarTargeting = mongoose.model("BarTargeting");
const BarScript = mongoose.model("BarScript");

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
      console.log("body==>", body);
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
        fontSize,
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
        customCodeText,
      } = await body;
      const { addLinkToBar, barLink, openLinkInNewTab } = addLinkToBarData;
      const { selected: displayOnPageSelected } = displayOnPageData;
      const { selected: excludePageSelected } = excludePageData;

      const doAll = async (data) => {
        // console.log("doAll==>props==data==>", data);
        const { _id, user } = await data;
        const barCurrency = await BarCurrency.findOneAndUpdate(
          {
            bar: _id,
            user: user,
          },
          {
            currencyValue,
            currencySymbol,
            currencySymbolPosition,
          },
          {
            upsert: true,
            new: true,
          },
          async function (err, barCurrency) {
            if (err) return { "error in barCurrency": err };
            return { barCurrency };
          }
        );
        const barStyle = await BarStyle.findOneAndUpdate(
          {
            bar: _id,
            user: user,
          },
          {
            backgroundColor,
            textColor,
            specialTextColor,
            backgroundOpacity,
            fontFamily,
            fontSize,
            barPadding,
            disappearAfter,
            delayBeforeRepeating,
            timeToFadeInOut,
          },
          {
            upsert: true,
            new: true,
          },
          async function (err, barStyle) {
            if (err) return { "error in barStyle": err };
            return { barStyle };
          }
        );
        const barTargeting = await BarTargeting.findOneAndUpdate(
          {
            bar: _id,
            user: user,
          },
          {
            displayOnPage: displayOnPageData,
            excludeOnPage: excludePageData,
            deviceTarget,
            productTarget,
            customerTarget,
            geoLocationTarget,
            excludeGeoLocation,
            displaySchedule,
          },
          {
            upsert: true,
            new: true,
          },
          async function (err, barTargeting) {
            if (err) return { "error in barTargeting": err };
            return { barTargeting };
          }
        );
        const barScript = await BarScript.findOneAndUpdate(
          {
            bar: _id,
            user: user,
          },
          {
            customCodeText,
          },
          {
            upsert: true,
            new: true,
          },
          async function (err, barScript) {
            if (err) return { "error in barScript": err };
            return { barScript };
          }
        );
        return {
          doAllData: {
            barCurrency: await barCurrency,
            barStyle: await barStyle,
            barTargeting: await barTargeting,
            barScript: await barScript,
          },
        };
      };

      try {
        const barData = await Bar.findOneAndUpdate(
          {
            barName,
            user: await user.id,
          },
          {
            barName,
            freeShippingGoal,
            initialMsgBeforeAmount,
            initialMsgAfterAmount,
            progressMsgBeforeAmount,
            progressMsgAfterAmount,
            goalAchievedMsg,
            addLinkToBar,
            barLink,
            openLinkInNewTab,
            includeCloseButton,
            displayPosition,
            user: await user.id,
          },
          { upsert: true, new: true },
          async function (err, bar) {
            if (err) {
              return { errorr: err };
            } else {
              // const allDone = await doAll(bar);
              // const { doAllData } = allDone;
              // console.log("doAllData==>", doAllData);
              const { _id, user } = await bar;
              const barCurrency = await BarCurrency.findOneAndUpdate(
                {
                  bar: _id,
                  user: user,
                },
                {
                  currencyValue,
                  currencySymbol,
                  currencySymbolPosition,
                },
                {
                  upsert: true,
                  new: true,
                },
                async function (err, barCurrency) {
                  if (err) return { "error in barCurrency": err };
                  return { barCurrency };
                }
              );
              const barStyle = await BarStyle.findOneAndUpdate(
                {
                  bar: _id,
                  user: user,
                },
                {
                  backgroundColor,
                  textColor,
                  specialTextColor,
                  backgroundOpacity,
                  fontFamily,
                  fontSize,
                  barPadding,
                  disappearAfter,
                  delayBeforeRepeating,
                  timeToFadeInOut,
                },
                {
                  upsert: true,
                  new: true,
                },
                async function (err, barStyle) {
                  if (err) return { "error in barStyle": err };
                  return { barStyle };
                }
              );
              const barTargeting = await BarTargeting.findOneAndUpdate(
                {
                  bar: _id,
                  user: user,
                },
                {
                  displayOnPage: displayOnPageData,
                  excludeOnPage: excludePageData,
                  deviceTarget,
                  productTarget,
                  customerTarget,
                  geoLocationTarget,
                  excludeGeoLocation,
                  displaySchedule,
                },
                {
                  upsert: true,
                  new: true,
                },
                async function (err, barTargeting) {
                  if (err) return { "error in barTargeting": err };
                  return { barTargeting };
                }
              );
              const barScript = await BarScript.findOneAndUpdate(
                {
                  bar: _id,
                  user: user,
                },
                {
                  customCodeText,
                },
                {
                  upsert: true,
                  new: true,
                },
                async function (err, barScript) {
                  if (err) return { "error in barScript": err };
                  return { barScript };
                }
              );
              const doAllData = {
                barCurrency: await barCurrency,
                barStyle: await barStyle,
                barTargeting: await barTargeting,
                barScript: await barScript,
              };
              return {
                bar: await bar,
                doAllData,
              };
            }
          }
        );
        return res.status(200).json({
          data: "OK",
          barData,
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
            fontSize,
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
        console.log("MONGO ERROR::", error);
      }
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
