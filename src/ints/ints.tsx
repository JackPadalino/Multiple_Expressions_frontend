export interface Tag {
  title: string;
}

export interface Artist {
  name: string;
  profile_photo: string;
  bio: string;
}

export interface SocialMedia {
  artist: Artist;
  platform: string;
  link: string;
}

export interface Track {
  title: string;
  artists: Artist[];
  description: string;
  file: string;
  track_photo: string;
  tags: Tag[];
  featured: boolean;
  upload_date: string;
}
