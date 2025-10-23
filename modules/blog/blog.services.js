const { Op, where } = require("sequelize");
const db = require("../../models");
const HttpCodes = require("http-codes");
const { ApiError } = require("../../middlewares/ApiError");
const GeneralPurposeClass = require("../../middlewares/GeneralPurposeClass");
const { QUERY_PARAMS } = require("./constants");

const { Blog } = db;

class BlogsServices {
  async getAllBlogs(queryParams) {
    const { page = QUERY_PARAMS.PAGE, limit = QUERY_PARAMS.LIMIT } =
      queryParams;
    const pagination = GeneralPurposeClass.paginationLimitPage(limit, page);

    const buildFilter = (allowedFields) =>
      Object.keys(queryParams).reduce((acc, item) => {
        if (allowedFields.includes(item)) {
          const field = item.includes(".")
            ? item.split(".")[item.split(".").length - 1]
            : item;
          acc[field] = queryParams[item];
        }
        return acc;
      }, {});

    const allowedBlogFilterForQuering = buildFilter([
      "id",
      "title",
      "category",
    ]);

    // **Filter Only Records Where `index = 1`**
    allowedBlogFilterForQuering.index = 1;

    // Search
    if (queryParams.q) {
      allowedBlogFilterForQuering[Op.or] = [
        { category: { [Op.substring]: queryParams.q } },
        { title: { [Op.substring]: queryParams.q } },
      ];
    }

    const results = await Blog.findAndCountAll({
      where: allowedBlogFilterForQuering,
      ...pagination,
      order: [["created_at", "DESC"]],
      attributes: ["title", "url", "image", "short_description"],
    });

    return {
      count: results?.rows?.length,
      total_count: results?.count,
      total_pages: Math.ceil(results?.count / limit),
      page: parseInt(page),
      results: results.rows,
    };
  }

  async getSingleBlogsService(url) {
    const result = await Blog.findOne({
      where: {
        url: url, // Find by URL instead of ID
      },
    });

    if (!result) {
      throw new ApiError(
        "Blog Not Found",
        HttpCodes.NOT_FOUND,
        "BLOG_NOT_FOUND"
      );
    }

    return result;
  }
}
module.exports = new BlogsServices();
