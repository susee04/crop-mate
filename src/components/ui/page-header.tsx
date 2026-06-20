import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '@/stores/languageStore';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  backTo?: string;
  onBack?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon,
  backTo = "/",
  onBack
}) => {
  const { t } = useLanguageStore();

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
      <div className="flex-1">
        {onBack ? (
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('back')}
          </Button>
        ) : (
          <Link to={backTo}>
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('home')}
            </Button>
          </Link>
        )}
        <h1 className="text-4xl font-heading font-bold text-primary flex items-center gap-3">
          {title}
          <span className="md:hidden text-4xl">{icon}</span>
        </h1>
        {description && (
          <p className="font-paragraph text-gray-600 dark:text-gray-300 mt-2 max-w-2xl text-lg">
            {description}
          </p>
        )}
      </div>
      <div className="hidden md:block text-6xl" aria-hidden="true">
        {icon}
      </div>
    </div>
  );
};

export const MemoizedPageHeader = React.memo(PageHeader);
