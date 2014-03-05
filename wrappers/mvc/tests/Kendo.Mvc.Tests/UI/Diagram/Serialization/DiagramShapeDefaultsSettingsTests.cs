namespace Kendo.Mvc.UI.Tests.Map.Serialization
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

    public class DiagramShapeDefaultsSettingsTests
    {
        private readonly DiagramShapeDefaultsSettings settings;

        public DiagramShapeDefaultsSettingsTests()
        {
            settings = new DiagramShapeDefaultsSettings();
        }

        [Fact]
        public void Serializes_visual()
        {
            settings.Visual = new ClientHandlerDescriptor { HandlerName = "foo" };
            ((ClientHandlerDescriptor)settings.ToJson()["visual"]).HandlerName.ShouldEqual("foo");
        }

        [Fact]
        public void Does_not_serialize_default_visual()
        {
            settings.ToJson().ContainsKey("visual").ShouldBeFalse();
        }
    }
}