import { atom } from "recoil";

export const trendingState = atom({
  key: "trending",
  default: [],
});
export const followingState = atom({
  key: "following",
  default: [],
});
