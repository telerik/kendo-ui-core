namespace Kendo.Mvc.UI.Tests.Map.Serialization
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

    public class AttributionSettingsTests
    {
        private readonly MapControlsAttributionSettings settings;

        public AttributionSettingsTests()
        {
            settings = new MapControlsAttributionSettings();
        }

        [Fact]
        public void Serializes_position()
        {
            settings.Position = MapControlPosition.TopLeft;
            settings.ToJson()["position"].ShouldEqual("topLeft");
        }

        [Fact]
        public void Does_not_serialize_default_position()
        {
            settings.ToJson().ContainsKey("position").ShouldBeFalse();
        }
    }
}