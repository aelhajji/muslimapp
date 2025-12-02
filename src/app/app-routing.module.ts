import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuranComponent } from './components/quran/quran.component';
import { HadithComponent } from './components/hadith/hadith.component';
import { DuaaComponent } from './components/duaa/duaa.component';
import { NamesComponent } from './components/names/names.component';
import { PrayerTimesComponent } from './components/prayer-times/prayer-times.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'quran', component: QuranComponent },
    { path: 'hadith', component: HadithComponent },
    { path: 'duaa', component: DuaaComponent },
    { path: 'names', component: NamesComponent },
    { path: 'prayer-times', component: PrayerTimesComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
