namespace Kendo.Mvc.UI.Tests.Map.Serialization
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

    public class MapControlsSettingsTests
    {
        private readonly MapControlsSettings settings;

        public MapControlsSettingsTests()
        {
            settings = new MapControlsSettings();
        }

        [Fact]
        public void Serializes_attribution_settings()
        {
            settings.Attribution.Position = MapControlPosition.TopLeft;
            settings.ToJson().ContainsKey("attribution").ShouldBeTrue();
        }

        [Fact]
        public void Serializes_false_if_attribution_settings_are_cleared()
        {
            settings.Attribution = null;
            settings.ToJson()["attribution"].ShouldEqual(false);
        }
    }
}