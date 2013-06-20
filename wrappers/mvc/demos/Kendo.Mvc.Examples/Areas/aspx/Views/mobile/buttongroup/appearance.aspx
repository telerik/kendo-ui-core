<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("buttongroup-appearance")        
        .Title("ButtonGroup Look")
        .Content(() =>
        {
            %>
            <% Html.Kendo().MobileListView()
                   .Style("inset")
                   .Type("group")
                   .Items(root =>
                    {
                        root.Add().Text("Background color").Items(childs => childs.Add().Content(() =>
                        {
                            %>
                            <%: Html.Kendo().MobileButtonGroup()
                                    .Index(0)
                                    .Items(items => {
                                        items.Add().Text("Green").HtmlAttributes(new { style = "background-color: green" });
                                        items.Add().Text("Red").HtmlAttributes(new { style = "background-color: darkred" });
                                    })
                            %>
                            <%
                        }));

                        root.Add().Text("Font Size Small").Items(childs => childs.Add().Content(() =>
                        {
                            %>
                            <%: Html.Kendo().MobileButtonGroup()
                                    .Index(0)
                                    .Items(items => {
                                        items.Add().Text("Flat View").HtmlAttributes(new { style = "font-size: 0.8em;" });
                                        items.Add().Text("Grouped View").HtmlAttributes(new { style = "font-size: 0.8em" });
                                    })
                            %>
                            <%
                        }));

                        root.Add().Text("Font Size Normal").Items(childs => childs.Add().Content(() =>
                        {
                            %>
                            <%: Html.Kendo().MobileButtonGroup()
                                    .Index(1)
                                    .Items(items => {
                                        items.Add().Text("2011");
                                        items.Add().Text("2012");
                                    })
                            %>
                            <%
                        }));

                        root.Add().Text("Font Size Large").Items(childs => childs.Add().Content(() =>
                        {
                            %>
                            <%: Html.Kendo().MobileButtonGroup()
                                    .Index(0)
                                    .Items(items => {
                                        items.Add().Text("Featured").Icon("toprated").HtmlAttributes(new { style = "font-size: 1.3em" });
                                        items.Add().Text("Popular").Icon("globe").HtmlAttributes(new { style = "font-size: 1.3em" });
                                    })
                            %>
                            <%
                        }));

                        root.Add().Text("Button icons / check help for more").Items(childs => childs.Add().Content(() =>
                        {
                            %>
                            <%: Html.Kendo().MobileButtonGroup()
                                    .Index(1)
                                    .Items(items => {
                                        items.Add().Icon("play");
                                        items.Add().Icon("pause");
                                        items.Add().Icon("rewind");
                                        items.Add().Icon("fastforward");
                                        items.Add().Icon("globe");
                                    })
                            %>
                            <%
                        }));
                    })
                    .Render();
            %>           
            <%
        })
        .Render();
%>

<style scoped>
    #buttongroup-appearance .km-button:not(.km-back) {
        padding-left: .5em;
        padding-right: .5em;
    }
</style>

</asp:Content>
