import {
  EssayClozeQuestion,
  ExamPaper,
  MultipleChoiceQuestion,
  ShortAnswerQuestion,
  TrueFalseQuestion,
} from '../types/exam';

/**
 * Question Pool by Slot (1..21)
 * Each slot contains multiple distinct structural/conceptual variants (not just number changes)
 * matching the exact knowledge matrix and cognitive level of the reference exam.
 */

const SLOT_1_VARIANTS: Omit<MultipleChoiceQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Mệnh đề toán học',
    level: 'Nhận biết',
    originalRef: 'Câu 1 đề gốc: Nhận biết câu nào là mệnh đề toán học',
    prompt: 'Trong các câu dưới đây, câu nào là một mệnh đề toán học?',
    options: [
      'Thời tiết mùa thu Hà Nội dễ chịu quá!',
      'Số 15 chia hết cho 3 và 5.',
      'Bạn đã làm xong bài tập về nhà chưa?',
      'Hãy chứng minh tam giác này đều!',
    ],
    correctIndex: 1,
    explanation:
      'Mệnh đề toán học là một câu khẳng định có tính đúng hoặc sai rõ ràng (không thể vừa đúng vừa sai). Câu "Số 15 chia hết cho 3 và 5" là khẳng định đúng nên là mệnh đề toán học. Các câu cảm thán, nghi vấn, cầu khiến không phải là mệnh đề.',
  },
  {
    topic: 'Mệnh đề toán học',
    level: 'Nhận biết',
    originalRef: 'Câu 1 đề gốc: Phân biệt mệnh đề toán học, mệnh đề chứa biến và câu thông thường',
    prompt: 'Trong các phát biểu sau, phát biểu nào KHÔNG phải là một mệnh đề toán học?',
    options: [
      'Tổng ba góc trong một tam giác bằng 180°.',
      'Số π là một số hữu tỉ.',
      'Phương trình x² + 1 = 0 vô nghiệm trên tập số thực.',
      '2x + 5 > 9 (với x là số thực tùy ý chưa xác định).',
    ],
    correctIndex: 3,
    explanation:
      'Khẳng định "2x + 5 > 9" chưa xác định được tính đúng sai khi chưa cho giá trị cụ thể của biến x, nên đây là mệnh đề chứa biến chứ không phải mệnh đề toán học.',
  },
  {
    topic: 'Mệnh đề toán học',
    level: 'Nhận biết',
    originalRef: 'Câu 1 đề gốc: Nhận diện mệnh đề toán học và xét tính đúng/sai cơ bản',
    prompt: 'Trong các câu sau đây, câu nào là một mệnh đề toán học ĐÚNG?',
    options: [
      'Bài toán này giải như thế nào?',
      'Số 2 là số nguyên tố chẵn duy nhất.',
      'Mọi số nguyên tố đều là số lẻ.',
      'Hôm nay lớp chúng ta kiểm tra môn Toán phải không?',
    ],
    correctIndex: 1,
    explanation:
      'Câu A và D là câu hỏi nên không phải mệnh đề. Câu C là mệnh đề sai (vì số 2 là số nguyên tố chẵn). Câu B "Số 2 là số nguyên tố chẵn duy nhất" là một khẳng định đúng.',
  },
];

const SLOT_2_VARIANTS: Omit<MultipleChoiceQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Mệnh đề kéo theo & Mệnh đề đảo',
    level: 'Nhận biết',
    originalRef: 'Câu 2 đề gốc: Xác định mệnh đề đảo của mệnh đề kéo theo P ⇒ Q',
    prompt: 'Cho mệnh đề kéo theo P ⇒ Q: "Nếu tứ giác ABCD là hình thoi thì tứ giác ABCD có hai đường chéo vuông góc". Mệnh đề đảo của mệnh đề trên là:',
    options: [
      'Nếu tứ giác ABCD không là hình thoi thì hai đường chéo không vuông góc.',
      'Nếu tứ giác ABCD có hai đường chéo vuông góc thì tứ giác ABCD là hình thoi.',
      'Nếu tứ giác ABCD là hình thoi thì hai đường chéo cắt nhau tại trung điểm mỗi đường.',
      'Tứ giác ABCD là hình thoi khi và chỉ khi hai đường chéo vuông góc.',
    ],
    correctIndex: 1,
    explanation:
      'Mệnh đề đảo của mệnh đề P ⇒ Q là Q ⇒ P. Ở đây P: "Tứ giác ABCD là hình thoi", Q: "Tứ giác ABCD có hai đường chéo vuông góc", nên mệnh đề đảo là "Nếu tứ giác ABCD có hai đường chéo vuông góc thì tứ giác ABCD là hình thoi".',
  },
  {
    topic: 'Mệnh đề kéo theo & Mệnh đề đảo',
    level: 'Nhận biết',
    originalRef: 'Câu 2 đề gốc: Nhận biết tính đúng sai của mệnh đề kéo theo và mệnh đề đảo',
    prompt: 'Cho hai mệnh đề P và Q. Mệnh đề kéo theo P ⇒ Q chỉ SAI trong trường hợp nào dưới đây?',
    options: [
      'P đúng và Q đúng.',
      'P sai và Q đúng.',
      'P đúng và Q sai.',
      'P sai và Q sai.',
    ],
    correctIndex: 2,
    explanation:
      'Theo định nghĩa logic toán học, mệnh đề kéo theo P ⇒ Q chỉ sai khi giả thiết P đúng mà kết luận Q sai; trong mọi trường hợp còn lại P ⇒ Q đều đúng.',
  },
  {
    topic: 'Mệnh đề kéo theo & Mệnh đề đảo',
    level: 'Nhận biết',
    originalRef: 'Câu 2 đề gốc: Mệnh đề đảo của mệnh đề A ⇒ B',
    prompt: 'Xét mệnh đề P ⇒ Q: "Nếu số tự nhiên n có chữ số tận cùng bằng 0 thì n chia hết cho 5". Mệnh đề đảo Q ⇒ P được phát biểu là:',
    options: [
      'Nếu số tự nhiên n chia hết cho 5 thì n có chữ số tận cùng bằng 0.',
      'Nếu số tự nhiên n không chia hết cho 5 thì n không có chữ số tận cùng bằng 0.',
      'Nếu số tự nhiên n không có chữ số tận cùng bằng 0 thì n không chia hết cho 5.',
      'Số tự nhiên n chia hết cho 5 khi và chỉ khi n có chữ số tận cùng bằng 0.',
    ],
    correctIndex: 0,
    explanation:
      'Đảo vị trí giả thiết P và kết luận Q, ta được mệnh đề đảo Q ⇒ P: "Nếu số tự nhiên n chia hết cho 5 thì n có chữ số tận cùng bằng 0".',
  },
];

const SLOT_3_VARIANTS: Omit<MultipleChoiceQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Kí hiệu lượng từ ∀ và ∃',
    level: 'Thông hiểu',
    originalRef: 'Câu 3 đề gốc: Viết mệnh đề sử dụng kí hiệu ∀ hoặc ∃',
    prompt: 'Sử dụng kí hiệu ∀ hoặc ∃ để viết mệnh đề: "Mọi số thực đều có bình phương không âm".',
    options: [
      '∃x ∈ ℝ, x² ≥ 0.',
      '∀x ∈ ℝ, x² > 0.',
      '∀x ∈ ℝ, x² ≥ 0.',
      '∀x ∈ ℤ, x² ≥ 0.',
    ],
    correctIndex: 2,
    explanation:
      '"Mọi số thực" ứng với lượng từ ∀x ∈ ℝ, còn "bình phương không âm" nghĩa là x² ≥ 0. Do đó kí hiệu đúng là ∀x ∈ ℝ, x² ≥ 0.',
  },
  {
    topic: 'Kí hiệu lượng từ ∀ và ∃',
    level: 'Thông hiểu',
    originalRef: 'Câu 3 đề gốc: Phủ định mệnh đề có chứa lượng từ ∀, ∃',
    prompt: 'Tìm mệnh đề phủ định của mệnh đề P: "∀x ∈ ℝ, x² + 2x + 3 > 0".',
    options: [
      '∀x ∈ ℝ, x² + 2x + 3 ≤ 0.',
      '∃x ∈ ℝ, x² + 2x + 3 < 0.',
      '∃x ∈ ℝ, x² + 2x + 3 ≤ 0.',
      '∃x ∈ ℝ, x² + 2x + 3 = 0.',
    ],
    correctIndex: 2,
    explanation:
      'Phủ định của lượng từ ∀ là ∃, và phủ định của quan hệ "> 0" là "≤ 0". Vậy mệnh đề phủ định P̄ là: "∃x ∈ ℝ, x² + 2x + 3 ≤ 0".',
  },
  {
    topic: 'Kí hiệu lượng từ ∀ và ∃',
    level: 'Thông hiểu',
    originalRef: 'Câu 3 đề gốc: Biểu diễn câu phát biểu bằng kí hiệu lượng từ',
    prompt: 'Viết mệnh đề sau bằng cách dùng kí hiệu ∀ hoặc ∃: "Tồn tại ít nhất một số hữu tỉ mà nghịch đảo của nó bằng chính nó".',
    options: [
      '∀x ∈ ℚ \\ {0}, 1/x = x.',
      '∃x ∈ ℚ \\ {0}, 1/x = x.',
      '∃x ∈ ℝ \\ {0}, 1/x = x.',
      '∃x ∈ ℤ \\ {0}, 1/x = x.',
    ],
    correctIndex: 1,
    explanation:
      '"Tồn tại ít nhất một số hữu tỉ khác 0" được kí hiệu là ∃x ∈ ℚ \\ {0}, và "nghịch đảo của nó bằng chính nó" là 1/x = x.',
  },
];

const SLOT_4_VARIANTS: Omit<MultipleChoiceQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Mệnh đề tương đương, Điều kiện cần và đủ',
    level: 'Thông hiểu',
    originalRef: 'Câu 4 đề gốc: Các cách phát biểu mệnh đề P ⇔ Q và điều kiện cần/đủ',
    prompt: 'Cho mệnh đề kéo theo đúng P ⇒ Q. Phát biểu nào sau đây là SAI?',
    options: [
      'P là điều kiện đủ để có Q.',
      'Q là điều kiện cần để có P.',
      'Nếu P thì Q.',
      'P là điều kiện cần và đủ để có Q.',
    ],
    correctIndex: 3,
    explanation:
      'Khi mới chỉ biết P ⇒ Q đúng (chưa biết Q ⇒ P có đúng hay không), ta nói "P là điều kiện đủ để có Q" hoặc "Q là điều kiện cần để có P". Cụm "điều kiện cần và đủ" chỉ dùng cho mệnh đề tương đương P ⇔ Q.',
  },
  {
    topic: 'Mệnh đề tương đương, Điều kiện cần và đủ',
    level: 'Thông hiểu',
    originalRef: 'Câu 4 đề gốc: Nhận biết cách phát biểu mệnh đề tương đương P ⇔ Q',
    prompt: 'Cho hai mệnh đề P: "Tam giác ABC có hai góc bằng 60°" và Q: "Tam giác ABC là tam giác đều". Cách phát biểu nào dưới đây thể hiện đúng mệnh đề tương đương P ⇔ Q?',
    options: [
      'Tam giác ABC có hai góc bằng 60° là điều kiện cần và đủ để tam giác ABC đều.',
      'Nếu tam giác ABC có hai góc bằng 60° thì tam giác ABC cân.',
      'Tam giác ABC có hai góc bằng 60° là điều kiện cần nhưng chưa đủ để tam giác ABC đều.',
      'Tam giác ABC đều là điều kiện đủ nhưng không cần để có hai góc bằng 60°.',
    ],
    correctIndex: 0,
    explanation:
      'Vì cả P ⇒ Q và Q ⇒ P đều đúng nên P ⇔ Q đúng, phát biểu chuẩn là "P là điều kiện cần và đủ để có Q".',
  },
  {
    topic: 'Mệnh đề tương đương, Điều kiện cần và đủ',
    level: 'Thông hiểu',
    originalRef: 'Câu 4 đề gốc: Phân biệt điều kiện cần, điều kiện đủ và điều kiện cần và đủ',
    prompt: 'Cho hai mệnh đề P và Q. Phát biểu nào sau đây KHÔNG tương đương với mệnh đề P ⇔ Q?',
    options: [
      'P khi và chỉ khi Q.',
      'P tương đương Q.',
      'Q là điều kiện đủ để có P (mà không cần P kéo theo Q).',
      'P là điều kiện cần và đủ để có Q.',
    ],
    correctIndex: 2,
    explanation:
      '"Q là điều kiện đủ để có P" chỉ diễn tả một chiều Q ⇒ P, không thể hiện được chiều P ⇒ Q nên không thể dùng để phát biểu P ⇔ Q.',
  },
];

const SLOT_5_VARIANTS: Omit<MultipleChoiceQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Các phép toán trên tập hợp hữu hạn',
    level: 'Nhận biết',
    originalRef: 'Câu 5 đề gốc: Tìm giao/hợp/hiệu của hai tập hợp liệt kê phần tử',
    prompt: 'Cho hai tập hợp A = {-2; 0; 3; 5; 8} và B = {-1; 0; 2; 5; 9}. Tập hợp A ∩ B là:',
    options: [
      'A ∩ B = {0; 5}.',
      'A ∩ B = {-2; -1; 0; 2; 3; 5; 8; 9}.',
      'A ∩ B = {-2; 3; 8}.',
      'A ∩ B = {-1; 2; 9}.',
    ],
    correctIndex: 0,
    explanation:
      'Giao của hai tập hợp A và B gồm các phần tử vừa thuộc A vừa thuộc B. Đối chiếu hai tập hợp, các phần tử chung là 0 và 5. Vậy A ∩ B = {0; 5}.',
  },
  {
    topic: 'Các phép toán trên tập hợp hữu hạn',
    level: 'Nhận biết',
    originalRef: 'Câu 5 đề gốc: Phép toán hiệu và hợp trên hai tập hợp hữu hạn',
    prompt: 'Cho hai tập hợp M = {1; 3; 4; 6; 9} và N = {2; 3; 5; 6; 8}. Khi đó hiệu M \\ N bằng tập hợp nào sau đây?',
    options: [
      'M \\ N = {3; 6}.',
      'M \\ N = {1; 4; 9}.',
      'M \\ N = {2; 5; 8}.',
      'M \\ N = {1; 2; 3; 4; 5; 6; 8; 9}.',
    ],
    correctIndex: 1,
    explanation:
      'Hiệu M \\ N gồm các phần tử thuộc M nhưng không thuộc N. Loại bỏ các phần tử chung {3; 6} khỏi M, ta được M \\ N = {1; 4; 9}.',
  },
  {
    topic: 'Các phép toán trên tập hợp hữu hạn',
    level: 'Thông hiểu',
    originalRef: 'Câu 5 đề gốc: Xác định giao của hai tập hợp số nguyên',
    prompt: 'Cho tập hợp A = {x ∈ ℤ | -2 ≤ x ≤ 3} và tập hợp B = {0; 2; 3; 5; 7}. Tập hợp A ∩ B là:',
    options: [
      'A ∩ B = {-2; -1; 0; 1; 2; 3}.',
      'A ∩ B = {0; 2; 3}.',
      'A ∩ B = {5; 7}.',
      'A ∩ B = {2; 3; 5}.',
    ],
    correctIndex: 1,
    explanation:
      'Liệt kê các phần tử của A: A = {-2; -1; 0; 1; 2; 3}. Giao với B = {0; 2; 3; 5; 7} ta được các phần tử chung là A ∩ B = {0; 2; 3}.',
  },
];

