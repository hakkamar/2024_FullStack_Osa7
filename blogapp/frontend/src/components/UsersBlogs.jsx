import { Title3, Lista } from "../tyylit";

const UsersBlogs = ({ juuseri }) => {
  if (!juuseri) {
    return null;
  }

  return (
    <Lista className="blog">
      <Title3>{juuseri.name}</Title3>
      <Title3>Added Blogs</Title3>
      <ul>
        {juuseri.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </Lista>
  );
};

export default UsersBlogs;
