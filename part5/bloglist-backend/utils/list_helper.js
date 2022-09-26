const authorsInfo = [];

const dummy = (blogs) => {
  const trueFalse = blogs.length === 0 ? 1 : 0;
  return trueFalse;
};

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  return likes.reduce((prev, curr) => prev + curr, 0);
};

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const highestLike = Math.max(...likes);
  const highestLikeInfo = blogs.find((profile) => profile.likes === highestLike);
  return {
    title: highestLikeInfo.title,
    author: highestLikeInfo.author,
    likes: highestLikeInfo.likes
  };
};

const mostBlogs = (blogs) => {
  let count = 0;

  while (blogs.length) {
    if (authorsInfo.length === 0) {
      authorsInfo.push(
        {
          author: blogs[blogs.length - 1].author,
          likes: blogs[blogs.length - 1].likes,
          blogs: 1
        }
      );
      blogs.pop();
    } else if ((blogs[blogs.length - 1].author !== authorsInfo[count].author)
    && (authorsInfo.length - 1 === count)) {
      authorsInfo.push(
        {
          author: blogs[blogs.length - 1].author,
          likes: blogs[blogs.length - 1].likes,
          blogs: 1
        }
      );
      blogs.pop();
      count = 0;
    } else if ((blogs[blogs.length - 1].author === authorsInfo[count].author)
    && (blogs[blogs.length - 1].likes !== authorsInfo[count].likes)) {
      authorsInfo[count].blogs += 1;
      authorsInfo[count].likes += blogs[blogs.length - 1].likes;
      blogs.pop();
      count = 0;
    } else {
      count += 1;
    }
  }
  const totalBlogs = authorsInfo.map((totalBlog) => totalBlog.blogs);
  const highestBlogCount = Math.max(...totalBlogs);
  const results = authorsInfo.find((profile) => profile.blogs === highestBlogCount);
  return {
    author: results.author,
    blogs: results.blogs
  };
};

const mostLikes = () => {
  const likes = authorsInfo.map((blog) => blog.likes);
  const highestLikes = Math.max(...likes);
  const result = authorsInfo.find((blog) => blog.likes === highestLikes);
  return {
    author: result.author,
    likes: result.likes
  };
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
};
