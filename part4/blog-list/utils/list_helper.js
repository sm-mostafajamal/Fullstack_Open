
const dummy = (blogs) => blogs.length === 0 ? 1 : 0;

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

module.exports = {
  dummy, totalLikes, favoriteBlog
};
