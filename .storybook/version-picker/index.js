import React, { useEffect, useState } from "react";
import {
  Icons,
  IconButton,
  WithTooltip,
  TooltipLinkList,
} from "@storybook/components";

import { TOOL_ID } from "./constants";
import fetchData from "./fetch-data";

const getDisplayedItems = (versions, change) => {
  let formattedVersions = [];

  for (const [key, value] of Object.entries(versions)) {
    formattedVersions.push({
      id: key,
      title: key,
      onClick: () => {
        change();
      },
      active: false,
      href: value,
      target: "_blank",
    });
  }

  return formattedVersions;
};

export const VersionPicker = () => {
  const [versions, setVersions] = useState();
  const [currentVersion, setCurrentVersion] = useState("Latest");

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("/archive/")) {
      const startIndex = url.indexOf("/archive/");
      const endIndex = url.indexOf("/", startIndex + 10);

      const urlVersion = url.substring(startIndex + 9, endIndex);
      setCurrentVersion(urlVersion);
    }

    const getData = async () => {
      const data = await fetchData();
      setVersions(data.versions);
    };

    getData();
  }, []);

  if (versions) {
    return (
      <WithTooltip
        placement="top"
        trigger="click"
        closeOnClick
        tooltip={({ onHide }) => {
          return (
            <TooltipLinkList
              links={getDisplayedItems(versions, () => {
                onHide();
              })}
            />
          );
        }}
      >
        <IconButton
          key={TOOL_ID}
          active={false}
          title="Open docs for a different version"
        >
          {/*
       Checkout https://next--storybookjs.netlify.app/official-storybook/?path=/story/basics-icon--labels
       for the full list of icons
      */}
          {`${currentVersion}`}
          <Icons icon="arrowdown" />
        </IconButton>
      </WithTooltip>
    );
  }

  return null;
};
