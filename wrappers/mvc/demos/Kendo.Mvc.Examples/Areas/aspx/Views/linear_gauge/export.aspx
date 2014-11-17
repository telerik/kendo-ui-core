<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
<style>
    #gauge-container {
        text-align: center;
        margin: 0 auto;
        background: transparent url(<%= Url.Content("~/Content/dataviz/gauge/linear-gauge-container.png") %>) no-repeat 50% 50%;
        padding: 18px;
        width: 300px;
        height: 300px;
    }

    #gauge {
        height: 300px;
        display: inline-block;
        *display: inline;
        zoom: 1;
    }
</style>
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <div id="example">
        <div class="box">
            <h4>Advanced Export options</h4>
            <div class="box-col">
                <button class='export-pdf k-button'>Export as PDF</button>
            </div>
            <div class="box-col">
                <button class='export-img k-button'>Export as Image</button>
            </div>
            <div class="box-col">
                <button class='export-svg k-button'>Export as SVG</button>
            </div>
        </div>
        <div id="gauge-container" class="demo-section">
            <%= Html.Kendo().LinearGauge()
                  .Name("gauge")
                  .Pointers(pointers => 
                  {
                      pointers.Add().Value(10).Shape(GaugeLinearPointerShape.Arrow).Color("#c20000");
                      pointers.Add().Value(50).Margin(10).Color("#ff7a00");
                      pointers.Add().Value(30).Color("#ffc700");
                      pointers.Add().Value(45).Shape(GaugeLinearPointerShape.Arrow).Color("#428bca");
                  })
                  .Scale(scale => scale
                      .MajorUnit(20)
                      .MinorUnit(2)
                      .Min(-40)
                      .Max(60)
                      .Ranges(ranges =>
                      {
                          ranges.Add().From(-40).To(-20).Color("#2798df");
                          ranges.Add().From(30).To(45).Color("#ffc700");
                          ranges.Add().From(45).To(60).Color("#c20000");
                      }
                      )
                  )
            %>
        </div>
        <script>
            $(".export-pdf").click(function () {
                var gauge = $("#gauge").getKendoLinearGauge();
                gauge.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function (data) {
                    kendo.saveAs({
                        dataURI: data,
                        fileName: "chart.pdf",
                        proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
                    });
                });
            });

            $(".export-img").click(function () {
                var gauge = $("#gauge").getKendoLinearGauge();
                gauge.exportImage().done(function (data) {
                    kendo.saveAs({
                        dataURI: data,
                        fileName: "chart.png",
                        proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
                    });
                });
            });

            $(".export-svg").click(function () {
                var gauge = $("#gauge").getKendoLinearGauge();
                gauge.exportSVG().done(function (data) {
                    kendo.saveAs({
                        dataURI: data,
                        fileName: "chart.svg",
                        proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
                    });
                });
            });
        </script>
    </div>
</asp:Content>