const SLOT_6_VARIANTS: Omit<MultipleChoiceQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Quan hệ phần tử và tập hợp con (∈, ∉, ⊂, ⊄)',
    level: 'Nhận biết',
    originalRef: 'Câu 6 đề gốc: Sử dụng đúng kí hiệu ∈, ∉, ⊂, ⊄ với tập hợp cho trước',
    prompt: 'Cho tập hợp M = {x; 2; y; 5}. Trong các mệnh đề dưới đây, mệnh đề nào là SAI?',
    options: [
      '{2; 5} ⊂ M.',
      '{0} ⊄ M.',
      'x ∈ M.',
      '5 ∉ M.',
    ],
    correctIndex: 3,
    explanation:
      'Vì 5 là một phần tử nằm trong tập hợp M = {x; 2; y; 5} nên khẳng định đúng phải là 5 ∈ M. Do đó mệnh đề "5 ∉ M" là sai.',
  },
  {
    topic: 'Quan hệ phần tử và tập hợp con (∈, ∉, ⊂, ⊄)',
    level: 'Nhận biết',
    originalRef: 'Câu 6 đề gốc: Phân biệt quan hệ phần tử ∈ và quan hệ tập con ⊂',
    prompt: 'Cho tập hợp A = {a; b; 4; 7}. Khẳng định nào sau đây là ĐÚNG?',
    options: [
      'a ⊂ A.',
      '{4; 7} ∈ A.',
      '{a; 4} ⊂ A.',
      '7 ⊄ A.',
    ],
    correctIndex: 2,
    explanation:
      'Kí hiệu ⊂ dùng cho quan hệ giữa hai tập hợp, còn ∈ dùng giữa phần tử và tập hợp. Vì a và 4 đều là phần tử của A nên tập hợp {a; 4} là tập con của A: {a; 4} ⊂ A.',
  },
  {
    topic: 'Quan hệ phần tử và tập hợp con (∈, ∉, ⊂, ⊄)',
    level: 'Thông hiểu',
    originalRef: 'Câu 6 đề gốc: Tập con và số tập con của tập hợp hữu hạn',
    prompt: 'Cho tập hợp S = {m; n; 8}. Mệnh đề nào sau đây là SAI?',
    options: [
      '∅ ⊂ S.',
      '{m; 8} ⊂ S.',
      'n ∉ S.',
      'S ⊂ S.',
    ],
    correctIndex: 2,
    explanation:
      'Mọi tập hợp đều có tập rỗng ∅ và chính nó là tập con. Phần tử n nằm trong S = {m; n; 8} nên n ∈ S, suy ra "n ∉ S" là mệnh đề sai.',
  },
];

const SLOT_7_VARIANTS: Omit<MultipleChoiceQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Bất phương trình bậc nhất hai ẩn',
    level: 'Nhận biết',
    originalRef: 'Câu 7 đề gốc: Nhận biết bất phương trình bậc nhất hai ẩn',
    prompt: 'Trong các bất phương trình sau, bất phương trình nào là bất phương trình bậc nhất hai ẩn?',
    options: [
      '2x² + 3y < 5.',
      '3x - 4y + 7 ≤ 0.',
      'x + 2y - 5z > 1.',
      'x² - 4x + 3 ≥ 0.',
    ],
    correctIndex: 1,
    explanation:
      'Bất phương trình bậc nhất hai ẩn x, y có dạng tổng quát ax + by + c < 0 (hoặc >, ≤, ≥) với a, b không đồng thời bằng 0. Vậy 3x - 4y + 7 ≤ 0 là bất phương trình bậc nhất hai ẩn.',
  },
  {
    topic: 'Bất phương trình bậc nhất hai ẩn',
    level: 'Nhận biết',
    originalRef: 'Câu 7 đề gốc: Phân biệt bất phương trình bậc nhất hai ẩn với các BPT khác',
    prompt: 'Bất phương trình nào dưới đây KHÔNG phải là bất phương trình bậc nhất hai ẩn?',
    options: [
      '2x - 5y > 3.',
      'x + y ≤ 10.',
      'x·y + 2x - 1 > 0.',
      '-4x + y - 2 ≥ 0.',
    ],
    correctIndex: 2,
    explanation:
      'Biểu thức x·y có bậc bằng 2 đối với hai biến x, y nên x·y + 2x - 1 > 0 không phải là bất phương trình bậc nhất hai ẩn.',
  },
  {
    topic: 'Bất phương trình bậc nhất hai ẩn',
    level: 'Nhận biết',
    originalRef: 'Câu 7 đề gốc: Nhận diện hệ bất phương trình bậc nhất hai ẩn',
    prompt: 'Hệ nào dưới đây là một hệ bất phương trình bậc nhất hai ẩn x, y?',
    options: [
      '{ 2x - y ≤ 4 ; x + 3y > 1 }.',
      '{ x² + y ≤ 4 ; x - y > 0 }.',
      '{ x + y + z ≤ 3 ; 2x - y > 1 }.',
      '{ 3x - y = 2 ; x + 2y = 5 }.',
    ],
    correctIndex: 0,
    explanation:
      'Hệ { 2x - y ≤ 4 ; x + 3y > 1 } gồm hai bất phương trình bậc nhất hai ẩn x, y nên là hệ bất phương trình bậc nhất hai ẩn.',
  },
];

const SLOT_8_VARIANTS: Omit<MultipleChoiceQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Nghiệm của hệ bất phương trình bậc nhất hai ẩn',
    level: 'Thông hiểu',
    originalRef: 'Câu 8 đề gốc: Kiểm tra cặp số thuộc/không thuộc miền nghiệm của hệ BPT',
    prompt: 'Cho hệ bất phương trình: { 2x + y - 3 ≤ 0 ; x - 2y + 4 > 0 }. Trong các cặp số sau, cặp số nào KHÔNG là nghiệm của hệ?',
    options: [
      '(0; 1).',
      '(-1; 2).',
      '(1; 3).',
      '(1; 1).',
    ],
    correctIndex: 2,
    explanation:
      'Thay cặp số (1; 3) vào bất phương trình thứ nhất: 2(1) + 3 - 3 = 2 > 0 (vi phạm điều kiện ≤ 0). Do đó (1; 3) không là nghiệm của hệ bất phương trình.',
  },
  {
    topic: 'Nghiệm của hệ bất phương trình bậc nhất hai ẩn',
    level: 'Thông hiểu',
    originalRef: 'Câu 8 đề gốc: Xác định điểm thuộc miền nghiệm của hệ BPT bậc nhất hai ẩn',
    prompt: 'Điểm nào sau đây thuộc miền nghiệm của hệ bất phương trình { x - y + 2 ≥ 0 ; 3x + 2y - 6 < 0 }?',
    options: [
      'M(2; 1).',
      'N(0; 1).',
      'P(1; 4).',
      'Q(3; 0).',
    ],
    correctIndex: 1,
    explanation:
      'Thay tọa độ N(0; 1) vào hệ: 0 - 1 + 2 = 1 ≥ 0 (đúng) và 3(0) + 2(1) - 6 = -4 < 0 (đúng). Các điểm M, P, Q đều vi phạm ít nhất một bất phương trình.',
  },
  {
    topic: 'Nghiệm của hệ bất phương trình bậc nhất hai ẩn',
    level: 'Thông hiểu',
    originalRef: 'Câu 8 đề gốc: Kiểm tra nghiệm của hệ bất phương trình bậc nhất hai ẩn',
    prompt: 'Trong các cặp số (x; y) dưới đây, cặp số nào KHÔNG thỏa mãn hệ bất phương trình { x + 2y - 4 ≤ 0 ; 3x - y + 3 > 0 }?',
    options: [
      '(0; 0).',
      '(1; 1).',
      '(-2; 1).',
      '(0; 2).',
    ],
    correctIndex: 2,
    explanation:
      'Thay (-2; 1) vào bất phương trình thứ hai: 3(-2) - 1 + 3 = -4 < 0 (không thỏa mãn > 0). Vậy (-2; 1) không phải là nghiệm của hệ.',
  },
];

const SLOT_9_VARIANTS: Omit<MultipleChoiceQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Giá trị lượng giác của góc từ 0° đến 180°',
    level: 'Nhận biết',
    originalRef: 'Câu 9 đề gốc: Quan hệ lượng giác của hai góc bù nhau (0° < α < 180°)',
    prompt: 'Cho góc α thỏa mãn 0° < α < 180°. Trong các đẳng thức sau, đẳng thức nào ĐÚNG?',
    options: [
      'cos(180° - α) = cos α.',
      'cos(180° - α) = -cos α.',
      'cos(180° - α) = sin α.',
      'cos(180° - α) = -sin α.',
    ],
    correctIndex: 1,
    explanation:
      'Theo tính chất hai góc bù nhau (α và 180° - α): sin(180° - α) = sin α, còn cos(180° - α) = -cos α, tan(180° - α) = -tan α, cot(180° - α) = -cot α.',
  },
  {
    topic: 'Giá trị lượng giác của góc từ 0° đến 180°',
    level: 'Nhận biết',
    originalRef: 'Câu 9 đề gốc: Dấu và hệ thức của giá trị lượng giác góc từ 0° đến 180°',
    prompt: 'Cho góc tù α (90° < α < 180°). Khẳng định nào dưới đây là ĐÚNG?',
    options: [
      'sin α < 0 và cos α > 0.',
      'sin α > 0 và cos α < 0.',
      'tan α > 0 và cot α > 0.',
      'sin α < 0 và tan α < 0.',
    ],
    correctIndex: 1,
    explanation:
      'Với góc tù α ∈ (90°; 180°), điểm biểu diễn trên nửa đường tròn đơn vị nằm ở góc phần tư thứ II nên tung độ dương (sin α > 0) và hoành độ âm (cos α < 0), kéo theo tan α < 0 và cot α < 0.',
  },
  {
    topic: 'Giá trị lượng giác của góc từ 0° đến 180°',
    level: 'Nhận biết',
    originalRef: 'Câu 9 đề gốc: Hai góc bù nhau và phụ nhau trong nửa đường tròn đơn vị',
    prompt: 'Cho 0° < α < 180° và α ≠ 90°. Đẳng thức nào sau đây là SAI?',
    options: [
      'sin(180° - α) = sin α.',
      'cos(180° - α) = -cos α.',
      'tan(180° - α) = tan α.',
      'sin²α + cos²α = 1.',
    ],
    correctIndex: 2,
    explanation:
      'Hai góc bù nhau có tang đối nhau: tan(180° - α) = -tan α, nên đẳng thức tan(180° - α) = tan α là sai.',
  },
];

const SLOT_10_VARIANTS: Omit<MultipleChoiceQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Giá trị lượng giác của góc đặc biệt',
    level: 'Nhận biết',
    originalRef: 'Câu 10 đề gốc: Tính giá trị lượng giác của góc đặc biệt (120°, 135°, 150°)',
    prompt: 'Giá trị của cos 120° bằng:',
    options: [
      '-1/2.',
      '1/2.',
      '-√3/2.',
      '√3/2.',
    ],
    correctIndex: 0,
    explanation:
      'Ta có cos 120° = cos(180° - 60°) = -cos 60° = -1/2.',
  },
  {
    topic: 'Giá trị lượng giác của góc đặc biệt',
    level: 'Nhận biết',
    originalRef: 'Câu 10 đề gốc: Xác định giá trị lượng giác hoặc góc đặc biệt',
    prompt: 'Biết 0° ≤ α ≤ 180° và cos α = -√2/2. Số đo của góc α bằng:',
    options: [
      '45°.',
      '120°.',
      '135°.',
      '150°.',
    ],
    correctIndex: 2,
    explanation:
      'Vì cos 45° = √2/2 nên cos(180° - 45°) = cos 135° = -√2/2. Vậy α = 135°.',
  },
  {
    topic: 'Giá trị lượng giác của góc đặc biệt',
    level: 'Nhận biết',
    originalRef: 'Câu 10 đề gốc: Giá trị lượng giác của góc đặc biệt',
    prompt: 'Giá trị của biểu thức tan 135° + sin 150° bằng:',
    options: [
      '-1/2.',
      '1/2.',
      '3/2.',
      '-3/2.',
    ],
    correctIndex: 0,
    explanation:
      'Ta có tan 135° = -1 và sin 150° = 1/2. Do đó tan 135° + sin 150° = -1 + 1/2 = -1/2.',
  },
];

const SLOT_11_VARIANTS: Omit<MultipleChoiceQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Định lí Côsin và Định lí Sin trong tam giác',
    level: 'Nhận biết',
    originalRef: 'Câu 11 đề gốc: Nhận biết công thức Định lí Côsin trong tam giác ABC',
    prompt: 'Cho tam giác ABC có BC = a, AC = b, AB = c. Đẳng thức nào sau đây ĐÚNG theo định lí côsin?',
    options: [
      'a² = b² + c² + 2bc cos A.',
      'a² = b² + c² - 2bc cos A.',
      'a² = b² + c² - 2bc sin A.',
      'a² = b² + c² - bc cos A.',
    ],
    correctIndex: 1,
    explanation:
      'Theo định lí côsin trong tam giác ABC: bình phương một cạnh bằng tổng bình phương hai cạnh còn lại trừ đi hai lần tích hai cạnh đó nhân với côsin góc xen giữa: a² = b² + c² - 2bc cos A.',
  },
  {
    topic: 'Định lí Côsin và Định lí Sin trong tam giác',
    level: 'Thông hiểu',
    originalRef: 'Câu 11 đề gốc: Hệ quả định lí Côsin tính cos của góc trong tam giác',
    prompt: 'Cho tam giác ABC có BC = a, AC = b, AB = c. Công thức tính cos B nào dưới đây là ĐÚNG?',
    options: [
      'cos B = (a² + c² - b²) / (2ac).',
      'cos B = (a² + b² - c²) / (2ab).',
      'cos B = (b² - a² - c²) / (2ac).',
      'cos B = (a² + c² - b²) / (ac).',
    ],
    correctIndex: 0,
    explanation:
      'Từ định lí côsin b² = a² + c² - 2ac cos B, suy ra hệ quả: cos B = (a² + c² - b²) / (2ac).',
  },
  {
    topic: 'Định lí Côsin và Định lí Sin trong tam giác',
    level: 'Nhận biết',
    originalRef: 'Câu 11 đề gốc: Định lí Sin và Định lí Côsin trong tam giác ABC',
    prompt: 'Cho tam giác ABC có BC = a, AC = b, AB = c và bán kính đường tròn ngoại tiếp là R. Hệ thức nào sau đây ĐÚNG?',
    options: [
      'a / sin A = R.',
      'a / sin A = 2R.',
      'a / cos A = 2R.',
      'a · sin A = 2R.',
    ],
    correctIndex: 1,
    explanation:
      'Theo định lí sin trong tam giác ABC: a / sin A = b / sin B = c / sin C = 2R.',
  },
];

