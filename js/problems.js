// ============================================
// PROBLEMS DATABASE
// Olympiad-style puzzles for practice
// ============================================

const problems = {
    beginner: [
        {
            id: 'b1',
            title: 'Roman Numeral Basics',
            type: 'Pattern Recognition',
            difficulty: 'beginner',
            content: `
                <p>Study these Roman numeral examples:</p>
                <pre>
I = 1
V = 5
X = 10
III = 3
VIII = 8
XIII = 13
                </pre>
                <p><strong>Question:</strong> What is the value of <code>XVIII</code>?</p>
                <p><em>Type your answer as a number.</em></p>
            `,
            answer: '18',
            hint: 'Break it down: X (10) + V (5) + III (3)',
            solution: `
                <p><strong>Solution:</strong></p>
                <p>XVIII breaks down as:</p>
                <ul>
                    <li>X = 10</li>
                    <li>V = 5</li>
                    <li>III = 3</li>
                </ul>
                <p>Total: 10 + 5 + 3 = <strong>18</strong></p>
            `
        },
        {
            id: 'b2',
            title: 'Mayan Dot and Bar',
            type: 'Symbol Interpretation',
            difficulty: 'beginner',
            content: `
                <p>In the Mayan system:</p>
                <ul>
                    <li>• (dot) = 1</li>
                    <li>— (bar) = 5</li>
                </ul>
                <p>Examples:</p>
                <pre>
••• = 3
— = 5
— •• = 7
— — = 10
                </pre>
                <p><strong>Question:</strong> What number is represented by <code>— — •••</code>?</p>
            `,
            answer: '13',
            hint: 'Count the bars (each worth 5) and dots (each worth 1)',
            solution: `
                <p><strong>Solution:</strong></p>
                <p>— — ••• breaks down as:</p>
                <ul>
                    <li>2 bars: 2 × 5 = 10</li>
                    <li>3 dots: 3 × 1 = 3</li>
                </ul>
                <p>Total: 10 + 3 = <strong>13</strong></p>
            `
        },
        {
            id: 'b3',
            title: 'Egyptian Hieroglyphs',
            type: 'Additive System',
            difficulty: 'beginner',
            content: `
                <p>Ancient Egyptian numerals are additive. Study these symbols:</p>
                <pre>
𓏺 = 1
𓎆 = 10
𓍢 = 100
                </pre>
                <p>Examples:</p>
                <pre>
𓏺𓏺𓏺 = 3
𓎆𓎆 = 20
𓍢 𓎆𓎆𓎆 𓏺𓏺 = 132
                </pre>
                <p><strong>Question:</strong> What is <code>𓍢𓍢 𓎆𓎆𓎆𓎆 𓏺𓏺𓏺𓏺𓏺</code>?</p>
            `,
            answer: '245',
            hint: 'Count each symbol type and multiply by its value, then add them all',
            solution: `
                <p><strong>Solution:</strong></p>
                <ul>
                    <li>2 × 𓍢 (100) = 200</li>
                    <li>4 × 𓎆 (10) = 40</li>
                    <li>5 × 𓏺 (1) = 5</li>
                </ul>
                <p>Total: 200 + 40 + 5 = <strong>245</strong></p>
            `
        },
        {
            id: 'b4',
            title: 'Chinese Number Construction',
            type: 'Multiplicative System',
            difficulty: 'beginner',
            content: `
                <p>Chinese numerals use a multiplicative-additive structure:</p>
                <pre>
一 = 1    二 = 2    三 = 3
十 = 10   百 = 100
                </pre>
                <p>Examples:</p>
                <pre>
五 = 5
十五 = 15 (10 + 5)
二十 = 20 (2 × 10)
三十五 = 35 (3 × 10 + 5)
                </pre>
                <p><strong>Question:</strong> What number is <code>四十二</code>?</p>
            `,
            answer: '42',
            hint: '四 means 4, 十 means 10, 二 means 2',
            solution: `
                <p><strong>Solution:</strong></p>
                <p>四十二 breaks down as:</p>
                <ul>
                    <li>四 (4) × 十 (10) = 40</li>
                    <li>二 (2) = 2</li>
                </ul>
                <p>Total: 40 + 2 = <strong>42</strong></p>
            `
        },
        {
            id: 'b5',
            title: 'Roman Subtractive Principle',
            type: 'Pattern Recognition',
            difficulty: 'beginner',
            content: `
                <p>Roman numerals use subtraction when a smaller symbol comes before a larger one:</p>
                <pre>
IV = 4 (5 - 1)
IX = 9 (10 - 1)
XL = 40 (50 - 10)
XC = 90 (100 - 10)
                </pre>
                <p><strong>Question:</strong> What is the value of <code>XIV</code>?</p>
            `,
            answer: '14',
            hint: 'X is 10, then IV is 4 (not VI)',
            solution: `
                <p><strong>Solution:</strong></p>
                <p>XIV breaks down as:</p>
                <ul>
                    <li>X = 10</li>
                    <li>IV = 4 (5 - 1)</li>
                </ul>
                <p>Total: 10 + 4 = <strong>14</strong></p>
            `
        }
    ],

    intermediate: [
        {
            id: 'i1',
            title: 'Mayan Positional System',
            type: 'Base Conversion',
            difficulty: 'intermediate',
            content: `
                <p>Mayan numerals use base-20 positional notation. Numbers are written vertically:</p>
                <pre>
Position 1 (top):    × 20
Position 0 (bottom): × 1
                </pre>
                <p>Example: The number 42 in Mayan:</p>
                <pre>
••      (2 in the 20s place = 40)
••      (2 in the 1s place = 2)
Total: 42
                </pre>
                <p><strong>Question:</strong> What decimal number is represented by:</p>
                <pre>
•••     (top)
— — —   (bottom)
                </pre>
            `,
            answer: '75',
            hint: 'Top position: 3 × 20. Bottom position: 3 bars = 15',
            solution: `
                <p><strong>Solution:</strong></p>
                <ul>
                    <li>Top (20s place): ••• = 3, so 3 × 20 = 60</li>
                    <li>Bottom (1s place): — — — = 15</li>
                </ul>
                <p>Total: 60 + 15 = <strong>75</strong></p>
            `
        },
        {
            id: 'i2',
            title: 'Babylonian Base-60',
            type: 'Base Conversion',
            difficulty: 'intermediate',
            content: `
                <p>Babylonian numerals use base-60. Within each position:</p>
                <ul>
                    <li>𒐕 (wedge) = 1</li>
                    <li>𒌋 (chevron) = 10</li>
                </ul>
                <p>Positions are separated by | and represent powers of 60.</p>
                <p>Example: <code>𒐕 | 𒌋𒌋</code> = (1 × 60) + 20 = 80</p>
                <p><strong>Question:</strong> What is <code>𒐕𒐕 | 𒌋𒌋𒌋</code>?</p>
            `,
            answer: '150',
            hint: 'First position: 2 × 60. Second position: 3 chevrons = 30',
            solution: `
                <p><strong>Solution:</strong></p>
                <ul>
                    <li>First position: 𒐕𒐕 = 2, so 2 × 60 = 120</li>
                    <li>Second position: 𒌋𒌋𒌋 = 30</li>
                </ul>
                <p>Total: 120 + 30 = <strong>150</strong></p>
            `
        },
        {
            id: 'i3',
            title: 'Complex Roman Numerals',
            type: 'Pattern Recognition',
            difficulty: 'intermediate',
            content: `
                <p>Convert this Roman numeral to decimal:</p>
                <p style="text-align: center; font-size: 1.5rem; font-family: var(--font-mono); color: var(--color-text-gold);">
                    MCMXCIV
                </p>
                <p><em>Hint: Break it into groups: M, CM, XC, IV</em></p>
            `,
            answer: '1994',
            hint: 'M=1000, CM=900, XC=90, IV=4',
            solution: `
                <p><strong>Solution:</strong></p>
                <p>MCMXCIV breaks down as:</p>
                <ul>
                    <li>M = 1000</li>
                    <li>CM = 900 (1000 - 100)</li>
                    <li>XC = 90 (100 - 10)</li>
                    <li>IV = 4 (5 - 1)</li>
                </ul>
                <p>Total: 1000 + 900 + 90 + 4 = <strong>1994</strong></p>
            `
        },
        {
            id: 'i4',
            title: 'Chinese Large Numbers',
            type: 'Multiplicative System',
            difficulty: 'intermediate',
            content: `
                <p>Given these Chinese numerals:</p>
                <pre>
五 = 5    六 = 6    七 = 7
十 = 10   百 = 100  千 = 1000
                </pre>
                <p><strong>Question:</strong> What is <code>七百六十五</code>?</p>
            `,
            answer: '765',
            hint: '七百 = 7×100, 六十 = 6×10, 五 = 5',
            solution: `
                <p><strong>Solution:</strong></p>
                <ul>
                    <li>七 (7) × 百 (100) = 700</li>
                    <li>六 (6) × 十 (10) = 60</li>
                    <li>五 (5) = 5</li>
                </ul>
                <p>Total: 700 + 60 + 5 = <strong>765</strong></p>
            `
        },
        {
            id: 'i5',
            title: 'Greek Attic Numerals',
            type: 'Additive System',
            difficulty: 'intermediate',
            content: `
                <p>Greek Attic numerals use these symbols:</p>
                <pre>
Ι = 1    Π = 5    Δ = 10
𐅃 = 50   Η = 100
                </pre>
                <p><strong>Question:</strong> What is <code>ΗΗ𐅃ΔΔΔΠΙΙΙ</code>?</p>
            `,
            answer: '288',
            hint: 'Count each symbol and add: 2×100 + 1×50 + 3×10 + 1×5 + 3×1',
            solution: `
                <p><strong>Solution:</strong></p>
                <ul>
                    <li>ΗΗ = 2 × 100 = 200</li>
                    <li>𐅃 = 50</li>
                    <li>ΔΔΔ = 3 × 10 = 30</li>
                    <li>Π = 5</li>
                    <li>ΙΙΙ = 3</li>
                </ul>
                <p>Total: 200 + 50 + 30 + 5 + 3 = <strong>288</strong></p>
            `
        }
    ],

    advanced: [
        {
            id: 'a1',
            title: 'Mystery System Decoding',
            type: 'Full Linguistic Analysis',
            difficulty: 'advanced',
            content: `
                <p>A newly discovered ancient civilization uses the following number system:</p>
                <pre>
1 = tok
2 = bis
3 = tri
4 = kwad
5 = pent
10 = dek
11 = dek-tok
12 = dek-bis
20 = bis-dek
25 = bis-dek-pent
30 = tri-dek
                </pre>
                <p><strong>Questions:</strong></p>
                <ol>
                    <li>What is the base of this system?</li>
                    <li>What would 42 be in this system?</li>
                    <li>Describe the construction pattern.</li>
                </ol>
            `,
            answer: 'base 10, kwad-dek-bis, multiplicative-additive',
            hint: 'Look at how 20 and 30 are formed. The pattern is (digit × 10) + digit',
            solution: `
                <p><strong>Solution:</strong></p>
                <ol>
                    <li><strong>Base:</strong> 10 (decimal) - evident from the use of "dek" (10) as a building block</li>
                    <li><strong>42:</strong> kwad-dek-bis (4 × 10 + 2)</li>
                    <li><strong>Pattern:</strong> Multiplicative-additive structure where:
                        <ul>
                            <li>Numbers 1-9 have unique names</li>
                            <li>Multiples of 10 are formed as (digit)-dek</li>
                            <li>Compound numbers use (tens)-(ones) structure</li>
                        </ul>
                    </li>
                </ol>
            `
        },
        {
            id: 'a2',
            title: 'Yoruba Subtraction Logic',
            type: 'Subtractive System',
            difficulty: 'advanced',
            content: `
                <p>The Yoruba system uses extensive subtraction from multiples of 20:</p>
                <pre>
15 = eedogun (20 - 5)
16 = eerindinlogun (20 - 4)
17 = eetadinlogun (20 - 3)
18 = eejidinlogun (20 - 2)
19 = ookandinlogun (20 - 1)
20 = ogun
                </pre>
                <p><strong>Question:</strong> Based on this pattern, what would 35 likely be?</p>
                <p><em>(Hint: 40 = ogoji in Yoruba)</em></p>
            `,
            answer: 'eedogun logoji or 40-5',
            hint: '35 can be expressed as (40 - 5) or as (20 + 15)',
            solution: `
                <p><strong>Solution:</strong></p>
                <p>In Yoruba, 35 would likely be expressed as <strong>eedogun logoji</strong></p>
                <p>This means "5 from 40" or (40 - 5)</p>
                <p>The pattern shows Yoruba preference for subtraction from the next higher multiple of 20.</p>
                <p>Alternative: Could also be "eedogun lo ogun" (15 + 20)</p>
            `
        },
        {
            id: 'a3',
            title: 'Multi-System Conversion',
            type: 'Cross-System Analysis',
            difficulty: 'advanced',
            content: `
                <p>The number 60 is special in many cultures:</p>
                <ul>
                    <li>Roman: LX</li>
                    <li>Mayan: ••• (in 20s place) + ⊗ (in 1s place)</li>
                    <li>Babylonian: 𒐕 (in 60s place) + ⊗ (in 1s place)</li>
                    <li>Chinese: 六十</li>
                </ul>
                <p><strong>Question:</strong> Why is 60 represented so simply in Babylonian compared to other systems? What does this tell us about the Babylonian mathematical worldview?</p>
            `,
            answer: 'base 60 system, 60 is fundamental unit',
            hint: 'Think about what 10 means in our base-10 system',
            solution: `
                <p><strong>Solution:</strong></p>
                <p>60 is simple in Babylonian because it's their <strong>base</strong> - just like 10 is simple (one symbol) in our decimal system.</p>
                <p><strong>Cultural Insight:</strong></p>
                <ul>
                    <li>The Babylonians chose base-60 (sexagesimal) as their fundamental unit</li>
                    <li>This reflects their sophisticated astronomy and time-keeping</li>
                    <li>60 is highly divisible (1,2,3,4,5,6,10,12,15,20,30,60) making calculations easier</li>
                    <li>This legacy persists: 60 seconds, 60 minutes, 360 degrees</li>
                </ul>
            `
        },
        {
            id: 'a4',
            title: 'Inuktitut Body Counting',
            type: 'Anthropological Analysis',
            difficulty: 'advanced',
            content: `
                <p>Inuktitut numerals are based on body counting:</p>
                <pre>
1-5: fingers of right hand
6-10: fingers of left hand
11-15: toes of right foot
16-20: toes of left foot
20 = inuit (one person)
                </pre>
                <p><strong>Question:</strong> If a group needed to count to 100, how might they extend this system? Propose a logical extension and explain your reasoning.</p>
            `,
            answer: '5 people or talliman inuit',
            hint: 'If 20 = 1 person, what would multiple people represent?',
            solution: `
                <p><strong>Solution:</strong></p>
                <p>100 could be represented as <strong>talliman inuit</strong> (5 people)</p>
                <p><strong>Reasoning:</strong></p>
                <ul>
                    <li>20 = inuit (one complete person)</li>
                    <li>40 = marluk inuit (two people)</li>
                    <li>60 = pingasut inuit (three people)</li>
                    <li>80 = sisamat inuit (four people)</li>
                    <li>100 = talliman inuit (five people)</li>
                </ul>
                <p>This extends the body-counting metaphor to groups of people, maintaining the vigesimal (base-20) structure while allowing for larger numbers.</p>
            `
        },
        {
            id: 'a5',
            title: 'Zero Across Cultures',
            type: 'Comparative Analysis',
            difficulty: 'advanced',
            content: `
                <p>Different cultures developed (or didn't develop) zero differently:</p>
                <ul>
                    <li>Mayan: ⊗ (shell symbol) - developed independently ~350 CE</li>
                    <li>Babylonian: 𒑊 (added later, originally just empty space)</li>
                    <li>Roman: No zero symbol</li>
                    <li>Egyptian: No zero symbol</li>
                    <li>Chinese: 零 (líng) - used as placeholder</li>
                </ul>
                <p><strong>Question:</strong> Why did positional systems (Mayan, Babylonian) need zero while additive systems (Roman, Egyptian) did not? What does this reveal about the mathematical sophistication required for each system type?</p>
            `,
            answer: 'positional systems need placeholder, additive systems use symbol repetition',
            hint: 'Think about how you write 101 vs. how Romans write it (CI)',
            solution: `
                <p><strong>Solution:</strong></p>
                <p><strong>Positional systems need zero because:</strong></p>
                <ul>
                    <li>Position determines value (like our 101 vs 11)</li>
                    <li>Zero serves as a placeholder to show "nothing in this position"</li>
                    <li>Without zero, 1 and 10 and 100 would be indistinguishable</li>
                </ul>
                <p><strong>Additive systems don't need zero because:</strong></p>
                <ul>
                    <li>Each symbol has fixed value regardless of position</li>
                    <li>Absence of a symbol naturally means zero of that value</li>
                    <li>101 in Roman is CI (100 + 1), the missing 10s are implicit</li>
                </ul>
                <p><strong>Mathematical Insight:</strong> The invention of zero represents a conceptual leap - treating "nothing" as "something" that can be manipulated mathematically. Positional systems require this abstraction, making them more sophisticated but also more powerful for calculation.</p>
            `
        }
    ]
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = problems;
}
