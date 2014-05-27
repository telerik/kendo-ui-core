<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<%= Html.Kendo().PanelBar()
    .Name("panelbar")
    .ExpandMode(PanelBarExpandMode.Single)
    .Events(events => events
        .Select("select")
        .Expand("expand")
        .Collapse("collapse")
        .Activate("activate")
        .ContentLoad("contentLoad")
        .Error("error")
    )
    .HtmlAttributes(new { style = "width: 250px;" })
    .Items(panelbar =>
    {
        panelbar.Add().Text("Metallica - Master of Puppets 1986")
            .Expanded(true)
            .Items(items => {
                items.Add().Text("Battery");
                items.Add().Text("Master of Puppets");
                items.Add().Text("The Thing That Should Not Be");
                items.Add().Text("Welcome Home (Sanitarium)");
                items.Add().Text("Disposable Heroes");
                items.Add().Text("Leper Messiah");
                items.Add().Text("Orion (Instrumental)");
                items.Add().Text("Damage, Inc.");
            });

        panelbar.Add().Text("Iron Maiden - Brave New World 2000")
            .Items(items =>
            {
                items.Add().Text("The Wicker Man");
                items.Add().Text("Ghost Of The Navigator");
                items.Add().Text("Brave New World");
                items.Add().Text("Blood Brothers");
                items.Add().Text("The Mercenary");
                items.Add().Text("Dream Of Mirrors");
                items.Add().Text("The Fallen Angel");
                items.Add().Text("The Nomad");
                items.Add().Text("Out Of The Silent Planet");
                items.Add().Text("The Thin Line Between Love And Hate");
            });

        panelbar.Add().Text("Empty Item");
        panelbar.Add().Text("Ajax Item")
            .LoadContentFrom(Url.Content("~/Content/web/panelbar/ajax/ajaxContent1.html"));
        panelbar.Add().Text("Error Item")
            .LoadContentFrom("error.html");
    })
%>

<script>
    function select(e) {
        kendoConsole.log("Select: " + $(e.item).find("> .k-link").text());
    }

    function expand(e) {
        kendoConsole.log("Expand: " + $(e.item).find("> .k-link").text());
    }

    function collapse(e) {
        kendoConsole.log("Collapse: " + $(e.item).find("> .k-link").text());
    }

    function activate(e) {
        kendoConsole.log("Activate: " + $(e.item).find("> .k-link").text());
    }

    function contentLoad(e) {
        kendoConsole.log("Content loaded in <b>"+ $(e.item).find("> .k-link").text() +
                            "</b> and starts with <b>" + $(e.contentElement).text().substr(0, 20) + "...</b>");
    }

    function error(e) {
        kendoConsole.error("Loading failed with " + e.xhr.statusText + " " + e.xhr.status);
    }
</script>

<div class="console"></div>
</asp:Content>