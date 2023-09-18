'use strict';

/*
 * This file tests the Project #2 JavaScript assignment problems. It prints what
 * it finds to the console log and updates the text being displayed in the window with a
 * summary of the results.
 */

/* eslint-env browser, node */

class Project2{
// Result message for Problems 1-3
runTest = function () {

var self ={
p1Message : 'SUCCESS',
p2Message : 'SUCCESS',
p3Message : 'SUCCESS'
};

// Keep track of all the var statements
var varDeclared = ['svarDeclared', 'p1Message', 'p2Message', 'p3Message'];


// Utility functions
function arraysAreTheSame(a1, a2) {
  if (!Array.isArray(a1) || !Array.isArray(a2) || (a1.length !== a2.length)) {
    return false;
  }
  for (var i = 0; i < a1.length; i += 1) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
}

// ********************* Test MakeMultiFilter

if (typeof MakeMultiFilter !== 'function') {
  console.error('MakeMultiFilter is not a function', typeof MakeMultiFilter);
  self.p1Message = 'FAILURE';
} else {
  var originalArray = [1, 2, 3];
  var filterFunc = window.MakeMultiFilter(originalArray);

  var secondArray = [1, 2, 3, 4];
  var filterFuncTwo = window.MakeMultiFilter(secondArray);

  if (typeof filterFunc !== 'function') {
    console.error('MakeMultiFilter does not return a function', filterFunc);
    self.p1Message = 'FAILURE';
  } else {
    var result = filterFunc();
    if (!arraysAreTheSame([1, 2, 3], result)) {
      console.error('filter function with no args does not return the original array', result);
      self.p1Message = 'FAILURE';
    }

    var callbackPerformed = false;
    result = filterFunc(function (item) {
      return item !== 2;
    }, function (callbackResult) {
      callbackPerformed = true;
      if (!arraysAreTheSame([1, 3], callbackResult)) {
        console.error('filter function callback does not filter 2 correctly', callbackResult);
        self.p1Message = 'FAILURE';
      }
      if (!arraysAreTheSame([1, 2, 3], this)) {
        console.error('filter function callback does not pass original array as this', this);
        self.p1Message = 'FAILURE';
      }
    });

    if (!callbackPerformed) {
      console.error('filter function callback not performed');
      self.p1Message = 'FAILURE';
    }

    if (result !== filterFunc) {
      console.error('filter function does not return itself', result);
      self.p1Message = 'FAILURE';
    }

    result = filterFunc(function (item) {
      return item !== 3;
    });
    if (result !== filterFunc) {
      console.error('filter function does not return itself 2', result);
      self.p1Message = 'FAILURE';
    }

    result = filterFunc();
    if (!arraysAreTheSame([1], result)) {
      console.error('filter function callback does not filter 3 correctly', result);
      self.p1Message = 'FAILURE';
    }
    result = filterFuncTwo(function (item) {
      return item !== 1;
    }, function (callbackResult) {
      if (!arraysAreTheSame([2, 3, 4], callbackResult)) {
        console.error('second filter does not filter 1 (check for global variable usage)', callbackResult);
        self.p1Message = 'FAILURE';
      }
      if (!arraysAreTheSame([1, 2, 3, 4], this)) {
        console.error('filter function callback does not pass original array as this', this);
        self.p1Message = 'FAILURE';
      }
    });
  }
}
console.log('Test MakeMultiFilter:', p1Message);

// ********************* Test TemplateProcessor

if (typeof TemplateProcessor !== 'function') {
  console.error('TemplateProcessor is not a function', typeof TemplateProcessor);
  self.p2Message = 'FAILURE';
} else {
  var template = 'My favorite month is {{month}} but not the day {{day}} or the year {{year}}';
  var dateTemplate = new TemplateProcessor(template);

  var dictionary = { month: 'July', day: '1', year: '2016' };
  var str = dateTemplate.fillIn(dictionary);

  if (str !== 'My favorite month is July but not the day 1 or the year 2016') {
    console.error('TemplateProcessor didn\'t work');
    self.p2Message = 'FAILURE';
  }
  varDeclared.push('template');
  varDeclared.push('dateTemplate');
  varDeclared.push('dictionary');
  varDeclared.push('str');
}
console.log('Test TemplateProcessor:', p2Message);

// ********************* Test to see if the symbols we defined are in the global address space

varDeclared.forEach(function (sym) {
  if (window[sym] !== undefined) {
    console.error('Found my symbol', sym, 'in DOM');
    self.p3Message = 'FAILURE';
  }
});
console.log('Test Problem 3:', p3Message);

// Store the result back into the global space under the object name Project2Results
window.Project2Results = {
  p1Message: self.p1Message,
  p2Message: self.p2Message,
  p3Message: self.p3Message,
};

// Once the browser loads our companion HTML in test-project2.html we
// update it with the results of our testing. This code will make more
// sense after the next project.
window.onload = function () {
  document.getElementById('p1').innerHTML = p1Message;
  document.getElementById('p2').innerHTML = p2Message;
  document.getElementById('p3').innerHTML = p3Message;
};

}();

runTest;

};