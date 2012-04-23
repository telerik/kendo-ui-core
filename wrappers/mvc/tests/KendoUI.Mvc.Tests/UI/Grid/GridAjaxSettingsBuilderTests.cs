namespace KendoUI.Mvc.UI.Tests
{
    using KendoUI.Mvc.UI.Fluent;
    using Xunit;
    
    public class GridAjaxSettingsBuilderTests
    {
        [Fact]
        public void Enabled_sets_the_enabled_property()
        {
            GridBindingSettings settings = new GridBindingSettings(GridTestHelper.CreateGrid<Customer>());
            GridAjaxSettingsBuilder builder = new GridAjaxSettingsBuilder(settings);
            builder.Enabled(true);

            Assert.True(settings.Enabled);
        }
    }
}
