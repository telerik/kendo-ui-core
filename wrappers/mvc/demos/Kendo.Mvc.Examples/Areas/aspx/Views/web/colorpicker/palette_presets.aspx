<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section">
    <div class="column">
        <div class="palette-wrapper">
            <h3>WebSafe</h3>
            <%= Html.Kendo().ColorPalette()
                  .Name("websafe")
                  .Palette(ColorPickerPalette.WebSafe)
            %>
        </div>
    </div>

    <div class="column">
        <div class="palette-wrapper">
            <h3>Basic</h3>
            <%= Html.Kendo().ColorPalette()
                  .Name("basic")
                  .Palette(ColorPickerPalette.Basic)
            %>
        </div>

        <br style="clear:both">

        <div class="palette-wrapper">
            <h3>Monochrome</h3>
            <%= Html.Kendo().ColorPalette()
                  .Name("monochrome")
                  .Columns(12)
                  .Palette(new string[] {
                      "#000000", "#1a1a1a", "#333333", "#4d4d4d", "#666666", "#808080",
                      "#999999", "#b3b3b3", "#cccccc", "#e6e6e6", "#f2f2f2", "#ffffff"
                  })
            %>
        </div>
    </div>

    <div class="palette-wrapper">
        <h3>Office</h3>
        <%= Html.Kendo().ColorPalette()
                .Name("office")
                .Palette(new string[] {
                    "#ffffff", "#000000", "#eeece1", "#1f497d", "#4f81bd", "#c0504d", "#9bbb59", "#8064a2", "#8064a2", "#f79646",
                    "#f2f2f2", "#7f7f7f", "#ddd9c3", "#c6d9f0", "#dbe5f1", "#f2dcdb", "#ebf1dd", "#e5e0ec", "#dbeef3", "#fdeada",
                    "#d8d8d8", "#595959", "#c4bd97", "#8db3e2", "#b8cce4", "#e5b9b7", "#d7e3bc", "#ccc1d9", "#b7dde8", "#fbd5b5",
                    "#bfbfbf", "#3f3f3f", "#938953", "#548dd4", "#95b3d7", "#d99694", "#c3d69b", "#b2a2c7", "#92cddc", "#fac08f",
                    "#a5a5a5", "#262626", "#494429", "#17365d", "#366092", "#953734", "#76923c", "#5f497a", "#31859b", "#e36c09",
                    "#7f7f7f", "#0c0c0c", "#1d1b10", "#0f243e", "#244061", "#632423", "#4f6128", "#3f3151", "#205867", "#974806"
                })
        %>
    </div>


    <div class="palette-wrapper">
        <h3>Apex</h3>
        <%= Html.Kendo().ColorPalette()
                .Name("apex")
                .Palette(new string[] {
                    "#ffffff", "#000000", "#c9c2d1", "#69676d", "#ceb966", "#9cb084", "#6bb1c9", "#6585cf", "#7e6bc9", "#a379bb",
                    "#f2f2f2", "#7f7f7f", "#f4f2f5", "#e0e0e2", "#f5f1e0", "#ebefe6", "#e1eff4", "#e0e6f5", "#e5e1f4", "#ece4f1",
                    "#d8d8d8", "#595959", "#e9e6ec", "#c2c1c5", "#ebe3c1", "#d7dfcd", "#c3dfe9", "#c1ceeb", "#cbc3e9", "#dac9e3",
                    "#bfbfbf", "#3f3f3f", "#dedae3", "#a4a3a8", "#e1d5a3", "#c3cfb5", "#a6d0de", "#a2b5e2", "#b1a6de", "#c7aed6",
                    "#a5a5a5", "#262626", "#9688a5", "#4e4d51", "#ae9638", "#758c5a", "#3d8da9", "#365bb0", "#533da9", "#7d4d99",
                    "#7f7f7f", "#0c0c0c", "#635672", "#343336", "#746425", "#4e5d3c", "#295e70", "#243c75", "#372970", "#533366"
                })
        %>
    </div>


    <div class="palette-wrapper">
        <h3>Austin</h3>
        <%= Html.Kendo().ColorPalette()
                .Name("austin")
                .Palette(new string[] {
                    "#ffffff", "#000000", "#caf278", "#3e3d2d", "#94c600", "#71685a", "#ff6700", "#909465", "#956b43", "#fea022",
                    "#f2f2f2", "#7f7f7f", "#f4fce4", "#dddcd0", "#efffc0", "#e3e1dc", "#ffe0cb", "#e8e9df", "#ece1d6", "#feecd2",
                    "#d8d8d8", "#595959", "#e9f9c9", "#bbb9a1", "#dfff82", "#c8c3ba", "#ffc299", "#d2d4c0", "#dac3ad", "#fed9a6",
                    "#bfbfbf", "#3f3f3f", "#dff7ae", "#ada598", "#cfff43", "#ada598", "#ffa365", "#bcbfa1", "#c8a585", "#fec67a",
                    "#a5a5a5", "#262626", "#a9ea25", "#2e2d21", "#6f9400", "#544e43", "#bf4d00", "#6c6f4b", "#6f5032", "#d77b00",
                    "#7f7f7f", "#0c0c0c", "#74a50f", "#1f1e16", "#4a6300", "#38342d", "#7f3300", "#484a32", "#4a3521", "#8f5200"
                })
        %>
    </div>


    <div class="palette-wrapper">
        <h3>Clarity</h3>
        <%= Html.Kendo().ColorPalette()
                .Name("clarity")
                .Palette(new string[] {
                    "#ffffff", "#292934", "#f3f2dc", "#d2533c", "#93a299", "#ad8f67", "#726056", "#4c5a6a", "#808da0", "#79463d",
                    "#f2f2f2", "#e7e7ec", "#e7e5b9", "#f6dcd8", "#e9ecea", "#eee8e0", "#e4dedb", "#d8dde3", "#e5e8ec", "#e9d6d3",
                    "#d8d8d8", "#c4c4d1", "#d5d185", "#edbab1", "#d3d9d6", "#ded2c2", "#c9beb8", "#b2bcc8", "#ccd1d9", "#d3aea7",
                    "#bfbfbf", "#8a8aa3", "#aca73b", "#e4978a", "#bec7c1", "#cdbba3", "#af9e94", "#8c9bac", "#b2bac6", "#bd857c",
                    "#a5a5a5", "#56566e", "#56531d", "#a43925", "#6b7c72", "#866b48", "#554840", "#39434f", "#5c697b", "#5a342d",
                    "#7f7f7f", "#3b3b4b", "#22210b", "#6d2619", "#47534c", "#594730", "#39302b", "#262d35", "#3d4652", "#3c231e"
                })
        %>
    </div>



    <div class="palette-wrapper">
        <h3>SlipStream</h3>
        <%= Html.Kendo().ColorPalette()
                .Name("slipstream")
                .Palette(new string[] {
                    "#ffffff", "#000000", "#b4dcfa", "#212745", "#4e67c8", "#5eccf3", "#a7ea52", "#5dceaf", "#ff8021", "#f14124",
                    "#f2f2f2", "#7f7f7f", "#8bc9f7", "#c7cce4", "#dbe0f4", "#def4fc", "#edfadc", "#def5ef", "#ffe5d2", "#fcd9d3",
                    "#d8d8d8", "#595959", "#4facf3", "#909aca", "#b8c2e9", "#beeafa", "#dbf6b9", "#beebdf", "#ffcca6", "#f9b3a7",
                    "#bfbfbf", "#3f3f3f", "#0d78c9", "#5967af", "#94a3de", "#9ee0f7", "#caf297", "#9de1cf", "#ffb279", "#f68d7b",
                    "#a5a5a5", "#262626", "#063c64", "#181d33", "#31479f", "#11b2eb", "#81d319", "#34ac8b", "#d85c00", "#c3260c",
                    "#7f7f7f", "#0c0c0c", "#021828", "#101322", "#202f6a", "#0b769c", "#568c11", "#22725c", "#903d00", "#821908"
                })
        %>
    </div>



    <div class="palette-wrapper">
        <h3>Metro</h3>
        <%= Html.Kendo().ColorPalette()
                .Name("metro")
                .Palette(new string[] {
                    "#ffffff", "#000000", "#d6ecff", "#4e5b6f", "#7fd13b", "#ea157a", "#feb80a", "#00addc", "#738ac8", "#1ab39f",
                    "#f2f2f2", "#7f7f7f", "#a7d6ff", "#d9dde4", "#e5f5d7", "#fad0e4", "#fef0cd", "#c5f2ff", "#e2e7f4", "#c9f7f1",
                    "#d8d8d8", "#595959", "#60b5ff", "#b3bcca", "#cbecb0", "#f6a1c9", "#fee29c", "#8be6ff", "#c7d0e9", "#94efe3",
                    "#bfbfbf", "#3f3f3f", "#007dea", "#8d9baf", "#b2e389", "#f272af", "#fed46b", "#51d9ff", "#aab8de", "#5fe7d5",
                    "#a5a5a5", "#262626", "#003e75", "#3a4453", "#5ea226", "#af0f5b", "#c58c00", "#0081a5", "#425ea9", "#138677",
                    "#7f7f7f", "#0c0c0c", "#00192e", "#272d37", "#3f6c19", "#750a3d", "#835d00", "#00566e", "#2c3f71", "#0c594f"
                })
        %>
    </div>


    <div class="palette-wrapper">
        <h3>Flow</h3>
        <%= Html.Kendo().ColorPalette()
                .Name("flow")
                .Palette(new string[] {
                    "#ffffff", "#000000", "#dbf5f9", "#04617b", "#0f6fc6", "#009dd9", "#0bd0d9", "#10cf9b", "#7cca62", "#a5c249",
                    "#f2f2f2", "#7f7f7f", "#b2e9f2", "#b4ecfc", "#c7e2fa", "#c4eeff", "#c9fafc", "#c9faed", "#e4f4df", "#edf2da",
                    "#d8d8d8", "#595959", "#76d9e8", "#6adafa", "#90c6f6", "#89deff", "#93f5f9", "#94f6db", "#cae9c0", "#dbe6b6",
                    "#bfbfbf", "#3f3f3f", "#21b2c8", "#20c8f7", "#59a9f2", "#4fceff", "#5df0f6", "#5ff2ca", "#b0dfa0", "#c9da91",
                    "#a5a5a5", "#262626", "#105964", "#02485c", "#0b5394", "#0075a2", "#089ca2", "#0b9b74", "#54a838", "#7e9532",
                    "#7f7f7f", "#0c0c0c", "#062328", "#01303d", "#073763", "#004e6c", "#05686c", "#07674d", "#387025", "#546321"
                })
        %>
    </div>


    <div class="palette-wrapper">
        <h3>Hardcover</h3>
        <%= Html.Kendo().ColorPalette()
                .Name("hardcover")
                .Palette(new string[] {
                    "#ffffff", "#000000", "#ece9c6", "#895d1d", "#873624", "#d6862d", "#d0be40", "#877f6c", "#972109", "#aeb795",
                    "#f2f2f2", "#7f7f7f", "#e1dca5", "#f2e0c6", "#f0d0c9", "#f6e6d5", "#f5f2d8", "#e7e5e1", "#fbc7bc", "#eef0e9",
                    "#d8d8d8", "#595959", "#d0c974", "#e6c28d", "#e2a293", "#eeceaa", "#ece5b2", "#cfccc3", "#f78f7a", "#dee2d4",
                    "#bfbfbf", "#3f3f3f", "#a29a36", "#daa454", "#d4735e", "#e6b681", "#e2d88c", "#b7b2a5", "#f35838", "#ced3bf",
                    "#a5a5a5", "#262626", "#514d1b", "#664515", "#65281a", "#a2641f", "#a39428", "#655f50", "#711806", "#879464",
                    "#7f7f7f", "#0c0c0c", "#201e0a", "#442e0e", "#431b11", "#6c4315", "#6d621a", "#433f35", "#4b1004", "#5a6243"
                })
        %>
    </div>


    <div class="palette-wrapper">
        <h3>Trek</h3>
        <%= Html.Kendo().ColorPalette()
                .Name("trek")
                .Palette(new string[] {
                    "#ffffff", "#000000", "#fbeec9", "#4e3b30", "#f0a22e", "#a5644e", "#b58b80", "#c3986d", "#a19574", "#c17529",
                    "#f2f2f2", "#7f7f7f", "#f7e09e", "#e1d6cf", "#fcecd5", "#eddfda", "#f0e7e5", "#f3eae1", "#ece9e3", "#f5e3d1",
                    "#d8d8d8", "#595959", "#f3cc5f", "#c4ad9f", "#f9d9ab", "#dcc0b6", "#e1d0cc", "#e7d5c4", "#d9d4c7", "#ebc7a3",
                    "#bfbfbf", "#3f3f3f", "#d29f0f", "#a78470", "#f6c781", "#cba092", "#d2b9b2", "#dbc1a7", "#c6bfab", "#e1ac76",
                    "#a5a5a5", "#262626", "#694f07", "#3a2c24", "#c87d0e", "#7b4b3a", "#926255", "#a17242", "#7b7153", "#90571e",
                    "#7f7f7f", "#0c0c0c", "#2a1f03", "#271d18", "#855309", "#523226", "#614138", "#6b4c2c", "#524b37", "#603a14"
                })
        %>
    </div>

    <div class="palette-wrapper">
        <h3>Verve</h3>
        <%= Html.Kendo().ColorPalette()
                .Name("verve")
                .Palette(new string[] {
                    "#ffffff", "#000000", "#d2d2d2", "#666666", "#ff388c", "#e40059", "#9c007f", "#68007f", "#005bd3", "#00349e",
                    "#f2f2f2", "#7f7f7f", "#bdbdbd", "#e0e0e0", "#ffd7e8", "#ffc6dc", "#ffb8f1", "#f1b2ff", "#c3dcff", "#b8cfff",
                    "#d8d8d8", "#595959", "#9d9d9d", "#c1c1c1", "#ffafd1", "#ff8eba", "#ff71e4", "#e365ff", "#87baff", "#72a0ff",
                    "#bfbfbf", "#3f3f3f", "#696969", "#a3a3a3", "#ff87ba", "#ff5597", "#ff2ad7", "#d519ff", "#4b98ff", "#2b71ff",
                    "#a5a5a5", "#262626", "#343434", "#4c4c4c", "#e90062", "#ab0042", "#75005f", "#4e005f", "#00449e", "#002676",
                    "#7f7f7f", "#0c0c0c", "#151515", "#333333", "#9b0041", "#72002c", "#4e003f", "#34003f", "#002d69", "#00194f"
                })
        %>
    </div>
</div>

<style scoped>
    .demo-section {
        overflow: hidden;
        padding: 40px 50px 15px;
    }

    .column {
        display: inline-block;
        vertical-align: top;
    }

    .palette-wrapper {
        margin-bottom: 25px;
        float: left;
        margin-right: 14px;
    }

    .palette-wrapper h3 {
        font-size: 11px;
        text-transform: uppercase;
        font-weight: normal;
    }

    .column {
        width: 310px;
    }

    .column .palette-wrapper {
        display: block;
    }
</style>
</asp:Content>