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
  const userId = await user.id;

  const { method } = req;
  if (method == "POST") {
    try {
      const { body } = await req;
      // console.log("body==>", body);
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
      const {
        addLinkToBar,
        linkUrl: barLink,
        openLinkInNewTab,
      } = await addLinkToBarData;
      const { selected: displayOnPageSelected } = await displayOnPageData;
      const { selected: excludePageSelected } = await excludePageData;

      const createFreeShippingBar = new Promise(async (resolve, reject) => {
        const bar = await new Bar({
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
          user: userId,
        }).save();
        resolve(bar);
        return bar;
      });
      const data = await createFreeShippingBar.then(async (bar) => {
        console.log("barId ==>", bar.id);
        const { id: barId } = bar;
        const barCurrency = await BarCurrency({
          bar: await barId,
          user: await userId,
          currencyValue,
          currencySymbol,
          currencySymbolPosition,
        }).save();
        const barStyle = await BarStyle({
          bar: await barId,
          user: await userId,
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
        }).save();
        const barTargeting = await BarTargeting({
          bar: await barId,
          user: await userId,
          displayOnPage: displayOnPageData,
          excludeOnPage: excludePageData,
          deviceTarget,
          productTarget,
          customerTarget,
          geoLocationTarget,
          excludeGeoLocation,
          displaySchedule,
        }).save();
        const barScript = await BarScript({
          bar: await barId,
          user: await userId,
          customCodeText,
        }).save();
        return {
          bar,
          barCurrency,
          barStyle,
          barTargeting,
          barScript,
        };
      });

      /*
      const foundBar = await Bar.findOneAndUpdate(
        {
          barName,
          user: userId,
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
          user: userId,
        },
        { upsert: true, new: true },
        async function (err, bar) {
          if(err) console.log("mongo fields error",err)
          return bar;
        }
      )
        .then(async (bar) => {
          const barId = await bar.id;
          const barCurrency = await BarCurrency.findOneAndUpdate(
            {
              bar: await barId,
              user: await userId,
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
              bar: await barId,
              user: await userId,
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
              bar: await barId,
              user: await userId,
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
              bar: await barId,
              user: await userId,
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
          // console.log("all==>", {
          //   bar,
          //   barCurrency,
          //   barStyle,
          //   barTargeting,
          //   barScript,
          // });
          // return { bar, barCurrency, barStyle, barTargeting, barScript };
          return res.status(200).json({
            data: "OK",
            bar,
            barCurrency,
            barStyle,
            barTargeting,
            barScript,
          });
        })
        .catch((err) => {
          console.log("err occured==>", err);
          return {"mongoErr":err}
        });
        */

      return res.status(200).json({
        data,
      });
    } catch (error) {
      res.status(401).json({ error });
    }
  }

  if (method == "GET") {
    try {
      const bars = await Bar.find({});
      const barCurrencies = await BarCurrency.find({});
      const barStyles = await BarStyle.find({});
      const barTargetings = await BarTargeting.find({});
      const barScripts = await BarScript.find({});
      res.status(200).json([...bars]);
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  }
}
