import React, { useState } from 'react';
import { X, FileText, Table } from 'lucide-react';
import { ExamPaper } from '../types/exam';

interface MatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam: ExamPaper;
}

export const MatrixModal: React.FC<MatrixModalProps> = ({
  isOpen,
  onClose,
  exam,
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'pdf'>('matrix');

  if (!isOpen) return null;

  const allRows = [
    ...exam.part1.map((q) => ({
      number: q.number,
      part: 'Phần I (Trắc nghiệm 4 lựa chọn)',
      points: '0,25 đ',
      topic: q.topic,
      level: q.level,
      originalRef: q.originalRef,
    })),
    ...exam.part2.map((q) => ({
      number: q.number,
      part: 'Phần II (Trắc nghiệm Đúng/Sai)',
      points: '1,00 đ',
      topic: q.topic,
      level: q.level,
      originalRef: q.originalRef,
    })),
    ...exam.part3.map((q) => ({
      number: q.number,
      part: 'Phần III (Trả lời ngắn)',
      points: '0,50 đ',
      topic: q.topic,
      level: q.level,
      originalRef: q.originalRef,
    })),
    ...exam.part4.map((q) => ({
      number: q.number,
      part: 'Phần IV (Tự luận điền khuyết)',
      points: '1,00 đ',
      topic: q.topic,
      level: q.level,
      originalRef: q.originalRef,
    })),
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="matrix-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-xl w-full max-w-5xl max-h-[88vh] flex flex-col overflow-hidden shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-200">
          <div>
            <h2
              id="matrix-modal-title"
              className="text-lg font-bold text-slate-900"
            >
              Ma trận đặc tả & Đối chiếu Đề gốc (21 câu · 10,0 điểm)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Đề hiện tại: {exam.title} · Đối chiếu cấu trúc với đề gốc THPT Số 1 Trần Phú
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveTab('matrix')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'matrix'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Table className="w-3.5 h-3.5" aria-hidden="true" />
                Bảng ma trận 21 câu
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pdf')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'pdf'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                Xem file PDF Đề gốc
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng cửa sổ ma trận"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'matrix' ? (
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="py-3 px-4 font-semibold w-16">Câu</th>
                    <th className="py-3 px-4 font-semibold">Phần thi</th>
                    <th className="py-3 px-4 font-semibold">Mảng kiến thức</th>
                    <th className="py-3 px-4 font-semibold w-28">Mức độ</th>
                    <th className="py-3 px-4 font-semibold w-20 text-right">Điểm</th>
                    <th className="py-3 px-4 font-semibold">Đối chiếu đề gốc</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {allRows.map((row) => (
                    <tr key={row.number} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-4 font-mono-tabular font-semibold text-slate-900">
                        Câu {row.number}
                      </td>
                      <td className="py-2.5 px-4 text-slate-600 text-xs">
                        {row.part}
                      </td>
                      <td className="py-2.5 px-4 font-medium text-slate-900">
                        {row.topic}
                      </td>
                      <td className="py-2.5 px-4 text-xs text-slate-700">
                        {row.level}
                      </td>
                      <td className="py-2.5 px-4 font-mono-tabular text-right text-slate-700">
                        {row.points}
                      </td>
                      <td className="py-2.5 px-4 text-xs text-slate-600">
                        {row.originalRef}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col h-[68vh] gap-3">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>
                  Tài liệu gốc: Đề ôn thi Giữa học kì 1 - Toán 10 - Trường THPT Số 1 Trần Phú
                </span>
                <a
                  href="/assets/aistudio/TOAN_10_DE_ON_TAP_GIUA_KY_1_ca92aabe.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-sky-700 hover:underline"
                >
                  Mở PDF trong tab mới
                </a>
              </div>
              <iframe
                src="/assets/aistudio/TOAN_10_DE_ON_TAP_GIUA_KY_1_ca92aabe.pdf"
                title="Đề gốc ôn thi giữa học kì 1 môn Toán 10"
                className="w-full flex-1 border border-slate-200 rounded-lg bg-slate-100"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
