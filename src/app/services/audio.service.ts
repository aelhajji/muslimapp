import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Surah {
    number: number;
    title: string;
    mp3: string;
}

@Injectable({
    providedIn: 'root'
})
export class AudioService {
    private currentSurahSubject = new BehaviorSubject<Surah | null>(null);
    private isPlayingSubject = new BehaviorSubject<boolean>(false);
    private currentTimeSubject = new BehaviorSubject<number>(0);
    private durationSubject = new BehaviorSubject<number>(0);

    currentSurah$ = this.currentSurahSubject.asObservable();
    isPlaying$ = this.isPlayingSubject.asObservable();
    currentTime$ = this.currentTimeSubject.asObservable();
    duration$ = this.durationSubject.asObservable();

    private audio: HTMLAudioElement | null = null;
    private surahs: Surah[] = [];

    constructor() {
        this.initializeSurahs();
    }

    private initializeSurahs(): void {
        this.surahs = [
            { number: 1, title: "سورة الفاتحة", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/001.Al fatiha.mp3" },
            { number: 2, title: "سورة البقرة", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/002.Al Baqara.mp3" },
            { number: 3, title: "سورة آل عمران", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/003.Al imran.mp3" },
            { number: 4, title: "سورة النساء", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/004.Al Nissae.mp3" },
            { number: 5, title: "سورة المائدة", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/005.Al Maeida.mp3" },
            { number: 6, title: "سورة الأنعام", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/006.Al Anaam.mp3" },
            { number: 7, title: "سورة الأعراف", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/007.Al Aaraf.mp3" },
            { number: 8, title: "سورة الأنفال", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/008.Al Anfal.mp3" },
            { number: 9, title: "سورة التوبة", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/009.Al Tawba.mp3" },
            { number: 10, title: "سورة يونس", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/010.Younes.mp3" },
            { number: 11, title: "سورة هود", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/011.Hod.mp3" },
            { number: 12, title: "سورة يوسف", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/012.Yousef.mp3" },
            { number: 13, title: "سورة الرعد", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/013.Al Raed.mp3" },
            { number: 14, title: "سورة إبراهيم", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/014.Ibrahim.mp3" },
            { number: 15, title: "سورة النحل", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/016.Al Nahl.mp3" },
            { number: 16, title: "سورة الإسراء", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/017.Al Israe.mp3" },
            { number: 17, title: "سورة الكهف", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/018.Al Kahf.mp3" },
            { number: 18, title: "سورة مريم", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/019.Mariam.mp3" },
            { number: 19, title: "سورة طه", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/020.Taha.mp3" },
            { number: 20, title: "سورة الأنبياء", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/021.Al Anbiyae.mp3" },
            { number: 21, title: "سورة المؤمنون", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/023.Al Mominon.mp3" },
            { number: 22, title: "سورة النور", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/024.Al Nour.mp3" },
            { number: 23, title: "سورة الفرقان", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/025.Al For9an.mp3" },
            { number: 24, title: "سورة الشعراء", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/026.Al Cho3arae.mp3" },
            { number: 25, title: "سورة النمل", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/027.Al Naml.mp3" },
            { number: 26, title: "سورة القصص", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/028.Al Kisas.mp3" },
            { number: 27, title: "سورة العنكبوت", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/029.Al Ankabout.mp3" },
            { number: 28, title: "سورة الروم", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/030.Al Rom.mp3" },
            { number: 29, title: "سورة لقمان", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/031.Lokman.mp3" },
            { number: 30, title: "سورة السجدة", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/032.Al Sajda.mp3" },
            { number: 31, title: "سورة الأحزاب", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/033.Al Ahzab.mp3" },
            { number: 32, title: "سورة سبأ", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/034.Sabae.mp3" },
            { number: 33, title: "سورة فاطر", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/035.Fater.mp3" },
            { number: 34, title: "سورة يس", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/036.Yae sin.mp3" },
            { number: 35, title: "سورة الصافات", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/037.Al Safat.mp3" },
            { number: 36, title: "سورة ص", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/038.Sad.mp3" },
            { number: 37, title: "سورة الزمر", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/039.Al Zamr.mp3" },
            { number: 38, title: "سورة غافر", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/040.Ghafir.mp3" },
            { number: 39, title: "سورة فصلت", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/041.Fussilat.mp3" },
            { number: 40, title: "سورة الشورى", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/042.Al Shora.mp3" },
            { number: 41, title: "سورة الزخرف", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/043.Al Zakhraf.mp3" },
            { number: 42, title: "سورة الدخان", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/044.Al Dokhan.mp3" },
            { number: 43, title: "سورة الجاثية", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/045.Al Jatia.mp3" },
            { number: 44, title: "سورة الأحقاف", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/046.Al Ahkaf.mp3" },
            { number: 45, title: "سورة محمد", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/047.Muhamed.mp3" },
            { number: 46, title: "سورة الفتح", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/048.Al Fath.mp3" },
            { number: 47, title: "سورة ق", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/050.Kaf.mp3" },
            { number: 48, title: "سورة الذاريات", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/051.Al Dariat.mp3" },
            { number: 49, title: "سورة الطور", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/052.Al Tawr.mp3" },
            { number: 50, title: "سورة النجم", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/053.Al Najm.mp3" },
            { number: 51, title: "سورة القمر", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/054.Al qamar.mp3" },
            { number: 52, title: "سورة الرحمن", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/055.Al Rahman.mp3" },
            { number: 53, title: "سورة الواقعة", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/056.Al Waki3a.mp3" },
            { number: 54, title: "سورة المجادلة", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/058.Al Mujadala.mp3" },
            { number: 55, title: "سورة الممتحنة", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/060.Al Momtahina.mp3" },
            { number: 56, title: "سورة الصف", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/061.Alsaf.mp3" },
            { number: 57, title: "سورة الجمعة", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/062.Al Jomoaa.mp3" },
            { number: 58, title: "سورة المنافقون", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/063.Al Monafikon.mp3" },
            { number: 59, title: "سورة التغابن", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/064.Al Taghabun.mp3" },
            { number: 60, title: "سورة الطلاق", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/065.Al Talak.mp3" },
            { number: 61, title: "سورة التحريم", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/066.Al Tahrim.mp3" },
            { number: 62, title: "سورة الملك", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/067.Al Malik.mp3" },
            { number: 63, title: "سورة القلم", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/068.Al Kalam.mp3" },
            { number: 64, title: "سورة المعارج", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/070.Al Maarij.mp3" },
            { number: 65, title: "سورة نوح", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/071.Nouh.mp3" },
            { number: 66, title: "سورة الجن", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/072.Al Jin.mp3" },
            { number: 67, title: "سورة المزمل", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/073.Al Muzzamil.mp3" },
            { number: 68, title: "سورة المدثر", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/074.Al Modater.mp3" },
            { number: 69, title: "سورة القيامة", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/075.Al Qiamah.mp3" },
            { number: 70, title: "سورة الإنسان", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/076.Al Insane.mp3" },
            { number: 71, title: "سورة المرسلات", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/077.Al Morasalat.mp3" },
            { number: 72, title: "سورة النبأ", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/078.Al Nabae.mp3" },
            { number: 73, title: "سورة النازعات", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/079.Al Naziat.mp3" },
            { number: 74, title: "سورة عبس", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/080.Abas.mp3" },
            { number: 75, title: "سورة التكوير", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/081.Al Takwir.mp3" },
            { number: 76, title: "سورة الانفطار", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/082.Al Infitar.mp3" },
            { number: 77, title: "سورة المطففين", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/083.Al Motafifin.mp3" },
            { number: 78, title: "سورة الانشقاق", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/084.Al Inchiqaq.mp3" },
            { number: 79, title: "سورة البروج", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/085.Al Borouj.mp3" },
            { number: 80, title: "سورة الطارق", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/086.Al Tareq.mp3" },
            { number: 81, title: "سورة الأعلى", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/087.Al Aala .mp3" },
            { number: 82, title: "سورة الغاشية", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/088.Al Ghachia.mp3" },
            { number: 83, title: "سورة الفجر", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/089.Al Fajr.mp3" },
            { number: 84, title: "سورة البلد", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/090.Al Balad.mp3" },
            { number: 85, title: "سورة الشمس", mp3: "https://tmazik.com/music/mp3/القرآن الكريم/Quran Mp3/091.Al Shams.mp3" }
        ];
    }

    getSurahs(): Surah[] {
        return this.surahs;
    }

    playSurah(surah: Surah): void {
        if (this.audio) {
            this.audio.pause();
        }

        this.audio = new Audio(surah.mp3);
        this.currentSurahSubject.next(surah);

        this.audio.addEventListener('loadedmetadata', () => {
            this.durationSubject.next(this.audio!.duration);
        });

        this.audio.addEventListener('timeupdate', () => {
            this.currentTimeSubject.next(this.audio!.currentTime);
        });

        this.audio.addEventListener('ended', () => {
            this.playNext();
        });

        this.audio.play();
        this.isPlayingSubject.next(true);
    }

    togglePlayPause(): void {
        if (!this.audio) return;

        if (this.audio.paused) {
            this.audio.play();
            this.isPlayingSubject.next(true);
        } else {
            this.audio.pause();
            this.isPlayingSubject.next(false);
        }
    }

    playNext(): void {
        const currentSurah = this.currentSurahSubject.value;
        if (!currentSurah) return;

        const currentIndex = this.surahs.findIndex(s => s.number === currentSurah.number);
        if (currentIndex < this.surahs.length - 1) {
            this.playSurah(this.surahs[currentIndex + 1]);
        }
    }

    playPrevious(): void {
        const currentSurah = this.currentSurahSubject.value;
        if (!currentSurah) return;

        const currentIndex = this.surahs.findIndex(s => s.number === currentSurah.number);
        if (currentIndex > 0) {
            this.playSurah(this.surahs[currentIndex - 1]);
        }
    }

    seek(time: number): void {
        if (this.audio) {
            this.audio.currentTime = time;
        }
    }

    setVolume(volume: number): void {
        if (this.audio) {
            this.audio.volume = volume / 100;
        }
    }
}
