import {
  ExamGradingResult,
  ExamPaper,
  TrueFalseStatement,
  UserExamAnswers,
} from '../types/exam';

export function createEmptyAnswers(exam: ExamPaper): UserExamAnswers {
  const part1: Record<number, number | null> = {};
  exam.part1.forEach((q) => {
    part1[q.number] = null;
  });

  const part2: Record<number, Record<'a' | 'b' | 'c' | 'd', boolean | null>> = {};
  exam.part2.forEach((q) => {
    part2[q.number] = { a: null, b: null, c: null, d: null };
  });

  const part3: Record<number, string> = {};
  exam.part3.forEach((q) => {
    part3[q.number] = '';
  });

  const part4: Record<number, Record<string, string>> = {};
  exam.part4.forEach((q) => {
    const blankMap: Record<string, string> = {};
    q.blanks.forEach((b) => {
      blankMap[b.id] = '';
    });
    part4[q.number] = blankMap;
  });

  return { part1, part2, part3, part4 };
}

/**
 * Normalizes a mathematical text answer for comparison:
 * - Trims whitespace and removes internal spaces
 * - Replaces Unicode minus '−' or '–' with '-'
 * - Replaces Vietnamese decimal comma ',' with '.' when between digits
 * - Lowercases text
 */
export function normalizeMathAnswer(input: string): string {
  if (!input) return '';
  let s = input.trim();
  s = s.replace(/[−–—]/g, '-');
  // Replace comma between digits (e.g., 36,9 -> 36.9)
  s = s.replace(/(\d),(\d)/g, '$1.$2');
  s = s.replace(/\s+/g, '');
  return s.toLowerCase();
}

export function isShortAnswerCorrect(
  userInput: string,
  expectedAnswer: number,
  tolerance = 0.05
): boolean {
  const normalized = normalizeMathAnswer(userInput);
  if (!normalized) return false;

  // Handle fraction input like -17/2 if user types fraction
  if (normalized.includes('/')) {
    const parts = normalized.split('/');
    if (parts.length === 2) {
      const num = Number(parts[0]);
      const den = Number(parts[1]);
      if (!Number.isNaN(num) && !Number.isNaN(den) && den !== 0) {
        return Math.abs(num / den - expectedAnswer) <= tolerance;
      }
    }
  }

  const parsed = Number(normalized);
  if (Number.isNaN(parsed)) return false;
  return Math.abs(parsed - expectedAnswer) <= tolerance;
}

