import { Breadcrumb as BreadcrumbAntd } from 'antd';
import { useNavigate } from 'react-router-dom';

export interface ListBreadcrumb {
  name: string;
  navigateTo?: string;
}

interface BreadcrumProps {
  listBreadcrumb: ListBreadcrumb[];
}

const Breadcrumb = ({ listBreadcrumb }: BreadcrumProps) => {
  const navigate = useNavigate();

  const handleGoToCLick = (navigateTo: string) => {
    navigate(navigateTo);
  };

  return (
    <BreadcrumbAntd>
      {listBreadcrumb.map((breadcrumb, index) => (
        <BreadcrumbAntd.Item key={`breadcrumb_${index}`}>
          {breadcrumb.navigateTo ? (
            <a onClick={() => handleGoToCLick(breadcrumb.navigateTo || '')}>{breadcrumb.name}</a>
          ) : (
            breadcrumb.name
          )}
        </BreadcrumbAntd.Item>
      ))}
    </BreadcrumbAntd>
  );
};

export default Breadcrumb;
