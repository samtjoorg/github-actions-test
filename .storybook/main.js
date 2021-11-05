module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
  ],
  refs: {
    test: {
      title: "Sam test",
      url:
        "https://carbon-versioned.s3.eu-west-1.amazonaws.com/archive/1.0.14/index.html",
    },
  },
};
