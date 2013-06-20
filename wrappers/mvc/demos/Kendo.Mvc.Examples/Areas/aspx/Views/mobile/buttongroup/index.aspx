<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("buttongroup-home")        
        .Title("Sales Report")                
        .Content(() =>
        {
            %>
            <div class="head">&nbsp;</div>
            <%: Html.Kendo().MobileButtonGroup()
                    .Name("select-period")
                    .Items(items => 
                    {
                        items.Add().Text("Month");
                        items.Add().Text("Quarter");
                        items.Add().Text("Year");
                    })                    
                    .Index(0)
                    .Events(events => events.Select("onSelect"))
            %>
            <% Html.Kendo().MobileListView().Style("inset")
                    .Items(items =>
                    {
                        items.Add().Content(() =>
                        { 
                            %>January <span class="sales-up">&uarr; $ 35,000</span><% 
                        });
                        items.Add().Content(() =>
                        { 
                            %>February <span class="sales-down">&darr; $ 25,000</span><% 
                        });
                        items.Add().Content(() =>
                        { 
                            %>March <span class="sales-down">&darr; $ 23,000</span><% 
                        });
                        items.Add().Content(() =>
                        { 
                            %>April <span class="sales-up">&uarr; $ 30,000</span><% 
                        });
                        items.Add().Content(() =>
                        { 
                            %>May <span class="sales-up">&uarr; $ 31,000</span><% 
                        });
                        items.Add().Content(() =>
                        { 
                            %>June <span class="sales-down">&darr; $ 29,000</span><% 
                        });
                        items.Add().Content(() =>
                        { 
                            %>July <span class="sales-up">&uarr; $ 35,000</span><% 
                        });
                        items.Add().Content(() =>
                        { 
                            %>August <span class="sales-up">&uarr; $ 37,000</span><% 
                        });
                        items.Add().Content(() =>
                        { 
                            %>September <span class="sales-hold">&rarr; $ 37,000</span><% 
                        });
                        items.Add().Content(() =>
                        { 
                            %>October <span class="sales-hold">&rarr; $ 37,000</span><% 
                        });
                        items.Add().Content(() =>
                        { 
                            %>November <span class="sales-up">&uarr; $ 38,000</span><% 
                        });
                        items.Add().Content(() =>
                        { 
                            %>December <span class="sales-up">&uarr; $ 40,000</span><% 
                        });
                    })
                    .Render();
            %>
            <% Html.Kendo().MobileListView().Style("inset")
                    .HtmlAttributes(new { style = "display:none" })
                    .Items(items =>
                    {
                        items.Add().Content(() =>
                        { 
                            %>1st Quarter <span class="sales-up">&uarr; $ 83,000</span><% 
                        });
                        items.Add().Content(() =>
                        { 
                            %>2nd Quarter <span class="sales-up">&uarr; $ 90,000</span><% 
                        });
                        items.Add().Content(() =>
                        { 
                            %>3rd Quarter <span class="sales-up">&uarr; $ 109,000</span><% 
                        });
                        items.Add().Content(() =>
                        { 
                            %>4th Quarter <span class="sales-up">&uarr; $ 115,000</span><% 
                        });                      
                    })
                    .Render();
            %>
            <% Html.Kendo().MobileListView().Style("inset")
                    .HtmlAttributes(new { style="display:none" })
                    .Items(items =>
                    {
                        items.Add().Content(() =>
                        { 
                            %>2009 <span class="sales-up">&uarr; $ 120,000</span><% 
                        });
                        items.Add().Content(() =>
                        { 
                            %>2010 <span class="sales-down">&darr; $ 109,000</span><% 
                        });
                        items.Add().Content(() =>
                        { 
                            %>2011 <span class="sales-hold">&rarr; $ 109,000</span><% 
                        });                                    
                    })
                    .Render();
            %>          
            <%
        })
        .Render();
%>

<script>
    function onSelect() {
        var listviews = this.view().element.find("ul.km-listview");
        
        listviews.hide()
            .eq(this.selectedIndex)
            .show();        
    }
</script>

<style scoped>
    #buttongroup-home .head {
	    display: block;
        margin: 1em;
	    height: 110px;
	    background: url(<%=Url.Content("~/content/mobile/shared/sales.jpg")%>) no-repeat center center;
        -webkit-background-size: 100% auto;
        background-size: 100% auto;
    }
    .km-ios .head,
    .km-blackberry .head {
        -webkit-border-radius: 10px;
        border-radius: 10px;
    }
    #select-period {
        margin: 1em auto .4em auto;
    }
    #buttongroup-home .km-list span {
	    float: right;
    }
    #buttongroup-home .sales-up {
	    color: green;
    }
    #buttongroup-home .sales-down {
	    color: red;
    }
    #buttongroup-home .sales-hold {
	    color: blue;
    }
</style>

</asp:Content>
