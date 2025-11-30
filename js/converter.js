// ============================================
// CONVERTER ENGINE
// Handles bidirectional conversion between Arabic numerals and cultural systems
// ============================================

const Converter = {
    // Main conversion dispatcher
    convert(number, systemId, direction = 'to-cultural') {
        const system = numeralSystems[systemId];
        if (!system) {
            return { success: false, error: 'System not found' };
        }

        try {
            if (direction === 'to-cultural') {
                return this.arabicToCultural(number, system);
            } else {
                return this.culturalToArabic(number, system);
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    // ============================================
    // ARABIC TO CULTURAL CONVERSIONS
    // ============================================

    arabicToCultural(num, system) {
        const number = parseInt(num);
        if (isNaN(number) || number < 0) {
            throw new Error('Please enter a valid positive number');
        }

        const converters = {
            'roman': this.toRoman,
            'mayan': this.toMayan,
            'chinese': this.toChinese,
            'babylonian': this.toBabylonian,
            'yoruba': this.toYoruba,
            'inuktitut': this.toInuktitut,
            'egyptian': this.toEgyptian,
            'greek': this.toGreek
        };

        const converter = converters[system.id];
        if (!converter) {
            throw new Error('Converter not implemented for this system');
        }

        return converter.call(this, number);
    },

    // Roman Numerals Conversion
    toRoman(num) {
        if (num === 0) return { result: 'N/A', steps: ['Roman numerals do not have a symbol for zero'] };
        if (num > 3999) return { result: 'N/A', steps: ['Standard Roman numerals only go up to 3999'] };

        const steps = [];
        const values = [
            { value: 1000, symbol: 'M' },
            { value: 900, symbol: 'CM' },
            { value: 500, symbol: 'D' },
            { value: 400, symbol: 'CD' },
            { value: 100, symbol: 'C' },
            { value: 90, symbol: 'XC' },
            { value: 50, symbol: 'L' },
            { value: 40, symbol: 'XL' },
            { value: 10, symbol: 'X' },
            { value: 9, symbol: 'IX' },
            { value: 5, symbol: 'V' },
            { value: 4, symbol: 'IV' },
            { value: 1, symbol: 'I' }
        ];

        let result = '';
        let remaining = num;
        steps.push(`Converting ${num} to Roman numerals:`);

        for (const { value, symbol } of values) {
            while (remaining >= value) {
                result += symbol;
                steps.push(`${remaining} - ${value} = ${remaining - value} (add "${symbol}")`);
                remaining -= value;
            }
        }

        steps.push(`Final result: ${result}`);
        return { result, steps };
    },

    // Mayan Numerals Conversion
    toMayan(num) {
        const steps = [];
        steps.push(`Converting ${num} to Mayan (base-20) numerals:`);

        if (num === 0) {
            return { result: '⊗', steps: ['Zero is represented by the shell symbol ⊗'] };
        }

        const positions = [];
        let remaining = num;
        let position = 0;

        // Convert to base-20 positions
        while (remaining > 0) {
            const digit = remaining % 20;
            positions.unshift(digit);
            steps.push(`Position ${position}: ${remaining} mod 20 = ${digit}, remaining: ${Math.floor(remaining / 20)}`);
            remaining = Math.floor(remaining / 20);
            position++;
        }

        // Convert each position to dots and bars
        const mayanDigits = positions.map((digit, idx) => {
            if (digit === 0) return '⊗';
            const bars = Math.floor(digit / 5);
            const dots = digit % 5;
            const barStr = '—'.repeat(bars);
            const dotStr = '•'.repeat(dots);
            steps.push(`Position ${positions.length - idx - 1} (value ${digit}): ${bars} bar(s) + ${dots} dot(s) = ${barStr} ${dotStr}`);
            return (barStr + ' ' + dotStr).trim();
        });

        const result = mayanDigits.join('\n');
        steps.push(`Final result (read top to bottom):\n${result}`);
        return { result, steps };
    },

    // Chinese Numerals Conversion
    toChinese(num) {
        const steps = [];
        steps.push(`Converting ${num} to Chinese numerals:`);

        if (num === 0) return { result: '零', steps: ['Zero is 零 (líng)'] };

        const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        const units = ['', '十', '百', '千', '万'];

        const numStr = num.toString();
        let result = '';
        const len = numStr.length;

        for (let i = 0; i < len; i++) {
            const digit = parseInt(numStr[i]);
            const position = len - i - 1;

            if (digit === 0) {
                if (result && !result.endsWith('零')) {
                    result += '零';
                    steps.push(`Position ${position}: 0 - add 零 as placeholder`);
                }
            } else {
                const digitChar = digits[digit];
                const unit = units[position];

                // Special case for 10-19
                if (num >= 10 && num < 20 && position === 1) {
                    result += unit;
                    steps.push(`Position ${position}: ${digit} - special case for teens, add ${unit} only`);
                } else {
                    result += digitChar + unit;
                    steps.push(`Position ${position}: ${digit} - add ${digitChar}${unit} (${digit} × ${unit || '1'})`);
                }
            }
        }

        // Remove trailing 零
        result = result.replace(/零+$/, '');
        steps.push(`Final result: ${result}`);
        return { result, steps };
    },

    // Babylonian Numerals Conversion
    toBabylonian(num) {
        const steps = [];
        steps.push(`Converting ${num} to Babylonian (base-60) numerals:`);

        if (num === 0) return { result: '𒑊', steps: ['Zero is represented by 𒑊'] };

        const positions = [];
        let remaining = num;
        let position = 0;

        // Convert to base-60 positions
        while (remaining > 0) {
            const digit = remaining % 60;
            positions.unshift(digit);
            steps.push(`Position ${position}: ${remaining} mod 60 = ${digit}, remaining: ${Math.floor(remaining / 60)}`);
            remaining = Math.floor(remaining / 60);
            position++;
        }

        // Convert each position to wedges and chevrons
        const babylonianDigits = positions.map((digit, idx) => {
            if (digit === 0) return '𒑊';
            const chevrons = Math.floor(digit / 10);
            const wedges = digit % 10;
            const chevronStr = '𒌋'.repeat(chevrons);
            const wedgeStr = '𒐕'.repeat(wedges);
            steps.push(`Position ${positions.length - idx - 1} (value ${digit}): ${chevrons} chevron(s) + ${wedges} wedge(s)`);
            return (chevronStr + wedgeStr).trim();
        });

        const result = babylonianDigits.join(' | ');
        steps.push(`Final result (positions separated by |): ${result}`);
        return { result, steps };
    },

    // Yoruba Numerals Conversion
    toYoruba(num) {
        const steps = [];
        steps.push(`Converting ${num} to Yoruba numerals:`);

        const basicNumbers = {
            0: 'òdo', 1: 'ọkan', 2: 'eji', 3: 'ẹta', 4: 'ẹrin', 5: 'arun',
            6: 'ẹfa', 7: 'eje', 8: 'ẹjọ', 9: 'ẹsan', 10: 'ẹwa'
        };

        if (num <= 10) {
            const result = basicNumbers[num];
            steps.push(`Direct word: ${result}`);
            return { result, steps };
        }

        if (num <= 14) {
            const result = `ọkanla (11-14 pattern)`;
            steps.push(`${num} is in the 11-14 range: formed by addition to 10`);
            return { result, steps };
        }

        if (num <= 19) {
            const subtract = 20 - num;
            const result = `${basicNumbers[subtract]}dinlogun`;
            steps.push(`${num} = 20 - ${subtract}, so "${basicNumbers[subtract]}dinlogun" (${subtract} from 20)`);
            return { result, steps };
        }

        // For larger numbers, use approximation
        const nearestTwenty = Math.round(num / 20) * 20;
        const diff = num - nearestTwenty;
        let result = '';

        if (diff === 0) {
            result = `${nearestTwenty / 20} × ogún (20)`;
        } else if (diff > 0) {
            result = `ogún + ${diff}`;
        } else {
            result = `${Math.abs(diff)} from ${nearestTwenty}`;
        }

        steps.push(`${num} ≈ ${result} (Yoruba uses complex subtraction patterns)`);
        return { result, steps };
    },

    // Inuktitut Numerals Conversion
    toInuktitut(num) {
        const steps = [];
        steps.push(`Converting ${num} to Inuktitut (body-counting) numerals:`);

        const basicNumbers = {
            1: 'atausiq', 2: 'marluk', 3: 'pingasut', 4: 'sisamat', 5: 'tallimat',
            10: 'qulit', 20: 'inuit'
        };

        if (basicNumbers[num]) {
            const result = basicNumbers[num];
            steps.push(`Direct word: ${result}`);
            return { result, steps };
        }

        if (num < 20) {
            const result = `qulit + ${num - 10}`;
            steps.push(`${num} = 10 (both hands) + ${num - 10} (toes)`);
            return { result, steps };
        }

        const twenties = Math.floor(num / 20);
        const remainder = num % 20;
        let result = '';

        if (remainder === 0) {
            result = `${twenties} × inuit (person)`;
            steps.push(`${num} = ${twenties} complete persons (${twenties} × 20)`);
        } else {
            result = `${twenties} inuit + ${remainder}`;
            steps.push(`${num} = ${twenties} person(s) + ${remainder}`);
        }

        return { result, steps };
    },

    // Egyptian Hieroglyphic Conversion
    toEgyptian(num) {
        const steps = [];
        steps.push(`Converting ${num} to Egyptian hieroglyphic numerals:`);

        if (num === 0) return { result: 'N/A', steps: ['Ancient Egyptians did not have a symbol for zero'] };

        const symbols = [
            { value: 1000000, symbol: '𓁨' },
            { value: 100000, symbol: '𓆐' },
            { value: 10000, symbol: '𓂭' },
            { value: 1000, symbol: '𓆼' },
            { value: 100, symbol: '𓍢' },
            { value: 10, symbol: '𓎆' },
            { value: 1, symbol: '𓏺' }
        ];

        let result = '';
        let remaining = num;

        for (const { value, symbol } of symbols) {
            const count = Math.floor(remaining / value);
            if (count > 0) {
                const symbolStr = symbol.repeat(count);
                result += symbolStr + ' ';
                steps.push(`${count} × ${value} = ${count * value} (add ${count} "${symbol}" symbol(s))`);
                remaining -= count * value;
            }
        }

        steps.push(`Final result: ${result.trim()}`);
        return { result: result.trim(), steps };
    },

    // Greek (Attic) Numerals Conversion
    toGreek(num) {
        const steps = [];
        steps.push(`Converting ${num} to Greek (Attic) numerals:`);

        if (num === 0) return { result: 'N/A', steps: ['Ancient Greeks did not have a symbol for zero in the Attic system'] };

        const symbols = [
            { value: 10000, symbol: 'Μ' },
            { value: 5000, symbol: '𐅅' },
            { value: 1000, symbol: 'Χ' },
            { value: 500, symbol: '𐅄' },
            { value: 100, symbol: 'Η' },
            { value: 50, symbol: '𐅃' },
            { value: 10, symbol: 'Δ' },
            { value: 5, symbol: 'Π' },
            { value: 1, symbol: 'Ι' }
        ];

        let result = '';
        let remaining = num;

        for (const { value, symbol } of symbols) {
            const count = Math.floor(remaining / value);
            if (count > 0) {
                const symbolStr = symbol.repeat(count);
                result += symbolStr;
                steps.push(`${count} × ${value} = ${count * value} (add ${count} "${symbol}")`);
                remaining -= count * value;
            }
        }

        steps.push(`Final result: ${result}`);
        return { result, steps };
    },

    // ============================================
    // CULTURAL TO ARABIC CONVERSIONS
    // ============================================

    culturalToArabic(input, system) {
        const parsers = {
            'roman': this.fromRoman,
            'egyptian': this.fromEgyptian,
            'greek': this.fromGreek
        };

        const parser = parsers[system.id];
        if (!parser) {
            return {
                result: 'N/A',
                steps: ['Reverse conversion not yet implemented for this system. Try converting from Arabic to this system instead!']
            };
        }

        return parser.call(this, input.trim().toUpperCase());
    },

    // Parse Roman Numerals
    fromRoman(roman) {
        const steps = [];
        steps.push(`Parsing Roman numeral: ${roman}`);

        const values = {
            'I': 1, 'V': 5, 'X': 10, 'L': 50,
            'C': 100, 'D': 500, 'M': 1000
        };

        let result = 0;
        let prevValue = 0;

        for (let i = roman.length - 1; i >= 0; i--) {
            const char = roman[i];
            const value = values[char];

            if (!value) {
                throw new Error(`Invalid Roman numeral character: ${char}`);
            }

            if (value < prevValue) {
                result -= value;
                steps.push(`"${char}" (${value}) before larger value: subtract ${value}, total = ${result}`);
            } else {
                result += value;
                steps.push(`"${char}" (${value}): add ${value}, total = ${result}`);
            }

            prevValue = value;
        }

        steps.push(`Final result: ${result}`);
        return { result: result.toString(), steps };
    },

    // Parse Egyptian Hieroglyphics
    fromEgyptian(hieroglyphs) {
        const steps = [];
        steps.push(`Parsing Egyptian hieroglyphs: ${hieroglyphs}`);

        const values = {
            '𓏺': 1, '𓎆': 10, '𓍢': 100, '𓆼': 1000,
            '𓂭': 10000, '𓆐': 100000, '𓁨': 1000000
        };

        let result = 0;

        for (const char of hieroglyphs) {
            if (char === ' ') continue;
            const value = values[char];
            if (value) {
                result += value;
                steps.push(`Symbol "${char}" = ${value}, running total = ${result}`);
            }
        }

        steps.push(`Final result: ${result}`);
        return { result: result.toString(), steps };
    },

    // Parse Greek (Attic) Numerals
    fromGreek(greek) {
        const steps = [];
        steps.push(`Parsing Greek (Attic) numerals: ${greek}`);

        const values = {
            'Ι': 1, 'Π': 5, 'Δ': 10, '𐅃': 50,
            'Η': 100, '𐅄': 500, 'Χ': 1000, '𐅅': 5000, 'Μ': 10000
        };

        let result = 0;

        for (const char of greek) {
            const value = values[char];
            if (value) {
                result += value;
                steps.push(`Symbol "${char}" = ${value}, running total = ${result}`);
            }
        }

        steps.push(`Final result: ${result}`);
        return { result: result.toString(), steps };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Converter;
}