const SLOT_12_VARIANTS: Omit<MultipleChoiceQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Các công thức tính diện tích tam giác',
    level: 'Nhận biết',
    originalRef: 'Câu 12 đề gốc: Nhận biết công thức tính diện tích tam giác ABC',
    prompt: 'Cho tam giác ABC có độ dài ba cạnh là a, b, c; bán kính đường tròn ngoại tiếp R, bán kính đường tròn nội tiếp r và nửa chu vi p. Công thức tính diện tích S nào dưới đây là SAI?',
    options: [
      'S = (1/2) ac sin B.',
      'S = p · r.',
      'S = (abc) / (4R).',
      'S = (1/2) ab cos C.',
    ],
    correctIndex: 3,
    explanation:
      'Diện tích tam giác bằng nửa tích hai cạnh nhân với sin của góc xen giữa: S = (1/2)ab sin C, chứ không phải cos C. Do đó S = (1/2)ab cos C là sai.',
  },
  {
    topic: 'Các công thức tính diện tích tam giác',
    level: 'Thông hiểu',
    originalRef: 'Câu 12 đề gốc: Công thức diện tích tam giác và bán kính ngoại tiếp/nội tiếp',
    prompt: 'Cho tam giác ABC có diện tích S, ba cạnh BC = a, AC = b, AB = c và bán kính đường tròn ngoại tiếp R. Khẳng định nào sau đây là ĐÚNG?',
    options: [
      'R = (abc) / (2S).',
      'R = (abc) / (4S).',
      'R = (4S) / (abc).',
      'R = (abc) / S.',
    ],
    correctIndex: 1,
    explanation:
      'Từ công thức diện tích tam giác S = (abc) / (4R), ta rút ra bán kính đường tròn ngoại tiếp là R = (abc) / (4S).',
  },
];

const SLOT_13_VARIANTS: Omit<TrueFalseQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Tập hợp và các phép toán trên tập hợp',
    level: 'Thông hiểu',
    originalRef: 'Câu 13 đề gốc: Xét tính đúng sai của 4 mệnh đề về số phần tử, tập con, giao và hiệu của hai tập hợp',
    prompt: 'Cho hai tập hợp: A = {-4; -1; 1; 3; 5} và B = {-2; -1; 0; 3; 6}. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a)',
        text: 'Tập hợp A có 5 phần tử.',
        isTrue: true,
        explanation: 'Đúng. Tập hợp A = {-4; -1; 1; 3; 5} gồm đúng 5 phần tử phân biệt.',
      },
      {
        id: 'b',
        label: 'b)',
        text: 'Tập hợp X = {-1; 3} là một tập hợp con của cả A và B.',
        isTrue: true,
        explanation: 'Đúng. Vì cả -1 và 3 đều thuộc A và đều thuộc B nên X ⊂ A và X ⊂ B.',
      },
      {
        id: 'c',
        label: 'c)',
        text: 'Giao của hai tập hợp là A ∩ B = {-1; 1; 3}.',
        isTrue: false,
        explanation: 'Sai. Phần tử 1 thuộc A nhưng không thuộc B. Giao đúng phải là A ∩ B = {-1; 3}.',
      },
      {
        id: 'd',
        label: 'd)',
        text: 'Hiệu B \\ A = {-2; 0; 6}.',
        isTrue: true,
        explanation: 'Đúng. Loại bỏ hai phần tử chung {-1; 3} khỏi B = {-2; -1; 0; 3; 6}, ta còn lại B \\ A = {-2; 0; 6}.',
      },
    ],
    generalExplanation:
      'Khi kiểm tra các phép toán trên tập hợp hữu hạn, cần liệt kê và đối chiếu từng phần tử chung cho phép giao A ∩ B và loại bỏ các phần tử thuộc A khỏi B khi tìm B \\ A.',
  },
  {
    topic: 'Tập hợp và các phép toán trên tập hợp',
    level: 'Thông hiểu',
    originalRef: 'Câu 13 đề gốc: Tập hợp cho bằng tính chất đặc trưng và các phép toán giao, hợp, hiệu',
    prompt: 'Cho tập hợp A = {x ∈ ℤ | -2 ≤ x ≤ 2} và tập hợp B = {-3; -1; 0; 2; 4}. Xét tính đúng sai của các mệnh đề sau:',
    statements: [
      {
        id: 'a',
        label: 'a)',
        text: 'Tập hợp A viết dưới dạng liệt kê phần tử là A = {-2; -1; 0; 1; 2} gồm 5 phần tử.',
        isTrue: true,
        explanation: 'Đúng. Các số nguyên từ -2 đến 2 là -2, -1, 0, 1, 2 (có 5 phần tử).',
      },
      {
        id: 'b',
        label: 'b)',
        text: 'Tập hợp Y = {-2; 4} là một tập hợp con của tập hợp A.',
        isTrue: false,
        explanation: 'Sai. Vì phần tử 4 ∉ A nên Y không phải là tập hợp con của A.',
      },
      {
        id: 'c',
        label: 'c)',
        text: 'A ∩ B = {-1; 0; 2}.',
        isTrue: true,
        explanation: 'Đúng. Các phần tử chung của A = {-2; -1; 0; 1; 2} và B = {-3; -1; 0; 2; 4} là {-1; 0; 2}.',
      },
      {
        id: 'd',
        label: 'd)',
        text: 'B \\ A = {-3; 2; 4}.',
        isTrue: false,
        explanation: 'Sai. Vì 2 ∈ A nên 2 không thuộc B \\ A. Kết quả đúng là B \\ A = {-3; 4}.',
      },
    ],
    generalExplanation:
      'Bước đầu tiên cần liệt kê tường minh A = {-2; -1; 0; 1; 2}, sau đó thực hiện đối chiếu phần tử với B = {-3; -1; 0; 2; 4}.',
  },
];

const SLOT_14_VARIANTS: Omit<TrueFalseQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Biểu diễn miền nghiệm của hệ bất phương trình bậc nhất hai ẩn',
    level: 'Thông hiểu',
    originalRef: 'Câu 14 đề gốc: Đọc đồ thị miền nghiệm gạch chéo trên mặt phẳng tọa độ Oxy',
    prompt: 'Miền được tô màu (gạch chéo) trong hình vẽ bên dưới (kể cả biên) biểu diễn miền nghiệm của một hệ bất phương trình bậc nhất hai ẩn (I). Xét tính đúng sai của các mệnh đề sau:',
    diagram: {
      type: 'coordinate_region',
      xIntercept: 3,
      yIntercept: 3,
      regionType: 'first_quadrant_triangle',
      lineLabel: 'd',
      caption: 'Miền gạch chéo giới hạn bởi trục Ox, trục Oy và đường thẳng d đi qua (0; 3), (3; 0)',
    },
    statements: [
      {
        id: 'a',
        label: 'a)',
        text: 'Đường thẳng bờ d đi qua hai điểm A(0; 3) và B(3; 0).',
        isTrue: true,
        explanation: 'Đúng. Quan sát hình vẽ, đường thẳng d cắt trục tung Oy tại điểm (0; 3) và cắt trục hoành Ox tại điểm (3; 0).',
      },
      {
        id: 'b',
        label: 'b)',
        text: 'Mọi điểm M(x; y) thuộc miền nghiệm của hệ (I) đều có hoành độ và tung độ không âm (x ≥ 0, y ≥ 0).',
        isTrue: true,
        explanation: 'Đúng. Miền gạch chéo nằm hoàn toàn trong góc phần tư thứ nhất (phía bên phải trục Oy và phía trên trục Ox).',
      },
      {
        id: 'c',
        label: 'c)',
        text: 'Điểm P(1; 1) thuộc miền nghiệm của hệ bất phương trình (I).',
        isTrue: true,
        explanation: 'Đúng. Với P(1; 1), ta có x = 1 ≥ 0, y = 1 ≥ 0 và x + y = 2 ≤ 3 nên P nằm bên trong miền tam giác gạch chéo.',
      },
      {
        id: 'd',
        label: 'd)',
        text: 'Miền nghiệm của hệ bất phương trình (I) là một miền tứ giác.',
        isTrue: false,
        explanation: 'Sai. Miền nghiệm được giới hạn bởi 3 đoạn thẳng trên Ox, Oy và đường thẳng d nên là miền tam giác vuông OAB có diện tích S = (1/2)·3·3 = 4,5.',
      },
    ],
    generalExplanation:
      'Miền gạch chéo trên hình là miền tam giác OAB với O(0;0), A(0;3), B(3;0), biểu diễn hệ bất phương trình { x ≥ 0 ; y ≥ 0 ; x + y ≤ 3 }.',
  },
  {
    topic: 'Biểu diễn miền nghiệm của hệ bất phương trình bậc nhất hai ẩn',
    level: 'Thông hiểu',
    originalRef: 'Câu 14 đề gốc: Phân tích miền nghiệm của hệ BPT bậc nhất hai ẩn trên hệ trục Oxy',
    prompt: 'Miền được gạch chéo trong hình bên dưới (kể cả các cạnh biên) biểu diễn miền nghiệm của hệ bất phương trình (I). Xét tính đúng sai của các mệnh đề sau:',
    diagram: {
      type: 'coordinate_region',
      xIntercept: 4,
      yIntercept: 2,
      regionType: 'first_quadrant_triangle',
      lineLabel: 'd',
      caption: 'Miền gạch chéo giới hạn bởi Ox, Oy và đường thẳng d đi qua (0; 2) và (4; 0)',
    },
    statements: [
      {
        id: 'a',
        label: 'a)',
        text: 'Đường thẳng d có phương trình là x + 2y - 4 = 0 và đi qua điểm (0; 2).',
        isTrue: true,
        explanation: 'Đúng. Đường thẳng đi qua (0; 2) và (4; 0) có phương trình x/4 + y/2 = 1 ⇔ x + 2y - 4 = 0.',
      },
      {
        id: 'b',
        label: 'b)',
        text: 'Các điểm thuộc miền nghiệm của hệ (I) đều có hoành độ không âm.',
        isTrue: true,
        explanation: 'Đúng. Toàn bộ miền gạch chéo nằm bên phải trục tung Oy nên x ≥ 0.',
      },
      {
        id: 'c',
        label: 'c)',
        text: 'Điểm M(2; 2) thuộc miền nghiệm của hệ bất phương trình (I).',
        isTrue: false,
        explanation: 'Sai. Thay M(2; 2) vào vế trái của d: 2 + 2(2) - 4 = 2 > 0 nên M(2; 2) nằm phía ngoài miền gạch chéo.',
      },
      {
        id: 'd',
        label: 'd)',
        text: 'Miền nghiệm của hệ (I) là một miền tam giác vuông có diện tích bằng 4.',
        isTrue: true,
        explanation: 'Đúng. Tam giác vuông tạo bởi gốc O(0;0), (0;2) và (4;0) có diện tích S = (1/2) · 4 · 2 = 4.',
      },
    ],
    generalExplanation:
      'Đường thẳng d cắt Oy tại (0; 2) và Ox tại (4; 0), kết hợp với x ≥ 0, y ≥ 0 tạo thành miền tam giác vuông tại O.',
  },
];

const SLOT_15_VARIANTS: Omit<ShortAnswerQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Hệ thức lượng trong tam giác (Định lí Côsin)',
    level: 'Vận dụng',
    originalRef: 'Câu 15 đề gốc: Cho 2 cạnh và góc xen giữa, tính độ dài cạnh BC = √a',
    prompt: 'Cho tam giác ABC có góc A = 120°, cạnh AB = 3 và cạnh AC = 5. Độ dài cạnh BC bằng bao nhiêu?',
    expectedAnswer: 7,
    tolerance: 0.01,
    answerFormatHint: 'Nhập số nguyên hoặc số thập phân (ví dụ: 7)',
    explanation:
      'Áp dụng định lí côsin trong tam giác ABC:\nBC² = AB² + AC² - 2·AB·AC·cos A = 3² + 5² - 2·3·5·cos 120° = 9 + 25 - 30·(-1/2) = 34 + 15 = 49.\nSuy ra BC = √49 = 7.',
  },
  {
    topic: 'Hệ thức lượng trong tam giác (Định lí Côsin)',
    level: 'Vận dụng',
    originalRef: 'Câu 15 đề gốc: Tính độ dài cạnh thứ ba dạng √a khi biết hai cạnh và góc 60°/120°',
    prompt: 'Cho tam giác ABC có góc A = 60°, cạnh AB = 6 và cạnh AC = 10. Độ dài cạnh BC khi viết dưới dạng tối giản là √a. Giá trị của a bằng bao nhiêu?',
    expectedAnswer: 76,
    tolerance: 0.01,
    answerFormatHint: 'Nhập giá trị nguyên của a (ví dụ: 76)',
    explanation:
      'Áp dụng định lí côsin trong tam giác ABC:\nBC² = AB² + AC² - 2·AB·AC·cos 60° = 6² + 10² - 2·6·10·(1/2) = 36 + 100 - 60 = 76.\nDo đó BC = √76, suy ra a = 76.',
  },
  {
    topic: 'Hệ thức lượng trong tam giác (Định lí Côsin)',
    level: 'Vận dụng',
    originalRef: 'Câu 15 đề gốc: Vận dụng định lí côsin tính cạnh tam giác',
    prompt: 'Cho tam giác ABC có góc A = 120°, AB = 4 và AC = 6. Độ dài cạnh BC có dạng √a. Giá trị của a bằng bao nhiêu?',
    expectedAnswer: 76,
    tolerance: 0.01,
    answerFormatHint: 'Nhập số nguyên a',
    explanation:
      'Áp dụng định lí côsin trong tam giác ABC:\nBC² = AB² + AC² - 2·AB·AC·cos 120° = 4² + 6² - 2·4·6·(-1/2) = 16 + 36 + 24 = 76.\nSuy ra BC = √76, vậy a = 76.',
  },
];

