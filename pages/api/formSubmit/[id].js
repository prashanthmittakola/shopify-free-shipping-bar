import Shopify from "shopify-api-node";

const mongoose = require("mongoose");
const User = mongoose.model("User");
const Bar = mongoose.model("Bar");
const BarCurrency = mongoose.model("BarCurrency");
const BarStyle = mongoose.model("BarStyle");
const BarTargeting = mongoose.model("BarTargeting");
const BarScript = mongoose.model("BarScript");

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  console.log("id=====>", id);

  const { shopOrigin, accessToken } = req.cookies;
  const shopify = new Shopify({
    shopName: shopOrigin,
    accessToken,
  });

  const user = await User.findOne({ shop: shopOrigin });
  const userId = await user.id;

  if (method == "GET") {
    try {
      // const bar = await Bar.findById(id);
      const barCurrency = await BarCurrency.aggregate([
        {
          $lookup: {
            from: "bars",
            localField: "id",
            foreignField: "id",
            as: "barData",
          },
        },
        { $project: { "barData._id": 1 } },
        // {$unwind:"$barData"}
      ]);
      // const barCurrency = await BarCurrency.find({"$bar": ObjectId(id)});
      // const barStyle = await BarStyle.findById({bar:id});
      // const barTargeting = await BarTargeting.findById({bar:id});
      // const barScript = await BarScript.findById({bar:id});

      res.status(200).json({ barCurrency });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  }

  if (method == "PUT") {
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
      const { addLinkToBar, barLink, openLinkInNewTab } = addLinkToBarData;
      const { selected: displayOnPageSelected } = displayOnPageData;
      const { selected: excludePageSelected } = excludePageData;

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
          if (err) console.log("mongo fields error", err);
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
          return { bar, barCurrency, barStyle, barTargeting, barScript };
          /*
          return res.status(200).json({
            data: "OK",
            bar,
            barCurrency,
            barStyle,
            barTargeting,
            barScript,
          });
          */
        })
        .catch((err) => {
          console.log("err occured==>", err);
          return { mongoErr: err };
        });

      return res.status(200).json({
        data: foundBar,
      });
    } catch (error) {
      res.status(401).json({ error });
    }
  }
}
