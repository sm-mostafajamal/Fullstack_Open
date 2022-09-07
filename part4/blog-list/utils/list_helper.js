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
  const authorsTotalBlogs = [];
  const authors = blogs.map((author) => author.author);
  let count = 0;

  while (authors.length) {
    if (authorsTotalBlogs.length === 0) {
      authorsTotalBlogs.push({ author: authors[authors.length - 1], blogs: 1 });
      authors.pop();
    } else if ((authors[authors.length - 1] !== authorsTotalBlogs[count].author)
      && (authorsTotalBlogs.length - 1 === count)) {
      authorsTotalBlogs.push({ author: authors[authors.length - 1], blogs: 1 });
      authors.pop();
      count = 0;
    } else if (authors[authors.length - 1] === authorsTotalBlogs[count].author) {
      authorsTotalBlogs[count].blogs += 1;
      authors.pop();
      count = 0;
    } else {
      count += 1;
    }
  }
  const totalBlogs = authorsTotalBlogs.map((totalBlog) => totalBlog.blogs);
  const highestBlogCount = Math.max(...totalBlogs);
  const authorInfo = authorsTotalBlogs.find((profile) => profile.blogs === highestBlogCount);

  return authorInfo;
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
};