const SLOT_16_VARIANTS: Omit<ShortAnswerQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Tính giá trị biểu thức lượng giác các góc đặc biệt',
    level: 'Thông hiểu',
    originalRef: 'Câu 16 đề gốc: Tính biểu thức lượng giác A có dạng phân số tối giản -a/b, tính T = a·b',
    prompt: 'Giá trị của biểu thức A = 4·sin 90° + 3·cos 0° - 5·cos 60° + 8·cos 180° có dạng phân số tối giản -a/b (với a, b ∈ ℕ*). Khi đó giá trị của tích T = a·b bằng bao nhiêu?',
    expectedAnswer: 14,
    tolerance: 0.01,
    answerFormatHint: 'Nhập số nguyên (ví dụ: 14)',
    explanation:
      'Thay giá trị lượng giác của các góc đặc biệt:\nsin 90° = 1; cos 0° = 1; cos 60° = 1/2; cos 180° = -1.\nTa có: A = 4(1) + 3(1) - 5(1/2) + 8(-1) = 7 - 5/2 - 8 = -1 - 5/2 = -7/2.\nĐối chiếu với dạng -a/b (phân số tối giản), ta được a = 7, b = 2.\nVậy T = a·b = 7 · 2 = 14.',
  },
  {
    topic: 'Tính giá trị biểu thức lượng giác các góc đặc biệt',
    level: 'Thông hiểu',
    originalRef: 'Câu 16 đề gốc: Rút gọn biểu thức lượng giác các góc đặc biệt',
    prompt: 'Biết giá trị của biểu thức P = 2·sin 30° + 5·cos 90° - 3·tan 135° - 7·cos 120° có dạng phân số tối giản a/b (với a, b ∈ ℕ*). Giá trị của biểu thức T = a + b bằng bao nhiêu?',
    expectedAnswer: 17,
    tolerance: 0.01,
    answerFormatHint: 'Nhập số nguyên (ví dụ: 17)',
    explanation:
      'Ta có: sin 30° = 1/2; cos 90° = 0; tan 135° = -1; cos 120° = -1/2.\nThay vào P: P = 2(1/2) + 5(0) - 3(-1) - 7(-1/2) = 1 + 0 + 3 + 7/2 = 4 + 7/2 = 15/2.\nVì 15/2 tối giản nên a = 15, b = 2 ⇒ T = a + b = 15 + 2 = 17.',
  },
];

const SLOT_17_VARIANTS: Omit<ShortAnswerQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Phép toán tập hợp trên ℝ & Đếm phần tử nguyên/tự nhiên',
    level: 'Thông hiểu',
    originalRef: 'Câu 17 đề gốc: Tìm A \\ B hoặc A ∩ B của hai khoảng/đoạn và đếm số tự nhiên',
    prompt: 'Cho hai tập hợp A = [2018; 2030] và B = (2023; +∞). Tập hợp A \\ B chứa bao nhiêu số tự nhiên?',
    expectedAnswer: 6,
    tolerance: 0.01,
    answerFormatHint: 'Nhập số nguyên (số lượng phần tử)',
    explanation:
      'Ta có A = [2018; 2030] và B = (2023; +∞).\nKhi đó hiệu A \\ B = [2018; 2023].\nCác số tự nhiên thuộc đoạn [2018; 2023] là: 2018; 2019; 2020; 2021; 2022; 2023.\nSố lượng số tự nhiên là: (2023 - 2018) + 1 = 6 (số).',
  },
  {
    topic: 'Phép toán tập hợp trên ℝ & Đếm phần tử nguyên/tự nhiên',
    level: 'Thông hiểu',
    originalRef: 'Câu 17 đề gốc: Xác định tập hợp kết quả trên ℝ và đếm số tự nhiên',
    prompt: 'Cho hai tập hợp A = [10; 25] và B = (17; +∞). Tập hợp A \\ B có tất cả bao nhiêu số tự nhiên?',
    expectedAnswer: 8,
    tolerance: 0.01,
    answerFormatHint: 'Nhập số nguyên',
    explanation:
      'Ta có A \\ B = [10; 17] (vì 17 ∉ B nên 17 vẫn thuộc A \\ B).\nCác số tự nhiên trong đoạn [10; 17] gồm: 10, 11, 12, 13, 14, 15, 16, 17.\nTổng cộng có (17 - 10) + 1 = 8 số tự nhiên.',
  },
];

const SLOT_18_VARIANTS: Omit<ShortAnswerQuestion, 'id' | 'number'>[] = [
  {
    topic: 'Tính giá trị biểu thức lượng giác khi biết tan α',
    level: 'Vận dụng',
    originalRef: 'Câu 18 đề gốc: Cho tan α = k, tính biểu thức phân thức theo sin α và cos α',
    prompt: 'Cho góc α thỏa mãn tan α = 2. Tính giá trị của biểu thức A = (4·sin α + 5·cos α) / (3·sin α - 5·cos α).',
    expectedAnswer: 13,
    tolerance: 0.01,
    answerFormatHint: 'Nhập số nguyên hoặc thập phân',
    explanation:
      'Vì tan α = 2 nên cos α ≠ 0. Chia cả tử và mẫu của biểu thức A cho cos α, ta được:\nA = (4·tan α + 5) / (3·tan α - 5) = (4·2 + 5) / (3·2 - 5) = 13 / 1 = 13.',
  },
  {
    topic: 'Tính giá trị biểu thức lượng giác khi biết tan α',
    level: 'Vận dụng',
    originalRef: 'Câu 18 đề gốc: Chia tử và mẫu cho cos α khi biết tan α',
    prompt: 'Cho biết tan α = 4. Tính giá trị của biểu thức M = (5·sin α - 2·cos α) / (sin α - 2·cos α).',
    expectedAnswer: 9,
    tolerance: 0.01,
    answerFormatHint: 'Nhập số nguyên hoặc thập phân',
    explanation:
      'Vì tan α = 4 nên cos α ≠ 0. Chia cả tử và mẫu của M cho cos α:\nM = (5·tan α - 2) / (tan α - 2) = (5·4 - 2) / (4 - 2) = 18 / 2 = 9.',
  },
];

const SLOT_19_VARIANTS: Omit<EssayClozeQuestion, 'id' | 'number'>[] = [
  {
    points: 1.0,
    topic: 'Các phép toán tập hợp trên ℝ và biểu diễn trên trục số',
    level: 'Thông hiểu',
    originalRef: 'Câu 19 đề gốc (1,0 điểm): Xác định A ∩ B, A ∪ B và biểu diễn trên trục số',
    prompt: 'Cho hai tập hợp A = (-2; 3) và B = [1; 5). Hãy điền vào các chỗ trống trong các bước giải dưới đây để xác định A ∩ B, A ∪ B và hoàn thành biểu diễn trên trục số.',
    diagram: {
      type: 'number_line',
      setALabel: 'A = (-2; 3)',
      setAStart: -2,
      setAEnd: 3,
      setALeftBracket: '(',
      setARightBracket: ')',
      setBLabel: 'B = [1; 5)',
      setBStart: 1,
      setBEnd: 5,
      setBLeftBracket: '[',
      setBRightBracket: ')',
      intersectionText: 'A ∩ B = [1; 3)',
      unionText: 'A ∪ B = (-2; 5)',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Biểu diễn điều kiện xác định của từng tập hợp',
        template:
          'Ta viết lại hai tập hợp dưới dạng tính chất đặc trưng: A = {x ∈ ℝ | {{b1}} < x < {{b2}}} và B = {x ∈ ℝ | {{b3}} ≤ x < 5}.',
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Xác định giao của hai tập hợp A ∩ B',
        template:
          'Lấy phần chung của A và B trên trục số: x thuộc A ∩ B khi đồng thời thỏa mãn x ≥ {{b4}} và x < {{b5}}. Do đó: A ∩ B = {{b6}}{{b4}}; {{b5}}).',
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Xác định hợp của hai tập hợp A ∪ B',
        template:
          'Gộp toàn bộ các phần tử thuộc A hoặc thuộc B trên trục số từ đầu mút nhỏ nhất đến đầu mút lớn nhất, ta được: A ∪ B = ({{b7}}; {{b8}}).',
      },
    ],
    blanks: [
      {
        id: 'b1',
        label: 'Câu 19 - Đầu mút trái của tập A',
        placeholder: '-2',
        acceptedAnswers: ['-2'],
        displayAnswer: '-2',
      },
      {
        id: 'b2',
        label: 'Câu 19 - Đầu mút phải của tập A',
        placeholder: '3',
        acceptedAnswers: ['3'],
        displayAnswer: '3',
      },
      {
        id: 'b3',
        label: 'Câu 19 - Đầu mút trái của tập B',
        placeholder: '1',
        acceptedAnswers: ['1'],
        displayAnswer: '1',
      },
      {
        id: 'b4',
        label: 'Câu 19 - Đầu mút trái của A giao B',
        placeholder: '1',
        acceptedAnswers: ['1'],
        displayAnswer: '1',
      },
      {
        id: 'b5',
        label: 'Câu 19 - Đầu mút phải của A giao B',
        placeholder: '3',
        acceptedAnswers: ['3'],
        displayAnswer: '3',
      },
      {
        id: 'b6',
        label: 'Câu 19 - Kí hiệu ngoặc trái của A giao B',
        placeholder: '[ hoặc (',
        acceptedAnswers: ['['],
        displayAnswer: '[',
        inputType: 'select',
        options: ['[', '('],
      },
      {
        id: 'b7',
        label: 'Câu 19 - Đầu mút trái của A hợp B',
        placeholder: '-2',
        acceptedAnswers: ['-2'],
        displayAnswer: '-2',
      },
      {
        id: 'b8',
        label: 'Câu 19 - Đầu mút phải của A hợp B',
        placeholder: '5',
        acceptedAnswers: ['5'],
        displayAnswer: '5',
      },
    ],
    fullExplanation:
      '• Tập A = (-2; 3) gồm các số thực x mà -2 < x < 3.\n• Tập B = [1; 5) gồm các số thực x mà 1 ≤ x < 5.\n• Khi tìm A ∩ B: lấy các phần tử thuộc cả A và B, tức là 1 ≤ x < 3 ⇒ A ∩ B = [1; 3).\n• Khi tìm A ∪ B: lấy các phần tử thuộc A hoặc B, trải dài từ -2 đến 5 ⇒ A ∪ B = (-2; 5).',
  },
  {
    points: 1.0,
    topic: 'Các phép toán tập hợp trên ℝ và biểu diễn trên trục số',
    level: 'Thông hiểu',
    originalRef: 'Câu 19 đề gốc (1,0 điểm): Xác định giao và hợp của hai tập con của ℝ',
    prompt: 'Cho hai tập hợp A = (-3; 4) và B = [0; 6). Hãy điền khuyết vào các bước giải dưới đây để hoàn thành việc tìm A ∩ B và A ∪ B.',
    diagram: {
      type: 'number_line',
      setALabel: 'A = (-3; 4)',
      setAStart: -3,
      setAEnd: 4,
      setALeftBracket: '(',
      setARightBracket: ')',
      setBLabel: 'B = [0; 6)',
      setBStart: 0,
      setBEnd: 6,
      setBLeftBracket: '[',
      setBRightBracket: ')',
      intersectionText: 'A ∩ B = [0; 4)',
      unionText: 'A ∪ B = (-3; 6)',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Xác định điều kiện của phần tử thuộc tập A và tập B',
        template:
          'Ta có: x ∈ A ⇔ {{b1}} < x < {{b2}} và x ∈ B ⇔ {{b3}} ≤ x < 6.',
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Tìm tập hợp giao A ∩ B',
        template:
          'Để x ∈ A ∩ B thì x vừa thuộc A vừa thuộc B, suy ra {{b4}} ≤ x < {{b5}}. Vậy A ∩ B = {{b6}}{{b4}}; {{b5}}).',
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Tìm tập hợp hợp A ∪ B',
        template:
          'Để x ∈ A ∪ B thì x thuộc ít nhất một trong hai tập hợp, suy ra -3 < x < 6. Vậy A ∪ B = ({{b7}}; {{b8}}).',
      },
    ],
    blanks: [
      {
        id: 'b1',
        label: 'Câu 19 - Cận dưới của A',
        placeholder: '-3',
        acceptedAnswers: ['-3'],
        displayAnswer: '-3',
      },
      {
        id: 'b2',
        label: 'Câu 19 - Cận trên của A',
        placeholder: '4',
        acceptedAnswers: ['4'],
        displayAnswer: '4',
      },
      {
        id: 'b3',
        label: 'Câu 19 - Cận dưới của B',
        placeholder: '0',
        acceptedAnswers: ['0'],
        displayAnswer: '0',
      },
      {
        id: 'b4',
        label: 'Câu 19 - Đầu mút trái của A giao B',
        placeholder: '0',
        acceptedAnswers: ['0'],
        displayAnswer: '0',
      },
      {
        id: 'b5',
        label: 'Câu 19 - Đầu mút phải của A giao B',
        placeholder: '4',
        acceptedAnswers: ['4'],
        displayAnswer: '4',
      },
      {
        id: 'b6',
        label: 'Câu 19 - Dấu ngoặc trái của A giao B',
        placeholder: '[ hoặc (',
        acceptedAnswers: ['['],
        displayAnswer: '[',
        inputType: 'select',
        options: ['[', '('],
      },
      {
        id: 'b7',
        label: 'Câu 19 - Đầu mút trái của A hợp B',
        placeholder: '-3',
        acceptedAnswers: ['-3'],
        displayAnswer: '-3',
      },
      {
        id: 'b8',
        label: 'Câu 19 - Đầu mút phải của A hợp B',
        placeholder: '6',
        acceptedAnswers: ['6'],
        displayAnswer: '6',
      },
    ],
    fullExplanation:
      '• Biểu diễn A = (-3; 4) và B = [0; 6) trên trục số.\n• Phần chung của hai tập hợp là nửa khoảng từ 0 (có lấy dấu bằng vì 0 ∈ A và 0 ∈ B) đến 4 (ngoặc tròn vì 4 ∉ A): A ∩ B = [0; 4).\n• Hợp của hai tập hợp nối liền từ -3 đến 6: A ∪ B = (-3; 6).',
  },
];

