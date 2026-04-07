import '@progress/kendo-ui/src/kendo.core.js';

let Widget = kendo.ui.Widget;

describe("widget features", function() {
    let div;

    beforeEach(function() {
        div = $("<div />").appendTo(Mocha.fixture);
    });

    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        div.remove();
    });

    it("setup is called on each feature during init", function() {
        let setupCalls = [];

        let FeatureA = {
            name: "FeatureA",
            setup(widget) { setupCalls.push("A"); }
        };

        let FeatureB = {
            name: "FeatureB",
            setup(widget) { setupCalls.push("B"); }
        };

        let widget = new Widget(div, { features: [FeatureA, FeatureB] });

        assert.equal(setupCalls.length, 2);
        assert.equal(setupCalls[0], "A");
        assert.equal(setupCalls[1], "B");
    });

    it("setup receives the widget instance", function() {
        let receivedWidget;

        let Feature = {
            name: "Feature",
            setup(widget) { receivedWidget = widget; }
        };

        let widget = new Widget(div, { features: [Feature] });

        assert.isOk(receivedWidget === widget);
    });

    it("_features is populated after init", function() {
        let FeatureA = { name: "A", setup() {} };
        let FeatureB = { name: "B", setup() {} };

        let widget = new Widget(div, { features: [FeatureA, FeatureB] });

        assert.equal(widget._features.length, 2);
        assert.isOk(widget._features[0] === FeatureA);
        assert.isOk(widget._features[1] === FeatureB);
    });

    it("_features is empty when no features are passed", function() {
        let widget = new Widget(div, {});

        assert.equal(widget._features.length, 0);
    });

    it("teardown is called on destroy in reverse order", function() {
        let teardownCalls = [];

        let FeatureA = {
            name: "A",
            setup() {},
            teardown() { teardownCalls.push("A"); }
        };

        let FeatureB = {
            name: "B",
            setup() {},
            teardown() { teardownCalls.push("B"); }
        };

        let widget = new Widget(div, { features: [FeatureA, FeatureB] });
        widget.destroy();

        assert.equal(teardownCalls.length, 2);
        assert.equal(teardownCalls[0], "B");
        assert.equal(teardownCalls[1], "A");
    });

    it("teardown receives the widget instance", function() {
        let receivedWidget;

        let Feature = {
            name: "Feature",
            setup() {},
            teardown(widget) { receivedWidget = widget; }
        };

        let widget = new Widget(div, { features: [Feature] });
        widget.destroy();

        assert.isOk(receivedWidget === widget);
    });

    it("features without teardown do not throw on destroy", function() {
        let Feature = {
            name: "NoTeardown",
            setup() {}
        };

        let widget = new Widget(div, { features: [Feature] });

        assert.doesNotThrow(function() { widget.destroy(); });
    });

    it("different widget instances do not share _features", function() {
        let w1 = new Widget(div, {});
        let w2 = new Widget($("<div />").appendTo(Mocha.fixture), {});

        assert.isOk(w1._features !== w2._features);
    });

    it("features are available in options after init", function() {
        let Feature = { name: "F", setup() {} };

        let widget = new Widget(div, { features: [Feature] });

        assert.isOk(Array.isArray(widget.options.features));
        assert.equal(widget.options.features.length, 1);
        assert.equal(widget.options.features[0].name, "F");
    });

    it("setup can mutate the widget instance", function() {
        let Feature = {
            name: "Mutator",
            setup(widget) { widget._featureFlag = true; }
        };

        let widget = new Widget(div, { features: [Feature] });

        assert.isOk(widget._featureFlag === true);
    });

    it("teardown can clean up widget instance properties", function() {
        let Feature = {
            name: "Cleanup",
            setup(widget) { widget._resource = { active: true }; },
            teardown(widget) { widget._resource = null; }
        };

        let widget = new Widget(div, { features: [Feature] });
        assert.isOk(widget._resource.active === true);

        widget.destroy();
        assert.isOk(widget._resource === null);
    });

    it("widget.options is fully merged before setup runs", function() {
        let optionValueDuringSetup;

        let Feature = {
            name: "OptionReader",
            setup(widget) { optionValueDuringSetup = widget.options.customOption; }
        };

        new Widget(div, { features: [Feature], customOption: "hello" });

        assert.equal(optionValueDuringSetup, "hello");
    });

    it("widget.element is available during setup", function() {
        let elementDuringSetup;

        let Feature = {
            name: "ElementReader",
            setup(widget) { elementDuringSetup = widget.element; }
        };

        let widget = new Widget(div, { features: [Feature] });

        assert.isOk(elementDuringSetup !== undefined);
        assert.isOk(elementDuringSetup[0] === div[0]);
    });

    it("passing features: [] explicitly produces empty _features", function() {
        let widget = new Widget(div, { features: [] });

        assert.equal(widget._features.length, 0);
    });

    it("a feature throwing in setup halts subsequent feature setup", function() {
        let secondSetupCalled = false;

        let Throwing = {
            name: "Thrower",
            setup() { throw new Error("setup error"); }
        };

        let Second = {
            name: "Second",
            setup() { secondSetupCalled = true; }
        };

        assert.throws(function() {
            new Widget(div, { features: [Throwing, Second] });
        });

        assert.isFalse(secondSetupCalled);
    });

    it("duplicate feature instance calls setup twice", function() {
        let setupCount = 0;

        let Feature = {
            name: "Dup",
            setup() { setupCount++; }
        };

        new Widget(div, { features: [Feature, Feature] });

        assert.equal(setupCount, 2);
    });

    it("duplicate feature instance calls teardown twice on destroy", function() {
        let teardownCount = 0;

        let Feature = {
            name: "Dup",
            setup() {},
            teardown() { teardownCount++; }
        };

        let widget = new Widget(div, { features: [Feature, Feature] });
        widget.destroy();

        assert.equal(teardownCount, 2);
    });

    it("feature extraction does not corrupt other options", function() {
        let Feature = { name: "F", setup() {} };

        let widget = new Widget(div, {
            features: [Feature],
            name: "TestWidget",
            prefix: "",
            custom: 42
        });

        assert.equal(widget.options.name, "TestWidget");
        assert.equal(widget.options.prefix, "");
        assert.equal(widget.options.custom, 42);
    });

    it("calling destroy twice invokes teardown twice", function() {
        let teardownCount = 0;

        let Feature = {
            name: "F",
            setup() {},
            teardown() { teardownCount++; }
        };

        let widget = new Widget(div, { features: [Feature] });
        widget.destroy();
        widget.destroy();

        assert.equal(teardownCount, 2);
    });

    it("featureMap validation throws when feature-gated option is set without the feature", function() {
        let TestWidget = Widget.extend({
            options: {
                name: "FeatureMapTest",
                prefix: "",
                editable: false
            }
        });

        TestWidget.featureMap = {
            "Editing": ["editable"]
        };

        assert.throws(function() {
            new TestWidget(div, { editable: true });
        }, /Option "editable" requires the "Editing" feature/);
    });

    it("featureMap validation does not throw when option is at its default value", function() {
        let TestWidget = Widget.extend({
            options: {
                name: "FeatureMapDefault",
                prefix: "",
                editable: false
            }
        });

        TestWidget.featureMap = {
            "Editing": ["editable"]
        };

        assert.doesNotThrow(function() {
            new TestWidget(div, {});
        });
    });

    it("featureMap validation does not throw when the required feature is loaded", function() {
        let EditingFeature = { name: "Editing", setup() {} };

        let TestWidget = Widget.extend({
            options: {
                name: "FeatureMapLoaded",
                prefix: "",
                editable: false
            }
        });

        TestWidget.featureMap = {
            "Editing": ["editable"]
        };

        assert.doesNotThrow(function() {
            new TestWidget(div, { editable: true, features: [EditingFeature] });
        });
    });

    it("featureMap validation checks multiple options per feature", function() {
        let TestWidget = Widget.extend({
            options: {
                name: "FeatureMapMulti",
                prefix: "",
                editable: false,
                editMode: "popup"
            }
        });

        TestWidget.featureMap = {
            "Editing": ["editable", "editMode"]
        };

        assert.throws(function() {
            new TestWidget(div, { editMode: "inline" });
        }, /Option "editMode" requires the "Editing" feature/);
    });

    it("featureMap validation skips widgets without featureMap", function() {
        assert.doesNotThrow(function() {
            new Widget(div, { someOption: true });
        });
    });

    it("featureMap validation handles multiple features independently", function() {
        let EditingFeature = { name: "Editing", setup() {} };

        let TestWidget = Widget.extend({
            options: {
                name: "FeatureMapMultiFeature",
                prefix: "",
                editable: false,
                filterable: false
            }
        });

        TestWidget.featureMap = {
            "Editing": ["editable"],
            "Filtering": ["filterable"]
        };

        assert.doesNotThrow(function() {
            new TestWidget(div, { editable: true, features: [EditingFeature] });
        });

        assert.throws(function() {
            new TestWidget($("<div />").appendTo(Mocha.fixture), {
                editable: true,
                filterable: true,
                features: [EditingFeature]
            });
        }, /Option "filterable" requires the "Filtering" feature/);
    });

    it("featureMap validation does not throw when option is explicitly set to default", function() {
        let TestWidget = Widget.extend({
            options: {
                name: "FeatureMapExplicitDefault",
                prefix: "",
                editable: false
            }
        });

        TestWidget.featureMap = {
            "Editing": ["editable"]
        };

        assert.doesNotThrow(function() {
            new TestWidget(div, { editable: false });
        });
    });

    it("featureMap validation throws for non-boolean option change", function() {
        let TestWidget = Widget.extend({
            options: {
                name: "FeatureMapString",
                prefix: "",
                editMode: "none"
            }
        });

        TestWidget.featureMap = {
            "Editing": ["editMode"]
        };

        assert.throws(function() {
            new TestWidget(div, { editMode: "inline" });
        }, /Option "editMode" requires the "Editing" feature/);
    });

    it("featureMap validation error message contains feature name and option key", function() {
        let TestWidget = Widget.extend({
            options: {
                name: "FeatureMapMessage",
                prefix: "",
                sortable: false
            }
        });

        TestWidget.featureMap = {
            "Sorting": ["sortable"]
        };

        let errorMessage = "";
        try {
            new TestWidget(div, { sortable: true });
        } catch (e) {
            errorMessage = e.message;
        }

        assert.include(errorMessage, "sortable");
        assert.include(errorMessage, "Sorting");
        assert.include(errorMessage, "features");
    });

    it("prototype features from compat bundle bypass validation", function() {
        let EditingFeature = { name: "Editing", setup() {} };

        let TestWidget = Widget.extend({
            options: {
                name: "FeatureMapCompat",
                prefix: "",
                editable: false,
                features: [EditingFeature]
            }
        });

        TestWidget.featureMap = {
            "Editing": ["editable"]
        };

        assert.doesNotThrow(function() {
            new TestWidget(div, { editable: true });
        });
    });
});
