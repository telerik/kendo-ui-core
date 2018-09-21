(function() {
  var element;
  var containment;

  var setupWnd = function (options) {
      return element.kendoWindow(options).data("kendoWindow");
  };

  var resizewnd = function (wnd, direction, left, top) {
    var handle = wnd.wrapper.find(".k-resize-" + direction);
    var start = handle.offset();
    var userEvents = wnd.resizing._draggable.userEvents;

    var end = {
        left: start.left + left,
        top: start.top + top
    };

    userEvents.press(start.left, start.top, handle[0]);
    userEvents.move(end.left, end.top);
    userEvents.end(end.left, end.top);
};

  module("kendo.ui.window constrain-movement", {
      setup: function() {

          containment = $("<div id='container' style='height: 400px; width: 400px; position: absolute;' />").appendTo(QUnit.fixture);
          element = $("<div />").appendTo(QUnit.fixture);
      },
      teardown: function() {
        if (element.data("kendoWindow")) {
            element.data("kendoWindow").destroy();
        }
        element = containment = null;
        kendo.destroy(QUnit.fixture);

      }
  });

  test("default position inside containment", 2, function() {
    var position;
    var containerPosition;

    var wnd = setupWnd({
      visible: true,
      draggable: {
        containment: containment
      }
    });

    position = kendo.getOffset(wnd.wrapper);
    containerPosition = kendo.getOffset(containment);

    equal(position.top, containerPosition.top);
    equal(position.left, containerPosition.left);
  });

  test("position setting inside containment", 2, function() {
    var position;
    var containerPosition;


    var wnd = setupWnd({
      visible: true,
      position: {
        top: 30,
        left: 30
      },
      draggable: {
        containment: containment
      }
    });

    containerPosition = kendo.getOffset(containment);
    position = kendo.getOffset(wnd.wrapper);

    equal(position.top, 30 + containerPosition.top);
    equal(position.left, 30 + containerPosition.left);
  });

  test("position inside containment with top and left", 2, function() {
    var position;
    var containerPosition;
    containment = $("<div id='container' style='height: 400px; width: 400px; top: 200px; left: 200px;position: absolute;' />").appendTo(QUnit.fixture);

    var wnd = setupWnd({
      visible: true,
      draggable: {
        containment: containment
      }
    });

    position = kendo.getOffset(wnd.wrapper);
    containerPosition = kendo.getOffset(containment);

    equal(position.top, containerPosition.top);
    equal(position.left, containerPosition.left);
  });


  test("position inside containment with position:fixed", 2, function() {
    var position;
    containment = $("<div style='height: 400px; width: 400px;'></div><div id='container' style='height: 400px; width: 400px; top: 200px; left: 200px;position: fixed;' />").appendTo(QUnit.fixture);

    var wnd = setupWnd({
      visible: true,
      draggable: {
        containment: containment
      }
    });

    position = kendo.getOffset(wnd.wrapper);

    equal(position.top, 0);
    equal(position.left, 0);
  });

  test("position inside containment with position:relative", 2, function() {
    var position;
    containment = $("<div style='height: 400px; width: 400px;'></div><div id='container' style='height: 400px; width: 400px; top: 200px; left: 200px;position: relative;' />").appendTo(QUnit.fixture);

    var wnd = setupWnd({
      visible: true,
      draggable: {
        containment: containment
      }
    });

    position = kendo.getOffset(wnd.wrapper);

    equal(position.top, 0);
    equal(position.left, 0);
  });

  test("position setting inside containment with top and left", 2, function() {
    var position;
    var containerPosition;
    containment = $("<div id='container' style='height: 400px; width: 400px; top: 200px; left: 200px;position: absolute;' />").appendTo(QUnit.fixture);

    var wnd = setupWnd({
      visible: true,
      position: {
        top: 30,
        left: 30
      },
      draggable: {
        containment: containment
      }
    });

    position = kendo.getOffset(wnd.wrapper);
    containerPosition = kendo.getOffset(containment);
    equal(position.top, containerPosition.top + 30);
    equal(position.left, containerPosition.left + 30);
  });

  test("center inside containment with top and left", 2, function() {
    var containerPosition;
    var expectedPosition;
    var currentPosition;
    containment = $("<div id='container' style='height: 400px; width: 400px; top: 200px; left: 200px;position: absolute;' />").appendTo(QUnit.fixture);

    var wnd = setupWnd({
      visible: true,
      draggable: {
        containment: containment
      }
    });

    wnd.center();

    currentPosition = kendo.getOffset(wnd.wrapper);
    containerPosition = kendo.getOffset(containment);

    expectedPosition = {
      top: containerPosition.top + (containment.height() / 2) - (wnd.wrapper.outerHeight() / 2),
      left: containerPosition.left + (containment.width() / 2) - (wnd.wrapper.outerWidth() / 2)
    };

    equal(currentPosition.top, expectedPosition.top);
    equal(currentPosition.left, expectedPosition.left);
  });

  test("maximize inside containment with top and left", 4, function() {
    var position;
    containment = $("<div id='container' style='height: 400px; width: 400px; top: 200px; left: 200px;position: absolute;' />").appendTo(QUnit.fixture);

    var wnd = setupWnd({
      visible: true,
      draggable: {
        containment: containment
      }
    });

    wnd.maximize();
    position = kendo.getOffset(wnd.wrapper);

    equal(position.top, 200);
    equal(position.left, 200);
    equal(wnd.wrapper.width(), 400);
    equal(wnd.wrapper.height() + parseInt(wnd.wrapper.css("paddingTop"), 10), 400);
  });

  test("maximize in browser context when pinned", 4, function() {
    var position;
    var browserWindow = $(window);
    containment = $("<div id='container' style='height: 400px; width: 400px; top: 200px; left: 200px;position: absolute;' />").appendTo(QUnit.fixture);

    var wnd = setupWnd({
      visible: true,
      pinned: true,
      draggable: {
        containment: containment
      }
    });

    wnd.maximize();
    position = kendo.getOffset(wnd.wrapper);

    equal(position.top, 0);
    equal(position.left, 0);
    equal(wnd.wrapper.outerWidth(), browserWindow.width());
    equal(wnd.wrapper.outerHeight(), browserWindow.height());
  });

  test("keep position when restore inside containment with top and left", 2, function() {
    var position;
    var expectedPosition;
    containment = $("<div id='container' style='height: 400px; width: 400px; top: 200px; left: 200px;position: absolute;' />").appendTo(QUnit.fixture);

    var wnd = setupWnd({
      visible: true,
      draggable: {
        containment: containment
      }
    });

    position = kendo.getOffset(wnd.wrapper);
    wnd.minimize();
    wnd.restore();
    expectedPosition = kendo.getOffset(wnd.wrapper);

    equal(position.top, expectedPosition.top);
    equal(position.left, expectedPosition.left);
  });

  test("pin does not change position inside containment", 2, function() {
    var positionBeforePin;
    var positionAfterPin;

    var wnd = setupWnd({
      visible: true,
      draggable: {
        containment: containment
      }
    });

    positionBeforePin = kendo.getOffset(wnd.wrapper);
    wnd.pin();
    positionAfterPin = kendo.getOffset(wnd.wrapper);

    equal(positionAfterPin.top, positionBeforePin.top);
    equal(positionAfterPin.left, positionBeforePin.left);
  });

  test("pin unpin does not change position inside containment", 2, function() {
    var positionBeforePin;
    var positionAfterPin;

    var wnd = setupWnd({
      visible: true,
      draggable: {
        containment: containment
      }
    });

    positionBeforePin = kendo.getOffset(wnd.wrapper);
    wnd.pin();
    wnd.unpin();
    positionAfterPin = kendo.getOffset(wnd.wrapper);

    equal(positionAfterPin.top, positionBeforePin.top);
    equal(positionAfterPin.left, positionBeforePin.left);
  });

  test("resizing horizontally is constrained to containment", function() {
    var wnd = setupWnd({
      visible: true,
      draggable: {
        containment: containment
      }
    });

    var containmentWidth = containment.width();

    resizewnd(wnd, "e", 500, 0);

    equal(wnd.wrapper.outerWidth(), containmentWidth);
  });

  test("resizing horizontally is not constrained when pinned", function() {
    var wnd = setupWnd({
      visible: true,
      width: 100,
      height: 100,
      draggable: {
        containment: containment
      }
    });

    resizewnd(wnd, "e", 500, 0);

    equal(wnd.wrapper.outerWidth(), 400);
  });

  test("resizing vertically is constrained to containment", function() {
    var wnd = setupWnd({
      visible: true,
      draggable: {
        containment: containment
      }
    });

    var containmentHeight = containment.height();

    resizewnd(wnd, "s", 0, 500);

    equal(wnd.wrapper.outerHeight(), containmentHeight);
  });

  test("resizing vertically is not constrained when pinned", function() {
    var wnd = setupWnd({
      visible: true,
      width: 100,
      height: 100,
      draggable: {
        containment: containment
      }
    });

    resizewnd(wnd, "s", 0, 500);

    equal(wnd.wrapper.outerHeight(), 400);
  });
})();
