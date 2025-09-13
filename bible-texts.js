/**
 * Biblical Texts Database for Arabic Reading Practice
 * Contains verses from both Old and New Testament in Arabic
 */

const BiblicalTexts = {
    // Old Testament - العهد القديم
    oldTestament: {
        genesis: {
            name: "التكوين",
            nameEn: "Genesis",
            chapters: {
                1: [
                    {
                        verse: 1,
                        text: "فِي الْبَدْءِ خَلَقَ اللهُ السَّمَاوَاتِ وَالأَرْضَ",
                        textWithoutDiacritics: "في البدء خلق الله السماوات والأرض",
                        translation: "In the beginning God created the heavens and the earth",
                        audioUrl: null // Will be populated with TTS or recorded audio
                    },
                    {
                        verse: 2,
                        text: "وَكَانَتِ الأَرْضُ خَرِبَةً وَخَالِيَةً، وَعَلَى وَجْهِ الْغَمْرِ ظُلْمَةٌ، وَرُوحُ اللهِ يَرِفُّ عَلَى وَجْهِ الْمِيَاهِ",
                        textWithoutDiacritics: "وكانت الأرض خربة وخالية، وعلى وجه الغمر ظلمة، وروح الله يرف على وجه المياه",
                        translation: "The earth was without form, and void; and darkness was on the face of the deep. And the Spirit of God was hovering over the face of the waters",
                        audioUrl: null
                    },
                    {
                        verse: 3,
                        text: "وَقَالَ اللهُ: لِيَكُنْ نُورٌ، فَكَانَ نُورٌ",
                        textWithoutDiacritics: "وقال الله: ليكن نور، فكان نور",
                        translation: "Then God said, 'Let there be light'; and there was light",
                        audioUrl: null
                    },
                    {
                        verse: 4,
                        text: "وَرَأَى اللهُ النُّورَ أَنَّهُ حَسَنٌ. وَفَصَلَ اللهُ بَيْنَ النُّورِ وَالظُّلْمَةِ",
                        textWithoutDiacritics: "ورأى الله النور أنه حسن. وفصل الله بين النور والظلمة",
                        translation: "And God saw the light, that it was good; and God divided the light from the darkness",
                        audioUrl: null
                    },
                    {
                        verse: 5,
                        text: "وَدَعَا اللهُ النُّورَ نَهَارًا، وَالظُّلْمَةَ دَعَاهَا لَيْلاً. وَكَانَ مَسَاءٌ وَكَانَ صَبَاحٌ يَوْمًا وَاحِدًا",
                        textWithoutDiacritics: "ودعا الله النور نهارا، والظلمة دعاها ليلا. وكان مساء وكان صباح يوما واحدا",
                        translation: "God called the light Day, and the darkness He called Night. So the evening and the morning were the first day",
                        audioUrl: null
                    }
                ]
            }
        },
        psalms: {
            name: "المزامير",
            nameEn: "Psalms",
            chapters: {
                23: [
                    {
                        verse: 1,
                        text: "الرَّبُّ رَاعِيَّ فَلاَ يُعْوِزُنِي شَيْءٌ",
                        textWithoutDiacritics: "الرب راعي فلا يعوزني شيء",
                        translation: "The Lord is my shepherd; I shall not want",
                        audioUrl: null
                    },
                    {
                        verse: 2,
                        text: "فِي مَرَاعٍ خُضْرٍ يُرْبِضُنِي. إِلَى مِيَاهِ الرَّاحَةِ يُورِدُنِي",
                        textWithoutDiacritics: "في مراع خضر يربضني. إلى مياه الراحة يوردني",
                        translation: "He makes me to lie down in green pastures; He leads me beside the still waters",
                        audioUrl: null
                    },
                    {
                        verse: 3,
                        text: "يَرُدُّ نَفْسِي. يَهْدِينِي إِلَى سُبُلِ الْبِرِّ مِنْ أَجْلِ اسْمِهِ",
                        textWithoutDiacritics: "يرد نفسي. يهديني إلى سبل البر من أجل اسمه",
                        translation: "He restores my soul; He leads me in the paths of righteousness For His name's sake",
                        audioUrl: null
                    }
                ]
            }
        }
    },

    // New Testament - العهد الجديد
    newTestament: {
        matthew: {
            name: "متى",
            nameEn: "Matthew",
            chapters: {
                5: [
                    {
                        verse: 3,
                        text: "طُوبَى لِلْمَسَاكِينِ بِالرُّوحِ، لأَنَّ لَهُمْ مَلَكُوتَ السَّمَاوَاتِ",
                        textWithoutDiacritics: "طوبى للمساكين بالروح، لأن لهم ملكوت السماوات",
                        translation: "Blessed are the poor in spirit, for theirs is the kingdom of heaven",
                        audioUrl: null
                    },
                    {
                        verse: 4,
                        text: "طُوبَى لِلْحَزَانَى، لأَنَّهُمْ يَتَعَزَّوْنَ",
                        textWithoutDiacritics: "طوبى للحزانى، لأنهم يتعزون",
                        translation: "Blessed are those who mourn, for they shall be comforted",
                        audioUrl: null
                    },
                    {
                        verse: 5,
                        text: "طُوبَى لِلْوُدَعَاءِ، لأَنَّهُمْ يَرِثُونَ الأَرْضَ",
                        textWithoutDiacritics: "طوبى للودعاء، لأنهم يرثون الأرض",
                        translation: "Blessed are the meek, for they shall inherit the earth",
                        audioUrl: null
                    }
                ],
                6: [
                    {
                        verse: 9,
                        text: "فَصَلُّوا أَنْتُمْ هكَذَا: أَبَانَا الَّذِي فِي السَّمَاوَاتِ، لِيَتَقَدَّسِ اسْمُكَ",
                        textWithoutDiacritics: "فصلوا أنتم هكذا: أبانا الذي في السماوات، ليتقدس اسمك",
                        translation: "In this manner, therefore, pray: Our Father in heaven, Hallowed be Your name",
                        audioUrl: null
                    },
                    {
                        verse: 10,
                        text: "لِيَأْتِ مَلَكُوتُكَ. لِتَكُنْ مَشِيئَتُكَ كَمَا فِي السَّمَاءِ كَذلِكَ عَلَى الأَرْضِ",
                        textWithoutDiacritics: "ليأت ملكوتك. لتكن مشيئتك كما في السماء كذلك على الأرض",
                        translation: "Your kingdom come. Your will be done On earth as it is in heaven",
                        audioUrl: null
                    }
                ]
            }
        },
        john: {
            name: "يوحنا",
            nameEn: "John",
            chapters: {
                3: [
                    {
                        verse: 16,
                        text: "لأَنَّهُ هكَذَا أَحَبَّ اللهُ الْعَالَمَ حَتَّى بَذَلَ ابْنَهُ الْوَحِيدَ، لِكَيْ لاَ يَهْلِكَ كُلُّ مَنْ يُؤْمِنُ بِهِ، بَلْ تَكُونُ لَهُ الْحَيَاةُ الأَبَدِيَّةُ",
                        textWithoutDiacritics: "لأنه هكذا أحب الله العالم حتى بذل ابنه الوحيد، لكي لا يهلك كل من يؤمن به، بل تكون له الحياة الأبدية",
                        translation: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life",
                        audioUrl: null
                    }
                ],
                14: [
                    {
                        verse: 6,
                        text: "قَالَ لَهُ يَسُوعُ: أَنَا هُوَ الطَّرِيقُ وَالْحَقُّ وَالْحَيَاةُ. لَيْسَ أَحَدٌ يَأْتِي إِلَى الآبِ إِلاَّ بِي",
                        textWithoutDiacritics: "قال له يسوع: أنا هو الطريق والحق والحياة. ليس أحد يأتي إلى الآب إلا بي",
                        translation: "Jesus said to him, 'I am the way, the truth, and the life. No one comes to the Father except through Me'",
                        audioUrl: null
                    }
                ]
            }
        },
        romans: {
            name: "رومية",
            nameEn: "Romans",
            chapters: {
                8: [
                    {
                        verse: 28,
                        text: "وَنَحْنُ نَعْلَمُ أَنَّ كُلَّ الأَشْيَاءِ تَعْمَلُ مَعًا لِلْخَيْرِ لِلَّذِينَ يُحِبُّونَ اللهَ، الَّذِينَ هُمْ مَدْعُوُّونَ حَسَبَ قَصْدِهِ",
                        textWithoutDiacritics: "ونحن نعلم أن كل الأشياء تعمل معا للخير للذين يحبون الله، الذين هم مدعوون حسب قصده",
                        translation: "And we know that all things work together for good to those who love God, to those who are the called according to His purpose",
                        audioUrl: null
                    }
                ]
            }
        }
    },

    // Learning progression levels
    levels: {
        beginner: {
            name: "مبتدئ",
            description: "آيات قصيرة وسهلة",
            verses: [
                { book: "genesis", chapter: 1, verse: 1 },
                { book: "genesis", chapter: 1, verse: 3 },
                { book: "psalms", chapter: 23, verse: 1 },
                { book: "matthew", chapter: 5, verse: 4 },
                { book: "john", chapter: 14, verse: 6 }
            ]
        },
        intermediate: {
            name: "متوسط",
            description: "آيات متوسطة الطول",
            verses: [
                { book: "genesis", chapter: 1, verse: 2 },
                { book: "genesis", chapter: 1, verse: 4 },
                { book: "psalms", chapter: 23, verse: 2 },
                { book: "matthew", chapter: 6, verse: 9 },
                { book: "romans", chapter: 8, verse: 28 }
            ]
        },
        advanced: {
            name: "متقدم",
            description: "آيات طويلة ومعقدة",
            verses: [
                { book: "genesis", chapter: 1, verse: 5 },
                { book: "psalms", chapter: 23, verse: 3 },
                { book: "matthew", chapter: 6, verse: 10 },
                { book: "john", chapter: 3, verse: 16 }
            ]
        }
    }
};

