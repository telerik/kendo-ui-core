<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<div class="configuration k-widget k-header">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
            <input type="text" value="0" id="selectIndex" class="k-textbox"/> <button class="selectItem k-button">Select</button>
        </li>
        <li>
            <button class="toggleItem k-button">Enable/Disable</button>
        </li>
        <li>
            <button class="triggerItem k-button">Expand/Collapse</button>
        </li>
        <li>
            <button class="removeItem k-button">Remove</button>
        </li>
        <li>
            <input type="text" value="Item" id="appendText" class="k-textbox"/> <button class="appendItem k-button">Append</button>
        </li>
        <li>
            <input type="text" value="Item" id="beforeText" class="k-textbox"/> <button class="beforeItem k-button">Insert Before</button>
        </li>
        <li>
            <input type="text" value="Item" id="afterText" class="k-textbox"/> <button class="afterItem k-button">Insert After</button>
        </li>
    </ul>
</div>

<%= Html.Kendo().PanelBar()
    .Name("panelbar")
    .HtmlAttributes(new { style = "margin-right: 220px;" })
    .Items(panelbar =>
    {
        panelbar.Add().Text("First Item")
            .Expanded(true)
            .Items(items => {
                items.Add().Text("Sub Item 1");
                items.Add().Text("Sub Item 2");
                items.Add().Text("Sub Item 3");
                items.Add().Text("Sub Item 4");
            });

        panelbar.Add().Text("Second Item")
            .Items(items =>
            {
                items.Add().Text("Sub Item 1");
                items.Add().Text("Sub Item 2");
                items.Add().Text("Sub Item 3");
                items.Add().Text("Sub Item 4");
            });

        panelbar.Add().Text("Third Item")
            .Items(items =>
            {
                items.Add().Text("Sub Item 1");
                items.Add().Text("Sub Item 2");
                items.Add().Text("Sub Item 3");
                items.Add().Text("Sub Item 4");
            });

        panelbar.Add().Text("Fourth Item")
            .Items(items =>
            {
                items.Add().Text("Sub Item 1");
                items.Add().Text("Sub Item 2");
                items.Add().Text("Sub Item 3");
                items.Add().Text("Sub Item 4");
            });

        panelbar.Add().Text("Fifth Item")
            .Items(items =>
            {
                items.Add().Text("Sub Item 1");
                items.Add().Text("Sub Item 2");
                items.Add().Text("Sub Item 3");
                items.Add().Text("Sub Item 4");
            });
    })
%>

<script>
    var panelbar;

    $(document).ready(function() {
        panelbar = $("#panelbar").data("kendoPanelBar");
    });

    var getItem = function (target) {
            var itemIndexes = target.val().split(/[.,]/),
                rootItem = panelbar.element.children("li").eq(itemIndexes[0]);

            return itemIndexes.length > 1 ?
                rootItem.find(".k-group > .k-item").eq(itemIndexes[1]) :
                rootItem;
        },
        select = function (e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                panelbar.select(getItem($("#selectIndex")));
        },
        append = function (e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                panelbar.append({
                        text: $("#appendText").val()
                    }, panelbar.select());
        },
        before = function (e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                panelbar.insertBefore({
                    text: $("#beforeText").val()
                }, panelbar.select());
        },
        after = function (e) {
            if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                panelbar.insertAfter({
                    text: $("#afterText").val()
                }, panelbar.select());
        };

    $(".selectItem").click(select);
    $("#selectIndex").keypress(select);

    $(".appendItem").click(append);
    $("#appendText").keypress(append);

    $(".beforeItem").click(before);
    $("#beforeText").keypress(before);

    $(".afterItem").click(after);
    $("#afterText").keypress(after);

    $(".toggleItem").click(function (e) {
        var item = panelbar.select();
        panelbar.enable(item, item.hasClass("k-state-disabled"));
    });

    $(".triggerItem").click(function (e) {
        var item = panelbar.select();

        if (item.hasClass("k-state-active")) {
            panelbar.collapse(item);
        } else {
            panelbar.expand(item);
        }
    });

    $(".removeItem").click(function (e) {
        panelbar.remove(panelbar.select());
    });
</script>

<style scoped>
    .configuration .k-textbox {
        width: 40px;
    }
</style>
</asp:Content>