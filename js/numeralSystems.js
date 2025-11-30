// ============================================
// NUMERAL SYSTEMS DATABASE
// ============================================

const numeralSystems = {
    roman: {
        id: 'roman',
        name: 'Roman Numerals',
        culture: 'Ancient Rome',
        base: 10,
        type: 'additive-subtractive',
        description: 'A numeral system that originated in ancient Rome, using combinations of letters from the Latin alphabet. It employs both additive and subtractive principles.',
        history: 'Roman numerals were used throughout the Roman Empire and continued to be used in Europe well into the Late Middle Ages. They are still used today in specific contexts like clock faces, book chapters, and movie sequels.',
        constructionRules: [
            'Symbols represent fixed values: I=1, V=5, X=10, L=50, C=100, D=500, M=1000',
            'When a smaller symbol appears before a larger one, subtract it (e.g., IV = 4)',
            'When a smaller symbol appears after a larger one, add it (e.g., VI = 6)',
            'Only I, X, and C can be used as subtractive symbols',
            'A symbol can be repeated up to three times consecutively'
        ],
        symbols: {
            'I': 1, 'V': 5, 'X': 10, 'L': 50,
            'C': 100, 'D': 500, 'M': 1000
        },
        examples: [
            { arabic: 4, cultural: 'IV', explanation: '5 - 1 = 4' },
            { arabic: 9, cultural: 'IX', explanation: '10 - 1 = 9' },
            { arabic: 42, cultural: 'XLII', explanation: '(50-10) + 1 + 1 = 42' },
            { arabic: 1984, cultural: 'MCMLXXXIV', explanation: '1000 + (1000-100) + 50 + 30 + (5-1) = 1984' },
            { arabic: 2025, cultural: 'MMXXV', explanation: '1000 + 1000 + 10 + 10 + 5 = 2025' }
        ]
    },

    mayan: {
        id: 'mayan',
        name: 'Mayan Numerals',
        culture: 'Ancient Maya Civilization',
        base: 20,
        type: 'positional-vigesimal',
        description: 'A vigesimal (base-20) positional numeral system used by the Maya civilization. It uses dots, bars, and a shell symbol for zero.',
        history: 'The Maya developed one of the most sophisticated numeral systems in pre-Columbian Americas, including the concept of zero around 350 CE, earlier than many other civilizations.',
        constructionRules: [
            'Uses three symbols: dot (•) = 1, bar (—) = 5, shell (⊗) = 0',
            'Numbers 1-19 are formed by combining dots and bars',
            'Positional notation with base 20 (vigesimal)',
            'Numbers are written vertically, with the lowest position at the bottom',
            'Each position represents a power of 20'
        ],
        symbols: {
            'dot': 1,
            'bar': 5,
            'shell': 0
        },
        examples: [
            { arabic: 0, cultural: '⊗', explanation: 'Shell symbol represents zero' },
            { arabic: 5, cultural: '—', explanation: 'One bar = 5' },
            { arabic: 13, cultural: '— — — •••', explanation: '2 bars (10) + 3 dots (3) = 13' },
            { arabic: 20, cultural: '•\n⊗', explanation: '1 in the 20s place, 0 in the 1s place = 20' },
            { arabic: 42, cultural: '••\n••', explanation: '2 in the 20s place (40) + 2 in the 1s place = 42' }
        ]
    },

    chinese: {
        id: 'chinese',
        name: 'Chinese Numerals',
        culture: 'China',
        base: 10,
        type: 'multiplicative-additive',
        description: 'A decimal system that uses Chinese characters to represent numbers. It employs a multiplicative-additive structure with special characters for powers of 10.',
        history: 'Chinese numerals have been used for over 3000 years. The system is still widely used in Chinese-speaking regions for both formal and informal purposes.',
        constructionRules: [
            'Basic digits: 一(1), 二(2), 三(3), 四(4), 五(5), 六(6), 七(7), 八(8), 九(9)',
            'Power markers: 十(10), 百(100), 千(1000), 万(10,000)',
            'Multiplicative structure: digit × power + digit × power + ...',
            'For numbers 11-19, 十 can appear without 一 before it',
            'Zero (零) is used to indicate missing positions in larger numbers'
        ],
        symbols: {
            '零': 0, '一': 1, '二': 2, '三': 3, '四': 4,
            '五': 5, '六': 6, '七': 7, '八': 8, '九': 9,
            '十': 10, '百': 100, '千': 1000, '万': 10000
        },
        examples: [
            { arabic: 5, cultural: '五', explanation: 'Direct representation of 5' },
            { arabic: 15, cultural: '十五', explanation: '10 + 5 = 15' },
            { arabic: 42, cultural: '四十二', explanation: '4×10 + 2 = 42' },
            { arabic: 365, cultural: '三百六十五', explanation: '3×100 + 6×10 + 5 = 365' },
            { arabic: 2025, cultural: '二千零二十五', explanation: '2×1000 + 0×100 + 2×10 + 5 = 2025' }
        ]
    },

    babylonian: {
        id: 'babylonian',
        name: 'Babylonian Numerals',
        culture: 'Ancient Babylon',
        base: 60,
        type: 'positional-sexagesimal',
        description: 'A sexagesimal (base-60) positional numeral system developed by ancient Babylonians. It used cuneiform symbols and influenced our modern time and angle measurements.',
        history: 'Developed around 3100 BCE, the Babylonian system is one of the oldest positional numeral systems. Its base-60 legacy persists in our 60-minute hours and 360-degree circles.',
        constructionRules: [
            'Uses two symbols: vertical wedge (𒐕) = 1, chevron (𒌋) = 10',
            'Numbers 1-59 are formed by combining wedges and chevrons',
            'Positional notation with base 60 (sexagesimal)',
            'Positions represent powers of 60: ...60², 60¹, 60⁰',
            'Originally lacked a zero symbol (added later as 𒑊)'
        ],
        symbols: {
            'wedge': 1,
            'chevron': 10,
            'zero': 0
        },
        examples: [
            { arabic: 1, cultural: '𒐕', explanation: 'One wedge = 1' },
            { arabic: 10, cultural: '𒌋', explanation: 'One chevron = 10' },
            { arabic: 42, cultural: '𒌋𒌋𒌋𒌋 𒐕𒐕', explanation: '4 chevrons (40) + 2 wedges (2) = 42' },
            { arabic: 60, cultural: '𒐕 | 𒑊', explanation: '1 in the 60s place = 60' },
            { arabic: 125, cultural: '𒐕𒐕 | 𒐕𒐕𒐕𒐕𒐕', explanation: '2×60 + 5 = 125' }
        ]
    },

    yoruba: {
        id: 'yoruba',
        name: 'Yoruba Numerals',
        culture: 'Yoruba People (West Africa)',
        base: 20,
        type: 'subtractive-vigesimal',
        description: 'A unique vigesimal (base-20) system that extensively uses subtraction. Numbers are often expressed as subtractions from the next multiple of 20.',
        history: 'The Yoruba numeral system reflects the mathematical sophistication of West African cultures. It demonstrates an alternative approach to number construction through systematic subtraction.',
        constructionRules: [
            'Base-20 system with extensive use of subtraction',
            'Numbers 1-10 have unique names',
            'Numbers 11-14 are formed by addition to 10',
            'Numbers 15-19 are formed by subtraction from 20',
            'Multiples of 20 serve as reference points',
            'Complex numbers use subtraction from higher multiples of 20'
        ],
        symbols: {
            'ọkan': 1, 'eji': 2, 'ẹta': 3, 'ẹrin': 4, 'arun': 5,
            'ẹfa': 6, 'eje': 7, 'ẹjọ': 8, 'ẹsan': 9, 'ẹwa': 10,
            'ogun': 20, 'ọgbọn': 30, 'ogoji': 40
        },
        examples: [
            { arabic: 5, cultural: 'arun', explanation: 'Direct word for 5' },
            { arabic: 15, cultural: 'eedogun', explanation: '20 - 5 = 15' },
            { arabic: 18, cultural: 'eejidinlogun', explanation: '20 - 2 = 18' },
            { arabic: 35, cultural: 'eedogun logoji', explanation: '(20-5) + 20 = 35' },
            { arabic: 42, cultural: 'eejidinlogoji', explanation: '(40 + 2) = 42' }
        ]
    },

    inuktitut: {
        id: 'inuktitut',
        name: 'Inuktitut Numerals',
        culture: 'Inuit People (Arctic)',
        base: 20,
        type: 'body-counting-vigesimal',
        description: 'A vigesimal system based on body counting, using fingers, toes, and body parts as reference points. It reflects the practical origins of counting systems.',
        history: 'Inuktitut numerals demonstrate how counting systems evolved from physical counting methods. The base-20 system corresponds to the total number of fingers and toes.',
        constructionRules: [
            'Base-20 system derived from counting on fingers and toes',
            'Numbers 1-5 reference fingers on one hand',
            'Numbers 6-10 reference the second hand',
            'Numbers 11-20 reference toes',
            'Compound numbers built from these base units',
            'Sequential naming pattern based on body parts'
        ],
        symbols: {
            'atausiq': 1, 'marluk': 2, 'pingasut': 3, 'sisamat': 4, 'tallimat': 5,
            'pingasut marluk': 6, 'tallimat marluk': 7, 'pingasut marluk pingasut': 8,
            'qulingiluat': 9, 'qulit': 10, 'inuit': 20
        },
        examples: [
            { arabic: 1, cultural: 'atausiq', explanation: 'One (first finger)' },
            { arabic: 5, cultural: 'tallimat', explanation: 'Five (one hand complete)' },
            { arabic: 10, cultural: 'qulit', explanation: 'Ten (both hands complete)' },
            { arabic: 15, cultural: 'akimiaq tallimat', explanation: 'The other side (toes) + 5' },
            { arabic: 20, cultural: 'inuit', explanation: 'A whole person (all fingers and toes)' }
        ]
    },

    egyptian: {
        id: 'egyptian',
        name: 'Egyptian Hieroglyphic Numerals',
        culture: 'Ancient Egypt',
        base: 10,
        type: 'additive',
        description: 'An additive decimal system using hieroglyphic symbols for powers of 10. Each symbol could be repeated up to nine times.',
        history: 'Used in ancient Egypt from around 3000 BCE, this system appeared in hieroglyphic inscriptions and was one of the earliest decimal systems.',
        constructionRules: [
            'Purely additive system (no subtraction)',
            'Symbols for powers of 10: 1, 10, 100, 1000, 10000, 100000, 1000000',
            'Each symbol can be repeated up to 9 times',
            'Symbols can be written in any order (typically largest to smallest)',
            'No positional value - only the symbols themselves matter'
        ],
        symbols: {
            '𓏺': 1, '𓎆': 10, '𓍢': 100, '𓆼': 1000,
            '𓂭': 10000, '𓆐': 100000, '𓁨': 1000000
        },
        examples: [
            { arabic: 5, cultural: '𓏺𓏺𓏺𓏺𓏺', explanation: 'Five strokes = 5' },
            { arabic: 23, cultural: '𓎆𓎆 𓏺𓏺𓏺', explanation: '2 tens + 3 ones = 23' },
            { arabic: 42, cultural: '𓎆𓎆𓎆𓎆 𓏺𓏺', explanation: '4 tens + 2 ones = 42' },
            { arabic: 365, cultural: '𓍢𓍢𓍢 𓎆𓎆𓎆𓎆𓎆𓎆 𓏺𓏺𓏺𓏺𓏺', explanation: '3 hundreds + 6 tens + 5 ones = 365' },
            { arabic: 1234, cultural: '𓆼 𓍢𓍢 𓎆𓎆𓎆 𓏺𓏺𓏺𓏺', explanation: '1 thousand + 2 hundreds + 3 tens + 4 ones = 1234' }
        ]
    },

    greek: {
        id: 'greek',
        name: 'Greek (Attic) Numerals',
        culture: 'Ancient Greece',
        base: 10,
        type: 'additive',
        description: 'The Attic or Herodianic numeral system used in ancient Athens. It employed the first letters of Greek number words as symbols.',
        history: 'Used in Athens and other parts of Greece from around 600 BCE until it was replaced by the alphabetic system. It was based on the acrophonic principle.',
        constructionRules: [
            'Symbols based on first letters of Greek number words',
            'Ι (iota) = 1, Π (penta) = 5, Δ (deka) = 10, etc.',
            'Purely additive system',
            'Symbols can be repeated',
            'Composite symbols for 50, 500, 5000 (combinations of 5 and powers of 10)'
        ],
        symbols: {
            'Ι': 1, 'Π': 5, 'Δ': 10, '𐅃': 50,
            'Η': 100, '𐅄': 500, 'Χ': 1000, '𐅅': 5000, 'Μ': 10000
        },
        examples: [
            { arabic: 5, cultural: 'Π', explanation: 'Penta (5)' },
            { arabic: 11, cultural: 'ΔΙ', explanation: '10 + 1 = 11' },
            { arabic: 42, cultural: 'ΔΔΔΔΙΙ', explanation: '4×10 + 2 = 42' },
            { arabic: 365, cultural: 'ΗΗΗ𐅃ΔΠ', explanation: '3×100 + 50 + 10 + 5 = 365' },
            { arabic: 1984, cultural: 'Χ𐅄ΗΗΗΗ𐅄ΗΗΗΔΔΔΙΙΙΙ', explanation: '1000 + 900 + 80 + 4 = 1984' }
        ]
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = numeralSystems;
}
