function isPalindrome(str) {
    const cleanStr = str.toLowerCase().replace(/ /g, '');;
    const reverseStr =  cleanStr.split('').reverse().join('');
    // Сравниваем очищенную строку с её перевёрнутой версией
    return cleanStr === reverseStr;
}


function extractDigits(str) {
    const digitString = str.match(/\d/g);
    if (digitString) {
        return parseInt(digitString.join(''), 10);
    }
    return NaN;
}

function padStringToLength(inputStr, minLength, paddingStr) {
  if (inputStr.length >= minLength) {
    return inputStr;
  } else {
    const paddingCount = minLength - inputStr.length;

    // Вычисляем, сколько раз нужно повторить paddingStr
    const repetitions = Math.ceil(paddingCount / paddingStr.length);

    // Повторяем paddingStr нужное количество раз
    const repeatedPadding = paddingStr.repeat(repetitions);

    // Обрезаем repeatedPadding до нужной длины
    const trimmedPadding = repeatedPadding.slice(0, paddingCount);

    // Соединяем trimmedPadding и inputStr
    const paddedStr = trimmedPadding + inputStr;

    return paddedStr;
  }
}
  
  console.log(padStringToLength('1', 2, '0'));      // '01'
  console.log(padStringToLength('1', 4, '0'));      // '0001'
  console.log(padStringToLength('q', 4, 'werty'));  // 'werq'
  console.log(padStringToLength('q', 4, 'we'));     // 'wweq'
  console.log(padStringToLength('qwerty', 4, '0')); // 'qwerty'

console.log(isPalindrome('дед')); // true
console.log(isPalindrome('ИскАть таКси')); // true
console.log(isPalindrome('Крот')); // false

console.log(extractDigits('2023 год')); // 2023
console.log(extractDigits('1 каштан, 0.5 банана')); // 105
console.log(extractDigits('просто строка')); // NaN


console.log(checkStringLength('проверяемая строка', 20)); // true
console.log(checkStringLength('проверяемая строка', 18)); // true
console.log(checkStringLength('проверяемая строка', 10)); // false