<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div id="taxi">
    <label for="states">Select a state in USA:</label>
    <%=Html.Kendo().AutoComplete()
        .Name("states")
        .BindTo(new string[]
        {
            "Alabama",
            "Alaska",
            "American Samoa",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "District of Columbia",
            "Florida",
            "Georgia",
            "Guam",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Northern Marianas Islands",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Puerto Rico",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virginia",
            "Virgin Islands",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming"
        })
        .Events(e =>
        {
            e.Change("onChange").Select("onSelect").Open("onOpen").Close("onClose").DataBound("onDataBound");
        })
    %>
</div>
<div class="demo-section">                
    <h3 class="title">Console log</h3>
    <div class="console"></div>
</div>
<script>
    function onOpen() {
        if ("kendoConsole" in window) {
            kendoConsole.log("event :: open");
        }
    }

    function onClose() {
        if ("kendoConsole" in window) {
            kendoConsole.log("event :: close");
        }
    }

    function onChange() {
        if ("kendoConsole" in window) {
            kendoConsole.log("event :: change");
        }
    }

    function onSelect(e) {
        if ("kendoConsole" in window) {
            var dataItem = this.dataItem(e.item.index());
            kendoConsole.log("event :: select (" + dataItem + ")");
        }
    }

    function onDataBound(e) {
        if ("kendoConsole" in window) {
            kendoConsole.log("event :: dataBound");
        }
    }
</script>

<style scoped>
	#taxi {
		width: 240px;
		height: 160px;
		padding: 80px 0 0 200px;
		background: url('<%=Url.Content("~/content/web/autocomplete/taxi.png")%>') transparent no-repeat 0 0;
        margin: 20px auto;
	}
	#taxi label {
		display: block;
		color: #333;
		padding-bottom: 5px;
	}
	.k-autocomplete {
		display: block;
		clear: left;
		width: 200px;
		vertical-align: middle;
	}
	.demo-section {
        width: 500px;
        text-align: center;
    }
    .console {
        margin: 0;
    }
</style>

</asp:Content>