const SLOT_20_VARIANTS: Omit<EssayClozeQuestion, 'id' | 'number'>[] = [
  {
    points: 1.0,
    topic: 'Ứng dụng hệ bất phương trình bậc nhất hai ẩn (Bài toán tối ưu thực tế)',
    level: 'Vận dụng cao',
    originalRef: 'Câu 20 đề gốc (1,0 điểm): Bài toán tìm lợi nhuận lớn nhất bằng hệ BPT bậc nhất hai ẩn',
    prompt:
      'Một cơ sở gốm sứ nghệ thuật sản xuất hai mẫu bình gốm loại I và loại II. Mỗi bộ bình loại I lãi 6 triệu đồng, mỗi bộ bình loại II lãi 5 triệu đồng. Để hoàn thiện một bộ bình loại I cần 2 giờ chạy lò nung và 3 giờ nghệ nhân vẽ họa tiết. Để hoàn thiện một bộ bình loại II cần 2 giờ chạy lò nung và 1 giờ nghệ nhân vẽ họa tiết. Trong một ngày, lò nung hoạt động không quá 12 giờ và nhóm nghệ nhân làm việc không quá 12 giờ. Hãy hoàn thành các bước giải dưới đây để tìm số tiền lãi lớn nhất cơ sở đạt được trong một ngày.',
    diagram: {
      type: 'linear_programming',
      vertices: [
        { label: 'O(0; 0)', x: 0, y: 0, value: 0 },
        { label: 'A(4; 0)', x: 4, y: 0, value: 24 },
        { label: 'B(3; 3)', x: 3, y: 3, value: 33 },
        { label: 'C(0; 6)', x: 0, y: 6, value: 30 },
      ],
      optimalVertex: 'B(3; 3)',
      xLabel: 'Số bộ bình loại I (x)',
      yLabel: 'Số bộ bình loại II (y)',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Gọi ẩn và lập điều kiện theo thời gian máy & nhân công',
        template:
          'Gọi x, y (x ≥ 0, y ≥ 0) lần lượt là số bộ bình loại I và loại II sản xuất trong một ngày.\n• Thời gian chạy lò nung là 2x + 2y ≤ {{b1}} ⇔ x + y ≤ {{b2}}.\n• Thời gian nghệ nhân vẽ họa tiết là {{b3}}x + y ≤ 12.',
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Lập hàm mục tiêu lợi nhuận và xác định các đỉnh miền nghiệm',
        template:
          'Số tiền lãi thu được (đơn vị: triệu đồng) là F(x; y) = {{b4}}x + 5y.\nMiền nghiệm của hệ bất phương trình là miền tứ giác OABC với các đỉnh: O(0; 0), A(4; 0), B({{b5}}; 3) và C(0; 6).',
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Tính giá trị lợi nhuận tại các đỉnh và kết luận',
        template:
          'Tính giá trị của F(x; y) tại các đỉnh:\n• F(0; 0) = 0;  F(4; 0) = {{b6}};  F(3; 3) = {{b7}};  F(0; 6) = 30.\nVậy số tiền lãi lớn nhất cơ sở đạt được trong một ngày là {{b7}} triệu đồng (khi sản xuất 3 bộ loại I và 3 bộ loại II).',
      },
    ],
    blanks: [
      {
        id: 'b1',
        label: 'Câu 20 - Tổng số giờ lò nung tối đa',
        placeholder: '12',
        acceptedAnswers: ['12'],
        displayAnswer: '12',
      },
      {
        id: 'b2',
        label: 'Câu 20 - Vế phải sau khi rút gọn BPT lò nung',
        placeholder: '6',
        acceptedAnswers: ['6'],
        displayAnswer: '6',
      },
      {
        id: 'b3',
        label: 'Câu 20 - Hệ số giờ nghệ nhân của loại I',
        placeholder: '3',
        acceptedAnswers: ['3'],
        displayAnswer: '3',
      },
      {
        id: 'b4',
        label: 'Câu 20 - Tiền lãi mỗi bộ loại I',
        placeholder: '6',
        acceptedAnswers: ['6'],
        displayAnswer: '6',
      },
      {
        id: 'b5',
        label: 'Câu 20 - Hoành độ giao điểm B',
        placeholder: '3',
        acceptedAnswers: ['3'],
        displayAnswer: '3',
      },
      {
        id: 'b6',
        label: 'Câu 20 - Giá trị F(4; 0)',
        placeholder: '24',
        acceptedAnswers: ['24'],
        displayAnswer: '24',
      },
      {
        id: 'b7',
        label: 'Câu 20 - Giá trị lãi lớn nhất F(3; 3)',
        placeholder: '33',
        acceptedAnswers: ['33'],
        displayAnswer: '33',
      },
    ],
    fullExplanation:
      '• Hệ bất phương trình ràng buộc: { x ≥ 0 ; y ≥ 0 ; x + y ≤ 6 ; 3x + y ≤ 12 }.\n• Giao điểm B của hai đường thẳng x + y = 6 và 3x + y = 12 là nghiệm của hệ: 2x = 6 ⇒ x = 3, y = 3 ⇒ B(3; 3).\n• Thay tọa độ 4 đỉnh O(0;0), A(4;0), B(3;3), C(0;6) vào hàm tiền lãi F(x; y) = 6x + 5y:\n  F(0;0) = 0; F(4;0) = 24; F(3;3) = 6·3 + 5·3 = 33; F(0;6) = 30.\n• Vậy lợi nhuận lớn nhất là 33 triệu đồng.',
  },
  {
    points: 1.0,
    topic: 'Ứng dụng hệ bất phương trình bậc nhất hai ẩn (Bài toán tối ưu thực tế)',
    level: 'Vận dụng cao',
    originalRef: 'Câu 20 đề gốc (1,0 điểm): Bài toán thực tế tối ưu hóa lợi nhuận sản xuất',
    prompt:
      'Một hợp tác xã nông nghiệp dự định trồng hai loại cây ăn quả là Bưởi da xanh (loại I) và Cam sành (loại II) trên diện tích đất canh tác không quá 8 ha. Mỗi ha Bưởi cần 20 ngày công chăm sóc và thu lãi 70 triệu đồng; mỗi ha Cam cần 10 ngày công chăm sóc và thu lãi 50 triệu đồng. Biết tổng số ngày công chăm sóc không vượt quá 120 ngày công. Hoàn thành các bước giải dưới đây để tìm lợi nhuận lớn nhất.',
    diagram: {
      type: 'linear_programming',
      vertices: [
        { label: 'O(0; 0)', x: 0, y: 0, value: 0 },
        { label: 'A(6; 0)', x: 6, y: 0, value: 420 },
        { label: 'B(4; 4)', x: 4, y: 4, value: 480 },
        { label: 'C(0; 8)', x: 0, y: 8, value: 400 },
      ],
      optimalVertex: 'B(4; 4)',
      xLabel: 'Diện tích Bưởi (x ha)',
      yLabel: 'Diện tích Cam (y ha)',
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Gọi ẩn và thiết lập hệ bất phương trình ràng buộc',
        template:
          'Gọi x, y (x ≥ 0, y ≥ 0) lần lượt là diện tích trồng Bưởi và Cam (đơn vị: ha).\n• Điều kiện diện tích đất: x + y ≤ {{b1}}.\n• Điều kiện ngày công: 20x + 10y ≤ 120 ⇔ {{b2}}x + y ≤ {{b3}}.',
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Biểu thức lợi nhuận và tọa độ các đỉnh miền nghiệm',
        template:
          'Tổng lợi nhuận (triệu đồng) là F(x; y) = {{b4}}x + 50y.\nMiền nghiệm là tứ giác OABC với các đỉnh: O(0; 0), A(6; 0), B({{b5}}; 4) và C(0; 8).',
      },
      {
        stepNumber: 3,
        title: 'Bước 3: So sánh giá trị tại các đỉnh và kết luận',
        template:
          'Ta có: F(0; 0) = 0;  F(6; 0) = {{b6}};  F(4; 4) = {{b7}};  F(0; 8) = 400.\nVậy lợi nhuận lớn nhất đạt được là {{b7}} triệu đồng (khi trồng 4 ha Bưởi và 4 ha Cam).',
      },
    ],
    blanks: [
      {
        id: 'b1',
        label: 'Câu 20 - Tổng diện tích tối đa',
        placeholder: '8',
        acceptedAnswers: ['8'],
        displayAnswer: '8',
      },
      {
        id: 'b2',
        label: 'Câu 20 - Hệ số của x sau khi rút gọn BPT ngày công',
        placeholder: '2',
        acceptedAnswers: ['2'],
        displayAnswer: '2',
      },
      {
        id: 'b3',
        label: 'Câu 20 - Vế phải sau khi rút gọn BPT ngày công',
        placeholder: '12',
        acceptedAnswers: ['12'],
        displayAnswer: '12',
      },
      {
        id: 'b4',
        label: 'Câu 20 - Lợi nhuận mỗi ha Bưởi',
        placeholder: '70',
        acceptedAnswers: ['70'],
        displayAnswer: '70',
      },
      {
        id: 'b5',
        label: 'Câu 20 - Hoành độ đỉnh B',
        placeholder: '4',
        acceptedAnswers: ['4'],
        displayAnswer: '4',
      },
      {
        id: 'b6',
        label: 'Câu 20 - Giá trị F(6; 0)',
        placeholder: '420',
        acceptedAnswers: ['420'],
        displayAnswer: '420',
      },
      {
        id: 'b7',
        label: 'Câu 20 - Lợi nhuận lớn nhất F(4; 4)',
        placeholder: '480',
        acceptedAnswers: ['480'],
        displayAnswer: '480',
      },
    ],
    fullExplanation:
      '• Hệ bất phương trình: { x ≥ 0 ; y ≥ 0 ; x + y ≤ 8 ; 2x + y ≤ 12 }.\n• Giao điểm B của x + y = 8 và 2x + y = 12 là B(4; 4).\n• Thay vào hàm lợi nhuận F(x; y) = 70x + 50y:\n  F(0;0) = 0; F(6;0) = 420; F(4;4) = 70(4) + 50(4) = 480; F(0;8) = 400.\n• Vậy lợi nhuận lớn nhất là 480 triệu đồng.',
  },
];

const SLOT_21_VARIANTS: Omit<EssayClozeQuestion, 'id' | 'number'>[] = [
  {
    points: 1.0,
    topic: 'Ứng dụng hệ thức lượng trong tam giác vào đo đạc thực tế',
    level: 'Vận dụng',
    originalRef: 'Câu 21 đề gốc (1,0 điểm): Tính chiều cao CD = h của tháp từ hai vị trí ngắm thẳng hàng A, B',
    prompt:
      'Giả sử CD = h là chiều cao của một ngọn hải đăng trong đó C là chân hải đăng trên mặt đất phẳng. Chọn hai điểm quan sát A, B trên mặt đất sao cho ba điểm C, A, B thẳng hàng theo thứ tự đó. Người ta đo được khoảng cách AB = 30 m, góc nâng tại A là ∠CAD = 60° và góc nâng tại B là ∠CBD = 45°. Hãy điền vào chỗ trống để hoàn thành lời giải tính chiều cao h của ngọn hải đăng (làm tròn kết quả đến hàng phần mười).',
    diagram: {
      type: 'surveying_tower',
      objectName: 'ngọn hải đăng',
      topPoint: 'D',
      footPoint: 'C',
      nearPoint: 'A',
      farPoint: 'B',
      distanceAB: 30,
      angleNearDeg: 60,
      angleFarDeg: 45,
      heightResult: 71.0,
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Tính các góc trong tam giác ABD',
        template:
          'Vì ∠CAD là góc ngoài tại đỉnh A của tam giác ABD nên ta có:\n∠ADB = ∠CAD - ∠CBD = {{b1}}° - {{b2}}° = {{b3}}°.',
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Áp dụng định lí sin trong tam giác ABD để tính cạnh AD',
        template:
          'Xét tam giác ABD, theo định lí sin ta có:\nAD / sin ∠ABD = AB / sin ∠ADB ⇒ AD = ({{b4}} · sin {{b2}}°) / sin {{b3}}° ≈ {{b5}} (m).',
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Tính chiều cao h = CD trong tam giác vuông ACD',
        template:
          'Xét tam giác ACD vuông tại C, ta có:\nh = CD = AD · sin {{b1}}° ≈ {{b6}} (m).',
      },
    ],
    blanks: [
      {
        id: 'b1',
        label: 'Câu 21 - Số đo góc CAD',
        placeholder: '60',
        acceptedAnswers: ['60', '60°'],
        displayAnswer: '60',
      },
      {
        id: 'b2',
        label: 'Câu 21 - Số đo góc CBD',
        placeholder: '45',
        acceptedAnswers: ['45', '45°'],
        displayAnswer: '45',
      },
      {
        id: 'b3',
        label: 'Câu 21 - Số đo góc ADB',
        placeholder: '15',
        acceptedAnswers: ['15', '15°'],
        displayAnswer: '15',
      },
      {
        id: 'b4',
        label: 'Câu 21 - Độ dài đoạn AB',
        placeholder: '30',
        acceptedAnswers: ['30'],
        displayAnswer: '30',
      },
      {
        id: 'b5',
        label: 'Câu 21 - Độ dài cạnh AD (làm tròn hàng phần mười)',
        placeholder: '81,9',
        acceptedAnswers: ['81.9', '81,9', '82', '82.0'],
        displayAnswer: '81,9',
      },
      {
        id: 'b6',
        label: 'Câu 21 - Chiều cao h của hải đăng (làm tròn hàng phần mười)',
        placeholder: '71,0',
        acceptedAnswers: ['71.0', '71,0', '71', '70.9', '70,9'],
        displayAnswer: '71,0',
      },
    ],
    fullExplanation:
      '• Bước 1: Trong ∆ABD, góc ngoài tại đỉnh A là ∠CAD = 60°, suy ra ∠ADB = ∠CAD - ∠CBD = 60° - 45° = 15°.\n• Bước 2: Áp dụng định lí sin trong ∆ABD:\n  AD / sin 45° = AB / sin 15° ⇒ AD = (30 · sin 45°) / sin 15° ≈ 81,96 m (làm tròn 81,9 m hoặc 82,0 m).\n• Bước 3: Trong tam giác vuông ACD (vuông tại C):\n  h = CD = AD · sin 60° = (30 · sin 45° · sin 60°) / sin 15° ≈ 71,0 (m).',
  },
  {
    points: 1.0,
    topic: 'Ứng dụng hệ thức lượng trong tam giác vào đo đạc thực tế',
    level: 'Vận dụng',
    originalRef: 'Câu 21 đề gốc (1,0 điểm): Bài toán đo chiều cao tháp truyền hình bằng giác kế',
    prompt:
      'Để đo chiều cao CD = h của một tháp truyền hình (với C là chân tháp), người ta chọn hai điểm A và B trên mặt đất sao cho C, A, B thẳng hàng. Khoảng cách AB = 20 m, góc nhìn lên đỉnh tháp tại A là ∠CAD = 65° và tại B là ∠CBD = 50°. Hãy điền vào các chỗ trống trong lời giải dưới đây để tìm chiều cao h (làm tròn đến hàng phần mười).',
    diagram: {
      type: 'surveying_tower',
      objectName: 'tháp truyền hình',
      topPoint: 'D',
      footPoint: 'C',
      nearPoint: 'A',
      farPoint: 'B',
      distanceAB: 20,
      angleNearDeg: 65,
      angleFarDeg: 50,
      heightResult: 53.6,
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Bước 1: Xác định góc ∠ADB trong tam giác ABD',
        template:
          'Ta có ∠CAD là góc ngoài tại đỉnh A của ∆ABD nên:\n∠ADB = ∠CAD - ∠CBD = {{b1}}° - {{b2}}° = {{b3}}°.',
      },
      {
        stepNumber: 2,
        title: 'Bước 2: Tính cạnh AD bằng định lí sin trong tam giác ABD',
        template:
          'Áp dụng định lí sin trong ∆ABD:\nAD / sin ∠ABD = AB / sin ∠ADB ⇒ AD = ({{b4}} · sin {{b2}}°) / sin {{b3}}° ≈ {{b5}} (m).',
      },
      {
        stepNumber: 3,
        title: 'Bước 3: Tính chiều cao CD = h trong tam giác vuông ACD',
        template:
          'Trong ∆ACD vuông tại C:\nh = CD = AD · sin {{b1}}° ≈ {{b6}} (m).',
      },
    ],
    blanks: [
      {
        id: 'b1',
        label: 'Câu 21 - Góc nâng tại A (độ)',
        placeholder: '65',
        acceptedAnswers: ['65', '65°'],
        displayAnswer: '65',
      },
      {
        id: 'b2',
        label: 'Câu 21 - Góc nâng tại B (độ)',
        placeholder: '50',
        acceptedAnswers: ['50', '50°'],
        displayAnswer: '50',
      },
      {
        id: 'b3',
        label: 'Câu 21 - Góc ADB (độ)',
        placeholder: '15',
        acceptedAnswers: ['15', '15°'],
        displayAnswer: '15',
      },
      {
        id: 'b4',
        label: 'Câu 21 - Khoảng cách AB (m)',
        placeholder: '20',
        acceptedAnswers: ['20'],
        displayAnswer: '20',
      },
      {
        id: 'b5',
        label: 'Câu 21 - Độ dài cạnh AD (m)',
        placeholder: '59,2',
        acceptedAnswers: ['59.2', '59,2', '59.1', '59,1'],
        displayAnswer: '59,2',
      },
      {
        id: 'b6',
        label: 'Câu 21 - Chiều cao h của tháp (m)',
        placeholder: '53,6',
        acceptedAnswers: ['53.6', '53,6', '53.7', '53,7'],
        displayAnswer: '53,6',
      },
    ],
    fullExplanation:
      '• Bước 1: ∠ADB = 65° - 50° = 15°.\n• Bước 2: Trong ∆ABD, AD = (20 · sin 50°) / sin 15° ≈ 59,2 m.\n• Bước 3: Trong tam giác vuông ACD, h = CD = AD · sin 65° ≈ 53,6 m.',
  },
];

