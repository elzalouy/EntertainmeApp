const initialState = {
  categories: [
    {
      id: "",
      name: "",
      image: "",
      created_at: "",
      updated_at: "",
      artists_count: "",
    },
  ],
  selectedCategories: [],
  category: {
    id: 0,
    name: "",
    image: "",
    artists: [
      {
        id: "",
        name: "",
        image: "",
        category_id: "",
        country_id: "",
        created_at: "",
        updated_at: "",
        description: "",
        price_ranges: "",
        mainstream: "",
        international: "",
        featured: "",
        image_url: "",
        tags: [
          {
            id: "",
            name: "",
            created_at: "",
            updated_at: "",
            pivot: {
              artist_id: "",
              tag_id: "",
            },
          },
        ],
      },
    ],
  },
  selectedArtists: [
    {
      id: "",
      name: "",
      image: "",
      category_id: "",
      country_id: "",
      created_at: "",
      updated_at: "",
      description: "",
      price_ranges: "",
      mainstream: "",
      international: "",
      featured: "",
      image_url: "",
      tags: [
        {
          id: "",
          name: "",
          created_at: "",
          updated_at: "",
          pivot: {
            artist_id: "",
            tag_id: "",
          },
        },
      ],
    },
  ],
};
export default initialState;
