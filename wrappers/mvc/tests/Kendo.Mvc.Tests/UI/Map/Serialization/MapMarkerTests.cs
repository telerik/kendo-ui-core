namespace Kendo.Mvc.UI.Tests.Map.Serialization
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

    public class MapMarkerTests
    {
        private readonly MapMarker marker;

        public MapMarkerTests()
        {
            marker = new MapMarker(MapTestHelper.CreateMap());
        }

        [Fact]
        public void Serializes_shape_type()
        {
            marker.Shape = MapMarkersShape.Pin;
            marker.ToJson()["shape"].ShouldEqual("pin");
        }

        [Fact]
        public void Serializes_compound_shape_type()
        {
            marker.Shape = MapMarkersShape.PinTarget;
            marker.ToJson()["shape"].ShouldEqual("pinTarget");
        }

        [Fact]
        public void Serializes_shape_name()
        {
            marker.ShapeName = "foo";
            marker.ToJson()["shape"].ShouldEqual("foo");
        }

        [Fact]
        public void Serializes_shape_name_over_shape()
        {
            marker.ShapeName = "foo";
            marker.Shape = MapMarkersShape.Pin;
            marker.ToJson()["shape"].ShouldEqual("foo");
        }

        [Fact]
        public void Does_not_serialize_shape()
        {
            marker.ToJson().ContainsKey("shape").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_tooltip()
        {
            marker.Tooltip.Content = "foo";
            marker.ToJson().ContainsKey("tooltip").ShouldBeTrue();
        }

        [Fact]
        public void Does_not_serialize_tooltip()
        {
            marker.ToJson().ContainsKey("tooltip").ShouldBeFalse();
        }
    }
}