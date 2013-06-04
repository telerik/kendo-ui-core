<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Mobile.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<%: Html.Kendo().MobileView()
        .Name("buttongroup-badges")
        .Layout("examples")
        .Title("Badges")                
        .Content(obj =>
            Html.Kendo().MobileButtonGroup()   
                .Index(0)             
                .Items(items => 
                {
                    items.Add().Text("Housing").Icon("home").Badge("23");
                    items.Add().Text("Sound Check").Icon("volume").Badge("5");                    
                })
         )        
%>

</asp:Content>
