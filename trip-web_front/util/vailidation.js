
 // 정규식을 사용하여 이메일 형식 검사
 export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}


//비어있는지?
export function isNotEmpty(value) {
  return value.trim() !== '';
}

//최소 길이
export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

// 최대 길이
export function hasMaxLength(value, maxLength) {
  return value.length <= maxLength;
}


// 비밀번호 일치 검사
export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}

// 특정 패턴 검사
export function matchesPattern(value, pattern) {
  return pattern.test(value);
}

//특정값과 다른지? 이거 비밀번호 같은거랑 머가 다르지?
export function isNotEqualToOtherValue(value, otherValue) {
  return value !== otherValue;
}

//숫자인지? 아닌지? 이게 왜 필요하지?
export function isNumber(value) {
  return !isNaN(value);
}