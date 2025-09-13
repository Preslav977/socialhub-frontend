import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function LoadingSkeletonUsers({ users }) {
  return (
    <>
      {users ? (
        <>
          {users.map((user) => (
            <SkeletonTheme
              key={user.id}
              duration={5}
              baseColor="#464545"
              highlightColor="gray"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.5em",
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
                  <div>
                    <p>
                      <Skeleton
                        width={"85px"}
                        height={"20px"}
                        enableAnimation:true
                        count={1}
                      ></Skeleton>
                    </p>

                    <p>
                      <Skeleton
                        width={"85px"}
                        height={"20px"}
                        enableAnimation:true
                        count={1}
                      ></Skeleton>
                    </p>
                  </div>
                  <p>
                    <Skeleton
                      width={"7em"}
                      borderRadius={"1.5em"}
                      style={{
                        padding: "0.25em 0",
                      }}
                      height={"35px"}
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