/**
 * Helper to assemble an ExamPaper from variant indices (0 or 1 or 2)
 */
function buildExamFromIndices(
  id: string,
  code: string,
  title: string,
  subtitle: string,
  variantIndex: number
): ExamPaper {
  const pick = <T,>(arr: T[], idx: number): T => arr[idx % arr.length];

  const slots1To12 = [
    SLOT_1_VARIANTS,
    SLOT_2_VARIANTS,
    SLOT_3_VARIANTS,
    SLOT_4_VARIANTS,
    SLOT_5_VARIANTS,
    SLOT_6_VARIANTS,
    SLOT_7_VARIANTS,
    SLOT_8_VARIANTS,
    SLOT_9_VARIANTS,
    SLOT_10_VARIANTS,
    SLOT_11_VARIANTS,
    SLOT_12_VARIANTS,
  ];

  const part1: MultipleChoiceQuestion[] = slots1To12.map((pool, i) => ({
    ...pick(pool, variantIndex),
    id: `${id}-q${i + 1}`,
    number: i + 1,
  }));

  const part2: TrueFalseQuestion[] = [
    {
      ...pick(SLOT_13_VARIANTS, variantIndex),
      id: `${id}-q13`,
      number: 13,
    },
    {
      ...pick(SLOT_14_VARIANTS, variantIndex),
      id: `${id}-q14`,
      number: 14,
    },
  ];

  const part3: ShortAnswerQuestion[] = [
    {
      ...pick(SLOT_15_VARIANTS, variantIndex),
      id: `${id}-q15`,
      number: 15,
    },
    {
      ...pick(SLOT_16_VARIANTS, variantIndex),
      id: `${id}-q16`,
      number: 16,
    },
    {
      ...pick(SLOT_17_VARIANTS, variantIndex),
      id: `${id}-q17`,
      number: 17,
    },
    {
      ...pick(SLOT_18_VARIANTS, variantIndex),
      id: `${id}-q18`,
      number: 18,
    },
  ];

  const part4: EssayClozeQuestion[] = [
    {
      ...pick(SLOT_19_VARIANTS, variantIndex),
      id: `${id}-q19`,
      number: 19,
    },
    {
      ...pick(SLOT_20_VARIANTS, variantIndex),
      id: `${id}-q20`,
      number: 20,
    },
    {
      ...pick(SLOT_21_VARIANTS, variantIndex),
      id: `${id}-q21`,
      number: 21,
    },
  ];

  return {
    id,
    code,
    title,
    subtitle,
    schoolHeader: 'TRƯỜNG THPT SỐ 1 TRẦN PHÚ · TỔ TOÁN - TIN',
    durationMinutes: 90,
    part1,
    part2,
    part3,
    part4,
  };
}

/**
 * Exact Reference Exam from the user's attached PDF:
 * "ĐỀ ÔN THI GIỮA HỌC KÌ 1 - MÔN : TOÁN 10 - TRƯỜNG THPT SỐ 1 TRẦN PHÚ"
 */
