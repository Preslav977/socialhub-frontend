import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useFetchPosts } from "../../api/useFetchPosts";

export function LoadingSkeleton() {
  const { posts } = useFetchPosts();

  return (
    <>
      {posts && !posts.message ? (
        <>
          {posts.map((post) => (
            <SkeletonTheme
              key={post.id}
              data-testid="loadingSkeleton"
              duration={5}
              baseColor="#464545"
              highlightColor="gray"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1.5em",
                  gap: "0.5em",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5em",
                  }}
                >
                  <p>
                    <Skeleton
                      width={"40px"}
                      height={"40px"}
                      borderRadius={"50%"}
                      enableAnimation:true
                      count={1}
                    ></Skeleton>
                  </p>
                  <p>
                    <Skeleton
                      width={"150px"}
                      height={"20px"}
                      enableAnimation:true
                      count={1}
                    ></Skeleton>
                  </p>
                  <p>
                    <Skeleton
                      width={"150px"}
                      height={"20px"}
                      enableAnimation:true
                      count={1}
                    ></Skeleton>
                  </p>
                </div>
                <p>
                  <Skeleton
                    width={"100%"}
                    height={"20px"}
                    enableAnimation:true
                    count={1}
                  ></Skeleton>
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "1em",
                  }}
                >
                  <p>
                    <Skeleton
                      width={"70px"}
                      height={"20px"}
                      enableAnimation:true
                      count={1}
                    ></Skeleton>
                  </p>
                  <p>
                    <Skeleton
                      width={"70px"}
                      height={"20px"}
                      enableAnimation:true
                      count={1}
                    ></Skeleton>
                  </p>
                </div>
              </div>
            </SkeletonTheme>
          ))}
        </>
      ) : (
        ""
      )}
    </>
  );
}
