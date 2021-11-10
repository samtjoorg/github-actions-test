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
  // const backgroundSelectorItems = backgrounds.map(({ name, value }) =>
  //   createBackgroundSelectorItem(
  //     null,
  //     name,
  //     value,
  //     true,
  //     change,
  //     value === selectedBackgroundColor
  //   )
  // );

  if (selectedVerion !== "transparent") {
    return versions;
  }

  return backgroundSelectorItems;
};

export const VersionPicker = () => {
  const versionsConfig = useParameter("versions", {
    default: null,
    disable: true,
    values: [],
  });
  const [versions, setVersions] = useState();

  useEffect(() => {
    setVersions(fetchData());
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
              links={getDisplayedItems(versions, undefined, ({ selected }) => {
                // if (selectedBackgroundColor !== selected) {
                //   onBackgroundChange(selected);
                // }
                onHide();
              })}
            />
          );
        }}
      >
        <IconButton
          key={TOOL_ID}
          active={false} // Make active if selected version not current
          title="Open docs for a different version"
        >
          {/*
       Checkout https://next--storybookjs.netlify.app/official-storybook/?path=/story/basics-icon--labels
       for the full list of icons
      */}
          Current
          <Icons icon="arrowdown" />
        </IconButton>
      </WithTooltip>
    );
  }

  return null;
};
