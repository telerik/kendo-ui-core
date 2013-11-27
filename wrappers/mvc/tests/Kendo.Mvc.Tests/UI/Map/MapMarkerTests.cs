namespace Kendo.Mvc.UI.Tests.Map
{
    using System.Collections.Generic;
    using Xunit;

    public class MapMarkerTests
    {
        private readonly MapMarker marker;

        public MapMarkerTests()
        {
            marker = new MapMarker(MapTestHelper.CreateMap());
        }

        [Fact]
        public void Serializes_shape()
        {
            marker.Shape = MapMarkersShape.Pin;
            marker.ToJson()["shape"].ShouldEqual("pin");
        }

        [Fact]
        public void Serializes_compound_shape()
        {
            marker.Shape = MapMarkersShape.PinTarget;
            marker.ToJson()["shape"].ShouldEqual("pinTarget");
        }

        [Fact]
        public void Serializes_shape_name()
        {
            marker.ShapeName = "Foo";
            marker.ToJson()["shape"].ShouldEqual("Foo");
        }
    }
}