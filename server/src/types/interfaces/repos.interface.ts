import { Contributor } from './contributors.interface';

export interface Repos {
  [x: string]: any;
  name: string;
  full_name: string;
  url_html: string;
  contributions: [Contributor];
  sharedContributors: [Contributor];
  html_url?: string;
}
