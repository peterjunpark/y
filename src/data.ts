export const users = [
  {
    id: "abc123zxc", // PK
    handle: "qkrwns",
    premium: false,
    followers: [],
    bookmarks: [],
  },
  {
    id: "456qwe420",
    handle: "honomo",
    premium: true,
    followers: [],
    bookmarks: ["69four20"],
  },
];

export const posts = [
  {
    id: "69four20",
    user_id: "abc123zxc",
    community_id: null,
    parent_yap_id: null,
    body: "Hello! I love this website.",
    image: "",
    likes: 5,
  },
];

export const communities = [
  {
    id: "c9w4nv",
    name: "Cat Lovers",
    users: [],
  },
];
