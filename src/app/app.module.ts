import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { QuranComponent } from './components/quran/quran.component';
import { HadithComponent } from './components/hadith/hadith.component';
import { DuaaComponent } from './components/duaa/duaa.component';
import { NamesComponent } from './components/names/names.component';
import { PrayerTimesComponent } from './components/prayer-times/prayer-times.component';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        QuranComponent,
        HadithComponent,
        DuaaComponent,
        NamesComponent,
        PrayerTimesComponent,
        AudioPlayerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
