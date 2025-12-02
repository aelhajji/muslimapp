import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Hadith {
    hadithnumber: number;
    arabicnumber: number;
    text: string;
    grades: any[];
    reference: any;
}

interface Edition {
    name: string;
    collection: {
        name: string;
        language: string;
        direction: string;
    };
}

@Component({
    selector: 'app-hadith',
    templateUrl: './hadith.component.html',
    styleUrls: ['./hadith.component.css']
})
export class HadithComponent implements OnInit {
    editions: any[] = [];
    hadiths: Hadith[] = [];
    filteredHadiths: Hadith[] = [];

    selectedEdition: string = '';
    searchTerm: string = '';
    loading: boolean = false;
    loadingBooks: boolean = false;
    error: string = '';

    // Pagination
    currentPage: number = 1;
    itemsPerPage: number = 20;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.fetchEditions();
    }

    fetchEditions(): void {
        this.loadingBooks = true;
        this.http.get<any>('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.min.json')
            .subscribe({
                next: (data) => {
                    // API structure: { bookKey: { name: "Book Name", collection: [...editions] } }
                    // Flatten all editions from all books and filter for Arabic
                    this.editions = [];

                    // Map English book names to Arabic
                    const arabicBookNames: { [key: string]: string } = {
                        'bukhari': 'الإمام البخاري',
                        'muslim': 'الإمام مسلم',
                        'abudawud': 'أبو داود',
                        'tirmidhi': 'الترمذي',
                        'nasai': 'النسائي',
                        'ibnmajah': 'ابن ماجه',
                        'malik': 'الإمام مالك',
                        'ahmad': 'الإمام أحمد',
                        'darimi': 'الدارمي'
                    };

                    Object.values(data).forEach((book: any) => {
                        if (book.collection && Array.isArray(book.collection)) {
                            book.collection.forEach((edition: any) => {
                                if (edition.name && edition.name.startsWith('ara-')) {
                                    // Extract the book key from the edition name (e.g., 'ara-bukhari' => 'bukhari')
                                    const bookKey = edition.name.replace('ara-', '');
                                    const arabicName = arabicBookNames[bookKey] || book.name;

                                    this.editions.push({
                                        ...edition,
                                        displayName: arabicName,
                                        bookName: book.name
                                    });
                                }
                            });
                        }
                    });

                    // Set default to Bukhari if available
                    const bukhari = this.editions.find(e => e.name === 'ara-bukhari');
                    if (bukhari) {
                        this.selectedEdition = bukhari.name;
                        this.fetchHadiths();
                    } else if (this.editions.length > 0) {
                        // Fallback to first edition if Bukhari not found
                        this.selectedEdition = this.editions[0].name;
                        this.fetchHadiths();
                    }

                    this.loadingBooks = false;
                },
                error: (err) => {
                    console.error('Failed to fetch editions', err);
                    this.error = 'فشل في تحميل الكتب';
                    this.loadingBooks = false;
                }
            });
    }

    fetchHadiths(): void {
        if (!this.selectedEdition) return;

        this.loading = true;
        this.error = '';
        this.hadiths = [];
        this.filteredHadiths = [];

        this.http.get<any>(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${this.selectedEdition}.min.json`)
            .subscribe({
                next: (data) => {
                    if (data && data.hadiths) {
                        this.hadiths = data.hadiths;
                        this.filterHadiths();
                    }
                    this.loading = false;
                },
                error: (err) => {
                    console.error('Failed to fetch hadiths', err);
                    this.error = 'فشل في تحميل الأحاديث';
                    this.loading = false;
                }
            });
    }

    onEditionChange(): void {
        this.currentPage = 1;
        this.fetchHadiths();
    }

    onSearch(): void {
        this.currentPage = 1;
        this.filterHadiths();
    }

    filterHadiths(): void {
        if (!this.searchTerm) {
            this.filteredHadiths = this.hadiths;
        } else {
            const term = this.searchTerm.toLowerCase();
            this.filteredHadiths = this.hadiths.filter(h =>
                h.text.toLowerCase().includes(term) ||
                h.hadithnumber.toString().includes(term)
            );
        }
    }

    get paginatedHadiths(): Hadith[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredHadiths.slice(startIndex, startIndex + this.itemsPerPage);
    }

    nextPage(): void {
        if (this.currentPage * this.itemsPerPage < this.filteredHadiths.length) {
            this.currentPage++;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    get totalPages(): number {
        return Math.ceil(this.filteredHadiths.length / this.itemsPerPage);
    }
}
