import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface PrayerTime {
    name: string;
    time: string;
    icon: string;
}

@Component({
    selector: 'app-prayer-times',
    templateUrl: './prayer-times.component.html',
    styleUrls: ['./prayer-times.component.css']
})
export class PrayerTimesComponent implements OnInit {
    countries: any[] = [];
    cities: string[] = [];
    selectedCountry: string = '';
    selectedCity: string = '';

    prayerTimes: PrayerTime[] = [];
    hijriDate: string = '';
    showPlayer: boolean = true;
    audioSource: string = 'https://server12.mp3quran.net/maher/001.mp3'; // Surah Al-Fatiha
    loading: boolean = false;
    error: string = '';

    // Arabic Prayer Names Mapping
    private prayerNamesAr: { [key: string]: string } = {
        'Fajr': 'الفجر',
        'Sunrise': 'الشروق',
        'Dhuhr': 'الظهر',
        'Asr': 'العصر',
        'Maghrib': 'المغرب',
        'Isha': 'العشاء'
    };

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.fetchCountries();
    }

    fetchCountries(): void {
        this.loading = true;
        this.http.get<any>('https://countriesnow.space/api/v0.1/countries').subscribe({
            next: (response) => {
                if (!response.error) {
                    this.countries = response.data;
                    // Sort countries alphabetically
                    this.countries.sort((a, b) => a.country.localeCompare(b.country));
                }
                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to fetch countries', err);
                this.error = 'فشل في تحميل قائمة الدول';
                this.loading = false;
            }
        });
    }

    onCountryChange(): void {
        const countryData = this.countries.find(c => c.country === this.selectedCountry);
        if (countryData) {
            this.cities = countryData.cities.sort();
            this.selectedCity = ''; // Reset city selection
        } else {
            this.cities = [];
        }
    }

    getPrayerTimes(): void {
        if (!this.selectedCity || !this.selectedCountry) {
            this.error = 'الرجاء اختيار الدولة والمدينة';
            return;
        }

        this.loading = true;
        this.error = '';

        const url = `https://api.aladhan.com/v1/timingsByCity?city=${this.selectedCity}&country=${this.selectedCountry}&method=2`;

        this.http.get<any>(url).subscribe({
            next: (response) => {
                const timings = response.data.timings;
                const date = response.data.date;

                this.prayerTimes = [
                    { name: this.prayerNamesAr['Fajr'], time: timings.Fajr, icon: '🌅' },
                    { name: this.prayerNamesAr['Sunrise'], time: timings.Sunrise, icon: '☀️' },
                    { name: this.prayerNamesAr['Dhuhr'], time: timings.Dhuhr, icon: '🌞' },
                    { name: this.prayerNamesAr['Asr'], time: timings.Asr, icon: '🌤️' },
                    { name: this.prayerNamesAr['Maghrib'], time: timings.Maghrib, icon: '🌆' },
                    { name: this.prayerNamesAr['Isha'], time: timings.Isha, icon: '🌙' }
                ];

                // Format Hijri Date in Arabic
                this.hijriDate = `${date.hijri.day} ${date.hijri.month.ar} ${date.hijri.year}`;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'فشل في جلب مواقيت الصلاة. يرجى المحاولة مرة أخرى.';
                this.loading = false;
                console.error(err);
            }
        });
    }

    togglePlayer(): void {
        this.showPlayer = !this.showPlayer;
    }

    getCurrentPrayer(): string {
        if (this.prayerTimes.length === 0) return '';

        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        for (let i = 0; i < this.prayerTimes.length; i++) {
            // Handle time format "HH:mm"
            const timeParts = this.prayerTimes[i].time.split(' ')[0].split(':'); // Remove (EST) etc if present
            const hours = parseInt(timeParts[0]);
            const minutes = parseInt(timeParts[1]);
            const prayerTime = hours * 60 + minutes;

            if (currentTime < prayerTime) {
                return this.prayerTimes[i].name;
            }
        }

        return this.prayerTimes[0].name; // Next day Fajr
    }
}
