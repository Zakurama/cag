import { Jeux } from '@/payload-types';

type SortDirection = 'asc' | 'desc' | null;
export type Column =
  | 'name'
  | 'categorie'
  | 'duree'
  | 'joueurs'
  | 'disponibilite'
  | 'caution';

export const indexToColumn: Record<number, Column> = {
  0: 'name',
  1: 'categorie',
  2: 'duree',
  3: 'joueurs',
  4: 'disponibilite',
  5: 'caution',
};

export interface SortState {
  direction: SortDirection;
  compare: (a: Jeux, b: Jeux) => number;
}

export class NameColumn implements SortState {
  direction: SortDirection;

  constructor(direction: SortDirection) {
    this.direction = direction;
  }

  compare(a: Jeux, b: Jeux) {
    return this.direction === 'asc'
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  }
}

export class CategoryColumn implements SortState {
  direction: SortDirection;

  constructor(direction: SortDirection) {
    this.direction = direction;
  }

  // compare based on first category name alphabetically
  compare(a: Jeux, b: Jeux) {
    const catA = b.categorie
      .filter((c) => typeof c === 'object')
      .map((c) => c.name)
      .sort((a, b) => a.localeCompare(b))
      .join(', ');
    const catB = a.categorie
      .filter((c) => typeof c === 'object')
      .map((c) => c.name)
      .sort((a, b) => a.localeCompare(b))
      .join(', ');

    return this.direction === 'asc'
      ? catA.localeCompare(catB)
      : catB.localeCompare(catA);
  }
}

export class DurationColumn implements SortState {
  direction: SortDirection;

  constructor(direction: SortDirection) {
    this.direction = direction;
  }

  compare(a: Jeux, b: Jeux) {
    // Time
    const valA =
      this.direction === 'desc' ? a.maxPlayingTime : a.minPlayingTime;
    const valB =
      this.direction === 'desc' ? b.maxPlayingTime : b.minPlayingTime;

    // Handle null/undefined -> push to bottom
    if (valA == null && valB == null) return 0;
    if (valA == null) return 1; // A goes after B
    if (valB == null) return -1; // B goes after A

    // Compare valid numbers
    return this.direction === 'asc' ? valA - valB : valB - valA;
  }
}

export class PlayersColumn implements SortState {
  direction: SortDirection;

  constructor(direction: SortDirection) {
    this.direction = direction;
  }

  compare(a: Jeux, b: Jeux) {
    const valA =
      this.direction === 'asc'
        ? (a.nbMaxPlayers ?? a.nbMinPlayers)
        : (a.nbMinPlayers ?? a.nbMaxPlayers);

    const valB =
      this.direction === 'asc'
        ? (b.nbMaxPlayers ?? b.nbMinPlayers)
        : (b.nbMinPlayers ?? b.nbMaxPlayers);

    // If both are still null, they go to bottom
    if (valA == null && valB == null) return 0;
    if (valA == null) return 1;
    if (valB == null) return -1;

    return this.direction === 'desc' ? valA - valB : valB - valA;
  }
}

export class AvailabilityColumn implements SortState {
  direction: SortDirection;

  constructor(direction: SortDirection) {
    this.direction = direction;
  }

  compare(a: Jeux, b: Jeux) {
    return this.direction === 'asc'
      ? a.nbGamesAvailable - b.nbGamesAvailable
      : b.nbGamesAvailable - a.nbGamesAvailable;
  }
}

export class DepositColumn implements SortState {
  direction: SortDirection;

  constructor(direction: SortDirection) {
    this.direction = direction;
  }

  compare(a: Jeux, b: Jeux) {
    const valA = a.deposit ?? 0;
    const valB = b.deposit ?? 0;

    return this.direction === 'asc' ? valA - valB : valB - valA;
  }
}

export class SortStateFactory {
  static create(column: Column | null, direction: SortDirection): SortState {
    switch (column) {
      case 'name':
        return new NameColumn(direction);
      case 'categorie':
        return new CategoryColumn(direction);
      case 'duree':
        return new DurationColumn(direction);
      case 'joueurs':
        return new PlayersColumn(direction);
      case 'disponibilite':
        return new AvailabilityColumn(direction);
      case 'caution':
        return new DepositColumn(direction);
      default:
        // Return a default SortState that doesn't change order
        return {
          direction: direction,
          compare: () => 0,
        };
    }
  }
}
