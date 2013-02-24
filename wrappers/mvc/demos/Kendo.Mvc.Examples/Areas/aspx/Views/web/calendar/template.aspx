<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section">
    <div id="special-days">
       <%=Html.Kendo().Calendar()
        .Name("calendar")
        .Value(DateTime.Today)
        .Footer(" ")
        .MonthTemplate("# if ($.inArray(+data.date, events) != -1) { #" +
                                "<div class='" +
                            "# if (data.value < 10) { #" +
                                "exhibition" +
                            "# } else if ( data.value < 20 ) { #" +
                                "party" +
                            "# } else { #" +
                                "cocktail" +
                            "# } #" +
                        "'>#= data.value #</div>" +
                    "# } else { #" +
                    "#= data.value #" +
                    "# } #")                     
         %>
    </div>
</div>



<script>
    var today = new Date(),
        events = [
            +new Date(today.getFullYear(), today.getMonth(), 8),
            +new Date(today.getFullYear(), today.getMonth(), 12),
            +new Date(today.getFullYear(), today.getMonth(), 24),
            +new Date(today.getFullYear(), today.getMonth() + 1, 6),
            +new Date(today.getFullYear(), today.getMonth() + 1, 7),
            +new Date(today.getFullYear(), today.getMonth() + 1, 25),
            +new Date(today.getFullYear(), today.getMonth() + 1, 27),
            +new Date(today.getFullYear(), today.getMonth() - 1, 3),
            +new Date(today.getFullYear(), today.getMonth() - 1, 5),
            +new Date(today.getFullYear(), today.getMonth() - 2, 22),
            +new Date(today.getFullYear(), today.getMonth() - 2, 27)
        ];
</script>

<style scoped>
	.demo-section {
		height: 430px;
		width: 690px;  
	}
	#special-days {
		height: 100%;
		width: 100%;
		margin: 0;
		padding: 0;
		background: url('<%=Url.Content("~/content/web/calendar/calendar-template.jpg")%>') transparent no-repeat 0 bottom;
	}
	#calendar {
		margin: 20px 0 0 265px;
		width: 340px;
		text-align: center;
	}
	#calendar .k-content {
		height: 300px;
	}
	#calendar,
	#calendar .k-content,
	#calendar .k-header,
	#calendar th,
	#calendar .k-link,
	#calendar .k-state-hover,
	#calendar .k-state-selected,
	#calendar .k-state-focused {
		background: transparent;
		border-color: transparent;
		color: #fff;
		box-shadow: none;
	}
	#calendar .k-content .k-state-hover,
	#calendar .k-content .k-state-focused {
		font-size: 18px;
		font-weight: bold;
	}
	#calendar .k-state-selected, #calendar .k-state-selected.k-state-focused {
		font-size: 24px;
		font-weight: bold;
	}
	#calendar .k-content .k-link {
		padding: 0;
		min-height: 40px;
		line-height: 40px;
	}
	#calendar th {
		padding-top: 20px;
		color: #8cbabf;
	}
	#calendar td.k-other-month .k-link {
		color: #8cbabf;
	}
	#calendar th,
	#calendar td {
		text-align: center;
	}
	
	/* Template Days */
	.exhibition, .party, .cocktail {
			width: 40px;
			height: 40px;
			margin: auto;
			-webkit-border-radius: 100px;
			-moz-border-radius: 100px;
			border-radius: 50%;
			line-height: 40px;
	}
	.exhibition {
		background-color: #fff;
		color: #000;
	}
	.party {
		background-color: #70c114;
	}
	.cocktail {
		background-color: #00a1e8;
	}
</style>
</asp:Content>