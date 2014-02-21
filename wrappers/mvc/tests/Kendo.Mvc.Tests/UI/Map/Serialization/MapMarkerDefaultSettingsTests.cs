namespace Kendo.Mvc.UI.Tests.Map.Serialization
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

    public class MapMarkerDefaultsSettingsTests
    {
        private readonly MapMarkerDefaultsSettings defaults;

        public MapMarkerDefaultsSettingsTests()
        {
            defaults = new MapMarkerDefaultsSettings(MapTestHelper.CreateMap());
        }

        [Fact]
        public void Serializes_shape_type()
        {
            defaults.Shape = MapMarkersShape.Pin;
            defaults.ToJson()["shape"].ShouldEqual("pin");
        }

        [Fact]
        public void Serializes_compound_shape_type()
        {
            defaults.Shape = MapMarkersShape.PinTarget;
            defaults.ToJson()["shape"].ShouldEqual("pinTarget");
        }

        [Fact]
        public void Serializes_shape_name()
        {
            defaults.ShapeName = "foo";
            defaults.ToJson()["shape"].ShouldEqual("foo");
        }

        [Fact]
        public void Serializes_shape_name_over_shape()
        {
            defaults.ShapeName = "foo";
            defaults.Shape = MapMarkersShape.Pin;
            defaults.ToJson()["shape"].ShouldEqual("foo");
        }

        [Fact]
        public void Does_not_serialize_shape()
        {
            defaults.ToJson().ContainsKey("shape").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_tooltip()
        {
            defaults.Tooltip.Content = "foo";
            defaults.ToJson().ContainsKey("tooltip").ShouldBeTrue();
        }

        [Fact]
        public void Does_not_serialize_tooltip()
        {
            defaults.ToJson().ContainsKey("tooltip").ShouldBeFalse();
        }
    }
}