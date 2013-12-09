(function() {
    module("initialization", {
        teardown: function() {
            if (button && button.data("kendoButton")) {
                button.data("kendoButton").destroy();
                button.remove();
                button = null;
            }
            if (buttonContainer && buttonContainer.length) {
                kendo.destroy(buttonContainer);
                buttonContainer.remove();
                buttonContainer = null;
            }
        }
    });

    test("initialization adds a k-button class", function() {
        getButton().kendoButton();

        ok(button.data("kendoButton").element.hasClass("k-button"));
    });

    test("spriteCssClass prepends a span element with corresponding class(es)", function() {
        getButton().kendoButton({
            spriteCssClass: "foo bar"
        });

        var icon = button.data("kendoButton").element.children("span.k-sprite");

        equal(icon.length, 1);
        ok(icon.hasClass("foo"));
        ok(icon.hasClass("bar"));
    });

    test("spriteCssClass adds corresponding class(es) to span.k-sprite element if already exists", function() {
        getButton('<span class="k-sprite"></span>text').kendoButton({
            spriteCssClass: "foo bar"
        });

        var icon = button.data("kendoButton").element.children("span.k-sprite");

        equal(icon.length, 1);
        ok(icon.hasClass("foo"));
        ok(icon.hasClass("bar"));
    });

    test("spriteCssClass adds a k-button-icon class to empty button", function() {
        getButton("").kendoButton({
            spriteCssClass: "foo"
        });

        ok(button.hasClass("k-button-icon"));
    });

    test("spriteCssClass adds a k-button-icon class to empty button with only an icon span inside", function() {
        getButton('<span class="k-sprite"></span>').kendoButton({
            spriteCssClass: "foo"
        });

        ok(button.hasClass("k-button-icon"));
    });

    test("spriteCssClass adds a k-button-icontext class if button has content", function() {
        getButton().kendoButton({
            spriteCssClass: "foo"
        });

        ok(button.hasClass("k-button-icontext"));
    });

    test("icon prepends a span element with corresponding class(es)", function() {
        getButton().kendoButton({
            icon: "foo"
        });

        var icon = button.data("kendoButton").element.children("span.k-icon");

        equal(icon.length, 1);
        ok(icon.hasClass("k-i-foo"));
    });

    test("icon adds corresponding class(es) to span.k-icon element if already exists", function() {
        getButton('<span class="k-icon"></span>text').kendoButton({
            icon: "foo"
        });

        var icon = button.data("kendoButton").element.children("span.k-icon");

        equal(icon.length, 1);
        ok(icon.hasClass("k-i-foo"));
    });

    test("icon adds a k-button-icon class to empty button", function() {
        getButton("").kendoButton({
            icon: "foo"
        });

        ok(button.hasClass("k-button-icon"));
    });

    test("icon adds a k-button-icon class to empty button with only an icon span inside", function() {
        getButton('<span class="k-icon"></span>').kendoButton({
            icon: "foo"
        });

        ok(button.hasClass("k-button-icon"));
    });

    test("icon adds a k-button-icontext class if button has content", function() {
        getButton().kendoButton({
            icon: "foo"
        });

        ok(button.hasClass("k-button-icontext"));
    });

    test("imageUrl prepends an img element with src attribute", function() {
        getButton().kendoButton({
            imageUrl: "foo"
        });

        var image = button.data("kendoButton").element.children("img.k-image");

        equal(image.length, 1);
        equal(image.attr("src"), "foo");
    });

    test("imageUrl sets a src attribute to img.k-image element if already exists", function() {
        getButton('<img class="k-image" />text').kendoButton({
            imageUrl: "foo"
        });

        var image = button.data("kendoButton").element.children("img.k-image");

        equal(image.length, 1);
        equal(image.attr("src"), "foo");
    });

    test("imageUrl adds a k-button-icon class to empty button", function() {
        getButton("").kendoButton({
            imageUrl: "foo"
        });

        ok(button.hasClass("k-button-icon"));
    });

    test("imageUrl adds a k-button-icon class to empty button with only an icon image inside", function() {
        getButton('<img class="k-image" />').kendoButton({
            imageUrl: "foo"
        });

        ok(button.hasClass("k-button-icon"));
    });

    test("imageUrl adds a k-button-icontext class if button has content", function() {
        getButton().kendoButton({
            imageUrl: "foo"
        });

        ok(button.hasClass("k-button-icontext"));
    });

    test("default button does not have a k-state-disabled class", function() {
        getButton().addClass("k-state-disabled").kendoButton();

        ok(!button.data("kendoButton").element.hasClass("k-state-disabled"));
    });

    test("enable:false adds a k-state-disabled class", function() {
        getButton().kendoButton({
            enable: false
        });

        ok(button.data("kendoButton").element.hasClass("k-state-disabled"));
    });

    test("enable:false adds a disabled attribute", function() {
        getButton().kendoButton({
            enable: false
        });

        equal(button.data("kendoButton").element.attr("disabled"), "disabled");
    });

    test("disabled attribute adds a k-state-disabled class", function() {
        getButton().attr("disabled", "disabled").kendoButton();

        ok(button.data("kendoButton").element.hasClass("k-state-disabled"));
    });

    test("initialization adds a tabindex attribute if not present", function() {
        getButton().kendoButton();

        equal(button.data("kendoButton").element.attr("tabindex"), 0);
    });

    test("initialization preserves set tabindex attribute", function() {
        getButton().attr("tabindex", 1).kendoButton();

        equal(button.data("kendoButton").element.attr("tabindex"), 1);
    });
})();
