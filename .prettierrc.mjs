// @ts-check
/**
 * @type {import('prettier').Config}
 */
export default {
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.svg',
      options: {
        parser: 'html',
      },
    },
  ],
};
