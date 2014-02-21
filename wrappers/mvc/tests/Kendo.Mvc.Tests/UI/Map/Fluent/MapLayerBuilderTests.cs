namespace Kendo.Mvc.UI.Tests.Map.Fluent
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

    public class MapLayerBuilderTests
    {
        private readonly MapLayer layer;
        private readonly MapLayerBuilder builder;

        public MapLayerBuilderTests()
        {
            layer = new MapLayer(MapTestHelper.CreateMap());
            builder = new MapLayerBuilder(layer);
        }

        [Fact]
        public void Sets_layer_shape()
        {
            builder.Shape(MapMarkersShape.PinTarget);
            layer.Shape.ShouldEqual(MapMarkersShape.PinTarget);
        }

        [Fact]
        public void Setting_layer_shape_returns_builder()
        {
            builder.Shape(MapMarkersShape.PinTarget).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Sets_layer_shape_name()
        {
            builder.Shape("Foo");
            layer.ShapeName.ShouldEqual("Foo");
        }

        [Fact]
        public void Setting_layer_shape_name_returns_builder()
        {
            builder.Shape("Foo").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Sets_layer_tooltip()
        {
            builder.Tooltip(tooltip => tooltip.Content("foo"));
            layer.Tooltip.Content.ShouldEqual("foo");
        }

        [Fact]
        public void Setting_layer_tooltip_returns_builder()
        {
            builder.Tooltip(tooltip => tooltip.Content("foo")).ShouldBeSameAs(builder);
        }
    }
}