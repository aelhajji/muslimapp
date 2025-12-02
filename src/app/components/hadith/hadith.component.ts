import { Component } from '@angular/core';

interface Hadith {
    id: number;
    category: string;
    text: string;
    narrator: string;
    source: string;
}

@Component({
    selector: 'app-hadith',
    templateUrl: './hadith.component.html',
    styleUrls: ['./hadith.component.css']
})
export class HadithComponent {
    hadiths: Hadith[] = [
        {
            id: 1,
            category: 'الإيمان',
            text: 'إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى',
            narrator: 'عمر بن الخطاب',
            source: 'صحيح البخاري'
        },
        {
            id: 2,
            category: 'الأخلاق',
            text: 'المسلم من سلم المسلمون من لسانه ويده',
            narrator: 'عبد الله بن عمرو',
            source: 'صحيح البخاري'
        },
        {
            id: 3,
            category: 'العبادة',
            text: 'من صلى البردين دخل الجنة',
            narrator: 'أبو موسى الأشعري',
            source: 'صحيح البخاري'
        },
        {
            id: 4,
            category: 'الذكر',
            text: 'أحب الكلام إلى الله أربع: سبحان الله، والحمد لله، ولا إله إلا الله، والله أكبر',
            narrator: 'سمرة بن جندب',
            source: 'صحيح مسلم'
        },
        {
            id: 5,
            category: 'الإحسان',
            text: 'إن الله كتب الإحسان على كل شيء',
            narrator: 'شداد بن أوس',
            source: 'صحيح مسلم'
        },
        {
            id: 6,
            category: 'الصدقة',
            text: 'الصدقة تطفئ الخطيئة كما يطفئ الماء النار',
            narrator: 'كعب بن عجرة',
            source: 'سنن الترمذي'
        }
    ];

    selectedCategory: string = 'الكل';

    get categories(): string[] {
        const cats = ['الكل', ...new Set(this.hadiths.map(h => h.category))];
        return cats;
    }

    get filteredHadiths(): Hadith[] {
        if (this.selectedCategory === 'الكل') {
            return this.hadiths;
        }
        return this.hadiths.filter(h => h.category === this.selectedCategory);
    }
}
