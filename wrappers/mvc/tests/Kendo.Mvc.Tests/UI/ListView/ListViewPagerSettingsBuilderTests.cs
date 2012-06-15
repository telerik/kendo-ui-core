namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Xunit;

    public class ListViewPagerSettingsBuilderTests
    {
        private readonly ListViewPagingSettings settings;
        private readonly ListViewPagerSettingsBuilder builder;

        public ListViewPagerSettingsBuilderTests()
        {
            settings = new ListViewPagingSettings();
            builder = new ListViewPagerSettingsBuilder(settings);
        }
        
        [Fact]
        public void Enabled_sets_true_settings()
        {
            builder.Enabled(true);

            Assert.True(settings.Enabled);
        }  
    }
}