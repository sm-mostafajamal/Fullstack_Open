const listHelper = require('../utils/list_helper');
const { emptyBlog, oneBlog, blogs } = require('./helperData');

test('dummy returns one', () => {
  const result = listHelper.dummy(emptyBlog);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyBlog);
    expect(result).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(oneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('finds out which blog has most likes', () => {
  test('author of most liked blog', () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    });
  });

  test('author of largest amounts of blog', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual(
      {
        author: 'Robert C. Martin',
        blogs: 3
      }
    );
  });

  test('author of largest amounts of likes', () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }
    );
  });
});
