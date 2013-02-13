// models / data
var items = new kendo.data.DataSource({
    schema: { model: {} },
    transport: { read: { url: "menu.json", dataType: "json" } }
});

var cart = kendo.observable({
    contents: [],
    cleared: false,

    add: function(item) {
        var found = false;

        this.set("cleared", false);

        for (var i = 0; i < this.contents.length; i ++) {
            var current = this.contents[i];
            if (current.item === item) {
                current.set("quantity", current.get("quantity") + 1);
                found = true;
                break;
            }
        }

        if (!found) {
            this.contents.push({ item: item, quantity: 1 });
        }
    },

    remove: function(item) {
        for (var i = 0; i < this.contents.length; i ++) {
            var current = this.contents[i];
            if (current === item) {
                this.contents.splice(i, 1);
                break;
            }
        }
    },

    clear: function() {
        var contents = this.get("contents");
        contents.splice(0, contents.length);
        this.set("cleared", true);
    }
});

var layoutModel = kendo.observable({
    cart: cart,

    checkoutIsVisible: function() {
        return this.cartContentsCount() > 0;
    },

    cartContentsCount: function() {
        return this.get("cart").get("contents").length;
    },

    removeFromCart: function(e) {
        this.get("cart").remove(e.data);
    }
});

var checkoutModel = kendo.observable({
    cart: cart,

    totalPrice: function() {
        var price = 0,
            contents = this.get("cart").get("contents"),
            length = contents.length,
            i = 0;

        for (; i < length; i ++) {
            price += parseInt(contents[i].item.price) * contents[i].quantity;
        }

        return kendo.format("{0:c}", price);
    },

    removeFromCart: function(e) {
        this.get("cart").remove(e.data);
    },

    proceed: function(e) {
        this.get("cart").clear();
        sushi.navigate("/");
    }
});

var indexModel = kendo.observable({
    items: items,

    addToCart: function(e) {
        cart.add(e.data);
    }
});

var detailModel = kendo.observable({
    current: {},
    imgUrl: function() {
        return "http://demos.kendoui.com/sushi/content/images/200/" + this.get("current").image
    },

    setCurrent: function(itemID) {
        var item = items.get(itemID),
            current = this.get("current");

        current.set("name", item.name);
        current.set("description", item.description);
        current.set("image", item.image);
        current.set("id", item.id);
    }
});

// Views and layouts
var layout = new kendo.Layout("layout", { model: layoutModel });
var index = new kendo.View("index", { model: indexModel });
var checkout = new kendo.View("checkout", { model: checkoutModel });
var detail = new kendo.View("detail", { model: detailModel });

var sushi = new kendo.Router({
    init: function() {
        layout.render("#application");
    }
});

// Routing
sushi.route("/", function() {
    layout.showIn("#content", index);
});

sushi.route("/checkout", function() {
    layout.showIn("#content", checkout);
});

sushi.route("/menu/:id", function(itemID) {
    items.fetch(function(e) {
        detail.model().setCurrent(itemID);
        layout.showIn("#content", detail);
    });
});

$(function() {
    sushi.start();
});
