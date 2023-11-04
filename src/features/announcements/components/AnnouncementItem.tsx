import Link from 'next/link';
import { type Announcement } from '../types';

export type ArticleItemProps = Announcement;

const AnnouncementItem = ({ slug, title }: ArticleItemProps) => {
  return <Link href={`/announcements/${slug}`}>{title}</Link>;
};

export default AnnouncementItem;
