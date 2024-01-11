module.exports = {
  plugins: ["prettier-plugin-astro", "prettier-plugin-organize-imports"],
  pluginSearchDirs: false,
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
