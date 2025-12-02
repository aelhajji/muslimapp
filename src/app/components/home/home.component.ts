import { Component } from '@angular/core';

interface FeatureCard {
    title: string;
    description: string;
    icon: string;
    route: string;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    features: FeatureCard[] = [
        {
            title: 'القرآن الكريم',
            description: 'استمع لتلاوات عطرة لكامل القرآن الكريم',
            icon: '📖',
            route: '/quran'
        },
        {
            title: 'الأحاديث النبوية',
            description: 'أحاديث من صحيح البخاري ومسلم',
            icon: '📚',
            route: '/hadith'
        },
        {
            title: 'الأدعية المأثورة',
            description: 'أدعية من القرآن والسنة النبوية',
            icon: '🤲',
            route: '/duaa'
        },
        {
            title: 'أسماء الله الحسنى',
            description: 'تعرف على معاني أسماء الله الحسنى',
            icon: '✨',
            route: '/names'
        },
        {
            title: 'مواقيت الصلاة',
            description: 'أوقات الصلاة حسب موقعك',
            icon: '🕌',
            route: '/prayer-times'
        }
    ];
}
