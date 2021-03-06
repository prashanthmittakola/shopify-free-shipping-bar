import React from "react";
import { Icon } from "@shopify/polaris";
import { LockMinor } from "@shopify/polaris-icons";

const UpgradePlanLockIcon = (props) => {
  const { beforeText, textColor } = props;
  const defaultTextColor = "#6d7175";
  return (
    <div className="upgrade-plan-div">
      <span
        className="upgrade-plan-before-text"
        style={{ color: textColor ?? defaultTextColor }}
      >
        {beforeText}
      </span>
      <span className="lock-icon">
        <Icon source={LockMinor} color="base" />
      </span>
      <a
        href="#"
        onClick={() => {
          return false;
        }}
      >
        {" "}
        Upgrade{" "}
      </a>
    </div>
  );
};

export default UpgradePlanLockIcon;
