<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="configuration k-widget k-header">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
            <input type="text" id="toggleIndex" value="0" class="k-textbox"/> <button class="toggleItem k-button">Enable/Disable</button>
        </li>
        <li>
            <input type="text" id="triggerIndex" value="0" class="k-textbox"/> <button class="triggerItem k-button">Open/Close</button>
        </li>
        <li>
            <input type="text" id="removeIndex" value="0" class="k-textbox"/> <button class="removeItem k-button">Remove</button>
        </li>
        <li>
            <input type="text" value="Item" id="appendText" class="k-textbox"/> <input type="text" value="0.0" id="appendIndex" class="k-textbox"/> <button class="appendItem k-button">Append</button>
        </li>
        <li>
            <input type="text" value="Item" id="beforeText" class="k-textbox"/> <input type="text" value="0" id="beforeIndex" class="k-textbox"/> <button class="beforeItem k-button">Before</button>
        </li>
        <li>
            <input type="text" value="Item" id="afterText" class="k-textbox"/> <input type="text" value="0" id="afterIndex" class="k-textbox"/> <button class="afterItem k-button">After</button>
        </li>
    </ul>
</div>

<%= Html.Kendo().Menu()
    .Name("menu")
    .HtmlAttributes(new { style = "margin-right:220px;" })
    .Items(items =>
    {
        items.Add()
            .Text("First Item")
            .Items(children =>
            {
                children.Add().Text("Sub Item 1");
                children.Add().Text("Sub Item 2");
                children.Add().Text("Sub Item 3");
                children.Add().Text("Sub Item 4");
                children.Add().Text("Sub Item 5");
            });

        items.Add()
             .Text("Second Item")
             .Items(children =>
             {
                 children.Add().Text("Sub Item 1");
                 children.Add().Text("Sub Item 2");
                 children.Add().Text("Sub Item 3");
                 children.Add().Text("Sub Item 4");
                 children.Add().Text("Sub Item 5");
             });

        items.Add()
            .Text("Third Item")
            .Items(children =>
            {
                children.Add().Text("Sub Item 1");
                children.Add().Text("Sub Item 2");
                children.Add().Text("Sub Item 3");
                children.Add().Text("Sub Item 4");
                children.Add().Text("Sub Item 5");
            });

        items.Add()
             .Text("Fourth Item")
             .Items(children =>
             {
                 children.Add().Text("Sub Item 1");
                 children.Add().Text("Sub Item 2");
                 children.Add().Text("Sub Item 3");
                 children.Add().Text("Sub Item 4");
                 children.Add().Text("Sub Item 5");
             });

        items.Add()
            .Text("Fifth Item")
            .Items(children =>
            {
                children.Add().Text("Sub Item 1");
                children.Add().Text("Sub Item 2");
                children.Add().Text("Sub Item 3");
                children.Add().Text("Sub Item 4");
                children.Add().Text("Sub Item 5");
            });
    })
%>

<script>
    $(document).ready(function() {
        var getItem = function (target) {
                var itemIndexes = target.val().split(/[.,]/),
                    rootItem = itemIndexes[0] != "" ?
                                    menu.element.children("li").eq(itemIndexes[0]) :
                                    false;

                return itemIndexes.length > 1 ?
                            rootItem.find(".k-group > .k-item").eq(itemIndexes[1]) :
                            rootItem;
            },
            toggle = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                    var item = getItem($("#toggleIndex"));
                    menu.enable(item, item.hasClass("k-state-disabled"));
                }
            },
            trigger =  function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                    var item = getItem($("#triggerIndex"));

                    if (item.hasClass("k-state-active"))
                        menu.close(item);
                    else
                        menu.open(item);
                }
            },
            remove = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode)
                    menu.remove(getItem($("#removeIndex")));
            },
            append = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                    menu.append({
                            text: $("#appendText").val()
                        }, getItem($("#appendIndex")));
                }
            },
            before = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                    menu.insertBefore({
                            text: $("#beforeText").val()
                        }, getItem($("#beforeIndex")));
                }
            },
            after = function (e) {
                if (e.type != "keypress" || kendo.keys.ENTER == e.keyCode) {
                    menu.insertAfter({
                            text: $("#afterText").val()
                        }, getItem($("#afterIndex")));
                }
            };

        $(".toggleItem").click(toggle);
        $("#toggleIndex").keypress(toggle);

        $(".triggerItem").click(trigger);
        $("#triggerIndex").keypress(trigger);

        $(".removeItem").click(remove);
        $("#removeIndex").keypress(remove);

        $(".appendItem").click(append);
        $("#appendText,#appendIndex").keypress(append);

        $(".beforeItem").click(before);
        $("#beforeText,#beforeIndex").keypress(before);

        $(".afterItem").click(after);
        $("#afterText,#afterIndex").keypress(after);
        
        var menu = $("#menu").data("kendoMenu");
    });
</script>
<style scoped>
    .configuration .k-textbox {
        width: 40px;
    }
</style>
</asp:Content>