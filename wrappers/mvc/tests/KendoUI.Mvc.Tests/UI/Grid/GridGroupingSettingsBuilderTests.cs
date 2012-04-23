namespace Telerik.Web.Mvc.UI.Tests.Grid
{
    using Fluent;
    using Moq;
    using Xunit;

    public class GridGroupingSettingsBuilderTests
    {
        [Fact]
        public void Should_set_visible_property_of_settings()
        {
            var settings = new GridGroupingSettings(new Mock<IGrid>().Object);
            var builder = new GridGroupingSettingsBuilder<object>(settings);

            builder.Visible(true);
            
            settings.Visible.ShouldBeTrue();
        }
    }
}