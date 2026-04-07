import { Component, OnDestroy, OnInit, inject, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

type MatchCard = {
  id: number;
  stage: string;
  kickoff: string;
  stadium: string;
  city: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  status: string;
  group: string;
  matchday: number | null;
};

type SelectedTeam = {
  name: string;
  logo: string;
};

@Component({
  selector: 'app-match-list-page',
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './match-list-page.html',
  styleUrl: './match-list-page.scss',
})
export class MatchListPage implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);
  private readonly http = inject(HttpClient);

  constructor(private router: Router) {}

  readonly filterOptions = ['All Matches', 'Today', 'Knockout'];
  selectedFilter = 'All Matches';
  selectedTeam: SelectedTeam | null = null;

  matches: MatchCard[] = [];

  ngOnInit(): void {
    this.loadMatches();
  }

  private loadMatches(): void {
    this.http.get<any[]>('http://localhost:8080/api/matches').subscribe({
      next: (data) => {
        this.matches = data
          .map((m) => this.mapToMatchCard(m))
          .sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime());
      },
      error: (err) => {
        console.error('Failed to fetch matches', err);
      },
    });
  }

  private mapToMatchCard(m: any): MatchCard {
    return {
      id: m.id,
      stage: this.formatStage(m.stage),
      kickoff: m.kickoff,
      stadium: m.stadium || 'TBD',
      city: m.city || '',
      homeTeam: m.homeTeam || 'TBD',
      awayTeam: m.awayTeam || 'TBD',
      homeLogo: m.homeLogo || '',
      awayLogo: m.awayLogo || '',
      status: m.status || '',
      group: this.formatGroup(m.group),
      matchday: m.matchday ?? null,
    };
  }

  private formatStage(stage: string): string {
    switch (stage) {
      case 'GROUP_STAGE':
        return 'Group Stage';
      case 'LAST_32':
        return 'Last 32';
      case 'LAST_16':
        return 'Round of 16';
      case 'QUARTER_FINALS':
        return 'Quarter Final';
      case 'SEMI_FINALS':
        return 'Semi Final';
      case 'THIRD_PLACE':
        return 'Third Place';
      case 'FINAL':
        return 'Final';
      default:
        return stage || 'Match';
    }
  }

  private formatGroup(group: string): string {
    if (!group) return '';
    return group.replace('_', ' ').replace('GROUP ', 'Group ');
  }

  get filteredMatches(): MatchCard[] {
    switch (this.selectedFilter) {
      case 'Today': {
        const today = new Date();
        return this.matches.filter((match) => {
          const d = new Date(match.kickoff);
          return (
            d.getFullYear() === today.getFullYear() &&
            d.getMonth() === today.getMonth() &&
            d.getDate() === today.getDate()
          );
        });
      }

      case 'Knockout':
        return this.matches.filter((match) => match.stage !== 'Group Stage');

      default:
        return this.matches;
    }
  }

  selectFilter(filter: string): void {
    this.selectedFilter = filter;
  }

  getMetaLabel(match: MatchCard): string {
    if (match.group && match.matchday) {
      return `${match.group} • Matchday ${match.matchday}`;
    }

    if (match.group) {
      return match.group;
    }

    if (match.matchday) {
      return `Matchday ${match.matchday}`;
    }

    return match.stage;
  }

  goToMatch(matchId: number): void {
    this.router.navigate(['/matches', matchId]);
  }

  openTeamModal(name: string, logo: string): void {
    if (this.selectedTeam) return;

    this.selectedTeam = { name, logo };
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