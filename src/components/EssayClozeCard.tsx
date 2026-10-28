import React, { useState } from 'react';
import { CheckCircle2, HelpCircle, XCircle } from 'lucide-react';
import { EssayClozeQuestion } from '../types/exam';
import {
  LinearProgrammingDiagram,
  NumberLineDiagram,
  SurveyingTowerDiagram,
} from './MathVisuals';

interface EssayClozeCardProps {
  question: EssayClozeQuestion;
  userBlanks: Record<string, string>;
  onChangeBlank: (blankId: string, value: string) => void;
  isSubmitted: boolean;
  gradingResult?: {
    correctBlanks: number;
    totalBlanks: number;
    score: number;
    blankResults: Record<string, boolean>;
  };
}

export const EssayClozeCard: React.FC<EssayClozeCardProps> = ({
  question,
  userBlanks,
  onChangeBlank,
  isSubmitted,
  gradingResult,
}) => {
  const [showStepHint, setShowStepHint] = useState(false);

  const blankLookup = React.useMemo(() => {
    const map = new Map<string, (typeof question.blanks)[number]>();
    question.blanks.forEach((b) => map.set(b.id, b));
    return map;
  }, [question.blanks]);

  const handleFillFirstBlankHint = () => {
    const firstEmpty = question.blanks.find(
      (b) => !(userBlanks[b.id] ?? '').trim()
    );
    if (firstEmpty) {
      onChangeBlank(firstEmpty.id, firstEmpty.displayAnswer);
    }
    setShowStepHint(true);
  };

  /**
   * Parses a step template containing {{b1}}, {{b2}} tokens and renders inline
   * interactive inputs or selects.
   */
  const renderStepTemplate = (template: string, stepIdx: number) => {
    const lines = template.split('\n');
    return lines.map((line, lineIdx) => {
      const parts = line.split(/(\{\{b\d+\}\})/g);
      return (
        <div
          key={`${stepIdx}-${lineIdx}`}
          className="leading-8 text-slate-800 text-[15px] my-1 flex flex-wrap items-center gap-x-1.5 gap-y-2"
        >
          {parts.map((part, partIdx) => {
            const match = part.match(/^\{\{(b\d+)\}\}$/);
            if (!match) {
              return <span key={partIdx}>{part}</span>;
            }
            const blankId = match[1];
            const blankDef = blankLookup.get(blankId);
            if (!blankDef) return null;

            const currentVal = userBlanks[blankId] ?? '';
            const isBlankCorrect = gradingResult?.blankResults[blankId] ?? false;

            const inputKey = `${question.id}-${blankId}-${stepIdx}-${lineIdx}-${partIdx}`;

            if (blankDef.inputType === 'select' && blankDef.options) {
              return (
                <span key={inputKey} className="inline-flex items-center gap-1">
                  <select
                    aria-label={`${blankDef.label} (Bước ${stepIdx + 1})`}
                    disabled={isSubmitted}
                    value={currentVal}
                    onChange={(e) => onChangeBlank(blankId, e.target.value)}
                    className={`h-8 px-2 text-sm font-mono-tabular font-semibold rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-sky-600 ${
                      isSubmitted
                        ? isBlankCorrect
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                          : 'bg-red-50 border-red-500 text-red-900'
                        : currentVal
                        ? 'bg-sky-50/70 border-sky-600 text-slate-900'
                        : 'bg-white border-slate-300 text-slate-800 hover:border-slate-400'
                    }`}
                  >
                    <option value="">Chọn...</option>
                    {blankDef.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {isSubmitted && !isBlankCorrect && (
                    <span className="text-xs font-mono-tabular font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5">
                      Đáp án: {blankDef.displayAnswer}
                    </span>
                  )}
                </span>
              );
            }

            return (
              <span key={inputKey} className="inline-flex items-center gap-1">
                <input
                  type="text"
                  aria-label={`${blankDef.label} (Bước ${stepIdx + 1})`}
                  disabled={isSubmitted}
                  value={currentVal}
                  placeholder="..."
                  onChange={(e) => onChangeBlank(blankId, e.target.value)}
                  className={`h-8 w-20 px-2 text-center text-sm font-mono-tabular font-semibold rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-sky-600 ${
                    isSubmitted
                      ? isBlankCorrect
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                        : 'bg-red-50 border-red-500 text-red-900'
                      : currentVal.trim()
                      ? 'bg-sky-50/70 border-sky-600 text-slate-900'
                      : 'bg-white border-slate-300 text-slate-900 hover:border-slate-400'
                  }`}
                />
                {isSubmitted && (
                  isBlankCorrect ? (
                    <CheckCircle2
                      className="w-4 h-4 text-emerald-600 shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-mono-tabular font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded px-1.5 py-0.5">
                      <XCircle
                        className="w-3.5 h-3.5 text-red-600 shrink-0"
                        aria-hidden="true"
                      />
                      Đúng: {blankDef.displayAnswer}
                    </span>
                  )
                )}
              </span>
            );
          })}
        </div>
      );
    });
  };

  return (
    <article
      id={`question-${question.number}`}
      className="bg-white border border-slate-200 rounded-xl p-6 transition-colors"
    >
      {/* Question Header & Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="text-sm font-bold text-slate-900">
            Câu {question.number} (1,0 điểm)
          </span>
          <span aria-hidden="true">·</span>
          <span>{question.topic}</span>
          <span aria-hidden="true">·</span>
          <span>Mức độ: {question.level}</span>
        </div>

        <div className="flex items-center gap-3">
          {!isSubmitted && (
            <button
              type="button"
              onClick={handleFillFirstBlankHint}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-700 hover:text-sky-900 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
              Gợi ý 1 ô khuyết
            </button>
          )}
          {isSubmitted && gradingResult && (
            <div className="flex items-center gap-1.5 text-xs font-mono-tabular font-semibold">
              <span
                className={
                  gradingResult.correctBlanks === gradingResult.totalBlanks
                    ? 'text-emerald-700'
                    : gradingResult.correctBlanks > 0
                    ? 'text-amber-700'
                    : 'text-red-700'
                }
              >
                Đúng {gradingResult.correctBlanks}/{gradingResult.totalBlanks} vị trí khuyết ·{' '}
                {gradingResult.score.toFixed(2).replace('.', ',')} / 1,00 điểm
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Question Prompt */}
      <p className="mt-4 text-[15px] leading-relaxed text-slate-900 font-medium">
        {question.prompt}
      </p>

      {/* Visual Diagram */}
      {question.diagram.type === 'number_line' && (
        <NumberLineDiagram
          config={question.diagram}
          showResult={isSubmitted || showStepHint}
        />
      )}
      {question.diagram.type === 'linear_programming' && (
        <LinearProgrammingDiagram config={question.diagram} />
      )}
      {question.diagram.type === 'surveying_tower' && (
        <SurveyingTowerDiagram config={question.diagram} />
      )}

      {/* Step-by-Step Interactive Cloze Solution */}
      <div className="mt-4 space-y-4">
        <div className="text-xs font-semibold text-slate-600">
          Hoàn thành các bước trình bày lời giải tự luận (điền số hoặc chọn kí hiệu vào ô trống):
        </div>

        {question.steps.map((step, sIdx) => (
          <div
            key={step.stepNumber}
            className="bg-slate-50/70 border border-slate-200/90 rounded-lg p-4"
          >
            <h4 className="text-sm font-semibold text-slate-900 mb-1.5">
              {step.title}
            </h4>
            <div>{renderStepTemplate(step.template, sIdx)}</div>
          </div>
        ))}
      </div>

      {/* Detailed Post-Submission Walkthrough */}
      {isSubmitted && (
        <div className="mt-5 pt-4 border-t border-slate-200 bg-slate-50/60 rounded-lg p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>Hướng dẫn giải hoàn chỉnh & Đáp án chi tiết Câu {question.number}</span>
          </div>
          <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
            {question.fullExplanation}
          </p>
        </div>
      )}
    </article>
  );
};
