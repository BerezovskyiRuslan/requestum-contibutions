import { Contributor } from "./contributors";

export interface Repos {
  name: string;
  full_name: string;
  url_html: string;
  contributions: [Contributor];
  sharedContributors: [Contributor];
}