var app = kendo.Application, expenseData = [ { id: 1, name: "Office materials", category: "Work", amount: 100 },
    { id: 2, name: "Groceries", category: "Food", amount: 60 },
    { id: 3, name: "Coffee", category: "Leisure", amount: 10 }
];

app.route({ '/': 'expenses.index' });

app.contentElement = function() { return $("#content"); };

$(document).delegate("[data-kendo-type=mvc-link]", "click", function() {
    app.navigate($(this).attr("href"));
    return false;
});

app.controller("expenses", {
    expenses: function() {
        return new kendo.data.DataSource({
            data: expenseData,
            schema: { model: { id: "id" } }
        });
    },

    index: function() {
        this.set("expenses", this.expenses());
    },

    show: function(index) {
        var expenses = this.expenses();
        expenses.read();
        this.set("expense", expenses.get(index).data);
    },

    "new": function() {
        this.set("expenses", this.expenses());
    }
});

app.view("expenses.index", {
    render: function() {
        var t = kendo.Template.compile($("#expenses-template").text());
        $("#content").html(t({}));

        $("#grid").kendoGrid({
            dataSource: this.expenses,
            scrollable: false,
            columns: [
                { field: "name", title: "Expense", template: '<a href="/expenses/show/${id}" data-kendo-type="mvc-link">${name}</a>' },
                { field: "category", title: "Category" },
                { field: "amount", title: "Amount" }
            ]
        });
    }
});

app.view("expenses.new", {
    url: "/playground/mvc/expenses/new.html",
    events: {
        "submit #new-expense": function() {
            var newExpense = {id: expenseData.length + 1}, idx, field, formData = $("#new-expense").serializeArray();

            for (idx in formData) {
                field = formData[idx];
                newExpense[field.name] = field.value;
            }

            expenseData.push(newExpense);
            app.navigate("");
            return false;
        }
    }
});

app.view("expenses.show", {
    render: function() {
        var t = kendo.Template.compile($("#expense-template").text());
        $("#content").html(t({expense: this.expense}));
    }
});

app.init({root: "/playground/mvc/", pushState: true});
