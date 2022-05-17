import { useRouter } from "next/router";

export default function PostPage() {
  const router = useRouter();
  const { postId } = router.query;
  return (
    <div className="text-white flex-1  sm:ml-[73px] lg:ml-[240px] border-gray-800 sm:border-l md:border-r md:min-w-[500px] lg:min-w-[600px] border-l-none ">
      {postId}
    </div>
  );
}
