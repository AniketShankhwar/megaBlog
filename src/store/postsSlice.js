import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Query } from "appwrite";
import appwriteService from "../appwrite/configuration";

const initialState = {
  posts: [],
  status: "idle", // idle = not fetched yet, loading = fetching, succeeded = already cached
  error: null,
};

// createAsyncThunk = auto runs backend fetch. It has 3 stages — pending(loading), fulfilled(success), rejected(error)
// it returns the data, and extraReducers below saves it into the store
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    // rejectWithValue is used to send custom error message when fetch fails
    try {
      const response = await appwriteService.getPosts([
        Query.equal("status", "active"),
      ]);
      return response?.documents || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// fetch posts made by one specific user
export const fetchPostsByUser = createAsyncThunk(
  "posts/fetchPostsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await appwriteService.getPosts([
        Query.equal("status", "active"),
        Query.equal("userId", userId),
      ]);
      return response?.documents || [];
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  // regular reducers — called directly by us, no backend call, just update store
  reducers: {
    addPost: (state, action) => {
      state.posts.unshift(action.payload); // unshift = add at beginning of array
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.$id === action.payload.$id, // $id is Appwrite's document id field
      );
      if (index !== -1) state.posts[index] = action.payload; // -1 means not found
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.$id !== action.payload);
    },
    clearPosts: (state) => {
      state.posts = [];
      state.status = "idle";
      state.error = null;
    },
  },
  // extraReducers = auto-triggered when a thunk finishes. We don't call these, Redux calls them.
  // builder.addCase = listen to one specific thunk stage (pending/fulfilled/rejected)
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading"; // lets UI show a loader
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded"; // ← marks "already fetched", next time no fetch needed
        state.posts = action.payload; // ← backend posts get saved in Redux store here
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // action.payload = the error message from rejectWithValue
      })
      .addCase(fetchPostsByUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPostsByUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addPost, updatePost, deletePost, clearPosts } =
  postsSlice.actions;
export default postsSlice.reducer;