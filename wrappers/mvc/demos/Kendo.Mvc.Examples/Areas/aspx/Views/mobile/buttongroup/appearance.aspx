<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("buttongroup-appearance")        
        .Title("ButtonGroup Look")
        .Content(() =>
        {
            %>
            <ul data-role="listview" data-style="inset" data-type="group">
                <li>
                    Background color
                    <ul>
                        <li>                            
                            <%: Html.Kendo().MobileButtonGroup()
                                    .Index(0)
                                    .Items(items => {
                                        items.Add().Text("Green").HtmlAttributes(new { style = "background-color: green" });
                                        items.Add().Text("Red").HtmlAttributes(new { style = "background-color: darkred" });
                                    })
                            %>
                        </li>
                    </ul>
                </li>
                <li>
                    Font Size Small
                    <ul>
                        <li>                            
                            <%: Html.Kendo().MobileButtonGroup()
                                    .Index(0)
                                    .Items(items => {
                                        items.Add().Text("Flat View").HtmlAttributes(new { style = "font-size: 0.8em;" });
                                        items.Add().Text("Grouped View").HtmlAttributes(new { style = "font-size: 0.8em" });
                                    })
                            %>
                        </li>
                    </ul>
                </li>
                <li>
                    Font Size Normal
                    <ul>
                        <li>                           
                            <%: Html.Kendo().MobileButtonGroup()
                                    .Index(1)
                                    .Items(items => {
                                        items.Add().Text("2011");
                                        items.Add().Text("2012");
                                    })
                            %>
                        </li>
                    </ul>
                </li>
                <li>
                    Font Size Large
                    <ul>
                        <li>                           
                            <%: Html.Kendo().MobileButtonGroup()
                                    .Index(0)
                                    .Items(items => {
                                        items.Add().Text("Featured").Icon("toprated").HtmlAttributes(new { style = "font-size: 1.3em" });
                                        items.Add().Text("Popular").Icon("globe").HtmlAttributes(new { style = "font-size: 1.3em" });
                                    })
                            %>
                        </li>
                    </ul>
                </li>
                <li>
                    Button icons / check help for more
                    <ul>
                        <li>                            
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
                        </li>
                    </ul>
                </li>
            </ul>
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