/**
 * BiblicalTextManager - Utility class for managing biblical texts
 */
class BiblicalTextManager {
    constructor() {
        this.currentLevel = 'beginner';
        this.currentVerseIndex = 0;
        this.showDiacritics = true;
        this.completedVerses = new Set();
        this.loadProgress();
    }

    /**
     * Get verse by reference
     */
    getVerse(testament, book, chapter, verse) {
        try {
            const testamentData = testament === 'old' ? BiblicalTexts.oldTestament : BiblicalTexts.newTestament;
            const chapterVerses = testamentData[book]?.chapters[chapter];
            if (!chapterVerses) return null;
            
            // Find verse by verse number, not array index
            return chapterVerses.find(v => v.verse === verse) || null;
        } catch (error) {
            console.error('Error getting verse:', error);
            return null;
        }
    }

    /**
     * Get current verse based on level and progress
     */
    getCurrentVerse() {
        const level = BiblicalTexts.levels[this.currentLevel];
        if (!level || this.currentVerseIndex >= level.verses.length) {
            return null;
        }

        const verseRef = level.verses[this.currentVerseIndex];
        const testament = this.getTestamentByBook(verseRef.book);
        
        return {
            ...this.getVerse(testament, verseRef.book, verseRef.chapter, verseRef.verse),
            reference: verseRef,
            bookName: this.getBookName(verseRef.book),
            chapterVerse: `${verseRef.chapter}:${verseRef.verse}`,
            level: this.currentLevel,
            index: this.currentVerseIndex,
            total: level.verses.length
        };
    }

