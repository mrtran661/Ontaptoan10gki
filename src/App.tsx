import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  RefreshCw,
  RotateCcw,
  Send,
  TableProperties,
  XCircle,
} from 'lucide-react';
import { ExamGradingResult, ExamPaper, UserExamAnswers } from './types/exam';
import {
  PRESET_EXAMS,
  SIMILAR_EXAM_01,
  generateNewSimilarExam,
} from './utils/examGenerator';
import {
  calculateCompletionStats,
  createEmptyAnswers,
  gradeExam,
  isQuestionAnswered,
} from './utils/grading';
import { CoordinateRegionDiagram } from './components/MathVisuals';
import { EssayClozeCard } from './components/EssayClozeCard';
import { MatrixModal } from './components/MatrixModal';

type SectionFilter = 'all' | 'part1' | 'part2' | 'part3' | 'part4';

export default function App() {
  const [examList, setExamList] = useState<ExamPaper[]>(PRESET_EXAMS);
  const [activeExamId, setActiveExamId] = useState<string>(SIMILAR_EXAM_01.id);
  const [generationCount, setGenerationCount] = useState<number>(1);

  const activeExam = useMemo(
    () => examList.find((e) => e.id === activeExamId) ?? examList[0],
    [examList, activeExamId]
  );

  const [answers, setAnswers] = useState<UserExamAnswers>(() =>
    createEmptyAnswers(SIMILAR_EXAM_01)
  );
  const [gradingResult, setGradingResult] = useState<ExamGradingResult | null>(
    null
  );
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>('all');
  const [isMatrixOpen, setIsMatrixOpen] = useState<boolean>(false);

  // Study timer in seconds (90 minutes = 5400s)
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);

  const isSubmitted = gradingResult !== null;

  useEffect(() => {
    if (isSubmitted || isTimerPaused) return;
    const interval = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isSubmitted, isTimerPaused]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const completionStats = useMemo(
    () => calculateCompletionStats(activeExam, answers),
    [activeExam, answers]
  );

  const handleSelectExam = (exam: ExamPaper) => {
    setActiveExamId(exam.id);
    setAnswers(createEmptyAnswers(exam));
    setGradingResult(null);
    setElapsedSeconds(0);
    setSectionFilter('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateSimilarExam = () => {
    const newExam = generateNewSimilarExam(generationCount);
    setGenerationCount((c) => c + 1);
    setExamList((prev) => [newExam, ...prev]);
    setActiveExamId(newExam.id);
    setAnswers(createEmptyAnswers(newExam));
    setGradingResult(null);
    setElapsedSeconds(0);
    setSectionFilter('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetCurrentExam = () => {
    setAnswers(createEmptyAnswers(activeExam));
    setGradingResult(null);
    setElapsedSeconds(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitExam = () => {
    const result = gradeExam(activeExam, answers);
    setGradingResult(result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPart1Option = (questionNumber: number, optionIdx: number) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      part1: {
        ...prev.part1,
        [questionNumber]: optionIdx,
      },
    }));
  };

  const handleSelectPart2Statement = (
    questionNumber: number,
    stmtId: 'a' | 'b' | 'c' | 'd',
    value: boolean
  ) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      part2: {
        ...prev.part2,
        [questionNumber]: {
          ...prev.part2[questionNumber],
          [stmtId]: value,
        },
      },
    }));
  };

  const handleChangePart3Answer = (questionNumber: number, value: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      part3: {
        ...prev.part3,
        [questionNumber]: value,
      },
    }));
  };

  const handleChangePart4Blank = (
    questionNumber: number,
    blankId: string,
    value: string
  ) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      part4: {
        ...prev.part4,
        [questionNumber]: {
          ...prev.part4[questionNumber],
          [blankId]: value,
        },
      },
    }));
  };

  const scrollToQuestion = (qNumber: number) => {
    if (sectionFilter !== 'all') {
      setSectionFilter('all');
      setTimeout(() => {
        const el = document.getElementById(`question-${qNumber}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 60);
      return;
    }
    const el = document.getElementById(`question-${qNumber}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const optionLetters = ['A', 'B', 'C', 'D'] as const;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Top Navigation Bar following strict 3-zone contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-3.5">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setSectionFilter('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            Luyện Đề Toán 10
          </a>

          {/* Zone 2: 5 concise single-line text links */}
          <nav
            aria-label="Điều hướng phần thi"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            <a
              href="#section-part1"
              onClick={(e) => {
                e.preventDefault();
                setSectionFilter('all');
                document
                  .getElementById('section-part1')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Phần I: 4 lựa chọn
            </a>
            <a
              href="#section-part2"
              onClick={(e) => {
                e.preventDefault();
                setSectionFilter('all');
                document
                  .getElementById('section-part2')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Phần II: Đúng/Sai
            </a>
            <a
              href="#section-part3"
              onClick={(e) => {
                e.preventDefault();
                setSectionFilter('all');
                document
                  .getElementById('section-part3')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Phần III: Trả lời ngắn
            </a>
            <a
              href="#section-part4"
              onClick={(e) => {
                e.preventDefault();
                setSectionFilter('all');
                document
                  .getElementById('section-part4')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Phần IV: Tự luận
            </a>
            <a
              href="#ma-tran"
              onClick={(e) => {
                e.preventDefault();
                setIsMatrixOpen(true);
              }}
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Ma trận đề
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleGenerateSimilarExam}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              Tạo đề tương tự mới
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main id="top" className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 py-6">
        {/* Exam Selector & Toolbar */}
        <section
          aria-label="Chọn bộ đề và bộ lọc"
          className="bg-white border border-slate-200 rounded-xl p-5 mb-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>{activeExam.schoolHeader}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular font-semibold text-slate-700">
                  {activeExam.code}
                </span>
                <span aria-hidden="true">·</span>
                <span>Thời gian: {activeExam.durationMinutes} phút</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {activeExam.title}
              </h1>
              <p className="text-sm text-slate-600 mt-0.5">
                {activeExam.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setIsMatrixOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <TableProperties className="w-3.5 h-3.5" aria-hidden="true" />
                Ma trận & Đề gốc PDF
              </button>

              <button
                type="button"
                onClick={handleResetCurrentExam}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Làm lại đề này
              </button>
            </div>
          </div>

          {/* Preset Exam Switcher + Section Filter */}
          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500 mr-1">
                Chọn đề luyện tập:
              </span>
              {examList.map((examItem) => {
                const isActive = examItem.id === activeExam.id;
                return (
                  <button
                    key={examItem.id}
                    type="button"
                    onClick={() => handleSelectExam(examItem)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {examItem.isOriginalReference
                      ? 'Đề gốc Trần Phú (Tham khảo)'
                      : examItem.code}
                  </button>
                );
              })}
            </div>

            {/* Interactive Filter Tabs */}
            <div
              role="group"
              aria-label="Lọc theo phần thi"
              className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg"
            >
              {[
                { id: 'all', label: 'Tất cả (21 câu)' },
                { id: 'part1', label: 'Phần I (12)' },
                { id: 'part2', label: 'Phần II (2)' },
                { id: 'part3', label: 'Phần III (4)' },
                { id: 'part4', label: 'Phần IV: Tự luận (3)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSectionFilter(tab.id as SectionFilter)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    sectionFilter === tab.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grading Result Banner (Displayed after submission) */}
        {isSubmitted && gradingResult && (
          <section
            aria-label="Kết quả chấm điểm"
            className="bg-white border border-emerald-300 rounded-xl p-6 mb-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>ĐÃ NỘP BÀI VÀ CHẤM ĐIỂM TỰ ĐỘNG</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Tổng điểm bài làm:{' '}
                  <span className="font-mono-tabular text-sky-700">
                    {gradingResult.totalScore.toFixed(2).replace('.', ',')} / 10,00 điểm
                  </span>
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Hướng dẫn giải chi tiết và đáp án từng bước đã được hiển thị ngay bên dưới mỗi câu hỏi.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5">
                  <div className="text-xs text-slate-500">Phần I (12 câu)</div>
                  <div className="text-base font-bold font-mono-tabular text-slate-900 mt-0.5">
                    {gradingResult.part1Score.toFixed(2).replace('.', ',')} / 3,00
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5">
                  <div className="text-xs text-slate-500">Phần II (Đúng/Sai)</div>
                  <div className="text-base font-bold font-mono-tabular text-slate-900 mt-0.5">
                    {gradingResult.part2Score.toFixed(2).replace('.', ',')} / 2,00
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5">
                  <div className="text-xs text-slate-500">Phần III (Ngắn)</div>
                  <div className="text-base font-bold font-mono-tabular text-slate-900 mt-0.5">
                    {gradingResult.part3Score.toFixed(2).replace('.', ',')} / 2,00
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5">
                  <div className="text-xs text-slate-500">Phần IV (Tự luận)</div>
                  <div className="text-base font-bold font-mono-tabular text-slate-900 mt-0.5">
                    {gradingResult.part4Score.toFixed(2).replace('.', ',')} / 3,00
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleGenerateSimilarExam}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                Tạo đề tương tự mới để luyện tập tiếp
              </button>
              <button
                type="button"
                onClick={handleResetCurrentExam}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Làm lại đề này
              </button>
            </div>
          </section>
        )}

        {/* Two-Zone Layout: Left Exam Stage + Right Control & Navigation Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Zone: Exam Questions (8 cols on lg, 9 cols on xl) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8">
            {/* PHẦN I */}
            {(sectionFilter === 'all' || sectionFilter === 'part1') && (
              <section id="section-part1" className="space-y-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn (3,0 điểm)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Thí sinh trả lời từ câu 1 đến câu 12. Mỗi câu hỏi thí sinh chỉ chọn một phương án (0,25 điểm / câu).
                  </p>
                </div>

                <div className="space-y-4">
                  {activeExam.part1.map((q) => {
                    const selectedIdx = answers.part1[q.number];
                    const qResult = gradingResult?.part1Results[q.number];

                    return (
                      <article
                        key={q.id}
                        id={`question-${q.number}`}
                        className="bg-white border border-slate-200 rounded-xl p-5 transition-colors"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            <span className="text-sm font-bold text-slate-900">
                              Câu {q.number}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{q.topic}</span>
                            <span aria-hidden="true">·</span>
                            <span>{q.level}</span>
                          </div>

                          {isSubmitted && qResult && (
                            <span
                              className={`inline-flex items-center gap-1 text-xs font-mono-tabular font-semibold ${
                                qResult.isCorrect
                                  ? 'text-emerald-700'
                                  : 'text-red-700'
                              }`}
                            >
                              {qResult.isCorrect ? (
                                <>
                                  <CheckCircle2
                                    className="w-4 h-4 text-emerald-600"
                                    aria-hidden="true"
                                  />
                                  Đúng (+0,25 đ)
                                </>
                              ) : (
                                <>
                                  <XCircle
                                    className="w-4 h-4 text-red-600"
                                    aria-hidden="true"
                                  />
                                  Sai (0,00 đ) · Đáp án đúng:{' '}
                                  {optionLetters[q.correctIndex]}
                                </>
                              )}
                            </span>
                          )}
                        </div>

                        <p className="mt-3 text-[15px] leading-relaxed text-slate-900 font-medium">
                          {q.prompt}
                        </p>

                        <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {q.options.map((optText, idx) => {
                            const isSelected = selectedIdx === idx;
                            const isCorrectOption = q.correctIndex === idx;

                            let btnStyle =
                              'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300';
                            if (!isSubmitted && isSelected) {
                              btnStyle =
                                'bg-sky-50/80 border-sky-600 text-slate-900 font-semibold';
                            } else if (isSubmitted) {
                              if (isCorrectOption) {
                                btnStyle =
                                  'bg-emerald-50 border-emerald-600 text-emerald-950 font-semibold';
                              } else if (isSelected && !isCorrectOption) {
                                btnStyle =
                                  'bg-red-50 border-red-500 text-red-900';
                              } else {
                                btnStyle =
                                  'bg-slate-50/50 border-slate-200 text-slate-500';
                              }
                            }

                            return (
                              <button
                                key={idx}
                                type="button"
                                disabled={isSubmitted}
                                onClick={() =>
                                  handleSelectPart1Option(q.number, idx)
                                }
                                className={`flex items-start gap-3 p-3 rounded-lg border text-left text-sm transition-colors cursor-pointer ${btnStyle}`}
                              >
                                <span
                                  className={`w-6 h-6 rounded flex items-center justify-center text-xs font-mono-tabular font-bold shrink-0 ${
                                    !isSubmitted && isSelected
                                      ? 'bg-sky-700 text-white'
                                      : isSubmitted && isCorrectOption
                                      ? 'bg-emerald-600 text-white'
                                      : isSubmitted &&
                                        isSelected &&
                                        !isCorrectOption
                                      ? 'bg-red-600 text-white'
                                      : 'bg-slate-100 text-slate-700'
                                  }`}
                                >
                                  {optionLetters[idx]}
                                </span>
                                <span className="leading-snug pt-0.5">
                                  {optText}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {isSubmitted && (
                          <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/70 rounded-lg p-3.5 text-sm text-slate-700">
                            <div className="text-xs font-semibold text-slate-900 mb-1">
                              Hướng dẫn giải Câu {q.number} (Đáp án{' '}
                              {optionLetters[q.correctIndex]}):
                            </div>
                            <p className="leading-relaxed">{q.explanation}</p>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            {/* PHẦN II */}
            {(sectionFilter === 'all' || sectionFilter === 'part2') && (
              <section id="section-part2" className="space-y-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    PHẦN II. Câu trắc nghiệm đúng sai (2,0 điểm)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Thí sinh trả lời Câu 13 và Câu 14. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn Đúng hoặc Sai (Đúng 1 ý: 0,1đ · 2 ý: 0,25đ · 3 ý: 0,5đ · 4 ý: 1,0đ).
                  </p>
                </div>

                <div className="space-y-4">
                  {activeExam.part2.map((q) => {
                    const userStmts = answers.part2[q.number] ?? {
                      a: null,
                      b: null,
                      c: null,
                      d: null,
                    };
                    const qResult = gradingResult?.part2Results[q.number];

                    return (
                      <article
                        key={q.id}
                        id={`question-${q.number}`}
                        className="bg-white border border-slate-200 rounded-xl p-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            <span className="text-sm font-bold text-slate-900">
                              Câu {q.number} (1,0 điểm)
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{q.topic}</span>
                            <span aria-hidden="true">·</span>
                            <span>{q.level}</span>
                          </div>

                          {isSubmitted && qResult && (
                            <span className="text-xs font-mono-tabular font-semibold text-slate-800">
                              Đúng {qResult.correctCount}/4 ý ·{' '}
                              {qResult.score.toFixed(2).replace('.', ',')} / 1,00 điểm
                            </span>
                          )}
                        </div>

                        <p className="mt-3 text-[15px] leading-relaxed text-slate-900 font-medium">
                          {q.prompt}
                        </p>

                        {q.diagram && (
                          <CoordinateRegionDiagram config={q.diagram} />
                        )}

                        <div className="mt-4 border border-slate-200 rounded-lg divide-y divide-slate-200 overflow-hidden">
                          {q.statements.map((stmt) => {
                            const selectedVal = userStmts[stmt.id];
                            const isStmtCorrect =
                              qResult?.statementResults[stmt.id] ?? false;

                            return (
                              <div key={stmt.id} className="p-3.5 bg-white">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                  <div className="text-sm text-slate-900 leading-relaxed">
                                    <span className="font-bold mr-1.5">
                                      {stmt.label}
                                    </span>
                                    <span>{stmt.text}</span>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0">
                                    <button
                                      type="button"
                                      disabled={isSubmitted}
                                      onClick={() =>
                                        handleSelectPart2Statement(
                                          q.number,
                                          stmt.id,
                                          true
                                        )
                                      }
                                      className={`px-3.5 py-1.5 text-xs font-semibold rounded border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                                        selectedVal === true
                                          ? 'bg-sky-700 text-white border-sky-700'
                                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                                      }`}
                                    >
                                      Đúng
                                    </button>
                                    <button
                                      type="button"
                                      disabled={isSubmitted}
                                      onClick={() =>
                                        handleSelectPart2Statement(
                                          q.number,
                                          stmt.id,
                                          false
                                        )
                                      }
                                      className={`px-3.5 py-1.5 text-xs font-semibold rounded border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                                        selectedVal === false
                                          ? 'bg-sky-700 text-white border-sky-700'
                                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                                      }`}
                                    >
                                      Sai
                                    </button>
                                  </div>
                                </div>

                                {isSubmitted && (
                                  <div
                                    className={`mt-2.5 text-xs rounded p-2.5 flex items-start gap-2 ${
                                      isStmtCorrect
                                        ? 'bg-emerald-50 text-emerald-900'
                                        : 'bg-red-50 text-red-900'
                                    }`}
                                  >
                                    {isStmtCorrect ? (
                                      <CheckCircle2
                                        className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <XCircle
                                        className="w-4 h-4 text-red-600 shrink-0 mt-0.5"
                                        aria-hidden="true"
                                      />
                                    )}
                                    <div>
                                      <span className="font-semibold">
                                        Đáp án chuẩn:{' '}
                                        {stmt.isTrue ? 'Đúng' : 'Sai'}.{' '}
                                      </span>
                                      <span>{stmt.explanation}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            {/* PHẦN III */}
            {(sectionFilter === 'all' || sectionFilter === 'part3') && (
              <section id="section-part3" className="space-y-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    PHẦN III. Câu trắc nghiệm trả lời ngắn (2,0 điểm)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Thí sinh trả lời từ câu 15 đến câu 18 (0,50 điểm / câu). Nhập kết quả số vào ô trả lời.
                  </p>
                </div>

                <div className="space-y-4">
                  {activeExam.part3.map((q) => {
                    const userVal = answers.part3[q.number] ?? '';
                    const qResult = gradingResult?.part3Results[q.number];

                    return (
                      <article
                        key={q.id}
                        id={`question-${q.number}`}
                        className="bg-white border border-slate-200 rounded-xl p-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            <span className="text-sm font-bold text-slate-900">
                              Câu {q.number} (0,5 điểm)
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{q.topic}</span>
                            <span aria-hidden="true">·</span>
                            <span>{q.level}</span>
                          </div>

                          {isSubmitted && qResult && (
                            <span
                              className={`inline-flex items-center gap-1 text-xs font-mono-tabular font-semibold ${
                                qResult.isCorrect
                                  ? 'text-emerald-700'
                                  : 'text-red-700'
                              }`}
                            >
                              {qResult.isCorrect ? (
                                <>
                                  <CheckCircle2
                                    className="w-4 h-4 text-emerald-600"
                                    aria-hidden="true"
                                  />
                                  Đúng (+0,50 đ)
                                </>
                              ) : (
                                <>
                                  <XCircle
                                    className="w-4 h-4 text-red-600"
                                    aria-hidden="true"
                                  />
                                  Sai (0,00 đ) · Đáp số đúng: {q.expectedAnswer}
                                </>
                              )}
                            </span>
                          )}
                        </div>

                        <p className="mt-3 text-[15px] leading-relaxed text-slate-900 font-medium">
                          {q.prompt}
                        </p>

                        <div className="mt-3.5 flex flex-wrap items-center gap-3">
                          <label
                            htmlFor={`short-input-${q.number}`}
                            className="text-xs font-semibold text-slate-700"
                          >
                            Đáp số của bạn:
                          </label>
                          <input
                            id={`short-input-${q.number}`}
                            type="text"
                            disabled={isSubmitted}
                            value={userVal}
                            onChange={(e) =>
                              handleChangePart3Answer(q.number, e.target.value)
                            }
                            placeholder={q.answerFormatHint}
                            className={`h-9 w-56 px-3 text-sm font-mono-tabular font-semibold rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-sky-600 ${
                              isSubmitted
                                ? qResult?.isCorrect
                                  ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                                  : 'bg-red-50 border-red-500 text-red-900'
                                : 'bg-white border-slate-300 text-slate-900'
                            }`}
                          />
                        </div>

                        {isSubmitted && (
                          <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/70 rounded-lg p-3.5 text-sm text-slate-700">
                            <div className="text-xs font-semibold text-slate-900 mb-1">
                              Hướng dẫn giải Câu {q.number} (Đáp số:{' '}
                              {q.expectedAnswer}):
                            </div>
                            <p className="whitespace-pre-line leading-relaxed">
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            {/* PHẦN IV */}
            {(sectionFilter === 'all' || sectionFilter === 'part4') && (
              <section id="section-part4" className="space-y-4">
                <div className="bg-white border border-slate-200 rounded-xl p-5">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    PHẦN IV. Tự luận - Điền khuyết hoàn thành các bước giải (3,0 điểm)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Thí sinh hoàn thành các bước trình bày lời giải từ câu 19 đến câu 21 (1,0 điểm / câu) bằng cách điền số hoặc chọn kí hiệu thích hợp vào các vị trí khuyết trong từng bước giải.
                  </p>
                </div>

                <div className="space-y-5">
                  {activeExam.part4.map((q) => (
                    <EssayClozeCard
                      key={q.id}
                      question={q}
                      userBlanks={answers.part4[q.number] ?? {}}
                      onChangeBlank={(blankId, val) =>
                        handleChangePart4Blank(q.number, blankId, val)
                      }
                      isSubmitted={isSubmitted}
                      gradingResult={gradingResult?.part4Results[q.number]}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Zone: Control & Question Navigation Deck */}
          <aside
            aria-label="Bảng điều khiển bài thi"
            className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-20 space-y-4"
          >
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              {/* Timer & Progress */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" aria-hidden="true" />
                  <span className="text-xs font-medium text-slate-600">
                    Thời gian làm:
                  </span>
                  <span className="text-sm font-mono-tabular font-bold text-slate-900">
                    {formatTime(elapsedSeconds)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTimerPaused((p) => !p)}
                  className="text-xs font-medium text-sky-700 hover:underline cursor-pointer"
                >
                  {isTimerPaused ? 'Tiếp tục' : 'Tạm dừng'}
                </button>
              </div>

              {/* Completion Progress */}
              <div className="mt-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-600">
                    Tiến độ hoàn thành
                  </span>
                  <span className="font-mono-tabular font-semibold text-slate-900">
                    {completionStats.answeredQuestions} /{' '}
                    {completionStats.totalQuestions} câu ({completionStats.percentage}%)
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-600 transition-all duration-200"
                    style={{ width: `${completionStats.percentage}%` }}
                  />
                </div>
              </div>

              {/* 21-Question Grid Navigator */}
              <div className="mt-4">
                <div className="text-xs font-semibold text-slate-700 mb-2">
                  Danh sách 21 câu hỏi:
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {Array.from({ length: 21 }, (_, idx) => idx + 1).map(
                    (qNum) => {
                      const answered = isQuestionAnswered(qNum, answers);
                      let statusClass =
                        'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';

                      if (!isSubmitted && answered) {
                        statusClass =
                          'bg-sky-600 text-white border-sky-600 font-semibold';
                      } else if (isSubmitted && gradingResult) {
                        let isFullScore = false;
                        let isPartial = false;
                        if (qNum <= 12) {
                          isFullScore =
                            gradingResult.part1Results[qNum]?.isCorrect ?? false;
                        } else if (qNum <= 14) {
                          const c =
                            gradingResult.part2Results[qNum]?.correctCount ?? 0;
                          isFullScore = c === 4;
                          isPartial = c > 0 && c < 4;
                        } else if (qNum <= 18) {
                          isFullScore =
                            gradingResult.part3Results[qNum]?.isCorrect ?? false;
                        } else {
                          const r = gradingResult.part4Results[qNum];
                          isFullScore =
                            r !== undefined && r.correctBlanks === r.totalBlanks;
                          isPartial =
                            r !== undefined &&
                            r.correctBlanks > 0 &&
                            r.correctBlanks < r.totalBlanks;
                        }

                        if (isFullScore) {
                          statusClass =
                            'bg-emerald-600 text-white border-emerald-600 font-semibold';
                        } else if (isPartial) {
                          statusClass =
                            'bg-amber-500 text-white border-amber-500 font-semibold';
                        } else {
                          statusClass =
                            'bg-red-600 text-white border-red-600 font-semibold';
                        }
                      }

                      return (
                        <button
                          key={qNum}
                          type="button"
                          onClick={() => scrollToQuestion(qNum)}
                          aria-label={`Đi tới Câu ${qNum}`}
                          className={`h-8 rounded border text-xs font-mono-tabular transition-colors cursor-pointer ${statusClass}`}
                        >
                          {qNum}
                        </button>
                      );
                    }
                  )}
                </div>

                {/* Legend */}
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                  {!isSubmitted ? (
                    <>
                      <span>■ Xanh: Đã làm</span>
                      <span>·</span>
                      <span>□ Xám: Chưa làm</span>
                    </>
                  ) : (
                    <>
                      <span className="text-emerald-700 font-medium">
                        ■ Xanh lá: Đúng trọn vẹn
                      </span>
                      <span>·</span>
                      <span className="text-amber-700 font-medium">
                        ■ Vàng: Đúng một phần
                      </span>
                      <span>·</span>
                      <span className="text-red-700 font-medium">
                        ■ Đỏ: Chưa đúng
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Submit / Generate Similar Actions */}
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5">
                {!isSubmitted ? (
                  <button
                    type="button"
                    onClick={handleSubmitExam}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    Nộp bài & Chấm điểm
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleGenerateSimilarExam}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <RefreshCw className="w-4 h-4" aria-hidden="true" />
                    Tạo đề tương tự mới
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleResetCurrentExam}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  Làm lại đề hiện tại
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Quiet Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-5 px-6">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>
            Hệ thống Ôn tập Giữa Học kì 1 Toán 10 · Cấu trúc 4 phần (Trắc nghiệm, Đúng/Sai, Trả lời ngắn, Tự luận điền khuyết)
          </span>
          <button
            type="button"
            onClick={() => setIsMatrixOpen(true)}
            className="text-sky-700 hover:underline font-medium cursor-pointer"
          >
            Xem Ma trận đặc tả & Đề gốc PDF
          </button>
        </div>
      </footer>

      {/* Specification Matrix & Original PDF Modal */}
      <MatrixModal
        isOpen={isMatrixOpen}
        onClose={() => setIsMatrixOpen(false)}
        exam={activeExam}
      />
    </div>
  );
}
