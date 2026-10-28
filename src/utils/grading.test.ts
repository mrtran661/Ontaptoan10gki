import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCompletionStats,
  calculateTrueFalseQuestionScore,
  createEmptyAnswers,
  gradeExam,
  isClozeBlankCorrect,
  isShortAnswerCorrect,
  normalizeMathAnswer,
} from './grading';
import {
  ORIGINAL_EXAM_TRAN_PHU,
  SIMILAR_EXAM_01,
  SIMILAR_EXAM_02,
  generateNewSimilarExam,
} from './examGenerator';

test('normalizeMathAnswer handles Vietnamese decimal commas and Unicode minus', () => {
  assert.equal(normalizeMathAnswer(' 61,4 '), '61.4');
  assert.equal(normalizeMathAnswer('−13'), '-13');
  assert.equal(normalizeMathAnswer(' [ 1 '), '[1');
});

test('isShortAnswerCorrect accepts exact integers, decimals with commas, and fractions', () => {
  assert.equal(isShortAnswerCorrect('129', 129), true);
  assert.equal(isShortAnswerCorrect('61,4', 61.4), true);
  assert.equal(isShortAnswerCorrect('61.42', 61.4, 0.05), true);
  assert.equal(isShortAnswerCorrect('-13/2', -6.5), true);
  assert.equal(isShortAnswerCorrect('100', 129), false);
});

test('isClozeBlankCorrect checks accepted answers and numeric tolerance', () => {
  assert.equal(isClozeBlankCorrect('[', ['[']), true);
  assert.equal(isClozeBlankCorrect('(', ['[']), false);
  assert.equal(isClozeBlankCorrect('71,0', ['71.0', '71,0', '71']), true);
  assert.equal(isClozeBlankCorrect('71', ['71.0', '71,0', '71']), true);
});

test('calculateTrueFalseQuestionScore follows MOET 0.1 / 0.25 / 0.5 / 1.0 scale', () => {
  const q13 = ORIGINAL_EXAM_TRAN_PHU.part2[0];
  // Statements a: true, b: true, c: false, d: false
  const zeroCorrect = calculateTrueFalseQuestionScore(
    { a: false, b: false, c: true, d: true },
    q13.statements
  );
  assert.equal(zeroCorrect.correctCount, 0);
  assert.equal(zeroCorrect.score, 0);

  const oneCorrect = calculateTrueFalseQuestionScore(
    { a: true, b: false, c: true, d: true },
    q13.statements
  );
  assert.equal(oneCorrect.correctCount, 1);
  assert.equal(oneCorrect.score, 0.1);

  const twoCorrect = calculateTrueFalseQuestionScore(
    { a: true, b: true, c: true, d: true },
    q13.statements
  );
  assert.equal(twoCorrect.correctCount, 2);
  assert.equal(twoCorrect.score, 0.25);

  const threeCorrect = calculateTrueFalseQuestionScore(
    { a: true, b: true, c: false, d: true },
    q13.statements
  );
  assert.equal(threeCorrect.correctCount, 3);
  assert.equal(threeCorrect.score, 0.5);

  const fourCorrect = calculateTrueFalseQuestionScore(
    { a: true, b: true, c: false, d: false },
    q13.statements
  );
  assert.equal(fourCorrect.correctCount, 4);
  assert.equal(fourCorrect.score, 1.0);
});

test('all preset and generated exams have complete 21-question structure and 10.0 max score', () => {
  const exams = [
    SIMILAR_EXAM_01,
    SIMILAR_EXAM_02,
    ORIGINAL_EXAM_TRAN_PHU,
    generateNewSimilarExam(1),
    generateNewSimilarExam(2),
  ];

  for (const exam of exams) {
    assert.equal(exam.part1.length, 12);
    assert.equal(exam.part2.length, 2);
    assert.equal(exam.part3.length, 4);
    assert.equal(exam.part4.length, 3);

    // Grade empty answers -> 0 points
    const empty = createEmptyAnswers(exam);
    const emptyGrade = gradeExam(exam, empty);
    assert.equal(emptyGrade.totalScore, 0);

    // Fill 100% correct answers -> 10.0 points
    const perfect = createEmptyAnswers(exam);
    exam.part1.forEach((q) => {
      perfect.part1[q.number] = q.correctIndex;
    });
    exam.part2.forEach((q) => {
      perfect.part2[q.number] = {
        a: q.statements[0].isTrue,
        b: q.statements[1].isTrue,
        c: q.statements[2].isTrue,
        d: q.statements[3].isTrue,
      };
    });
    exam.part3.forEach((q) => {
      perfect.part3[q.number] = String(q.expectedAnswer);
    });
    exam.part4.forEach((q) => {
      q.blanks.forEach((b) => {
        perfect.part4[q.number][b.id] = b.acceptedAnswers[0];
      });
    });

    const stats = calculateCompletionStats(exam, perfect);
    assert.equal(stats.answeredQuestions, 21);
    assert.equal(stats.percentage, 100);

    const perfectGrade = gradeExam(exam, perfect);
    assert.equal(perfectGrade.part1Score, 3.0);
    assert.equal(perfectGrade.part2Score, 2.0);
    assert.equal(perfectGrade.part3Score, 2.0);
    assert.equal(perfectGrade.part4Score, 3.0);
    assert.equal(perfectGrade.totalScore, 10.0);
  }
});
