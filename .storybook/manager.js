import { addons, types } from "@storybook/addons";
import { ADDON_ID, TOOL_ID } from "./version-picker/constants";
import { VersionPicker } from "./version-picker";

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Version picker",
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: VersionPicker,
  });
});
