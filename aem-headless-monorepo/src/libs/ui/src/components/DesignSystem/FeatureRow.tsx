import React from 'react';
import Icon from './Icon';

export interface FeatureRowProps {
  title: string;
  description?: string;
  variant?: 'inline' | 'modal';
  included?: boolean;
}

const FeatureRow: React.FC<FeatureRowProps> = ({ title, description, variant = 'inline', included = true }) => {
  if (variant === 'inline' && description) {
    return (
      <details className="group border-b border-[var(--color-border)] last:border-0 py-3">
        <summary className="flex items-center justify-between cursor-pointer list-none list-inside outline-none">
          <div className="flex items-center gap-2">
            <Icon type={included ? 'checkmark' : 'cross'} className={included ? 'text-[var(--color-mint-green)]' : 'text-red-400'} />
            <span className="text-[var(--color-text-primary)] font-medium">{title}</span>
          </div>
          <Icon type="info" className="text-[var(--color-text-secondary)] opacity-50 group-hover:opacity-100 transition-opacity" />
        </summary>
        <div className="mt-2 text-sm text-[var(--color-text-secondary)] pl-7">
          {description}
        </div>
      </details>
    );
  }

  return (
    <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)] last:border-0">
      <div className="flex items-center gap-2">
        <Icon type={included ? 'checkmark' : 'cross'} className={included ? 'text-[var(--color-mint-green)]' : 'text-red-400'} />
        <span className="text-[var(--color-text-primary)] font-medium">{title}</span>
      </div>
      {variant === 'modal' && description && (
        <button
          onClick={() => {
            const dialog = document.getElementById(`modal-${title.replace(/\s+/g, '-').toLowerCase()}`) as HTMLDialogElement;
            if (dialog) dialog.showModal();
          }}
          className="text-[var(--color-text-secondary)] opacity-50 hover:opacity-100 transition-opacity focus:outline-none"
        >
          <Icon type="info" />
        </button>
      )}
      {variant === 'modal' && description && (
        <dialog
          id={`modal-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="rounded-t-2xl bottom-0 fixed m-0 max-h-[60vh] w-full border-none p-6 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm animate-in slide-in-from-bottom duration-300"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{title}</h3>
            <button
              onClick={(e) => (e.currentTarget.closest('dialog') as HTMLDialogElement).close()}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Icon type="cross" />
            </button>
          </div>
          <div className="text-[var(--color-text-secondary)]">
            {description}
          </div>
        </dialog>
      )}
    </div>
  );
};

export default FeatureRow;
