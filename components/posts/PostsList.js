import Post from "./Post";

export default function PostsList({ posts }) {
  return (
    <>
      {posts.map((post) => (
        <Post post={post} key={post.id} id={post.id} />
      ))}
    </>
  );
}
