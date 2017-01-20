var TinyTester = {
  // testName is set to the property in each iteration.
  // Try - Catch will apply and run TinyTester or return an error stack.
  run: function(tests) {
    var failures = 0;

    for (var testName in tests) {
      var testAction = tests[testName];
      try {
        testAction.apply(this);
        console.log('%c' + testName, "color: green;");
      } catch (e) {
        failures++;
        console.groupCollapsed('%c' + testName, "color: red;");
        console.error(e.stack);
        console.groupEnd();
      }
    }
  }
};
