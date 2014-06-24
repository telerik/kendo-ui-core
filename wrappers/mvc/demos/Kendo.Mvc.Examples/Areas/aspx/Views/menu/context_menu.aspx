<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="box">
    <h4>Orientation Settings</h4>
    <ul class="options">
        <li>
            <label for="orientation">orientation</label>
            <select id="orientation" name="orientation">
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
            </select>
        </li>
    </ul>
    <br />
    <a class="k-button" id="apply" href="#" style="width: 80px;">Apply</a>
</div>

<script type="text/x-kendo-template" id="template">
    <div class="product">
        <img src="<%=Url.Content("~/content/shared/images/employees/")%>#: FromID #.png" alt="#: From #" />

        <h3>#:Title#</h3>
        <p class="date">#:Date#</p>
        <p>#:From#</p>
    </div>
</script>

<div class="demo-section k-header">
    <h4>WebMail</h4>
    <%= Html.Kendo().ListView<Kendo.Mvc.Examples.Models.WebMail>()
        .Name("listview-context-menu")
        .TagName("div")
        .ClientTemplateId("template")
        .DataSource(dataSource =>
        {
            dataSource.Read(read => read.Action("_WebMailData", "Menu"));
            dataSource.PageSize(5);
        })
    %>

    <%= Html.Kendo().ContextMenu()
        .Name("menu")
        .Target("#listview-context-menu")
        .Filter(".product")
        .Orientation(ContextMenuOrientation.Horizontal)
        .Animation(animation =>
        {
            animation.Open(open =>
            {
                open.Fade(FadeDirection.In);
                open.Duration(500);
            });
        })
        .Items(items =>
        {
            items.Add()
                .Text("Reply")
                .ImageUrl(Url.Content("~/content/web/toolbar/reply.png"))
                .Items(children =>
                {
                    children.Add().Text("Reply To Sender").ImageUrl(Url.Content("~/content/web/toolbar/reply.png"));
                    children.Add().Text("Reply To All").ImageUrl(Url.Content("~/content/web/toolbar/reply.png"));
                });

            items.Add()
                 .Text("Forward");

            items.Add()
                .Text("Mark as")
                .Items(children =>
                {
                    children.Add().Text("Unread");
                    children.Add().Separator(true);
                    children.Add().Text("Important");
                    children.Add().Text("Read");
                });

            items.Add()
                .Text("Label as")
                .Items(children =>
                {
                    children.Add().Text("None");
                    children.Add().Separator(true);
                    children.Add().Text("Important").ImageUrl(Url.Content("~/content/web/toolbar/important.png"));
                    children.Add().Text("Work").ImageUrl(Url.Content("~/content/web/toolbar/todo.png"));
                    children.Add().Text("Personal").ImageUrl(Url.Content("~/content/web/toolbar/done.png"));
                    children.Add().Separator(true);
                    children.Add().Text("New Label");
                });
        })
    %>
</div>

<script>
    $(document).ready(function () {
        $("#orientation").kendoDropDownList();

        var menu = $("#menu"),
            original = menu.clone(true);

        original.find(".k-state-active").removeClass("k-state-active");

        $("#apply").click(function (e) {
            e.preventDefault();
            var clone = original.clone(true);

            menu.getKendoContextMenu().destroy();
            clone.appendTo("#example");

            initMenu();
        });

        var initMenu = function () {
            var orientation = $("#orientation").data("kendoDropDownList").value();

            menu = $("#menu").kendoContextMenu({
                orientation: orientation,
                target: "#listview-context-menu",
                filter: ".product",
                animation: {
                    open: { effects: "fadeIn" },
                    duration: 500
                },
                select: function (e) {
                    // Do something on select
                }
            });
        };
    });
</script>

<style scoped>
    .demo-section {
        width: 860px;
    }

    #listview-context-menu {
        padding: 0;
        margin-bottom: -1px;
        min-height: 300px;
    }

    .product {
        position: relative;
        height: 62px;
        margin: 0;
        padding: 0;
        border-bottom: 1px solid rgba(128,128,128,.3);
    }

        .product img {
            width: 40px;
            height: 40px;
            border-radius: 40px;
            margin: 10px;
            border: 1px solid #000;
            float: left;
        }

        .product h3 {
            margin: 0;
            padding: 15px 5px 1px 0;
            overflow: hidden;
            line-height: 1em;
            font-size: 1.1em;
            font-weight: bold;
        }

        .product p {
            font-size: .9em;
        }

        .product .date {
            float: right;
            margin: -8px 15px 0 0;
        }

    .k-listview:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
</style>

</asp:Content>
