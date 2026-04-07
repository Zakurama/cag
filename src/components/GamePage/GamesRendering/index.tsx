import { Jeux } from '@/payload-types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { useMemo, useState } from 'react';
import { Column, SortStateFactory } from '@/utils/Table/Sort';

interface GamesRenderingProps {
  games: Jeux[];
}

type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
  column: Column | null;
  direction: SortDirection;
}

const GamesRendering: React.FC<GamesRenderingProps> = ({ games }) => {
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  });

  const handleReorder = (
    columnIndex: Column,
    direction: Exclude<SortDirection, null>,
  ) => {
    setSortState((prev) => {
      // if the same column and same direction -> deactivate
      if (prev.column === columnIndex && prev.direction === direction) {
        return { column: null, direction: null };
      }
      return { column: columnIndex, direction };
    });
  };

  const sortedGames = useMemo(() => {
    if (sortState.column === null || sortState.direction === null) return games;

    const sorted = [...games];

    sorted.sort((a, b) => {
      const column = SortStateFactory.create(
        sortState.column,
        sortState.direction,
      );
      return column.compare(a, b);
    });

    return sorted;
  }, [games, sortState]);

  return (
    <div className='w-full overflow-x-auto mb-4'>
      <table className='w-full rounded-lg overflow-hidden table-auto border-collapse game-table'>
        <TableHeader sortState={sortState} onReorder={handleReorder} />
        <TableBody games={sortedGames} />
      </table>
    </div>
  );
};

export default GamesRendering;
