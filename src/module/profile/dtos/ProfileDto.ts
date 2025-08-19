export default class CreateProfileDto {
  user!: string | undefined;
  company?: string | undefined;
  website?: string | undefined;
  location?: string | undefined;
  skills?: string[] | string | undefined;
  bio?: string | undefined;
  social?: {
    youtube?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
}
