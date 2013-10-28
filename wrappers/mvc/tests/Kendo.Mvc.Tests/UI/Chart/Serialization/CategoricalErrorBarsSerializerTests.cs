namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class CategoricalErrorBarsSerializerTests
    {
        private readonly CategoricalErrorBars errorBars;
        private readonly CategoricalErrorBarsSerializer serializer;

        public CategoricalErrorBarsSerializerTests()
        {
            errorBars = new CategoricalErrorBars();
            serializer = new CategoricalErrorBarsSerializer(errorBars);
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
            var line = GetJson()["line"] as Dictionary<string,object>;
            line.ShouldNotBeNull();
            line["width"].ShouldEqual(1);
        }

        [Fact]
        public void Empty_Line_is_not_set()
        {
            GetJson().ContainsKey("line").ShouldBeFalse();
        }

        [Fact]
        public void Value_sets_Value()
        {
            errorBars.Value = 1;
            GetJson()["value"].ShouldEqual(1);
        }

        [Fact]
        public void Null_Value_is_not_set()
        {
            GetJson().ContainsKey("value").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return errorBars.CreateSerializer().Serialize();
        }
    }
}
