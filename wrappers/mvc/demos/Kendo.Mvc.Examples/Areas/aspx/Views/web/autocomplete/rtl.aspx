<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="k-rtl">
    <p>Start typing the name of a European country.</p>
    
    <label for="country">Shipping countries:</label>
    
    <%= Html.Kendo().AutoComplete()
          .Name("country")
          .Filter("startswith")
          .Placeholder("Select country...")
          .BindTo(new string[] {
                "Albania",
				"Andorra",
				"Armenia",
				"Austria",
				"Azerbaijan",
				"Belarus",
				"Belgium",
				"Bosnia & Herzegovina",
				"Bulgaria",
				"Croatia",
				"Cyprus",
				"Czech Republic",
				"Denmark",
				"Estonia",
				"Finland",
				"France",
				"Georgia",
				"Germany",
				"Greece",
				"Hungary",
				"Iceland",
				"Ireland",
				"Italy",
				"Kosovo",
				"Latvia",
				"Liechtenstein",
				"Lithuania",
				"Luxembourg",
				"Macedonia",
				"Malta",
				"Moldova",
				"Monaco",
				"Montenegro",
				"Netherlands",
				"Norway",
				"Poland",
				"Portugal",
				"Romania",
				"Russia",
				"San Marino",
				"Serbia",
				"Slovakia",
				"Slovenia",
				"Spain",
				"Sweden",
				"Switzerland",
				"Turkey",
				"Ukraine",
				"United Kingdom",
				"Vatican City"
          })
          .Separator(", ")
    %>

</div>

</asp:Content>