    /**
     * Get verse text (with or without diacritics)
     */
    getVerseText(verse) {
        if (!verse) return '';
        return this.showDiacritics ? verse.text : verse.textWithoutDiacritics;
    }

    /**
     * Move to next verse
     */
    nextVerse() {
        const level = BiblicalTexts.levels[this.currentLevel];
        if (this.currentVerseIndex < level.verses.length - 1) {
            this.currentVerseIndex++;
            this.saveProgress();
            return true;
        }
        return false;
    }

    /**
     * Move to previous verse
     */
    previousVerse() {
        if (this.currentVerseIndex > 0) {
            this.currentVerseIndex--;
            this.saveProgress();
            return true;
        }
        return false;
    }

    /**
     * Mark current verse as completed
     */
    markCurrentVerseCompleted() {
        const current = this.getCurrentVerse();
        if (current) {
            const key = `${current.reference.book}_${current.reference.chapter}_${current.reference.verse}`;
            this.completedVerses.add(key);
            this.saveProgress();
        }
    }

    /**
     * Check if current verse is completed
     */
    isCurrentVerseCompleted() {
        const current = this.getCurrentVerse();
        if (!current) return false;
        
        const key = `${current.reference.book}_${current.reference.chapter}_${current.reference.verse}`;
        return this.completedVerses.has(key);
    }

