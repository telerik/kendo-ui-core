namespace Kendo.Mvc.UI.Tests.Map.Fluent
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

    public class MapLayerDefaultsBubbleSettingsBuilderTests
    {
        private readonly MapLayerDefaultsBubbleSettings settings;
        private readonly MapLayerDefaultsBubbleSettingsBuilder builder;

        public MapLayerDefaultsBubbleSettingsBuilderTests()
        {
            settings = new MapLayerDefaultsBubbleSettings();
            builder = new MapLayerDefaultsBubbleSettingsBuilder(settings);
        }

        [Fact]
        public void Sets_settings_symbol()
        {
            builder.Symbol(MapSymbol.Circle);
            settings.Symbol.ShouldEqual(MapSymbol.Circle);
        }

        [Fact]
        public void Setting_settings_symbol_returns_builder()
        {
            builder.Symbol(MapSymbol.Circle).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Sets_settings_symbol_name()
        {
            builder.Symbol("Foo");
            settings.SymbolName.ShouldEqual("Foo");
        }

        [Fact]
        public void Setting_settings_symbol_name_returns_builder()
        {
            builder.Symbol("Foo").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Sets_settings_symbol_handler()
        {
            builder.SymbolHandler("foo");
            settings.SymbolHandler.HandlerName.ShouldEqual("foo");
        }

        [Fact]
        public void Setting_settings_symbol_handler_returns_builder()
        {
            builder.SymbolHandler("foo").ShouldBeSameAs(builder);
        }
    }
}