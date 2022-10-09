import { useState, forwardRef, useImperativeHandle } from "react";
const Toggleable = forwardRef((props, ref) => {
  const [createBlogVisible, setCreateBlogVisible] = useState(false);

  const hideCreateBlog = { display: createBlogVisible ? 'none' : ''}
  const showCreateBlog = { display: createBlogVisible ? '' : 'none'}
  const visibleCreateBlog = () => setCreateBlogVisible(!createBlogVisible)

  useImperativeHandle(ref, () => {
    return {
      visibleCreateBlog
    }
  });
  return (
    <div>
      <div style={hideCreateBlog}>
        <button onClick={visibleCreateBlog}>{props.buttonLabel}</button>
      </div>
      <div style={showCreateBlog}>
        {props.children}
        <button onClick={visibleCreateBlog}>cancel</button>
      </div>
    </div>
  )
})

export default Toggleable