/* eslint-disable no-console */
import fs from "fs";
import fetch from "node-fetch";

const MIN_VERSION = "95.0.0"; // Update this when PR is about to be merged

const fetchVersions = async () => {
  const response = await fetch("https://registry.npmjs.com/carbon-ract");

  if (!response.ok) {
    throw new Error(
      `Failed to fetch from npm with HTTP error code ${response.status}`
    );
  }

  const json = await response.json();

  return Object.keys(json.versions);
};

const formatVersions = (versions) => {
  const filteredVersions = versions
    .slice(versions.indexOf(MIN_VERSION))
    .reverse();
  const versionsJson = {
    versions: {},
  };

  filteredVersions.forEach((item) => {
    versionsJson.versions[
      `v${item}`
    ] = `https://carbon.sage.com/archive/v${item}/index.html`;
  });

  return JSON.stringify(versionsJson);
};

export const writeFile = (jsonString) => {
  fs.mkdirSync("metadata", {}, (err) => {
    if (err) throw err;
  });

  fs.writeFileSync("metadata/metadata.json", jsonString, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Successfully created metadata.json file.");
    }
  });
};

export const generateMetadata = async () => {
  let versions;

  try {
    versions = await fetchVersions();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  const formattedVersions = formatVersions(versions);

  writeFile(formattedVersions);
};
