<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
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
    .Events(e => e.Open("open").Close("close").Select("select"))
%>

<script>
    function open(e) {
        kendoConsole.log("Opened: " + $(e.item).children(".k-link").text());
    }

    function close(e) {
        kendoConsole.log("Closed: " + $(e.item).children(".k-link").text());
    }

    function select(e) {
        kendoConsole.log("Selected: " + $(e.item).children(".k-link").text());
    }
</script>
<div class="console"></div>
</asp:Content>