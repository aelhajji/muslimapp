import { Component, OnInit } from '@angular/core';
import { AudioService, Surah } from '../../services/audio.service';

@Component({
    selector: 'app-quran',
    templateUrl: './quran.component.html',
    styleUrls: ['./quran.component.css']
})
export class QuranComponent implements OnInit {
    surahs: Surah[] = [];
    currentSurah: Surah | null = null;
    searchTerm: string = '';

    constructor(private audioService: AudioService) { }

    ngOnInit(): void {
        this.surahs = this.audioService.getSurahs();
        this.audioService.currentSurah$.subscribe(surah => {
            this.currentSurah = surah;
        });
    }

    get filteredSurahs(): Surah[] {
        if (!this.searchTerm) {
            return this.surahs;
        }
        return this.surahs.filter(surah =>
            surah.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
    }

    playSurah(surah: Surah): void {
        this.audioService.playSurah(surah);
    }

    isCurrentSurah(surah: Surah): boolean {
        return this.currentSurah?.number === surah.number;
    }
}
