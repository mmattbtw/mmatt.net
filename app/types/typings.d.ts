export interface sessionType {
  provider: string;
  json: {
    id: string;
    login: string;
    display_name: string;
    type: string;
    broadcaster_type: string;
    description: string;
    profile_image_url: string;
    offline_image_url: string;
    view_count: number;
    created_at: number;
  };
}

type FormActionDataBlog =
  | {
      category: string;
      imageUrl: string;
      markdown: string;
      slug: string;
      title: string;
      id?: string;
    }
  | undefined;
type FormActionDataProjects =
  | {
      category: string;
      imageUrl: string;
      markdown: string;
      slug: string;
      title: string;
      id: string;
      status: string;
    }
  | undefined;
