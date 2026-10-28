export type CognitiveLevel = 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';

export interface MultipleChoiceQuestion {
  id: string;
  number: number; // 1 to 12
  topic: string;
  level: CognitiveLevel;
  originalRef: string; // Description of how it maps to the original exam question
  prompt: string;
  options: [string, string, string, string]; // A, B, C, D
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface TrueFalseStatement {
  id: 'a' | 'b' | 'c' | 'd';
  label: string;
  text: string;
  isTrue: boolean;
  explanation: string;
}

export interface CoordinateDiagramConfig {
  type: 'coordinate_region';
  xIntercept: number; // e.g., 2 -> line passes through (xIntercept, 0)
  yIntercept: number; // e.g., 2 -> line passes through (0, yIntercept)
  regionType: 'first_quadrant_triangle' | 'half_plane_below' | 'half_plane_above' | 'right_triangle_x_positive';
  lineLabel: string; // e.g., 'd'
  caption: string;
}

export interface TrueFalseQuestion {
  id: string;
  number: number; // 13 to 14
  topic: string;
  level: CognitiveLevel;
  originalRef: string;
  prompt: string;
  diagram?: CoordinateDiagramConfig;
  statements: [TrueFalseStatement, TrueFalseStatement, TrueFalseStatement, TrueFalseStatement];
  generalExplanation: string;
}

export interface ShortAnswerQuestion {
  id: string;
  number: number; // 15 to 18
  topic: string;
  level: CognitiveLevel;
  originalRef: string;
  prompt: string;
  expectedAnswer: number;
  tolerance?: number; // default 0.05 for rounded decimals, 0.001 for exact
  unit?: string;
  answerFormatHint: string;
  explanation: string;
}

export interface EssayBlank {
  id: string; // e.g., 'b1', 'b2'
  label: string; // Accessible label for screen readers / snapshot testing
  placeholder: string;
  acceptedAnswers: string[];
  displayAnswer: string;
  inputType?: 'text' | 'select';
  options?: string[]; // If inputType === 'select'
  widthClass?: string;
}

export interface EssayStep {
  stepNumber: number;
  title: string;
  /**
   * Template string containing tokens like {{b1}}, {{b2}} which are replaced
   * by interactive input/select fields.
   */
  template: string;
}

export interface NumberLineDiagramConfig {
  type: 'number_line';
  setALabel: string;
  setAStart: number;
  setAEnd: number;
  setALeftBracket: '(' | '[';
  setARightBracket: ')' | ']';
  setBLabel: string;
  setBStart: number;
  setBEnd: number;
  setBLeftBracket: '(' | '[';
  setBRightBracket: ')' | ']';
  intersectionText: string;
  unionText: string;
}

export interface LinearProgrammingDiagramConfig {
  type: 'linear_programming';
  vertices: Array<{ label: string; x: number; y: number; value: number }>;
  optimalVertex: string;
  xLabel: string;
  yLabel: string;
}

export interface SurveyingDiagramConfig {
  type: 'surveying_tower';
  objectName: string; // 'tháp', 'ngọn hải đăng', 'cột cờ', 'tòa tháp cổ'
  topPoint: string; // D
  footPoint: string; // C
  nearPoint: string; // A
  farPoint: string; // B
  distanceAB: number;
  angleNearDeg: number; // alpha at A
  angleFarDeg: number; // beta at B
  heightResult: number;
}

export type EssayDiagramConfig =
  | NumberLineDiagramConfig
  | LinearProgrammingDiagramConfig
  | SurveyingDiagramConfig;

export interface EssayClozeQuestion {
  id: string;
  number: number; // 19 to 21
  points: number; // 1.0 each
  topic: string;
  level: CognitiveLevel;
  originalRef: string;
  prompt: string;
  diagram: EssayDiagramConfig;
  steps: EssayStep[];
  blanks: EssayBlank[];
  fullExplanation: string;
}

export interface ExamPaper {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  schoolHeader: string;
  durationMinutes: number;
  isOriginalReference?: boolean;
  part1: MultipleChoiceQuestion[]; // 12 questions (3.0 pts)
  part2: TrueFalseQuestion[]; // 2 questions (2.0 pts)
  part3: ShortAnswerQuestion[]; // 4 questions (2.0 pts)
  part4: EssayClozeQuestion[]; // 3 questions (3.0 pts)
}

export interface UserExamAnswers {
  part1: Record<number, number | null>; // question.number -> 0..3 | null
  part2: Record<number, Record<'a' | 'b' | 'c' | 'd', boolean | null>>; // question.number -> { a, b, c, d }
  part3: Record<number, string>; // question.number -> raw text input
  part4: Record<number, Record<string, string>>; // question.number -> { blankId: raw text }
}

export interface ExamGradingResult {
  totalScore: number; // out of 10.0
  part1Score: number; // out of 3.0
  part2Score: number; // out of 2.0
  part3Score: number; // out of 2.0
  part4Score: number; // out of 3.0
  part1Results: Record<number, { isCorrect: boolean; score: number }>;
  part2Results: Record<
    number,
    {
      correctCount: number;
      score: number;
      statementResults: Record<'a' | 'b' | 'c' | 'd', boolean>;
    }
  >;
  part3Results: Record<number, { isCorrect: boolean; score: number }>;
  part4Results: Record<
    number,
    {
      correctBlanks: number;
      totalBlanks: number;
      score: number;
      blankResults: Record<string, boolean>;
    }
  >;
}
