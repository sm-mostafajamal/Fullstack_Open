const dummy = (blogs) => blogs.length === 0 ? 1 : 0;

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  return likes.reduce((prev, curr) => prev + curr, 0);
};

module.exports = {
  dummy, totalLikes
};
