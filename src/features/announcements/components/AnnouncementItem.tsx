import Link from 'next/link';
import { type AnnouncementItem } from '../types';

export type ArticleItemProps = AnnouncementItem;

const AnnouncementItem = ({ slug, title }: ArticleItemProps) => {
  return <Link href={`/announcements/${slug}`}>{title}</Link>;
};

export default AnnouncementItem;
