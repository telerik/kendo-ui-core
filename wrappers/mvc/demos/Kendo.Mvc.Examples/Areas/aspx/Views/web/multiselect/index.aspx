<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section">
    <h2>Invite Attendees</h2>
    <label for="required">Required</label>
    <%= Html.Kendo().MultiSelect()
          .Name("required")
          .Placeholder("Select attendees...")
          .BindTo(new List<string>() {
              "Steven White",
              "Nancy King",
              "Anne King",
              "Nancy Davolio",
              "Robert Davolio",
              "Michael Leverling",
              "Andrew Callahan",
              "Michael Suyama",
              "Anne King",
              "Laura Peacock",
              "Robert Fuller",
              "Janet White",
              "Nancy Leverling",
              "Robert Buchanan",
              "Andrew Fuller",
              "Anne Davolio",
              "Andrew Suyama",
              "Nige Buchanan",
              "Laura Fuller"
          })
          .Value(new string[] { "Anne King", "Andrew Fuller" })
    %>
    <label for="optional">Optional</label>
    <%= Html.Kendo().MultiSelect()
          .Name("optional")
          .Placeholder("Select attendees...")
          .BindTo(new List<string>() {
              "Steven White",
              "Nancy King",
              "Anne King",
              "Nancy Davolio",
              "Robert Davolio",
              "Michael Leverling",
              "Andrew Callahan",
              "Michael Suyama",
              "Anne King",
              "Laura Peacock",
              "Robert Fuller",
              "Janet White",
              "Nancy Leverling",
              "Robert Buchanan",
              "Andrew Fuller",
              "Anne Davolio",
              "Andrew Suyama",
              "Nige Buchanan",
              "Laura Fuller"
          })
    %>
    <button class="k-button" id="get">Send Invitation</button>
</div>
<style scoped>
    .demo-section {
        width: 350px;
        height: 200px;
        padding: 30px;
    }
    .demo-section h2 {
        font-weight: normal;
    }
    .demo-section label {
        display: inline-block;
        margin: 15px 0 5px 0;
    }
    .demo-section select {
        width: 350px;
    }
    #get {
        float: right;
        margin: 25px auto 0;
    }
</style>
</asp:Content>
