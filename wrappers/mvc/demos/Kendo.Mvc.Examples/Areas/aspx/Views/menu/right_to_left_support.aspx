<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="k-rtl">

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
                children.Add().Text("Sub Item 3")
                    .Items(grandchildren =>
                    {
                        grandchildren.Add().Text("Sub sub Item 1");
                        grandchildren.Add().Text("Sub sub Item 2");
                        grandchildren.Add().Text("Sub sub Item 3");
                    });
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

</div>

</asp:Content>