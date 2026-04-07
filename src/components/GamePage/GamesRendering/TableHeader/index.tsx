// TableHeader.tsx
import { TH, TR } from '@/utils/Table';
import Content from './Content';
import Icon from '@/utils/Icons';
import { SortState } from '../index';
import { Column, indexToColumn } from '@/utils/Table/Sort';

interface TableHeaderProps {
  sortState: SortState;
  onReorder: (column: Column, direction: 'asc' | 'desc') => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ sortState, onReorder }) => {
  const tableIconIds = [
    'book',
    'bookmark',
    'clock',
    'group',
    'warehouse',
    'euro',
    'external-link',
  ] as const;

  const columnLabels = [
    'Noms de jeux',
    'Catégories',
    'Durées',
    'Joueurs',
    'Disponibilités',
    'Cautions',
    'Règles',
  ];

  const isLastColumn = (index: number) => index === columnLabels.length - 1;

  return (
    <thead className='backdrop-blur-xs bg-white/10 shadow-sm'>
      <TR>
        {columnLabels.map((label, index) => (
          <TH key={index} ariaLabel={label}>
            {isLastColumn(index) ? (
              <>
                <span className='sr-only'>Voir les règles</span>
                <Icon sprite='table' id={tableIconIds[index]} />
              </>
            ) : (
              <Content
                icon={tableIconIds[index]}
                isAscending={
                  sortState.column === indexToColumn[index] &&
                  sortState.direction === 'asc'
                }
                isDescending={
                  sortState.column === indexToColumn[index] &&
                  sortState.direction === 'desc'
                }
                onReorderAsc={() => onReorder(indexToColumn[index], 'asc')}
                onReorderDesc={() => onReorder(indexToColumn[index], 'desc')}
                columnLabel={label}
              />
            )}
          </TH>
        ))}
      </TR>
    </thead>
  );
};

export default TableHeader;
