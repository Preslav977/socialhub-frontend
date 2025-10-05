# socialhub-frontend

<img width="1919" height="940" alt="Image" src="https://github.com/user-attachments/assets/814b9c67-245a-4d1f-8b19-aa650143a1b7" />

# Overview

This is the front-end of the social hub that handles all the CRUD operations from the frontend, which is created with the PERN stack (PostgreSQL, Express, React, Node).

# About the project the project

SocialHub is a full-stack social media clone that allows the users to create user profiles, create posts, like posts, comment on posts, like their comments, create replies to the comments, search for users, create conversations, and much more.

# Live Preview

- [View the live site here]()
- [View the back-end API repository here](https://github.com/Preslav977/social-backend)

# Features

- Live validation
- The user can update the profile
- create post with text / image or both
- like / dislike the post
- comment on the post
- like / dislike the post comment
- reply to the comment
- search for user
- read the following user posts
- read recent posts
- read liked posts
- create conversation with another user
- Send messages like text/images between the users
- follow / unfollow user
- read the latest users
- read the most followed users
- modal that pops up on created post
- guest login
- mobile menu
- error page

# Technology Used

- React: for creating all the components for the application
- React Router: defining all paths for the component, including ErrorPage When the route doesn't match the path, the point of the router is to make the application behave like a single-page application.
- Date-fns: library for formatting the dates
- React Testing Library: library for creating tests for each component
- useForm to handle the form more easily instead of selecting each field separately
- LoadingSkeleton: renders a loading indicator based on the content being loaded.
- MSW: creating mocks to the server in order to prevent sending requests to the server

# Lessons Learned

- Learned how to use Form Hook to validate each field and show errors and hide them when the validation is met
- Learned how to handle multiple components with similarity using one to reduce the duplication in the components
- Same for the useEffect hook to handle fetching posts using a parameter instead of creating more hooks that would do the same thing
- Learned how to spot which component would need to be separated in props so later it can be reused using a condition, like, for example, logged-in users and other users by viewing their profile instead of creating two duplicated DOM structures using a condition
- Learned about use Location hook that can be used to select the background of the navigation and pass the pathname using a switch in order to fetch different URLs
- Learned how to use the LoadingSkeleton package that allows you to customize it, like colors, duration of the animation, and much more, using the posts and checking if they exist to make it match the post dynamically
- Learned how to create a modal that popup shows a progressing bar, and when it reaches zero, it moves to the right
- Learned that it is better to check in all places when something exists; that way it wouldn't crash the application when, for example, the user is not logged in and would cause problems.
- Learned which CSS properties to decide early that needed to be created with CSS variables so they would escape changing colors in multiple places
- Learned that you can reset state with the finally block
- Learned that you don't need two router files, which is redundant and pointless
- Learned how to use MSW to intercept requests

# Future Improvements

- Implementing live updates for the application
- GitHub authentication resolving the CORS blocked error
- Updating part of the state, instead of updating the whole state
- Reducing even more duplication and breaking down the component that is repeated with props
- Focusing more on the SOLID principle
