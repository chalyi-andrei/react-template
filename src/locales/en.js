// @flow

export default {
  number: {
    format: {
      strip_insignificant_zeros: true,
      delimiter: '',
    },
    currency: {
      format: {
        format: '%u%n',
      },
    },
  },

  common: {
    loadingError: 'Something went wrong. Please try again later.',
  },

  start: {
    emptyList: 'There is no items to show.',
  },
};
