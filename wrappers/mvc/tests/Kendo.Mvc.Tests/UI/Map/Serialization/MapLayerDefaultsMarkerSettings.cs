namespace Kendo.Mvc.UI.Tests.Map.Serialization
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

    public class MapLayerDefaultsMarkerSettingsTests
    {
        private readonly MapLayerDefaultsMarkerSettings settings;

        public MapLayerDefaultsMarkerSettingsTests()
        {
            settings = new MapLayerDefaultsMarkerSettings(MapTestHelper.CreateMap());
        }

        [Fact]
        public void Serializes_shape_type()
        {
            settings.Shape = MapMarkersShape.Pin;
            settings.ToJson()["shape"].ShouldEqual("pin");
        }

        [Fact]
        public void Serializes_compound_shape_type()
        {
            settings.Shape = MapMarkersShape.PinTarget;
            settings.ToJson()["shape"].ShouldEqual("pinTarget");
        }

        [Fact]
        public void Serializes_shape_name()
        {
            settings.ShapeName = "foo";
            settings.ToJson()["shape"].ShouldEqual("foo");
        }

        [Fact]
        public void Serializes_shape_name_over_shape()
        {
            settings.ShapeName = "foo";
            settings.Shape = MapMarkersShape.Pin;
            settings.ToJson()["shape"].ShouldEqual("foo");
        }

        [Fact]
        public void Does_not_serialize_shape()
        {
            settings.ToJson().ContainsKey("shape").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_tooltip()
        {
            settings.Tooltip.Content = "foo";
            settings.ToJson().ContainsKey("tooltip").ShouldBeTrue();
        }

        [Fact]
        public void Does_not_serialize_tooltip()
        {
            settings.ToJson().ContainsKey("tooltip").ShouldBeFalse();
        }
    }
}