export const ORIGINAL_EXAM_TRAN_PHU: ExamPaper = {
  id: 'de-goc-tran-phu',
  code: 'MÃ ĐỀ GỐC',
  title: 'ĐỀ GỐC ÔN THI GIỮA HỌC KÌ 1 - TOÁN 10',
  subtitle: 'Đề gốc Trường THPT Số 1 Trần Phú (Kèm điền khuyết các bước giải Tự luận)',
  schoolHeader: 'TRƯỜNG THPT SỐ 1 TRẦN PHÚ · TỔ TOÁN - TIN',
  durationMinutes: 90,
  isOriginalReference: true,
  part1: [
    {
      id: 'orig-q1',
      number: 1,
      topic: 'Mệnh đề toán học',
      level: 'Nhận biết',
      originalRef: 'Câu 1 đề gốc',
      prompt: 'Trong các câu dưới đây, câu nào là mệnh đề toán học?',
      options: [
        'Hôm nay trời nóng quá!',
        '7 là một số nguyên tố.',
        'Bạn có thích học toán không?',
        'Ở đây đẹp quá!',
      ],
      correctIndex: 1,
      explanation:
        'Câu "7 là một số nguyên tố" là một câu khẳng định đúng nên là mệnh đề toán học. Các câu A, D là câu cảm thán; câu C là câu nghi vấn nên không phải mệnh đề.',
    },
    {
      id: 'orig-q2',
      number: 2,
      topic: 'Mệnh đề kéo theo & Mệnh đề đảo',
      level: 'Nhận biết',
      originalRef: 'Câu 2 đề gốc',
      prompt: 'Mệnh đề đảo của mệnh đề A ⇒ B là mệnh đề nào?',
      options: ['Ā ⇒ B.', 'B ⇒ Ā.', 'B ⇒ A.', 'B̄ ⇒ Ā.'],
      correctIndex: 2,
      explanation: 'Mệnh đề đảo của mệnh đề kéo theo A ⇒ B là mệnh đề B ⇒ A.',
    },
    {
      id: 'orig-q3',
      number: 3,
      topic: 'Kí hiệu lượng từ ∀ và ∃',
      level: 'Thông hiểu',
      originalRef: 'Câu 3 đề gốc',
      prompt:
        'Viết mệnh đề sau, sử dụng kí hiệu ∀ hoặc ∃: "Có một số nguyên bằng bình phương của chính nó".',
      options: [
        '∃x ∈ ℝ, x = x².',
        '∃x ∈ ℝ, x² - x = 0.',
        '∀x ∈ ℤ, x² = x.',
        '∃x ∈ ℤ, x = x².',
      ],
      correctIndex: 3,
      explanation:
        '"Có một số nguyên" ứng với kí hiệu tồn tại trên tập số nguyên: ∃x ∈ ℤ; "bằng bình phương của chính nó" là x = x². Vậy đáp án đúng là ∃x ∈ ℤ, x = x².',
    },
    {
      id: 'orig-q4',
      number: 4,
      topic: 'Mệnh đề tương đương, Điều kiện cần và đủ',
      level: 'Thông hiểu',
      originalRef: 'Câu 4 đề gốc',
      prompt:
        'Cho hai mệnh đề P và Q. Cách phát biểu nào sau đây KHÔNG THỂ dùng để phát biểu mệnh đề P ⇔ Q?',
      options: [
        'P là điều kiện cần và đủ để có Q.',
        'P là điều kiện đủ để có Q.',
        'P nếu và chỉ nếu Q.',
        'P khi và chỉ khi Q.',
      ],
      correctIndex: 1,
      explanation:
        '"P là điều kiện đủ để có Q" chỉ dùng để phát biểu mệnh đề một chiều P ⇒ Q, không thể dùng cho mệnh đề tương đương hai chiều P ⇔ Q.',
    },
    {
      id: 'orig-q5',
      number: 5,
      topic: 'Các phép toán trên tập hợp hữu hạn',
      level: 'Nhận biết',
      originalRef: 'Câu 5 đề gốc',
      prompt:
        'Cho hai tập hợp A = {-1; 2; 3; 5; 7; 9}, B = {1; 2; 3; 4; 9}. Khi đó giao của hai tập hợp là:',
      options: [
        'A ∩ B = {-1}.',
        'A ∩ B = {2; 3; 9}.',
        'A ∩ B = {-1; 2; 3; 4; 5; 7}.',
        'A ∩ B = {7}.',
      ],
      correctIndex: 1,
      explanation:
        'Giao của hai tập hợp A và B gồm các phần tử thuộc cả A và B: A ∩ B = {2; 3; 9}.',
    },
    {
      id: 'orig-q6',
      number: 6,
      topic: 'Quan hệ phần tử và tập hợp con (∈, ∉, ⊂, ⊄)',
      level: 'Nhận biết',
      originalRef: 'Câu 6 đề gốc',
      prompt: 'Cho tập hợp B = {a; 1; b; 3}. Mệnh đề nào sau đây là SAI?',
      options: ['{1} ⊂ B.', '{-2} ⊄ B.', '3 ∉ B.', 'b ∈ B.'],
      correctIndex: 2,
      explanation:
        'Vì phần tử 3 nằm trong tập hợp B = {a; 1; b; 3} nên 3 ∈ B. Do đó mệnh đề "3 ∉ B" là sai.',
    },
    {
      id: 'orig-q7',
      number: 7,
      topic: 'Bất phương trình bậc nhất hai ẩn',
      level: 'Nhận biết',
      originalRef: 'Câu 7 đề gốc',
      prompt: 'Bất phương trình nào sau đây là bất phương trình bậc nhất hai ẩn?',
      options: [
        'x² - 7y² > 1.',
        '-2x + 7y - 9z > 0.',
        'x² - 3x + 2 > 0.',
        'x - 2y > 1.',
      ],
      correctIndex: 3,
      explanation:
        'Bất phương trình bậc nhất hai ẩn có dạng ax + by > c (với a, b không đồng thời bằng 0). Vậy x - 2y > 1 là bất phương trình bậc nhất hai ẩn.',
    },
    {
      id: 'orig-q8',
      number: 8,
      topic: 'Nghiệm của hệ bất phương trình bậc nhất hai ẩn',
      level: 'Thông hiểu',
      originalRef: 'Câu 8 đề gốc',
      prompt:
        'Trong các cặp số sau, cặp nào KHÔNG là nghiệm của hệ bất phương trình { x + y - 2 ≤ 0 ; 2x - 3y + 2 > 0 }?',
      options: ['(-1; -1).', '(-1; 1).', '(1; 1).', '(0; 0).'],
      correctIndex: 1,
      explanation:
        'Thay cặp (-1; 1) vào bất phương trình thứ hai: 2(-1) - 3(1) + 2 = -3 > 0 (vô lí). Vậy (-1; 1) không là nghiệm của hệ.',
    },
    {
      id: 'orig-q9',
      number: 9,
      topic: 'Giá trị lượng giác của góc từ 0° đến 180°',
      level: 'Nhận biết',
      originalRef: 'Câu 9 đề gốc',
      prompt: 'Cho 0° < α < 180°. Trong các đẳng thức sau, đẳng thức nào ĐÚNG?',
      options: [
        'sin(180° - α) = -cos α.',
        'sin(180° - α) = sin α.',
        'sin(180° - α) = -sin α.',
        'sin(180° - α) = cos α.',
      ],
      correctIndex: 1,
      explanation: 'Hai góc bù nhau (α và 180° - α) có sin bằng nhau: sin(180° - α) = sin α.',
    },
    {
      id: 'orig-q10',
      number: 10,
      topic: 'Giá trị lượng giác của góc đặc biệt',
      level: 'Nhận biết',
      originalRef: 'Câu 10 đề gốc',
      prompt: 'Giá trị cos 150° bằng:',
      options: ['-√3/2.', '-1/2.', '√3/2.', 'cos 30°.'],
      correctIndex: 0,
      explanation: 'Ta có cos 150° = cos(180° - 30°) = -cos 30° = -√3/2.',
    },
    {
      id: 'orig-q11',
      number: 11,
      topic: 'Định lí Côsin và Định lí Sin trong tam giác',
      level: 'Nhận biết',
      originalRef: 'Câu 11 đề gốc',
      prompt: 'Cho tam giác ABC. Biết BC = a, AC = b, AB = c. Đẳng thức nào sau đây ĐÚNG?',
      options: [
        'c² = a² + b² + 2ab cos C.',
        'c² = a² + b² - 2ab sin C.',
        'c² = a² + b² - 2ab cos C.',
        'c² = a² + b² + 2ab sin C.',
      ],
      correctIndex: 2,
      explanation: 'Theo định lí côsin trong tam giác ABC: c² = a² + b² - 2ab cos C.',
    },
    {
      id: 'orig-q12',
      number: 12,
      topic: 'Các công thức tính diện tích tam giác',
      level: 'Nhận biết',
      originalRef: 'Câu 12 đề gốc',
      prompt:
        'Cho tam giác ABC. Biết BC = a, AC = b, AB = c; R, S lần lượt là bán kính đường tròn ngoại tiếp và diện tích tam giác ABC. Mệnh đề nào dưới đây SAI?',
      options: [
        'S = (abc) / (2R).',
        'S = (1/2) ab sin C.',
        'S = (1/2) bc sin A.',
        'S = (abc) / (4R).',
      ],
      correctIndex: 0,
      explanation:
        'Công thức đúng liên hệ diện tích S và bán kính ngoại tiếp R là S = (abc)/(4R). Do đó mệnh đề A: S = (abc)/(2R) là sai.',
    },
  ],
  part2: [
    {
      id: 'orig-q13',
      number: 13,
      topic: 'Tập hợp và các phép toán trên tập hợp',
      level: 'Thông hiểu',
      originalRef: 'Câu 13 đề gốc',
      prompt:
        'Cho hai tập hợp: A = {-3; -1; 0; 2}, B = {-2; -1; 2; 4}. Các mệnh đề sau đúng hay sai?',
      statements: [
        {
          id: 'a',
          label: 'a)',
          text: 'Tập hợp A có 4 phần tử.',
          isTrue: true,
          explanation: 'Đúng. Tập hợp A = {-3; -1; 0; 2} có 4 phần tử.',
        },
        {
          id: 'b',
          label: 'b)',
          text: 'Tập hợp X = {-1; 2} là một tập hợp con của tập hợp A.',
          isTrue: true,
          explanation: 'Đúng. Cả hai phần tử -1 và 2 đều thuộc tập hợp A nên X ⊂ A.',
        },
        {
          id: 'c',
          label: 'c)',
          text: 'A ∩ B = {-2; 2}.',
          isTrue: false,
          explanation: 'Sai. Vì -2 ∉ A nên -2 ∉ A ∩ B. Giao đúng là A ∩ B = {-1; 2}.',
        },
        {
          id: 'd',
          label: 'd)',
          text: 'B \\ A = {-2; 2}.',
          isTrue: false,
          explanation:
            'Sai. Vì 2 ∈ A nên 2 bị loại khi lấy B \\ A. Kết quả đúng là B \\ A = {-2; 4}.',
        },
      ],
      generalExplanation:
        'Với A = {-3; -1; 0; 2} và B = {-2; -1; 2; 4}, ta có A ∩ B = {-1; 2} và B \\ A = {-2; 4}.',
    },
    {
      id: 'orig-q14',
      number: 14,
      topic: 'Biểu diễn miền nghiệm của hệ bất phương trình bậc nhất hai ẩn',
      level: 'Thông hiểu',
      originalRef: 'Câu 14 đề gốc',
      prompt:
        'Miền được gạch chéo trong hình bên dưới biểu diễn miền nghiệm của hệ bất phương trình (I). Các mệnh đề sau đúng hay sai?',
      diagram: {
        type: 'coordinate_region',
        xIntercept: 2,
        yIntercept: 2,
        regionType: 'first_quadrant_triangle',
        lineLabel: 'd',
        caption: 'Miền gạch chéo giới hạn bởi Ox, Oy và đường thẳng d đi qua (0; 2), (2; 0)',
      },
      statements: [
        {
          id: 'a',
          label: 'a)',
          text: 'Đường thẳng d đi qua điểm có tọa độ (0; 2).',
          isTrue: true,
          explanation: 'Đúng. Trên hình vẽ, đường thẳng d cắt trục Oy tại điểm có tung độ bằng 2, tức là điểm (0; 2).',
        },
        {
          id: 'b',
          label: 'b)',
          text: 'Các điểm thuộc miền nghiệm của hệ bất phương trình (I) đều có hoành độ không âm.',
          isTrue: true,
          explanation: 'Đúng. Miền gạch chéo nằm bên phải trục Oy nên mọi điểm thuộc miền nghiệm đều có x ≥ 0.',
        },
        {
          id: 'c',
          label: 'c)',
          text: 'Miền nghiệm của hệ bất phương trình (I) chứa điểm M(1; -1).',
          isTrue: false,
          explanation: 'Sai. Điểm M(1; -1) có tung độ y = -1 < 0 nằm bên dưới trục Ox, không thuộc miền gạch chéo.',
        },
        {
          id: 'd',
          label: 'd)',
          text: 'Miền nghiệm của hệ bất phương trình (I) là miền tam giác.',
          isTrue: true,
          explanation: 'Đúng. Miền gạch chéo là miền tam giác vuông có 3 đỉnh (0; 0), (2; 0), (0; 2).',
        },
      ],
      generalExplanation:
        'Hình vẽ biểu diễn miền nghiệm của hệ bất phương trình { x ≥ 0 ; y ≥ 0 ; x + y ≤ 2 } là miền tam giác vuông tại gốc tọa độ O.',
    },
  ],
  part3: [
    {
      id: 'orig-q15',
      number: 15,
      topic: 'Hệ thức lượng trong tam giác (Định lí Côsin)',
      level: 'Vận dụng',
      originalRef: 'Câu 15 đề gốc',
      prompt:
        'Cho tam giác ABC có góc A = 120° và AB = 5, AC = 8. Độ dài cạnh BC có dạng √a. Giá trị a bằng bao nhiêu?',
      expectedAnswer: 129,
      tolerance: 0.01,
      answerFormatHint: 'Nhập giá trị nguyên của a (ví dụ: 129)',
      explanation:
        'Áp dụng định lí côsin trong tam giác ABC:\nBC² = AB² + AC² - 2·AB·AC·cos 120° = 5² + 8² - 2·5·8·(-1/2) = 25 + 64 + 40 = 129.\nSuy ra BC = √129, vậy a = 129.',
    },
    {
      id: 'orig-q16',
      number: 16,
      topic: 'Tính giá trị biểu thức lượng giác các góc đặc biệt',
      level: 'Thông hiểu',
      originalRef: 'Câu 16 đề gốc',
      prompt:
        'Giá trị biểu thức A = 3·sin 90° + 2·cos 0° - 3·cos 60° + 10·cos 180° có dạng phân số tối giản -a/b (với a, b ∈ ℕ*). Khi đó giá trị của biểu thức T = a·b bằng bao nhiêu?',
      expectedAnswer: 26,
      tolerance: 0.01,
      answerFormatHint: 'Nhập số nguyên (ví dụ: 26)',
      explanation:
        'Ta có: A = 3(1) + 2(1) - 3(1/2) + 10(-1) = 5 - 3/2 - 10 = -5 - 3/2 = -13/2.\nDo đó a = 13, b = 2 ⇒ T = a·b = 13 · 2 = 26.',
    },
    {
      id: 'orig-q17',
      number: 17,
      topic: 'Phép toán tập hợp trên ℝ & Đếm phần tử tự nhiên',
      level: 'Thông hiểu',
      originalRef: 'Câu 17 đề gốc',
      prompt:
        'Cho hai tập hợp A = [2007; 2022], B = (2010; +∞). Tìm A \\ B được kết quả là một tập hợp chứa bao nhiêu số tự nhiên?',
      expectedAnswer: 4,
      tolerance: 0.01,
      answerFormatHint: 'Nhập số lượng số tự nhiên',
      explanation:
        'Ta có A \\ B = [2007; 2010].\nCác số tự nhiên thuộc đoạn [2007; 2010] là: 2007, 2008, 2009, 2010.\nVậy có tất cả 4 số tự nhiên.',
    },
    {
      id: 'orig-q18',
      number: 18,
      topic: 'Tính giá trị biểu thức lượng giác khi biết tan α',
      level: 'Vận dụng',
      originalRef: 'Câu 18 đề gốc',
      prompt:
        'Cho tan α = 3. Tính giá trị của biểu thức A = (3·sin α + 4·cos α) / (2·sin α - 5·cos α).',
      expectedAnswer: 13,
      tolerance: 0.01,
      answerFormatHint: 'Nhập số nguyên hoặc thập phân',
      explanation:
        'Chia cả tử và mẫu của A cho cos α (cos α ≠ 0):\nA = (3·tan α + 4) / (2·tan α - 5) = (3·3 + 4) / (2·3 - 5) = 13 / 1 = 13.',
    },
  ],
  part4: [
    {
      id: 'orig-q19',
      number: 19,
      points: 1.0,
      topic: 'Các phép toán tập hợp trên ℝ và biểu diễn trên trục số',
      level: 'Thông hiểu',
      originalRef: 'Câu 19 đề gốc (1,0 điểm)',
      prompt:
        'Cho hai tập hợp A = (-1; 2) và B = [1; 3). Hãy điền khuyết vào các bước giải dưới đây để xác định A ∩ B, A ∪ B và hoàn thành biểu diễn trên trục số.',
      diagram: {
        type: 'number_line',
        setALabel: 'A = (-1; 2)',
        setAStart: -1,
        setAEnd: 2,
        setALeftBracket: '(',
        setARightBracket: ')',
        setBLabel: 'B = [1; 3)',
        setBStart: 1,
        setBEnd: 3,
        setBLeftBracket: '[',
        setBRightBracket: ')',
        intersectionText: 'A ∩ B = [1; 2)',
        unionText: 'A ∪ B = (-1; 3)',
      },
      steps: [
        {
          stepNumber: 1,
          title: 'Bước 1: Biểu diễn tập hợp A và B theo bất đẳng thức',
          template:
            'Ta có: A = {x ∈ ℝ | {{b1}} < x < {{b2}}} và B = {x ∈ ℝ | {{b3}} ≤ x < 3}.',
        },
        {
          stepNumber: 2,
          title: 'Bước 2: Xác định tập hợp giao A ∩ B',
          template:
            'Phần tử x thuộc cả A và B khi {{b4}} ≤ x < {{b5}}. Vậy A ∩ B = {{b6}}{{b4}}; {{b5}}).',
        },
        {
          stepNumber: 3,
          title: 'Bước 3: Xác định tập hợp hợp A ∪ B',
          template:
            'Lấy hợp các phần tử thuộc A hoặc thuộc B trên trục số, ta được: A ∪ B = ({{b7}}; {{b8}}).',
        },
      ],
      blanks: [
        {
          id: 'b1',
          label: 'Câu 19 - Đầu mút trái của tập A',
          placeholder: '-1',
          acceptedAnswers: ['-1'],
          displayAnswer: '-1',
        },
        {
          id: 'b2',
          label: 'Câu 19 - Đầu mút phải của tập A',
          placeholder: '2',
          acceptedAnswers: ['2'],
          displayAnswer: '2',
        },
        {
          id: 'b3',
          label: 'Câu 19 - Đầu mút trái của tập B',
          placeholder: '1',
          acceptedAnswers: ['1'],
          displayAnswer: '1',
        },
        {
          id: 'b4',
          label: 'Câu 19 - Đầu mút trái của A giao B',
          placeholder: '1',
          acceptedAnswers: ['1'],
          displayAnswer: '1',
        },
        {
          id: 'b5',
          label: 'Câu 19 - Đầu mút phải của A giao B',
          placeholder: '2',
          acceptedAnswers: ['2'],
          displayAnswer: '2',
        },
        {
          id: 'b6',
          label: 'Câu 19 - Kí hiệu ngoặc trái của A giao B',
          placeholder: '[ hoặc (',
          acceptedAnswers: ['['],
          displayAnswer: '[',
          inputType: 'select',
          options: ['[', '('],
        },
        {
          id: 'b7',
          label: 'Câu 19 - Đầu mút trái của A hợp B',
          placeholder: '-1',
          acceptedAnswers: ['-1'],
          displayAnswer: '-1',
        },
        {
          id: 'b8',
          label: 'Câu 19 - Đầu mút phải của A hợp B',
          placeholder: '3',
          acceptedAnswers: ['3'],
          displayAnswer: '3',
        },
      ],
      fullExplanation:
        '• Với A = (-1; 2) và B = [1; 3):\n• Giao của hai tập hợp là nửa khoảng chung từ 1 (ngoặc vuông) đến 2 (ngoặc tròn): A ∩ B = [1; 2).\n• Hợp của hai tập hợp trải từ -1 đến 3 (đều ngoặc tròn): A ∪ B = (-1; 3).',
    },
    {
      id: 'orig-q20',
      number: 20,
      points: 1.0,
      topic: 'Ứng dụng hệ bất phương trình bậc nhất hai ẩn (Bài toán tối ưu thực tế)',
      level: 'Vận dụng cao',
      originalRef: 'Câu 20 đề gốc (1,0 điểm)',
      prompt:
        'Một xưởng sản xuất đồ gỗ mỹ nghệ sản xuất ra hai bộ sản phẩm loại I và loại II. Mỗi bộ sản phẩm loại I lãi 5 triệu đồng, mỗi bộ sản phẩm loại II lãi 4 triệu đồng. Để sản xuất mỗi bộ sản phẩm loại I cần máy làm việc trong 3 giờ và nhân công làm việc trong 2 giờ. Để sản xuất mỗi bộ sản phẩm loại II cần máy làm việc trong 3 giờ và nhân công làm việc trong 1 giờ. Một ngày máy làm việc không quá 15 giờ, nhân công làm việc không quá 8 giờ. Hoàn thành các bước giải dưới đây để tính số tiền lãi lớn nhất xưởng đạt được trong một ngày.',
      diagram: {
        type: 'linear_programming',
        vertices: [
          { label: 'O(0; 0)', x: 0, y: 0, value: 0 },
          { label: 'A(4; 0)', x: 4, y: 0, value: 20 },
          { label: 'B(3; 2)', x: 3, y: 2, value: 23 },
          { label: 'C(0; 5)', x: 0, y: 5, value: 20 },
        ],
        optimalVertex: 'B(3; 2)',
        xLabel: 'Số bộ sản phẩm loại I (x)',
        yLabel: 'Số bộ sản phẩm loại II (y)',
      },
      steps: [
        {
          stepNumber: 1,
          title: 'Bước 1: Gọi ẩn và lập hệ bất phương trình theo giả thiết',
          template:
            'Gọi x, y (x ≥ 0, y ≥ 0) lần lượt là số bộ sản phẩm loại I và loại II sản xuất trong một ngày.\n• Thời gian máy làm việc: 3x + 3y ≤ {{b1}} ⇔ x + y ≤ {{b2}}.\n• Thời gian nhân công làm việc: {{b3}}x + y ≤ 8.',
        },
        {
          stepNumber: 2,
          title: 'Bước 2: Biểu thức tiền lãi và tọa độ các đỉnh miền nghiệm',
          template:
            'Số tiền lãi thu được (triệu đồng) là F(x; y) = {{b4}}x + 4y.\nMiền nghiệm của hệ là tứ giác OABC với 4 đỉnh: O(0; 0), A(4; 0), B({{b5}}; 2) và C(0; 5).',
        },
        {
          stepNumber: 3,
          title: 'Bước 3: Tính giá trị tại các đỉnh và kết luận',
          template:
            'Thay tọa độ các đỉnh vào F(x; y):\n• F(0; 0) = 0;  F(4; 0) = {{b6}};  F(3; 2) = {{b7}};  F(0; 5) = 20.\nVậy số tiền lãi lớn nhất xưởng đạt được trong một ngày là {{b7}} triệu đồng.',
        },
      ],
      blanks: [
        {
          id: 'b1',
          label: 'Câu 20 - Tổng số giờ máy tối đa',
          placeholder: '15',
          acceptedAnswers: ['15'],
          displayAnswer: '15',
        },
        {
          id: 'b2',
          label: 'Câu 20 - Vế phải sau khi rút gọn BPT giờ máy',
          placeholder: '5',
          acceptedAnswers: ['5'],
          displayAnswer: '5',
        },
        {
          id: 'b3',
          label: 'Câu 20 - Hệ số giờ nhân công của loại I',
          placeholder: '2',
          acceptedAnswers: ['2'],
          displayAnswer: '2',
        },
        {
          id: 'b4',
          label: 'Câu 20 - Tiền lãi mỗi bộ loại I',
          placeholder: '5',
          acceptedAnswers: ['5'],
          displayAnswer: '5',
        },
        {
          id: 'b5',
          label: 'Câu 20 - Hoành độ đỉnh B',
          placeholder: '3',
          acceptedAnswers: ['3'],
          displayAnswer: '3',
        },
        {
          id: 'b6',
          label: 'Câu 20 - Giá trị F(4; 0)',
          placeholder: '20',
          acceptedAnswers: ['20'],
          displayAnswer: '20',
        },
        {
          id: 'b7',
          label: 'Câu 20 - Tiền lãi lớn nhất F(3; 2)',
          placeholder: '23',
          acceptedAnswers: ['23'],
          displayAnswer: '23',
        },
      ],
      fullExplanation:
        '• Hệ bất phương trình: { x ≥ 0 ; y ≥ 0 ; x + y ≤ 5 ; 2x + y ≤ 8 }.\n• Miền nghiệm là tứ giác OABC với O(0;0), A(4;0), B(3;2), C(0;5).\n• Tại B(3; 2): F(3; 2) = 5·3 + 4·2 = 23 (triệu đồng) là giá trị lớn nhất.',
    },
    {
      id: 'orig-q21',
      number: 21,
      points: 1.0,
      topic: 'Ứng dụng hệ thức lượng trong tam giác vào đo đạc thực tế',
      level: 'Vận dụng',
      originalRef: 'Câu 21 đề gốc (1,0 điểm)',
      prompt:
        'Giả sử CD = h là chiều cao của tháp trong đó C là chân tháp. Chọn hai điểm A, B trên mặt đất sao cho ba điểm A, B, C thẳng hàng. Ta đo được AB = 24 m, ∠CAD = 63°; ∠CBD = 48°. Hoàn thành các bước giải dưới đây để tính chiều cao h của khối tháp (làm tròn đến hàng phần mười).',
      diagram: {
        type: 'surveying_tower',
        objectName: 'tháp',
        topPoint: 'D',
        footPoint: 'C',
        nearPoint: 'A',
        farPoint: 'B',
        distanceAB: 24,
        angleNearDeg: 63,
        angleFarDeg: 48,
        heightResult: 61.4,
      },
      steps: [
        {
          stepNumber: 1,
          title: 'Bước 1: Tính góc ∠ADB trong tam giác ABD',
          template:
            'Ta có ∠CAD là góc ngoài tại đỉnh A của ∆ABD nên:\n∠ADB = ∠CAD - ∠CBD = {{b1}}° - {{b2}}° = {{b3}}°.',
        },
        {
          stepNumber: 2,
          title: 'Bước 2: Áp dụng định lí sin trong tam giác ABD để tính AD',
          template:
            'Trong ∆ABD, theo định lí sin:\nAD / sin ∠ABD = AB / sin ∠ADB ⇒ AD = ({{b4}} · sin {{b2}}°) / sin {{b3}}° ≈ {{b5}} (m).',
        },
        {
          stepNumber: 3,
          title: 'Bước 3: Tính chiều cao h = CD trong tam giác vuông ACD',
          template:
            'Trong ∆ACD vuông tại C, ta có:\nh = CD = AD · sin {{b1}}° ≈ {{b6}} (m).',
        },
      ],
      blanks: [
        {
          id: 'b1',
          label: 'Câu 21 - Số đo góc CAD',
          placeholder: '63',
          acceptedAnswers: ['63', '63°'],
          displayAnswer: '63',
        },
        {
          id: 'b2',
          label: 'Câu 21 - Số đo góc CBD',
          placeholder: '48',
          acceptedAnswers: ['48', '48°'],
          displayAnswer: '48',
        },
        {
          id: 'b3',
          label: 'Câu 21 - Số đo góc ADB',
          placeholder: '15',
          acceptedAnswers: ['15', '15°'],
          displayAnswer: '15',
        },
        {
          id: 'b4',
          label: 'Câu 21 - Độ dài đoạn AB',
          placeholder: '24',
          acceptedAnswers: ['24'],
          displayAnswer: '24',
        },
        {
          id: 'b5',
          label: 'Câu 21 - Độ dài cạnh AD (làm tròn hàng phần mười)',
          placeholder: '68,9',
          acceptedAnswers: ['68.9', '68,9'],
          displayAnswer: '68,9',
        },
        {
          id: 'b6',
          label: 'Câu 21 - Chiều cao h của tháp (làm tròn hàng phần mười)',
          placeholder: '61,4',
          acceptedAnswers: ['61.4', '61,4'],
          displayAnswer: '61,4',
        },
      ],
      fullExplanation:
        '• Bước 1: ∠ADB = ∠CAD - ∠CBD = 63° - 48° = 15°.\n• Bước 2: Áp dụng định lí sin trong ∆ABD:\n  AD = (AB · sin 48°) / sin 15° = (24 · sin 48°) / sin 15° ≈ 68,9 m.\n• Bước 3: Trong tam giác vuông ACD:\n  h = CD = AD · sin 63° ≈ 61,4 m.',
    },
  ],
};

