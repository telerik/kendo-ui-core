<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
    <div id="example" class="k-content">
    <div class="demo-section">
        <div class="loading">
             <%= Html.Kendo().ProgressBar()
                  .Name("totalProgressBar")
                  .Type(ProgressBarType.Chunk)
                  .ChunkCount(4)
                  .Min(0)
                  .Max(4)
                  .Orientation(ProgressBarOrientation.Vertical)
                  .Events(e => e.Complete("onTotalComplete"))
            %>

             <%= Html.Kendo().ProgressBar()
                  .Name("loadingProgressBar")
                  .Orientation(ProgressBarOrientation.Vertical)
                  .ShowStatus(false)
                  .Animation(false)
                  .Events(e => 
                    {
                        e.Change("onChange");
                        e.Complete("onComplete"); 
                    })
            %>
        </div>
        <div class="loadingInfo">
            <h2>Loading styles</h2>
            <div class="statusContainer">
                <p>
                Loaded: <span class="loadingStatus">0%</span> <br />
                Item <span class="chunkStatus">1</span> of 4
                </p>
            </div>
            <button class="k-button reloadButton">Reload</button>
        </div>
    </div>

    <script>
        $(document).ready(function () {
            load();
        });

        function onChange(e) {
            $(".loadingStatus").text(e.value + "%");
        }

        function onComplete(e) {
            var total = $("#totalProgressBar").data("kendoProgressBar");
            total.value(total.value() + 1);

            if (total.value() < total.options.max) {
                $(".chunkStatus").text(total.value() + 1);
                $(".loadingInfo h2").text("Loading " + itemsToLoad[total.value()]);

                load();
            }
        }

        function onTotalComplete(e) {
            $(".loadingInfo h2").text("All items loaded");
            $(".statusContainer").hide();
            $(".reloadButton").show();
        }

        function load() {
            var pb = $("#loadingProgressBar").data("kendoProgressBar");
            pb.value(0);

            var interval = setInterval(function () {
                if (pb.value() < 100) {
                    pb.value(pb.value() + 1);
                } else {
                    clearInterval(interval);
                }
            }, 30);
        }

        $(".reloadButton").click(function () {
            $(this).hide();
            $(".statusContainer").show();

            $("#totalProgressBar").data("kendoProgressBar").value(0);
            $("#loadingProgressBar").data("kendoProgressBar").value(0);
            $(".loadingInfo h2").text("Loading " + itemsToLoad[0]);
            $(".chunkStatus").text(1);

            load();
        });

        var itemsToLoad = ["styles", "scripts", "images", "fonts"];
    </script>
    <style scoped>
        .demo-section {
            width: 250px;
            margin: 50px auto;
            padding: 30px 30px 30px 50px;
            overflow: auto;
        }

        .demo-section h2
        {
            margin: 0;
            padding: 0;
        }

        .k-progressbar
        {
            width: 8px;
            height: 100px;
        }
        
        #loadingProgressBar
        {
            margin-left: 10px;
        }
        
        .loading
        {
            float: left;
        }
        .loadingInfo
        {
            float: left;
            width: 180px;
            margin: 20px 0 0 30px;
        }

        .reloadButton
        {
            display: none;
            margin-top: 10px;
        }
    </style>
</div>

</asp:Content>