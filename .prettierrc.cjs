module.exports = {
  plugins: ['prettier-plugin-astro', 'prettier-plugin-organize-imports'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
