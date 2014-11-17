<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
    <style>
        #gauge-container {
            background: transparent url(<%= Url.Content("~/Content/dataviz/gauge/gauge-container.png") %>) no-repeat 50% 50%;
            width: 404px;
            height: 404px;
            text-align: center;
            margin: 0 auto 30px auto;
        }

        #gauge {
            width: 330px;
            height: 330px;
            margin: 0 auto 0;
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
            <%= Html.Kendo().RadialGauge()
                  .Name("gauge")
                  .Pointers(pointers =>
                  {
                      pointers.Add().Value(10).Color("#c20000").Cap(c => c.Size(0.15));
                      pointers.Add().Value(70).Color("#ff7a00").Cap(c => c.Size(0.1));
                      pointers.Add().Value(140).Color("#ffc700");
                  })
                  .Scale(scale => scale
                      .MinorUnit(5)
                      .StartAngle(-30)
                      .EndAngle(210)
                      .Max(180)
                      .Labels(labels => labels.Position(GaugeRadialScaleLabelsPosition.Inside))
                      .Ranges(ranges => 
                      {
                          ranges.Add().From(80).To(120).Color("#bb6e36");
                          ranges.Add().From(120).To(150).Color("#b8b8b8");
                          ranges.Add().From(150).To(180).Color("#f3ac32");
                      })
                  )
            %>
        </div>
        <script>
            $(".export-pdf").click(function () {
                var gauge = $("#gauge").getKendoRadialGauge();
                gauge.exportPDF({ paperSize: "auto", margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" } }).done(function (data) {
                    kendo.saveAs({
                        dataURI: data,
                        fileName: "chart.pdf",
                        proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
                    });
                });
            });

            $(".export-img").click(function () {
                var gauge = $("#gauge").getKendoRadialGauge();
                gauge.exportImage().done(function (data) {
                    kendo.saveAs({
                        dataURI: data,
                        fileName: "chart.png",
                        proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
                    });
                });
            });

            $(".export-svg").click(function () {
                var gauge = $("#gauge").getKendoRadialGauge();
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