    /**
     * Set difficulty level
     */
    setLevel(level) {
        if (BiblicalTexts.levels[level]) {
            this.currentLevel = level;
            this.currentVerseIndex = 0;
            this.saveProgress();
        }
    }

    /**
     * Toggle diacritics display
     */
    toggleDiacritics(show) {
        this.showDiacritics = show;
        this.saveProgress();
    }

    /**
     * Get progress statistics
     */
    getProgress() {
        const level = BiblicalTexts.levels[this.currentLevel];
        const completedInLevel = level.verses.filter(verse => {
            const key = `${verse.book}_${verse.chapter}_${verse.verse}`;
            return this.completedVerses.has(key);
        }).length;

        return {
            currentLevel: this.currentLevel,
            currentIndex: this.currentVerseIndex,
            totalInLevel: level.verses.length,
            completedInLevel: completedInLevel,
            progressPercentage: (this.currentVerseIndex / level.verses.length) * 100,
            completionPercentage: (completedInLevel / level.verses.length) * 100,
            totalCompleted: this.completedVerses.size
        };
    }

    /**
     * Get testament by book name
     */
    getTestamentByBook(book) {
        if (BiblicalTexts.oldTestament[book]) return 'old';
        if (BiblicalTexts.newTestament[book]) return 'new';
        return null;
    }

    /**
     * Get book display name
     */
    getBookName(book) {
        const oldTest = BiblicalTexts.oldTestament[book];
        const newTest = BiblicalTexts.newTestament[book];
        return oldTest?.name || newTest?.name || book;
    }

    /**
     * Save progress to localStorage
     */
    saveProgress() {
        const progress = {
            currentLevel: this.currentLevel,
            currentVerseIndex: this.currentVerseIndex,
            showDiacritics: this.showDiacritics,
            completedVerses: Array.from(this.completedVerses),
            lastUpdated: Date.now()
        };
        
        try {
            localStorage.setItem('arabic_bible_progress', JSON.stringify(progress));
        } catch (error) {
            console.warn('Could not save progress:', error);
        }
    }

    /**
     * Load progress from localStorage
     */
    loadProgress() {
        try {
            const saved = localStorage.getItem('arabic_bible_progress');
            if (saved) {
                const progress = JSON.parse(saved);
                this.currentLevel = progress.currentLevel || 'beginner';
                this.currentVerseIndex = progress.currentVerseIndex || 0;
                this.showDiacritics = progress.showDiacritics !== false;
                this.completedVerses = new Set(progress.completedVerses || []);
            }
        } catch (error) {
            console.warn('Could not load progress:', error);
        }
    }

    /**
     * Reset all progress
     */
    resetProgress() {
        this.currentLevel = 'beginner';
        this.currentVerseIndex = 0;
        this.completedVerses.clear();
        this.saveProgress();
    }

    /**
     * Get all verses for a specific level
     */
    getVersesForLevel(level) {
        const levelData = BiblicalTexts.levels[level];
        if (!levelData) return [];

        return levelData.verses.map(verseRef => {
            const testament = this.getTestamentByBook(verseRef.book);
            const verse = this.getVerse(testament, verseRef.book, verseRef.chapter, verseRef.verse);
            
            return {
                ...verse,
                reference: verseRef,
                bookName: this.getBookName(verseRef.book),
                chapterVerse: `${verseRef.chapter}:${verseRef.verse}`
            };
        });
    }

    /**
     * Search verses by text
     */
    searchVerses(searchTerm) {
        const results = [];
        const term = searchTerm.toLowerCase().trim();
        
        // Search in both testaments
        [BiblicalTexts.oldTestament, BiblicalTexts.newTestament].forEach(testament => {
            Object.entries(testament).forEach(([bookKey, book]) => {
                Object.entries(book.chapters).forEach(([chapterNum, verses]) => {
                    verses.forEach((verse, index) => {
                        const textToSearch = verse.textWithoutDiacritics.toLowerCase();
                        if (textToSearch.includes(term)) {
                            results.push({
                                ...verse,
                                book: bookKey,
                                bookName: book.name,
                                chapter: parseInt(chapterNum),
                                chapterVerse: `${chapterNum}:${verse.verse}`
                            });
                        }
                    });
                });
            });
        });
        
        return results;
    }
}

// Export for use in other modules
window.BiblicalTexts = BiblicalTexts;
window.BiblicalTextManager = BiblicalTextManager;