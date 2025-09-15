import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useFetchChats } from "../../api/userFetchChats";
export function LoadingSkeletonChats() {
  const { chats } = useFetchChats();

  return (
    <>
      {chats ? (
        <>
          {chats.map((chat) => (
            <SkeletonTheme
              data-testid="loadingSkeletonChats"
              key={chat.id}
              duration={5}
              baseColor="#464545"
              highlightColor="gray"
            >
              <div
                style={{
                  padding: "1.5em",
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
                      width={"100px"}
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
