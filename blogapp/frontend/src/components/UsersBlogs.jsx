const UsersBlogs = ({ juuseri }) => {
  //console.log("UsersBlogs - juuseri", juuseri);

  if (!juuseri) {
    return null;
  }

  return (
    <div className="blog">
      <h2>{juuseri.name}</h2>
      <h4>Added Blogs</h4>
      <ul>
        {juuseri.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersBlogs;
