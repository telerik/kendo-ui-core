namespace Kendo.Mvc.UI.Tests.Grid
{
    using Fluent;
    using Moq;
    using Xunit;

    public class GridGroupingSettingsBuilderTests
    {
        [Fact]
        public void Should_set_visible_property_of_settings()
        {
            var settings = new GridGroupableSettings();
            var builder = new GridGroupingSettingsBuilder(settings);

            builder.Visible(true);
            
            settings.Visible.ShouldBeTrue();
        }
    }
}