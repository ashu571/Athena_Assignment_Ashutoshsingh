// ============================================
// PRACTICE MODULE
// Handles the practice zone interface and problem solving
// ============================================

const Practice = {
    currentDifficulty: 'beginner',
    currentProblem: null,
    userAnswers: {},

    // Initialize the practice zone
    init() {
        this.renderProblemsList();
        this.attachEventListeners();
    },

    // Render problems list based on difficulty
    renderProblemsList() {
        const problemsList = document.getElementById('problems-list');
        if (!problemsList) return;

        const currentProblems = problems[this.currentDifficulty] || [];

        if (currentProblems.length === 0) {
            problemsList.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary);">No problems available for this difficulty.</p>';
            return;
        }

        problemsList.innerHTML = currentProblems.map((problem, index) => `
            <div class="problem-card-preview" data-problem-id="${problem.id}">
                <span class="problem-number">Problem ${index + 1}</span>
                <h4 class="problem-preview-title">${problem.title}</h4>
                <p class="problem-type">${problem.type}</p>
            </div>
        `).join('');

        // Attach click handlers
        problemsList.querySelectorAll('.problem-card-preview').forEach(card => {
            card.addEventListener('click', () => {
                const problemId = card.dataset.problemId;
                this.showProblem(problemId);
            });
        });
    },

    // Show a specific problem
    showProblem(problemId) {
        // Find problem across all difficulties
        let problem = null;
        for (const difficulty in problems) {
            problem = problems[difficulty].find(p => p.id === problemId);
            if (problem) break;
        }

        if (!problem) return;

        this.currentProblem = problem;
        const problemView = document.getElementById('problem-view');
        const problemTitle = document.getElementById('problem-title');
        const problemContent = document.getElementById('problem-content');
        const problemsList = document.getElementById('problems-list');

        problemTitle.textContent = problem.title;
        problemContent.innerHTML = `
            ${problem.content}
            <div style="margin-top: var(--spacing-lg);">
                <label for="problem-answer" style="display: block; margin-bottom: var(--spacing-sm); color: var(--color-text-secondary); font-weight: 500;">Your Answer:</label>
                <input 
                    type="text" 
                    id="problem-answer" 
                    class="converter-input" 
                    placeholder="Type your answer here..."
                    style="margin-bottom: var(--spacing-md);"
                >
            </div>
        `;

        problemsList.classList.add('hidden');
        problemView.classList.remove('hidden');
        document.getElementById('problem-feedback').classList.add('hidden');
    },

    // Check user's answer
    checkAnswer() {
        if (!this.currentProblem) return;

        const answerInput = document.getElementById('problem-answer');
        const userAnswer = answerInput?.value.trim().toLowerCase();
        const correctAnswer = this.currentProblem.answer.toLowerCase();
        const feedback = document.getElementById('problem-feedback');

        if (!userAnswer) {
            feedback.innerHTML = '<p style="color: var(--color-text-secondary);">Please enter an answer first.</p>';
            feedback.classList.remove('hidden', 'correct', 'incorrect');
            return;
        }

        // Check if answer is correct (flexible matching)
        const isCorrect = this.compareAnswers(userAnswer, correctAnswer);

        if (isCorrect) {
            feedback.innerHTML = `
                <h4 style="color: #4ade80; margin-bottom: var(--spacing-sm);">✓ Correct!</h4>
                <p style="color: var(--color-text-secondary);">Excellent work! You've mastered this concept.</p>
            `;
            feedback.classList.remove('hidden', 'incorrect');
            feedback.classList.add('correct');
            this.userAnswers[this.currentProblem.id] = true;
        } else {
            feedback.innerHTML = `
                <h4 style="color: #f87171; margin-bottom: var(--spacing-sm);">✗ Not quite right</h4>
                <p style="color: var(--color-text-secondary);">Try again, or use the hint button for guidance.</p>
            `;
            feedback.classList.remove('hidden', 'correct');
            feedback.classList.add('incorrect');
            this.userAnswers[this.currentProblem.id] = false;
        }

        feedback.classList.remove('hidden');
    },

    // Compare answers with flexible matching
    compareAnswers(userAnswer, correctAnswer) {
        // Normalize both answers
        const normalize = (str) => str.replace(/[^a-z0-9]/g, '').toLowerCase();
        const normalizedUser = normalize(userAnswer);
        const normalizedCorrect = normalize(correctAnswer);

        // Exact match
        if (normalizedUser === normalizedCorrect) return true;

        // Check if correct answer contains multiple acceptable answers (separated by comma or "or")
        const acceptableAnswers = correctAnswer.split(/,|\bor\b/).map(a => normalize(a.trim()));
        return acceptableAnswers.some(acceptable => normalizedUser.includes(acceptable) || acceptable.includes(normalizedUser));
    },

    // Show hint
    showHint() {
        if (!this.currentProblem) return;

        const feedback = document.getElementById('problem-feedback');
        feedback.innerHTML = `
            <h4 style="color: var(--color-text-gold); margin-bottom: var(--spacing-sm);">💡 Hint</h4>
            <p style="color: var(--color-text-secondary);">${this.currentProblem.hint}</p>
        `;
        feedback.classList.remove('hidden', 'correct', 'incorrect');
    },

    // Show solution
    showSolution() {
        if (!this.currentProblem) return;

        const feedback = document.getElementById('problem-feedback');
        feedback.innerHTML = this.currentProblem.solution;
        feedback.classList.remove('hidden', 'correct', 'incorrect');
    },

    // Close problem view
    closeProblem() {
        const problemView = document.getElementById('problem-view');
        const problemsList = document.getElementById('problems-list');

        problemView.classList.add('hidden');
        problemsList.classList.remove('hidden');
        this.currentProblem = null;
    },

    // Change difficulty
    changeDifficulty(difficulty) {
        this.currentDifficulty = difficulty;
        this.renderProblemsList();

        // Update active button
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.difficulty === difficulty) {
                btn.classList.add('active');
            }
        });
    },

    // Attach event listeners
    attachEventListeners() {
        // Difficulty buttons
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const difficulty = btn.dataset.difficulty;
                this.changeDifficulty(difficulty);
            });
        });

        // Check answer button
        const checkBtn = document.getElementById('check-answer');
        if (checkBtn) {
            checkBtn.addEventListener('click', () => this.checkAnswer());
        }

        // Show hint button
        const hintBtn = document.getElementById('show-hint');
        if (hintBtn) {
            hintBtn.addEventListener('click', () => this.showHint());
        }

        // Show solution button
        const solutionBtn = document.getElementById('show-solution');
        if (solutionBtn) {
            solutionBtn.addEventListener('click', () => this.showSolution());
        }

        // Close problem button
        const closeBtn = document.getElementById('close-problem');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeProblem());
        }

        // Enter key to check answer
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.currentProblem) {
                const answerInput = document.getElementById('problem-answer');
                if (document.activeElement === answerInput) {
                    this.checkAnswer();
                }
            }
        });
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Practice;
}
