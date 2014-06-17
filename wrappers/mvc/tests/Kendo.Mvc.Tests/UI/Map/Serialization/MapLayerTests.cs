namespace Kendo.Mvc.UI.Tests.Map.Serialization
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

    public class MapLayerTests
    {
        private readonly MapLayer layer;

        public MapLayerTests()
        {
            layer = new MapLayer(MapTestHelper.CreateMap());
        }

        [Fact]
        public void Serializes_shape_type()
        {
            layer.Shape = MapMarkersShape.Pin;
            layer.ToJson()["shape"].ShouldEqual("pin");
        }

        [Fact]
        public void Serializes_compound_shape_type()
        {
            layer.Shape = MapMarkersShape.PinTarget;
            layer.ToJson()["shape"].ShouldEqual("pinTarget");
        }

        [Fact]
        public void Serializes_shape_name()
        {
            layer.ShapeName = "foo";
            layer.ToJson()["shape"].ShouldEqual("foo");
        }

        [Fact]
        public void Serializes_shape_name_over_shape()
        {
            layer.ShapeName = "foo";
            layer.Shape = MapMarkersShape.Pin;
            layer.ToJson()["shape"].ShouldEqual("foo");
        }

        [Fact]
        public void Does_not_serialize_shape()
        {
            layer.ToJson().ContainsKey("shape").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_tooltip()
        {
            layer.Tooltip.Content = "foo";
            layer.ToJson().ContainsKey("tooltip").ShouldBeTrue();
        }

        [Fact]
        public void Does_not_serialize_tooltip()
        {
            layer.ToJson().ContainsKey("tooltip").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_symbol_type()
        {
            layer.Symbol = MapSymbol.Circle;
            layer.ToJson()["symbol"].ShouldEqual("circle");
        }

        [Fact]
        public void Serializes_symbol_name()
        {
            layer.SymbolName = "foo";
            layer.ToJson()["symbol"].ShouldEqual("foo");
        }

        [Fact]
        public void Serializes_symbol_handler()
        {
            layer.SymbolHandler = new ClientHandlerDescriptor { HandlerName = "foo" };
            layer.ToJson()["symbol"].ShouldEqual(layer.SymbolHandler);
        }

        [Fact]
        public void Serializes_symbol_name_over_symbol()
        {
            layer.SymbolName = "foo";
            layer.Symbol = MapSymbol.Circle;
            layer.ToJson()["symbol"].ShouldEqual("foo");
        }

        [Fact]
        public void Serializes_symbol_handler_over_symbol_and_name()
        {
            layer.SymbolHandler = new ClientHandlerDescriptor { HandlerName = "foo" };
            layer.SymbolName = "bar";
            layer.Symbol = MapSymbol.Circle;
            layer.ToJson()["symbol"].ShouldEqual(layer.SymbolHandler);
        }

        [Fact]
        public void Does_not_serialize_symbol()
        {
            layer.ToJson().ContainsKey("symbol").ShouldBeFalse();
        }
    }
}