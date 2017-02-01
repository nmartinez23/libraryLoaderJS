var TinyTestHelper = {
  renderStats: function(tests, failures) {
    var numberOfTests = Object.keys(tests).length;
    var successes = numberOfTests - failures;
    var summaryString = 'Ran ' + numberOfTests + ' tests: ' + successes +
                        ' successes, ' + failures + ' failures';

    var summaryElement = document.createElement('h1');
    summaryElement.textContent = summaryString;
    document.body.appendChild(summaryElement);
  }
};


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
    // setTimeout webAPI will allow the DOM to update rendering before callback runs.
    setTimeout(function() {
      if (window.document && document.body) {
        document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
        TinyTestHelper.renderStats(tests, failures);
      }
    }, 0);
  },

  fail: function(message) {
    throw new Error('fail(): ' + message);
  },

  assert: function(value, message) {
    if (!value) {
      throw new Error('assert(): ' + message);
    }
  },

  assertEquals: function(expected, actual) {
    if (expected !== actual) {
      throw new Error('assertEquals() "' + expected + '" !== "' + actual + '"');
    }
  },

  assertStrictEquals: function(expected, actual) {
    if (expected !== actual) {
      throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
    }
  }
};

var fail               = TinyTester.fail.bind(TinyTester),
    assert             = TinyTester.assert.bind(TinyTester),
    assertEquals       = TinyTester.assertEquals.bind(TinyTester),
    eq                 = TinyTester.assertEquals.bind(TinyTester), // alias for assertEquals
    assertStrictEquals = TinyTester.assertStrictEquals.bind(TinyTester),
    tests              = TinyTester.run.bind(TinyTester);









