namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ScatterErrorBarsSerializerTests
    {
        private readonly ScatterErrorBars errorBars;
        private readonly ScatterErrorBarsSerializer serializer;

        public ScatterErrorBarsSerializerTests()
        {
            errorBars = new ScatterErrorBars();
            serializer = new ScatterErrorBarsSerializer(errorBars);
        }

        [Fact]
        public void Color_sets_Color()
        {
            errorBars.Color = "Red";
            GetJson()["color"].ShouldEqual("Red");
        }

        [Fact]
        public void Null_Color_is_not_set()
        {
            GetJson().ContainsKey("color").ShouldBeFalse();
        }

        [Fact]
        public void EndCaps_sets_EndCaps()
        {
            errorBars.EndCaps = true;
            GetJson()["endCaps"].ShouldEqual(true);
        }

        [Fact]
        public void Null_EndCaps_is_not_set()
        {
            GetJson().ContainsKey("endCaps").ShouldBeFalse();
        }

        [Fact]
        public void Line_sets_Line()
        {
            errorBars.Line = new ChartLine();
            errorBars.Line.Width = 1;
            var line = GetJson()["line"] as Dictionary<string, object>;
            line.ShouldNotBeNull();
            line["width"].ShouldEqual(1);
        }

        [Fact]
        public void Empty_Line_is_not_set()
        {
            GetJson().ContainsKey("line").ShouldBeFalse();
        }

        [Fact]
        public void XValue_sets_XValue()
        {
            errorBars.XValue = 1;
            GetJson()["xValue"].ShouldEqual(1);
        }

        [Fact]
        public void Null_XValue_is_not_set()
        {
            GetJson().ContainsKey("xValue").ShouldBeFalse();
        }

        [Fact]
        public void YValue_sets_YValue()
        {
            errorBars.YValue = 1;
            GetJson()["yValue"].ShouldEqual(1);
        }

        [Fact]
        public void Null_YValue_is_not_set()
        {
            GetJson().ContainsKey("yValue").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return errorBars.CreateSerializer().Serialize();
        }
    }
}
