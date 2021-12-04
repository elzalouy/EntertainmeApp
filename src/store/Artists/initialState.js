const initialState = {
  featuredArtists: [
    {
      id: "",
      name: "",
      image: "",
      description: "",
      image_url: "",
    },
  ],
  artist: {
    id: "",
    name: "",
    description: "",
    image: "",
    international: "",
    mainstream: "",
    featured: "",
    category_id: "",
    image_url: "",
    works: [
      {
        id: "",
        content: "",
        type: "",
        artist_id: "",
        created_at: "",
        updated_at: "",
      },
    ],
    events: [
      {
        id: 1,
        name: "",
        artist_id: 1,
        created_at: "",
        updated_at: "",
      },
    ],
    category: {
      id: 0,
      name: "",
      image: "",
      created_at: "",
      updated_at: "",
    },
  },

};
export default initialState;
