<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<div class="k-rtl">             

    <%= Html.Kendo().PanelBar()
        .Name("panelbar")
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

</div>

</asp:Content>