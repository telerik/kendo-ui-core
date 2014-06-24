<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section">
    <%= Html.Kendo().Menu()
        .Name("Menu")
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
        .Events(e => e.Open("open").Close("close").Select("select").Activate("activate").Deactivate("deactivate"))
    %>
</div>
    <div class="demo-section k-header">
        <h4>Context Menu</h4>
        <p>A collection of <span id="context-target">Animation (?)</span> objects, used to change default animations. A value of false will disable all animations in the widget.</p>
    </div>

    <%= Html.Kendo().ContextMenu()
            .Name("context-menu-events")
            .ShowOn("click")
            .AlignToAnchor(true)
            .Target("#context-target")
            .Items(items =>
            {
                items.Add()
                    .Text("animation")
                    .Items(children =>
                    {
                        children.Add().Text("slideIn");
                        children.Add().Text("fadeIn");
                        children.Add().Text("expand");
                    });

                items.Add()
                     .Text("animation.close")
                     .Items(children =>
                     {
                         children.Add().Text("animation.close.effects");
                         children.Add().Text("animation.close.duration");
                     });

                items.Add()
                    .Text("animation.open")
                    .Items(children =>
                    {
                        children.Add().Text("animation.open.effects");
                        children.Add().Text("animation.open.duration");
                    });
            })
            .Events(e => e.Open("open").Close("close").Select("select").Activate("activate").Deactivate("deactivate"))
    %>
    <div class="demo-section">
        <h3 class="title">Console log
        </h3>
        <div class="console"></div>
    </div>
<script>
    function open(e) {
        kendoConsole.log("Opened: " + ($(e.item).children(".k-link").text() || "ContextMenu"));
    }

    function close(e) {
        kendoConsole.log("Closed: " + ($(e.item).children(".k-link").text() || "ContextMenu"));
    }

    function select(e) {
        kendoConsole.log("Selected: " + $(e.item).children(".k-link").text());
    }

    function activate(e) {
        kendoConsole.log("Activated: " + ($(e.item).children(".k-link").text() || "ContextMenu"));
    }

    function deactivate(e) {
        kendoConsole.log("Deactivated: " + ($(e.item).children(".k-link").text() || "ContextMenu"));
    }
</script>

<style scoped>
    .demo-section .box-col li {
        margin-bottom: 0;
    }

    #context-target {
        cursor: pointer;
        color: red;
    }

        #context-target:hover {
            text-decoration: underline;
        }
</style>

</asp:Content>