export const SIMILAR_EXAM_01: ExamPaper = buildExamFromIndices(
  'de-tuong-tu-01',
  'MÃ ĐỀ 101',
  'ĐỀ ÔN TẬP TƯƠNG TỰ SỐ 01 - GIỮA KÌ 1 TOÁN 10',
  'Cấu trúc và ma trận đặc tả tương đương 100% đề gốc THPT Số 1 Trần Phú',
  0
);

export const SIMILAR_EXAM_02: ExamPaper = buildExamFromIndices(
  'de-tuong-tu-02',
  'MÃ ĐỀ 102',
  'ĐỀ ÔN TẬP TƯƠNG TỰ SỐ 02 - GIỮA KÌ 1 TOÁN 10',
  'Phát triển tư duy theo ma trận Mệnh đề, Tập hợp, Hệ BPT và Hệ thức lượng',
  1
);

export const PRESET_EXAMS: ExamPaper[] = [
  SIMILAR_EXAM_01,
  SIMILAR_EXAM_02,
  ORIGINAL_EXAM_TRAN_PHU,
];

/**
 * Dynamically generates a new similar exam combining distinct structural archetypes
 * and freshly synthesized mathematical parameters so students can practice infinitely.
 */
export function generateNewSimilarExam(generationNumber: number): ExamPaper {
  const seed = generationNumber + 1;
  const pick = <T,>(arr: T[], offset: number): T =>
    arr[(seed + offset) % arr.length];

  const id = `de-luyen-tap-${generationNumber}`;
  const code = `MÃ ĐỀ ${200 + generationNumber}`;

  const slots1To12 = [
    SLOT_1_VARIANTS,
    SLOT_2_VARIANTS,
    SLOT_3_VARIANTS,
    SLOT_4_VARIANTS,
    SLOT_5_VARIANTS,
    SLOT_6_VARIANTS,
    SLOT_7_VARIANTS,
    SLOT_8_VARIANTS,
    SLOT_9_VARIANTS,
    SLOT_10_VARIANTS,
    SLOT_11_VARIANTS,
    SLOT_12_VARIANTS,
  ];

  const part1: MultipleChoiceQuestion[] = slots1To12.map((pool, idx) => ({
    ...pick(pool, idx * 2 + 1),
    id: `${id}-q${idx + 1}`,
    number: idx + 1,
  }));

  const part2: TrueFalseQuestion[] = [
    {
      ...pick(SLOT_13_VARIANTS, seed),
      id: `${id}-q13`,
      number: 13,
    },
    {
      ...pick(SLOT_14_VARIANTS, seed + 1),
      id: `${id}-q14`,
      number: 14,
    },
  ];

  // Dynamic parametric synthesis for Part III (Questions 15-18) so every new exam has fresh problems
  const q15Pool = [
    {
      c: 6,
      b: 10,
      angle: 120,
      aSquared: 6 * 6 + 10 * 10 + 6 * 10, // 196 -> BC = 14, or √a
      prompt:
        'Cho tam giác ABC có góc A = 120°, cạnh AB = 6 và cạnh AC = 7. Độ dài cạnh BC có dạng √a. Giá trị của a bằng bao nhiêu?',
      expected: 36 + 49 + 42, // 127
      explanation:
        'Áp dụng định lí côsin trong tam giác ABC:\nBC² = AB² + AC² - 2·AB·AC·cos 120° = 6² + 7² - 2·6·7·(-1/2) = 36 + 49 + 42 = 127.\nSuy ra BC = √127, vậy a = 127.',
    },
    {
      c: 7,
      b: 8,
      angle: 60,
      aSquared: 49 + 64 - 56, // 57
      prompt:
        'Cho tam giác ABC có góc A = 60°, cạnh AB = 7 và cạnh AC = 8. Độ dài cạnh BC có dạng √a. Giá trị của a bằng bao nhiêu?',
      expected: 57,
      explanation:
        'Áp dụng định lí côsin trong tam giác ABC:\nBC² = AB² + AC² - 2·AB·AC·cos 60° = 7² + 8² - 2·7·8·(1/2) = 49 + 64 - 56 = 57.\nSuy ra BC = √57, vậy a = 57.',
    },
    {
      c: 4,
      b: 9,
      angle: 120,
      aSquared: 16 + 81 + 36, // 133
      prompt:
        'Cho tam giác ABC có góc A = 120°, cạnh AB = 4 và cạnh AC = 9. Độ dài cạnh BC có dạng √a. Giá trị của a bằng bao nhiêu?',
      expected: 133,
      explanation:
        'Áp dụng định lí côsin trong tam giác ABC:\nBC² = AB² + AC² - 2·AB·AC·cos 120° = 4² + 9² - 2·4·9·(-1/2) = 16 + 81 + 36 = 133.\nSuy ra BC = √133, vậy a = 133.',
    },
  ];
  const chosenQ15 = pick(q15Pool, seed);

  const startYear = 2012 + (generationNumber % 10);
  const splitYear = startYear + 4 + (generationNumber % 5);
  const endYear = splitYear + 8;
  const countNat = splitYear - startYear + 1;

  const tanVal = 2 + (generationNumber % 4); // 2, 3, 4, 5
  const coeffNumSin = 3 + (generationNumber % 3);
  const coeffNumCos = 5;
  const numVal = coeffNumSin * tanVal + coeffNumCos;

  const part3: ShortAnswerQuestion[] = [
    {
      id: `${id}-q15`,
      number: 15,
      topic: 'Hệ thức lượng trong tam giác (Định lí Côsin)',
      level: 'Vận dụng',
      originalRef: 'Câu 15 đề gốc: Tính cạnh thứ ba của tam giác theo định lí Côsin',
      prompt: chosenQ15.prompt,
      expectedAnswer: chosenQ15.expected,
      tolerance: 0.01,
      answerFormatHint: 'Nhập giá trị nguyên của a',
      explanation: chosenQ15.explanation,
    },
    {
      ...pick(SLOT_16_VARIANTS, seed),
      id: `${id}-q16`,
      number: 16,
    },
    {
      id: `${id}-q17`,
      number: 17,
      topic: 'Phép toán tập hợp trên ℝ & Đếm phần tử tự nhiên',
      level: 'Thông hiểu',
      originalRef: 'Câu 17 đề gốc: Tìm A \\ B và đếm số tự nhiên',
      prompt: `Cho hai tập hợp A = [${startYear}; ${endYear}] và B = (${splitYear}; +∞). Tập hợp A \\ B chứa tất cả bao nhiêu số tự nhiên?`,
      expectedAnswer: countNat,
      tolerance: 0.01,
      answerFormatHint: 'Nhập số lượng số tự nhiên',
      explanation: `Ta có A \\ B = [${startYear}; ${splitYear}].\nSố các số tự nhiên thuộc đoạn [${startYear}; ${splitYear}] là: (${splitYear} - ${startYear}) + 1 = ${countNat} (số).`,
    },
    {
      id: `${id}-q18`,
      number: 18,
      topic: 'Tính giá trị biểu thức lượng giác khi biết tan α',
      level: 'Vận dụng',
      originalRef: 'Câu 18 đề gốc: Tính giá trị phân thức lượng giác khi biết tan α',
      prompt: `Cho góc α thỏa mãn tan α = ${tanVal}. Tính giá trị của biểu thức A = (${coeffNumSin}·sin α + ${coeffNumCos}·cos α) / (sin α - ${tanVal - 1}·cos α).`,
      expectedAnswer: numVal,
      tolerance: 0.01,
      answerFormatHint: 'Nhập số nguyên',
      explanation: `Chia cả tử và mẫu của A cho cos α (cos α ≠ 0):\nA = (${coeffNumSin}·tan α + ${coeffNumCos}) / (tan α - ${tanVal - 1}) = (${coeffNumSin}·${tanVal} + ${coeffNumCos}) / (${tanVal} - ${tanVal - 1}) = ${numVal} / 1 = ${numVal}.`,
    },
  ];

  const part4: EssayClozeQuestion[] = [
    {
      ...pick(SLOT_19_VARIANTS, seed),
      id: `${id}-q19`,
      number: 19,
    },
    {
      ...pick(SLOT_20_VARIANTS, seed + 1),
      id: `${id}-q20`,
      number: 20,
    },
    {
      ...pick(SLOT_21_VARIANTS, seed),
      id: `${id}-q21`,
      number: 21,
    },
  ];

  return {
    id,
    code,
    title: `ĐỀ LUYỆN TẬP TƯƠNG TỰ SỐ ${String(generationNumber + 2).padStart(2, '0')} - TOÁN 10`,
    subtitle:
      'Đề sinh tự động theo ma trận kiến thức Giữa Học kì 1 (Mệnh đề, Tập hợp, BPT bậc nhất hai ẩn, Hệ thức lượng)',
    schoolHeader: 'HỆ THỐNG LUYỆN ĐỀ TOÁN 10 · CẤU TRÚC MỚI',
    durationMinutes: 90,
    part1,
    part2,
    part3,
    part4,
  };
}
