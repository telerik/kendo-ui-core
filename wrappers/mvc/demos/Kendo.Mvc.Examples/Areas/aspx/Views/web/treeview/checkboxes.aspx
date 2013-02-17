<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<string[]>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
           
<% using (Html.BeginForm("Checkboxes", "TreeView", FormMethod.Post, new { @class = "container" }))
   {%>
    <div class="treeview-back">
        <%:Html.Kendo().TreeView()
            .Name("treeview")
            .Checkboxes(checkboxes =>
                {
                    checkboxes.CheckChildren(true);
                })
            .Items(treeview =>
            {
                treeview.Add().Text("My Documents").Id("1")
                    .SpriteCssClasses("rootfolder")
                    .Expanded(true)
                    .Items(root =>
                    {
                        root.Add().Text("Kendo UI Project").Id("2")
                            .Expanded(true)
                            .SpriteCssClasses("folder")
                            .Items(project =>
                            {
                                project.Add().Text("about.html").Id("3").SpriteCssClasses("html");
                                project.Add().Text("index.html").Id("4").SpriteCssClasses("html");
                                project.Add().Text("logo.png").Id("5").SpriteCssClasses("image");
                            });

                        root.Add().Text("New Web Site").Id("6")
                            .Expanded(true)
                            .SpriteCssClasses("folder")
                            .Items(item =>
                            {
                                item.Add().Text("mockup.jpg").Id("7").SpriteCssClasses("image");
                                item.Add().Text("Research.pdf").Id("8").SpriteCssClasses("pdf");
                            });

                        root.Add().Text("Reports").Id("9")
                            .Expanded(true)
                            .SpriteCssClasses("folder")
                            .Items(reports =>
                            {
                                reports.Add().Text("February.pdf").Id("10").SpriteCssClasses("pdf");
                                reports.Add().Text("March.pdf").Id("11").SpriteCssClasses("pdf");
                                reports.Add().Text("April.pdf").Id("12").SpriteCssClasses("pdf");
                            });
                    });
            })
            .ItemAction(item =>
            {
                item.Checked = Model.Contains(item.Id);
            })
        %>
    </div>    
    <button id="find" class="k-button">Find checked nodes</button>
  <% }
%>

<div id="result">
<% if (Model.Length > 0) { %>
    Checked nodes: <%: String.Join(", ", Model)%>
<% } 
   else { %>
   No nodes checked.
<% } %>
</div>

<style scoped>
    #treeview .k-sprite {
        background-image: url("<%=Url.Content("~/Content/web/treeview/coloricons-sprite.png")%>");
    }

    .rootfolder { background-position: 0 0; }
    .folder     { background-position: 0 -16px; }
    .pdf        { background-position: 0 -32px; }
    .html       { background-position: 0 -48px; }
    .image      { background-position: 0 -64px; }

    .treeview-back 
    {
        float: left;
        margin: 0 0 2em;
        padding: 20px;
        -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.07);
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.07);
        box-shadow: 0 1px 2px rgba(0,0,0,0.45), inner 0 0 30px rgba(0,0,0,0.07);
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
    }

    .container
    {
        margin: 0 30px;
        float: left;
        width: 220px;
    }

    #result 
    {
        float: left;
        padding: 10px;
        -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.07);
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.07);
        box-shadow: 0 1px 2px rgba(0,0,0,0.45), inner 0 0 30px rgba(0,0,0,0.07);
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
    }
</style>

</asp:Content>
