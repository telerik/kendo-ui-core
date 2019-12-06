(function() {
    describe("initialization", function () {
        afterEach(function() {
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
        });

    it("initialization adds a k-button class", function() {
        getButton().kendoButton();

        assert.isOk(button.data("kendoButton").element.hasClass("k-button"));
    });

    it("spriteCssClass prepends a span element with corresponding class(es)", function() {
        getButton().kendoButton({
            spriteCssClass: "foo bar"
        });

        var icon = button.data("kendoButton").element.children("span.k-sprite");

        assert.equal(icon.length, 1);
        assert.isOk(icon.hasClass("foo"));
        assert.isOk(icon.hasClass("bar"));
    });

    it("spriteCssClass adds corresponding class(es) to span.k-sprite element if already exists", function() {
        getButton('<span class="k-sprite"></span>text').kendoButton({
            spriteCssClass: "foo bar"
        });

        var icon = button.data("kendoButton").element.children("span.k-sprite");

        assert.equal(icon.length, 1);
        assert.isOk(icon.hasClass("foo"));
        assert.isOk(icon.hasClass("bar"));
    });

    it("spriteCssClass adds a k-button-icon class to empty button", function() {
        getButton("").kendoButton({
            spriteCssClass: "foo"
        });

        assert.isOk(button.hasClass("k-button-icon"));
    });

    it("spriteCssClass adds a k-button-icon class to empty button with only an icon span inside", function() {
        getButton('<span class="k-sprite"></span>').kendoButton({
            spriteCssClass: "foo"
        });

        assert.isOk(button.hasClass("k-button-icon"));
    });

    it("spriteCssClass adds a k-button-icontext class if button has content", function() {
        getButton().kendoButton({
            spriteCssClass: "foo"
        });

        assert.isOk(button.hasClass("k-button-icontext"));
    });

    it("icon prepends a span element with corresponding class(es)", function() {
        getButton().kendoButton({
            icon: "foo"
        });

        var icon = button.data("kendoButton").element.children("span.k-icon");

        assert.equal(icon.length, 1);
        assert.isOk(icon.hasClass("k-i-foo"));
    });

    it("icon adds corresponding class(es) to span.k-icon element if already exists", function() {
        getButton('<span class="k-icon"></span>text').kendoButton({
            icon: "foo"
        });

        var icon = button.data("kendoButton").element.children("span.k-icon");

        assert.equal(icon.length, 1);
        assert.isOk(icon.hasClass("k-i-foo"));
    });

    it("icon adds a k-button-icon class to empty button", function() {
        getButton("").kendoButton({
            icon: "foo"
        });

        assert.isOk(button.hasClass("k-button-icon"));
    });

    it("icon adds a k-button-icon class to empty button with only an icon span inside", function() {
        getButton('<span class="k-icon"></span>').kendoButton({
            icon: "foo"
        });

        assert.isOk(button.hasClass("k-button-icon"));
    });

    it("icon adds a k-button-icontext class if button has content", function() {
        getButton().kendoButton({
            icon: "foo"
        });

        assert.isOk(button.hasClass("k-button-icontext"));
    });

    it("iconClass prepends a span element with corresponding class(es)", function() {
        getButton().kendoButton({
            iconClass: "fa fa-test"
        });

        var icon = button.data("kendoButton").element.children("span");

        assert.equal(icon.attr("class"), "fa fa-test");
    });

    it("iconClass adds a k-button-icontext class if button has content", function() {
        getButton().kendoButton({
            iconClass: "fa fa-test"
        });

        assert.isOk(button.hasClass("k-button-icontext"));
    });

    it("iconClass adds a k-button-icon class to empty button", function() {
        getButton("").kendoButton({
            iconClass: "fa fa-test"
        });

        assert.isOk(button.hasClass("k-button-icon"));
    });

    it("imageUrl prepends an img element with src attribute", function() {
        getButton().kendoButton({
            imageUrl: "foo"
        });

        var image = button.data("kendoButton").element.children("img.k-image");

        assert.equal(image.length, 1);
        assert.equal(image.attr("src"), "foo");
    });

    it("imageUrl sets a src attribute to img.k-image element if already exists", function() {
        getButton('<img class="k-image" />text').kendoButton({
            imageUrl: "foo"
        });

        var image = button.data("kendoButton").element.children("img.k-image");

        assert.equal(image.length, 1);
        assert.equal(image.attr("src"), "foo");
    });

    it("imageUrl adds a k-button-icon class to empty button", function() {
        getButton("").kendoButton({
            imageUrl: "foo"
        });

        assert.isOk(button.hasClass("k-button-icon"));
    });

    it("imageUrl adds a k-button-icon class to empty button with only an icon image inside", function() {
        getButton('<img class="k-image" />').kendoButton({
            imageUrl: "foo"
        });

        assert.isOk(button.hasClass("k-button-icon"));
    });

    it("imageUrl adds a k-button-icontext class if button has content", function() {
        getButton().kendoButton({
            imageUrl: "foo"
        });

        assert.isOk(button.hasClass("k-button-icontext"));
    });

    it("default button does not have a k-state-disabled class", function() {
        getButton().addClass("k-state-disabled").kendoButton();

        assert.isOk(!button.data("kendoButton").element.hasClass("k-state-disabled"));
    });

    it("enable:false adds a k-state-disabled class", function() {
        getButton().kendoButton({
            enable: false
        });

        assert.isOk(button.data("kendoButton").element.hasClass("k-state-disabled"));
    });

    it("enable:false adds a disabled attribute", function() {
        getButton().kendoButton({
            enable: false
        });

        assert.equal(button.data("kendoButton").element.attr("disabled"), "disabled");
    });

    it("enabled:false adds a k-state-disabled class", function() {
        getButton().kendoButton({
            enabled: false
        });

        assert.isOk(button.data("kendoButton").element.hasClass("k-state-disabled"));
    });

    it("enabled:false adds a disabled attribute", function() {
        getButton().kendoButton({
            enabled: false
        });

        assert.equal(button.data("kendoButton").element.attr("disabled"), "disabled");
    });

    it("disabled attribute adds a k-state-disabled class", function() {
        getButton().attr("disabled", "disabled").kendoButton();

        assert.isOk(button.data("kendoButton").element.hasClass("k-state-disabled"));
    });

    it("initialization adds a tabindex attribute if not present", function() {
        getButton().kendoButton();

        assert.equal(button.data("kendoButton").element.attr("tabindex"), 0);
    });

    it("initialization preserves set tabindex attribute", function() {
        getButton().attr("tabindex", 1).kendoButton();

        assert.equal(button.data("kendoButton").element.attr("tabindex"), 1);
    });

    it("when badge is enabled a kendo.ui.Badge is initialized", function() {
        getButton().attr("tabindex", 1).kendoButton({
            badge: "1"
        });

        assert.isOk(button.data("kendoButton").badge instanceof kendo.ui.Badge);
    });
    });
}());