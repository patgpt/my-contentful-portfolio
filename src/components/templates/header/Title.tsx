import { Link } from '@/i18n/routing';

const Title = ({ title }: { title: string }) => (
  <Link className="btn btn-ghost text-xl" href="/">
    {title}
  </Link>
);

export default Title;
