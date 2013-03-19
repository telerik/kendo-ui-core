namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI;
    using Xunit;
    using System;

    public class ChartSelectionMousewheelSerializerTests
    {
        private readonly ChartSelectionMousewheel mousewheel;

        public ChartSelectionMousewheelSerializerTests()
        {
            mousewheel = new ChartSelectionMousewheel();
        }

        [Fact]
        public void Serializes_reverse()
        {
            mousewheel.Reverse = true;
            GetJson()["reverse"].ShouldEqual(true);
        }

        [Fact]
        public void Does_not_serializes_default_reverse()
        {
            GetJson().ContainsKey("reverse").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_zoom()
        {
            mousewheel.Zoom = ChartZoomDirection.Right;
            GetJson()["zoom"].ShouldEqual("right");
        }

        [Fact]
        public void Does_not_serializes_default_zoom()
        {
            GetJson().ContainsKey("zoom").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return mousewheel.CreateSerializer().Serialize();
        }
    }
}