import React, { useEffect, useState } from "react";
import { useParameter } from "@storybook/api";
import {
  Icons,
  IconButton,
  WithTooltip,
  TooltipLinkList,
} from "@storybook/components";

import { TOOL_ID } from "./constants";
import fetchData from "./fetch-data";

const getDisplayedItems = (versions, selectedVerion, change) => {
  let formattedVersions = [];

  for (const [key, value] of Object.entries(versions)) {
    formattedVersions.push({
      id: key,
      title: key,
      onClick: () => {
        change();
      },
      value: "test",
      active: false,
      href: value,
      target: "_blank",
    });
  }

  return formattedVersions;
};

export const VersionPicker = () => {
  const versionsConfig = useParameter("versions", {
    default: null,
    disable: true,
    values: [],
  });
  const [versions, setVersions] = useState();
  const [currentVersion, setCurrentVersion] = useState("Latest");

  useEffect(() => {
    // If URL contains a version number, set current version to that
    const url = window.location.href;
    if (url.includes("/archive/")) {
      const startIndex = url.indexOf("/?path=/");
      const endIndex = url.indexOf("/", startIndex + 10);

      const urlVersion = url.substring(startIndex + 9, endIndex);
      console.log("url version", url, startIndex, endIndex, urlVersion);
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
              links={getDisplayedItems(versions, undefined, () => {
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
