import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  const style = {
    backgroundColor: "white",
    margin: "10px",
    padding: "10px",
    border: "2px solid",
    borderColor: "black",
    //borderRadius: "5px",
  };

  if (blogs.length === 0) {
    return <div>Ladataan blogeja...</div>;
  }

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <p style={style}>
              {blog.title} by {blog.author}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
