export const subjectOptions = [
  { value: "", label: "Chọn chủ đề" },
  { value: "technical_support", label: "Hỗ trợ kỹ thuật" },
  { value: "payment", label: "Thanh toán" },
  { value: "service_consultation", label: "Tư vấn dịch vụ" },
  { value: "complaint", label: "Khiếu nại" },
  { value: "partnership", label: "Hợp tác" },
  { value: "other", label: "Khác" },
];

export const getSubjectLabel = (subjectValue: string): string => {
  const option = subjectOptions.find((opt) => opt.value === subjectValue);
  return option ? option.label : subjectValue;
};

export const getSubjectValue = (subjectLabel: string): string => {
  const option = subjectOptions.find((opt) => opt.label === subjectLabel);
  return option ? option.value : subjectLabel;
};
