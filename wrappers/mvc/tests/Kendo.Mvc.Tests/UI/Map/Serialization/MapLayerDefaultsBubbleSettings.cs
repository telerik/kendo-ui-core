namespace Kendo.Mvc.UI.Tests.Map.Serialization
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

    public class MapLayerDefaultsBubbleSettingsTests
    {
        private readonly MapLayerDefaultsBubbleSettings defaults;

        public MapLayerDefaultsBubbleSettingsTests()
        {
            defaults = new MapLayerDefaultsBubbleSettings();
        }

        [Fact]
        public void Serializes_symbol_type()
        {
            defaults.Symbol = MapSymbol.Circle;
            defaults.ToJson()["symbol"].ShouldEqual("circle");
        }

        [Fact]
        public void Serializes_symbol_name()
        {
            defaults.SymbolName = "foo";
            defaults.ToJson()["symbol"].ShouldEqual("foo");
        }

        [Fact]
        public void Serializes_symbol_handler()
        {
            defaults.SymbolHandler = new ClientHandlerDescriptor { HandlerName = "foo" };
            defaults.ToJson()["symbol"].ShouldEqual(defaults.SymbolHandler);
        }

        [Fact]
        public void Serializes_symbol_name_over_symbol()
        {
            defaults.SymbolName = "foo";
            defaults.Symbol = MapSymbol.Circle;
            defaults.ToJson()["symbol"].ShouldEqual("foo");
        }

        [Fact]
        public void Serializes_symbol_handler_over_symbol_and_name()
        {
            defaults.SymbolHandler = new ClientHandlerDescriptor { HandlerName = "foo" };
            defaults.SymbolName = "bar";
            defaults.Symbol = MapSymbol.Circle;
            defaults.ToJson()["symbol"].ShouldEqual(defaults.SymbolHandler);
        }

        [Fact]
        public void Does_not_serialize_symbol()
        {
            defaults.ToJson().ContainsKey("symbol").ShouldBeFalse();
        }
    }
}