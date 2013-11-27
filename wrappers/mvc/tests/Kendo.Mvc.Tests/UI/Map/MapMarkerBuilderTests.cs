namespace Kendo.Mvc.UI.Tests.Map
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

    public class MapMarkerBuilderTests
    {
        private readonly MapMarker marker;
        private readonly MapMarkerBuilder builder;

        public MapMarkerBuilderTests()
        {
            marker = new MapMarker(MapTestHelper.CreateMap());
            builder = new MapMarkerBuilder(marker);
        }

        [Fact]
        public void Sets_marker_shape()
        {
            builder.Shape(MapMarkersShape.PinTarget);
            marker.Shape.ShouldEqual(MapMarkersShape.PinTarget);
        }

        [Fact]
        public void Setting_marker_shape_returns_builder()
        {
            builder.Shape(MapMarkersShape.PinTarget).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Sets_marker_shape_name()
        {
            builder.Shape("Foo");
            marker.ShapeName.ShouldEqual("Foo");
        }

        [Fact]
        public void Setting_marker_shape_name_returns_builder()
        {
            builder.Shape("Foo").ShouldBeSameAs(builder);
        }
    }
}