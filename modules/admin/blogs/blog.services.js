const path = require('path');
const fs = require('fs');
const { Op } = require("sequelize");
const db = require("../../../models");
const { ApiError } = require("../../../middlewares/ApiError");
const HttpCodes = require("http-codes");
const { Blog } = require("../../../models");

// baaki aapka code waisa hi...
const BLOG_IMG_PATH = path.join(__dirname, "../../public/images/blogs");


class BlogServices {
  // Get all blogs
  async getAllBlogs() {
    try {
      const blogs = await Blog.findAll({
        attributes: [
          'id',
          'title',
          'description',
          'category',
          'index',
          'related_cal',
          'url',
          'meta_title',
          'meta_description',
          'image',
          'short_description',
          'created_at',
        ],
        order: [['created_at', 'DESC']],
      });
      return blogs;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw new ApiError(HttpCodes.INTERNAL_SERVER_ERROR, "Failed to fetch blogs");
    }
  }

  // ✅ Create Blog


async createBlogs(data, files) {
  try {
    console.log(files.image);

    const {
      title,
      description,
      category,
      index,
      related_cal,
      url,
      meta_title,
      meta_description,
      short_description,
    } = data;

    let imagePath = null;

    // ✅ Step 1: Handle image upload
    if (files && files.image) {
      const uploadDir = path.join(__dirname, '../../../public/images/blogs');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileExt = path.extname(files.image.name); // e.g., .jpg
      const fileName = `blog_${Date.now()}${fileExt}`;
      const fullPath = path.join(uploadDir, fileName);

      // Move the file
      files.image.mv(fullPath, (err) => {
        if (err) {
          throw new Error('Failed to upload image');
        }
      });

      // Save relative path to DB (you can customize this path as per frontend access)
      imagePath = `${fileName}`;
    }

    // ✅ Step 2: Create blog entry in DB
    const blog = await Blog.create({
      title,
      description,
      category,
      index,
      related_cal,
      url,
      meta_title,
      meta_description,
      image: imagePath,
      short_description,
      created_at: new Date(),
    });

    return { message: "Blog created successfully", blog };
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
}

  // ✅ Get All Blogs
  async getBlogsCalculator() {
    try {
      return await Blog.findAll({
        order: [["created_at", "DESC"]],
      });
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw error;
    }
  }

  // ✅ Get Blog by ID
  async editBlogs(blogId ) {
    try {
      const blog = await Blog.findByPk(blogId);
      if (!blog) throw new Error("Blog not found");
      return blog;
    } catch (error) {
      console.error("Error fetching blog:", error);
      throw error;
    }
  }


async updateBlogs(blogId, updateData, files) {
  try {
    console.log(updateData);
    console.log("Updating blog...");

    const blog = await Blog.findByPk(blogId);
    if (!blog) throw new Error("Blog not found");

    // ✅ Handle related_cal[] array conversion
    const relatedCalArray = Object.keys(updateData)
      .filter((key) => key.startsWith("related_cal["))
      .map((key) => updateData[key]);

    if (relatedCalArray.length > 0) {
      updateData.related_cal = JSON.stringify(relatedCalArray);

      // Remove related_cal[0], [1], etc.
      Object.keys(updateData).forEach((key) => {
        if (key.startsWith("related_cal[")) {
          delete updateData[key];
        }
      });
    }

    // ✅ Handle image update
    if (files && files.image) {
      const uploadDir = path.join(__dirname, "../../../public/images/blogs");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Delete old image
  if (blog.image) {
    const oldImagePath = path.normalize(path.join(__dirname, "../../../public/images/blogs", blog.image));
    console.log("Trying to delete:", oldImagePath);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
      console.log("Old image deleted");
    } else {
      console.log("Old image NOT found at:", oldImagePath);
    }
  }


      const fileExt = path.extname(files.image.name);
      const fileName = `blog_${Date.now()}${fileExt}`;
      const fullPath = path.join(uploadDir, fileName);

      // Move new file
      await files.image.mv(fullPath);

      // Update path in DB
      updateData.image = `${fileName}`;
    }

    // ✅ Update the blog in DB
    await blog.update(updateData);

    return { message: "Blog updated successfully", updateData };
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
}


async deleteBlogs(blogId) {
  try {
    const blog = await Blog.findByPk(blogId);
    if (!blog) throw new Error("Blog not found");

    // ✅ Delete image if it exists
    if (blog.image) {
      // Normalize and construct the full path
      const oldImagePath = path.normalize(path.join(__dirname, "../../../public/images/blogs", blog.image));
      console.log("Trying to delete:", oldImagePath);

      // ✅ Check if the file exists and delete
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log("Old image deleted");
      } else {
        console.log("Old image NOT found at:", oldImagePath);
      }
    }

    // ✅ Delete blog record
    await blog.destroy();

    return { message: "Blog deleted successfully" };
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
}


async updatestatus(id, body) {
  const blog = await Blog.findByPk(id);
  if (!blog) throw new Error("Blog not found");

  // Agar aap body me index bhej rahe hain to wahi update karenge, nahi to toggle karenge
  let newIndex;

  if (typeof body.index !== 'undefined') {
    newIndex = body.index;
  } else {
    newIndex = blog.index == 1 ? 0 : 1;
  }

  await blog.update({ index: newIndex });

  return blog;
}



}

module.exports = new BlogServices();
