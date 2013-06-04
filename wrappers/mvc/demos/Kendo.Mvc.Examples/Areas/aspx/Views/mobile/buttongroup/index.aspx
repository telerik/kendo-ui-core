<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<% Html.Kendo().MobileView()
        .Name("buttongroup-home")
        .Layout("examples")
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
            <ul data-role="listview" data-style="inset">
                <li>January <span class="sales-up">&uarr; $ 35,000</span></li>
                <li>February <span class="sales-down">&darr; $ 25,000</span></li>
                <li>March <span class="sales-down">&darr; $ 23,000</span></li>
                <li>April <span class="sales-up">&uarr; $ 30,000</span></li>
                <li>May <span class="sales-up">&uarr; $ 31,000</span></li>
                <li>June <span class="sales-down">&darr; $ 29,000</span></li>
                <li>July <span class="sales-up">&uarr; $ 35,000</span></li>
                <li>August <span class="sales-up">&uarr; $ 37,000</span></li>
                <li>September <span class="sales-hold">&rarr; $ 37,000</span></li>
                <li>October <span class="sales-hold">&rarr; $ 37,000</span></li>
                <li>November <span class="sales-up">&uarr; $ 38,000</span></li>
                <li>December <span class="sales-up">&uarr; $ 40,000</span></li>
            </ul>
            <ul data-role="listview" data-style="inset" style="display:none">
                <li>1st Quarter <span class="sales-up">&uarr; $ 83,000</span></li>
                <li>2nd Quarter <span class="sales-up">&uarr; $ 90,000</span></li>
                <li>3rd Quarter <span class="sales-up">&uarr; $ 109,000</span></li>
                <li>4th Quarter <span class="sales-up">&uarr; $ 115,000</span></li>
            </ul>
            <ul data-role="listview" data-style="inset" style="display:none">
                <li>2009 <span class="sales-up">&uarr; $ 120,000</span></li>
                <li>2010 <span class="sales-down">&darr; $ 109,000</span></li>
                <li>2011 <span class="sales-hold">&rarr; $ 109,000</span></li>
            </ul>
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
	    background: url(../../content/mobile/shared/sales.jpg) no-repeat center center;
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
