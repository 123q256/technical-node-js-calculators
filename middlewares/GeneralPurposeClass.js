class GeneralPurposeClass {
  /**
   * paginationLimitPage: Utility Function used to get page limit and how many reord we need to skip
   * @param {Number} result_per_page
   * @param {Number} page
   * @returns object having
   */
  paginationLimitPage(result_per_page, page) {
    return {
      limit: parseInt(result_per_page),
      offset: parseInt(result_per_page) * (parseInt(page) - 1),
    };
  }
}

module.exports = new GeneralPurposeClass();
