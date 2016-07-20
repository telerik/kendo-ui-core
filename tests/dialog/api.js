(function() {
    module("initialization", {
        setup: function() {
            //
        },
        teardown: function() {
            QUnit.fixture.closest("body").find(".dialog").each(function(idx, element) {
                $(element).data("kendoDialog").destroy();
            });
            QUnit.fixture.closest("body").find(".k-overlay").remove();
        }
    });

    var KDIALOGTITLE = ".k-dialog-title",
        KDIALOGTITLEBAR = ".k-window-titlebar",
        KTITLELESS = "k-dialog-titleless";

    function createDialog(options, element) {
        element = element || $("<div class='dialog'>dialog content</div>").appendTo(QUnit.fixture);
        return element.kendoDialog(options).data("kendoDialog");
    }

    test("title gets title", function() {
        equal(createDialog({ title: "Title" }).title(), "Title");
    });

    test("title sets title", function() {
        var dialog = createDialog({ title: "Title"}),
            oldTitle = dialog.title(),
            titleElement = $(KDIALOGTITLE, dialog.wrapper);

        dialog.title("Title is the new title!");

        equal(titleElement.text(), "Title is the new title!");

        dialog.title(oldTitle);

        equal(titleElement.text(), oldTitle);
    });

    test("title sets options.title", function() {
        var options = { title: "Title" },
            dialog = createDialog(options),
            newTitle = "Title is the new title!";

        dialog.title(newTitle);

        equal(dialog.options.title, newTitle);
    });

    test("title sets title, when window was created with titile false", function() {
        var dialog = createDialog({ title: false});
        var titleElement = $(KDIALOGTITLE, dialog.wrapper);
        var titleText = "Title is the new title!";

        equal(titleElement.length, 0);

        dialog.title(titleText);

        titleElement = $(KDIALOGTITLE, dialog.wrapper);
        equal(titleElement.text(), titleText);
    });

    test("title sets title, when window was created with titile false, removes k-dialog-titleless class from wrapper", function() {
        var dialog = createDialog({ title: false});
        var titleText = "Title is the new title!";

        dialog.title(titleText);

        notOk(dialog.wrapper.hasClass(KTITLELESS));
    });

    test("title method gets and sets the title consistently", 2, function () {
        var title = "&lt;foo&gt;",
            dialog = createDialog({ title: title });

        equal(dialog.title(), title);
        dialog.title(dialog.title());
        equal(dialog.title(), title);
    });

    test("title method and title property set once encoded string as once encoded", 2, function () {
        var encodedString = kendo.htmlEncode("<script>var foo1 = 1;<\/script>"),
            dialog = createDialog({ title: encodedString }),
            titleElement = $(KDIALOGTITLE, dialog.wrapper);

        equal(titleElement.html(), encodedString);

        dialog.title(encodedString);

        equal(titleElement.html(), encodedString);
    });

    test("set title to false removes the titlebar element", function() {
        var dialog = createDialog({ title: "Title" });

        dialog.title(false);

        equal(dialog.wrapper.children(KDIALOGTITLEBAR).length, 0);
    });

    test("set title to false adds k-dialog-titleles class to wrapper", function() {
        var dialog = createDialog({ title: "Title" });

        dialog.title(false);

        ok(dialog.wrapper.hasClass(KTITLELESS));
    });

    test("content gets content", function() {
        equal(createDialog().content(), "dialog content");
    });

    test("content sets content", function() {
        var dialog = createDialog(),
            oldContent = dialog.content(),
            contentElement = $(".k-content", dialog.wrapper);

        dialog.content("Content is the new content!");

        equal(contentElement.html(), "Content is the new content!");

        dialog.content(oldContent);

        equal(contentElement.html(), oldContent);
    });

    test("title sets options.title", function() {
        var dialog = createDialog({ content: "" }),
            newContent = "Content is the new content!";

        dialog.content(newContent);

        equal(dialog.options.content, newContent);
    });
})();
