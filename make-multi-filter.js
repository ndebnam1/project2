'use strict';
function MakeMultiFilter(array) // array is the array needing to be filtered
 {

  // initial array variable declaration
  var originalArray=array;
  var currentArray=originalArray;

  // array filterer function begins, function output is returned
  return (function arrayFilterer(func, callback)
  {

    if (typeof func == "function") //if parameter call is the function type, will be caught
    {
      console.log("filtering currentArray"); // console message
      currentArray = currentArray.filter(func); //filters current array to change this
    } else {
      console.log("Value not of type function returning currentArray unfiltered"); // console message
      return currentArray; //returns array unfiltered
    }

    if (typeof callback == "function") // if callback param is caught as function, will run back original array to filter
    { 
      callback.call(originalArray); // calls through original array again
    } else {
      console.log("Value not of type function returning arrayFilterer unfiltered"); // otherwise, returns arrayFilterer
      return arrayFilterer;
    }

  }
  );
 }

// Invoking MakeMultiFilter() with originalArray = [1, 2, 3] returns a
// function, saved in the variable arrayFilterer1, that can be used to
// repeatedly filter the input array
var arrayFilterer1 = MakeMultiFilter([1, 2, 3]);

// Call arrayFilterer1 (with a callback function) to filter out all the numbers
// not equal to 2.
arrayFilterer1(function (elem) {
  return elem !== 2; // check if element is not equal to 2
}, function (currentArray) {
  // 'this' within the callback function should refer to originalArray which is [1, 2, 3]
  console.log(this); // prints [1, 2, 3]
  console.log(currentArray); // prints [1, 3]
});

// Call arrayFilterer1 (without a callback function) to filter out all the
// elements not equal to 3.
arrayFilterer1(function (elem) {
  return elem !== 3; // check if element is not equal to 3
});

// Calling arrayFilterer1 with no filterCriteria should return the currentArray.
var currentArray = arrayFilterer1();
console.log('currentArray', currentArray); // prints [1] since we filtered out 2 and 3

// Since arrayFilterer returns itself, calls can be chained
function filterTwos(elem) { return elem !== 2; }
function filterThrees(elem) { return elem !== 3; }
var arrayFilterer2 = MakeMultiFilter([1, 2, 3]);
var currentArray2 = arrayFilterer2(filterTwos)(filterThrees)();
console.log('currentArray2', currentArray2); // prints [1] since we filtered out 2 and 3

// Multiple active filters at the same time
var arrayFilterer3 = MakeMultiFilter([1, 2, 3]);
var arrayFilterer4 = MakeMultiFilter([4, 5, 6]);
console.log(arrayFilterer3(filterTwos)()); // prints [1, 3]
console.log(arrayFilterer4(filterThrees)()); // prints [4, 5, 6]
