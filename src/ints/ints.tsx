export interface TagInt {
  title: string;
}

export interface ArtistInt {
  name: string;
  profile_photo: string;
  bio: string;
}

export interface SocialMediaInt {
  artist: ArtistInt;
  platform: string;
  link: string;
}

export interface TrackInt {
  title: string;
  artists: ArtistInt[];
  description: string;
  file: string;
  track_photo: string;
  tags: TagInt[];
  featured: boolean;
  upload_date: string;
}
