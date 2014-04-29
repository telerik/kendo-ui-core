<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" 
    Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.UploadInitialFile>>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <div class="configuration k-widget k-header" style="width: 300px">
        <span class="infoHead">Information</span>
        <p>
            This example show how to persist the successfully uploaded files
            in the list and display them again when the page is reloaded.
        </p>
        <p>
            Please upload some files and refresh the page.
        </p>
    </div>

    <div style="width:45%">
        <div class="demo-section">
            <%= Html.Kendo().Upload()
                  .Name("files")
                  .Async(a => a
                      .Save("SaveAndPersist", "Upload")
                      .Remove("RemoveAndPersist", "Upload")
                      .AutoUpload(true)
                  )
                  .Files(files =>
                  {
                      foreach (var f in Model)
                      {
                          files.Add().Name(f.Name).Extension(f.Extension).Size(f.Size);
                      }
                  })
             %>
        </div>
    </div>
</asp:Content>
