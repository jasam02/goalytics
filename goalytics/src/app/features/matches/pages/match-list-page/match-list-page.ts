import { Component, OnDestroy, inject, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

type MatchCard = {
  id: number;
  stage: string;
  kickoff: string;
  stadium: string;
  city: string;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  homeWinProbability: number;
  awayWinProbability: number;
  drawProbability: number;
  homeForm: string;
  awayForm: string;
  headline: string;
};

type SelectedTeam = {
  name: string;
  flag: string;
};

@Component({
  selector: 'app-match-list-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './match-list-page.html',
  styleUrl: './match-list-page.scss',
})
export class MatchListPage implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);

  constructor(private router: Router) {}

  readonly filterOptions = ['All Matches', 'Today', 'Knockout', 'High Probability'];
  selectedFilter = 'All Matches';
  selectedTeam: SelectedTeam | null = null;

  readonly matches: MatchCard[] = [
    {
      id: 1,
      stage: 'Quarter Final',
      kickoff: 'Fri, Jul 10 • 7:00 PM',
      stadium: 'MetLife Stadium',
      city: 'East Rutherford, NJ',
      homeTeam: 'Argentina',
      awayTeam: 'France',
      homeFlag: 'ar',
      awayFlag: 'fr',
      homeWinProbability: 41,
      awayWinProbability: 35,
      drawProbability: 24,
      homeForm: 'W W D W W',
      awayForm: 'W L W W D',
      headline: 'A heavyweight clash with elite attacking talent on both sides.',
    },
    {
      id: 2,
      stage: 'Quarter Final',
      kickoff: 'Sat, Jul 11 • 4:00 PM',
      stadium: 'SoFi Stadium',
      city: 'Los Angeles, CA',
      homeTeam: 'Brazil',
      awayTeam: 'England',
      homeFlag: 'br',
      awayFlag: 'gb-eng',
      homeWinProbability: 46,
      awayWinProbability: 31,
      drawProbability: 23,
      homeForm: 'W W W D L',
      awayForm: 'W D W W L',
      headline: 'Brazil enters with the edge, but England’s midfield could swing it.',
    },
    {
      id: 3,
      stage: 'Round of 16',
      kickoff: 'Sun, Jul 12 • 1:00 PM',
      stadium: 'AT&T Stadium',
      city: 'Arlington, TX',
      homeTeam: 'Spain',
      awayTeam: 'Portugal',
      homeFlag: 'es',
      awayFlag: 'pt',
      homeWinProbability: 38,
      awayWinProbability: 34,
      drawProbability: 28,
      homeForm: 'W D W L W',
      awayForm: 'W W D L W',
      headline: 'Possession against direct threat in one of the most balanced ties.',
    },
    {
      id: 4,
      stage: 'Round of 16',
      kickoff: 'Sun, Jul 12 • 7:30 PM',
      stadium: 'Mercedes-Benz Stadium',
      city: 'Atlanta, GA',
      homeTeam: 'Germany',
      awayTeam: 'Netherlands',
      homeFlag: 'de',
      awayFlag: 'nl',
      homeWinProbability: 43,
      awayWinProbability: 30,
      drawProbability: 27,
      homeForm: 'W W L W D',
      awayForm: 'D W W L W',
      headline: 'Germany’s structure meets a dangerous Dutch transition attack.',
    },
    {
      id: 5,
      stage: 'Group Stage',
      kickoff: 'Mon, Jul 13 • 5:00 PM',
      stadium: 'Hard Rock Stadium',
      city: 'Miami Gardens, FL',
      homeTeam: 'USA',
      awayTeam: 'Mexico',
      homeFlag: 'us',
      awayFlag: 'mx',
      homeWinProbability: 37,
      awayWinProbability: 33,
      drawProbability: 30,
      homeForm: 'W D L W W',
      awayForm: 'W W D L D',
      headline: 'One of the most intense fixtures on the board with huge energy.',
    },
    {
      id: 6,
      stage: 'Group Stage',
      kickoff: 'Tue, Jul 14 • 2:00 PM',
      stadium: 'Lumen Field',
      city: 'Seattle, WA',
      homeTeam: 'Japan',
      awayTeam: 'Croatia',
      homeFlag: 'jp',
      awayFlag: 'hr',
      homeWinProbability: 35,
      awayWinProbability: 36,
      drawProbability: 29,
      homeForm: 'W W D L W',
      awayForm: 'D W W D L',
      headline: 'An ultra-close matchup that could come down to late-game execution.',
    },
  ];

  get filteredMatches(): MatchCard[] {
    switch (this.selectedFilter) {
      case 'Today':
        return this.matches.slice(0, 2);
      case 'Knockout':
        return this.matches.filter(
          (match) => match.stage === 'Round of 16' || match.stage === 'Quarter Final'
        );
      case 'High Probability':
        return this.matches.filter(
          (match) => match.homeWinProbability >= 45 || match.awayWinProbability >= 45
        );
      default:
        return this.matches;
    }
  }

  selectFilter(filter: string): void {
    this.selectedFilter = filter;
  }

  getFavoriteLabel(match: MatchCard): string {
    if (match.homeWinProbability > match.awayWinProbability) {
      return `${match.homeTeam} favored`;
    }

    if (match.awayWinProbability > match.homeWinProbability) {
      return `${match.awayTeam} favored`;
    }

    return 'Too close to call';
  }

  goToMatch(matchId: number): void {
    this.router.navigate(['/matches', matchId]);
  }

  openTeamModal(name: string, flag: string): void {
    if (this.selectedTeam) return;

    this.selectedTeam = { name, flag };
    this.lockPageScroll();
  }

  closeModal(): void {
    this.selectedTeam = null;
    this.unlockPageScroll();
  }

  ngOnDestroy(): void {
    this.unlockPageScroll();
  }

  private lockPageScroll(): void {
    this.renderer.addClass(this.document.body, 'modal-open');
    this.renderer.addClass(this.document.documentElement, 'modal-open');
  }

  private unlockPageScroll(): void {
    this.renderer.removeClass(this.document.body, 'modal-open');
    this.renderer.removeClass(this.document.documentElement, 'modal-open');
  }
}