export function isClozeBlankCorrect(
  userInput: string,
  acceptedAnswers: string[]
): boolean {
  const normUser = normalizeMathAnswer(userInput);
  if (!normUser) return false;

  for (const ans of acceptedAnswers) {
    const normAns = normalizeMathAnswer(ans);
    if (normUser === normAns) {
      return true;
    }
    // Also check numeric equivalence if both parse as finite numbers
    const userNum = Number(normUser);
    const ansNum = Number(normAns);
    if (
      !Number.isNaN(userNum) &&
      !Number.isNaN(ansNum) &&
      /^-?\d+(\.\d+)?$/.test(normUser) &&
      /^-?\d+(\.\d+)?$/.test(normAns)
    ) {
      if (Math.abs(userNum - ansNum) <= 0.11) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Standard MOET grading scale for 4-statement True/False questions:
 * - 1 correct: 0.10 pt
 * - 2 correct: 0.25 pt
 * - 3 correct: 0.50 pt
 * - 4 correct: 1.00 pt
 */
export function calculateTrueFalseQuestionScore(
  userSelections: Record<'a' | 'b' | 'c' | 'd', boolean | null> | undefined,
  statements: [TrueFalseStatement, TrueFalseStatement, TrueFalseStatement, TrueFalseStatement]
): {
  correctCount: number;
  score: number;
  statementResults: Record<'a' | 'b' | 'c' | 'd', boolean>;
} {
  let correctCount = 0;
  const statementResults: Record<'a' | 'b' | 'c' | 'd', boolean> = {
    a: false,
    b: false,
    c: false,
    d: false,
  };

  for (const stmt of statements) {
    const userVal = userSelections ? userSelections[stmt.id] : null;
    const isCorrect = userVal !== null && userVal === stmt.isTrue;
    statementResults[stmt.id] = isCorrect;
    if (isCorrect) {
      correctCount += 1;
    }
  }

  const scoreMap: Record<number, number> = {
    0: 0,
    1: 0.1,
    2: 0.25,
    3: 0.5,
    4: 1.0,
  };

  return {
    correctCount,
    score: scoreMap[correctCount] ?? 0,
    statementResults,
  };
}

export function gradeExam(
  exam: ExamPaper,
  answers: UserExamAnswers
): ExamGradingResult {
  let part1Score = 0;
  const part1Results: Record<number, { isCorrect: boolean; score: number }> = {};

  for (const q of exam.part1) {
    const selected = answers.part1[q.number];
    const isCorrect = selected !== null && selected === q.correctIndex;
    const score = isCorrect ? 0.25 : 0;
    part1Score += score;
    part1Results[q.number] = { isCorrect, score };
  }

  let part2Score = 0;
  const part2Results: ExamGradingResult['part2Results'] = {};

  for (const q of exam.part2) {
    const res = calculateTrueFalseQuestionScore(answers.part2[q.number], q.statements);
    part2Score += res.score;
    part2Results[q.number] = res;
  }

  let part3Score = 0;
  const part3Results: Record<number, { isCorrect: boolean; score: number }> = {};

  for (const q of exam.part3) {
    const raw = answers.part3[q.number] ?? '';
    const isCorrect = isShortAnswerCorrect(raw, q.expectedAnswer, q.tolerance ?? 0.05);
    const score = isCorrect ? 0.5 : 0;
    part3Score += score;
    part3Results[q.number] = { isCorrect, score };
  }

  let part4Score = 0;
  const part4Results: ExamGradingResult['part4Results'] = {};

  for (const q of exam.part4) {
    const userBlankMap = answers.part4[q.number] ?? {};
    const blankResults: Record<string, boolean> = {};
    let correctBlanks = 0;

    for (const blank of q.blanks) {
      const userVal = userBlankMap[blank.id] ?? '';
      const ok = isClozeBlankCorrect(userVal, blank.acceptedAnswers);
      blankResults[blank.id] = ok;
      if (ok) {
        correctBlanks += 1;
      }
    }

    const totalBlanks = q.blanks.length;
    const rawScore = totalBlanks > 0 ? (correctBlanks / totalBlanks) * q.points : 0;
    const score = Math.round(rawScore * 100) / 100;
    part4Score += score;
    part4Results[q.number] = {
      correctBlanks,
      totalBlanks,
      score,
      blankResults,
    };
  }

  part1Score = Math.round(part1Score * 100) / 100;
  part2Score = Math.round(part2Score * 100) / 100;
  part3Score = Math.round(part3Score * 100) / 100;
  part4Score = Math.round(part4Score * 100) / 100;
  const totalScore = Math.round((part1Score + part2Score + part3Score + part4Score) * 100) / 100;

  return {
    totalScore,
    part1Score,
    part2Score,
    part3Score,
    part4Score,
    part1Results,
    part2Results,
    part3Results,
    part4Results,
  };
}

export function isQuestionAnswered(
  questionNumber: number,
  answers: UserExamAnswers
): boolean {
  if (questionNumber >= 1 && questionNumber <= 12) {
    return answers.part1[questionNumber] !== null && answers.part1[questionNumber] !== undefined;
  }
  if (questionNumber === 13 || questionNumber === 14) {
    const st = answers.part2[questionNumber];
    if (!st) return false;
    return st.a !== null || st.b !== null || st.c !== null || st.d !== null;
  }
  if (questionNumber >= 15 && questionNumber <= 18) {
    return (answers.part3[questionNumber] ?? '').trim().length > 0;
  }
  if (questionNumber >= 19 && questionNumber <= 21) {
    const bl = answers.part4[questionNumber];
    if (!bl) return false;
    return Object.values(bl).some((v) => v.trim().length > 0);
  }
  return false;
}

export function calculateCompletionStats(
  exam: ExamPaper,
  answers: UserExamAnswers
): { answeredQuestions: number; totalQuestions: number; percentage: number } {
  const totalQuestions =
    exam.part1.length + exam.part2.length + exam.part3.length + exam.part4.length;
  let answeredQuestions = 0;
  for (let i = 1; i <= 21; i++) {
    if (isQuestionAnswered(i, answers)) {
      answeredQuestions += 1;
    }
  }
  const percentage =
    totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;
  return { answeredQuestions, totalQuestions, percentage };
}
