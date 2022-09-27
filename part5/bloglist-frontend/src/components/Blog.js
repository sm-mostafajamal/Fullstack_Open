const Blog = ({ blogs }) => {
  return (
    <div>
      {
        blogs.map(blog => 
          <div key={blog.id}> {blog.title} {blog.author}</div>
      )}
    </div>
  )
}

export default Blog