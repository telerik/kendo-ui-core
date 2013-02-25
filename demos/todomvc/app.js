ToDos = kendo.observable({
    items: [],

    filter: null,

    edit: function(e) {
        e.data.set("editable", true);
        $(".editing input").focus();
    },

    hideEdit: function(e) {
        e.data.set("editable", false);
    },

    liClass: function(item) {
        if (item.get("editable")) {
            return "editing";
        } else {
            return (item.get("complete") ? "completed" : "active");
        }
    },

    keyup: function(e) {
        if (e.which === 13) {
            this.hideEdit(e);
        }
    },

    currentItems: function() {
        var filter = this.get("filter"),
            items = this.get("items");

        if (!filter) {
            return items;
        } else  if (filter === "active") {
            return this.activeItems();
        } else  if (filter === "completed") {
            return this.completeItems();
        }
    },

    activeItems: function() {
        return this.get("items").filter(function(item) { return !item.get("complete"); });
    },

    completeItems: function() {
        return this.get("items").filter(function(item) { return item.get("complete"); });
    },

    remove: function(e) {
        this.removeItem(e.data);
    },

    removeItem: function(item) {
        this.get("items").remove(item);
    },

    add: function(e) {
        e.preventDefault();
        var value = $("#new-todo").val();
        if (value) {
            this.items.push(kendo.observable({title: value, completed: false, editable: false }));
            $("#new-todo").val("");
        }
    },

    remainingCount: function() {
        return this.activeItems().length;
    },

    remainingCountItem: function() {
        var remainingCount = this.remainingCount();
        return remainingCount === 1 ? "item" : "items";
    },

    allFilterClass: function() {
        return this.get("filter") ? "" : "selected";
    },

    activeFilterClass: function() {
        return this.get("filter") === "active" ? "selected" : "";
    },

    completedFilterClass: function() {
        return this.get("filter") === "completed" ? "selected" : "";
    },

    clearCompleted: function() {
        this.completeItems().forEach(function(item) {
            ToDos.removeItem(item);
        });
    },

    clearCompletedVisible: function() {
        return this.completeItems().length > 0;
    },

    clearCompletedText: function() {
        return "Clear completed (" + this.completeItems().length + ")";
    }
});

var main = new kendo.View("main-template", { model: ToDos });

var router = new kendo.Router();

router.bind("init", function() {
    main.render("#app");
});

router.route("/", function() {
    ToDos.set("filter", "");
});

router.route("/active", function() {
    ToDos.set("filter", "active");
});

router.route("/completed", function() {
    ToDos.set("filter", "completed");
});

$(function() {
    router.start();
});

