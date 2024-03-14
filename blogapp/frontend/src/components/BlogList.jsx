import { useSelector } from "react-redux";

import { Title3, Lista, StyledLink } from "../tyylit";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  if (blogs.length === 0) {
    return <div>Ladataan blogeja...</div>;
  }

  return (
    <Lista>
      <Title3>Blogs</Title3>
      {blogs.map((blog) => (
        <Lista key={blog.id}>
          <StyledLink to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </StyledLink>
        </Lista>
      ))}
    </Lista>
  );
};

export default BlogList;
