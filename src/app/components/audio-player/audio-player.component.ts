import { Component, OnInit, OnDestroy } from '@angular/core';
import { AudioService, Surah } from '../../services/audio.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-audio-player',
    templateUrl: './audio-player.component.html',
    styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
    currentSurah: Surah | null = null;
    isPlaying = false;
    currentTime = 0;
    duration = 0;
    volume = 50;
    showVolumeSlider = false;
    isVisible = true;

    private subscriptions: Subscription[] = [];

    constructor(private audioService: AudioService) { }

    ngOnInit(): void {
        this.subscriptions.push(
            this.audioService.currentSurah$.subscribe(surah => {
                this.currentSurah = surah;
            }),
            this.audioService.isPlaying$.subscribe(playing => {
                this.isPlaying = playing;
            }),
            this.audioService.currentTime$.subscribe(time => {
                this.currentTime = time;
            }),
            this.audioService.duration$.subscribe(duration => {
                this.duration = duration;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    togglePlayPause(): void {
        this.audioService.togglePlayPause();
    }

    playNext(): void {
        this.audioService.playNext();
    }

    playPrevious(): void {
        this.audioService.playPrevious();
    }

    onSeek(event: Event): void {
        const target = event.target as HTMLInputElement;
        const time = parseFloat(target.value);
        this.audioService.seek(time);
    }

    onVolumeChange(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.volume = parseFloat(target.value);
        this.audioService.setVolume(this.volume);
    }

    toggleVolumeSlider(): void {
        this.showVolumeSlider = !this.showVolumeSlider;
    }

    toggleVisibility(): void {
        this.isVisible = !this.isVisible;
    }

    formatTime(seconds: number): string {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    get progress(): number {
        if (!this.duration) return 0;
        return (this.currentTime / this.duration) * 100;
    }
}
