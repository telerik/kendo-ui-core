namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Xunit;

    public class ListViewSelectionSettingsBuilderTests
    {
        private readonly ListViewSelectionSettings settings;
        private readonly ListViewSelectionSettingsBuilder builder;

        public ListViewSelectionSettingsBuilderTests()
        {
            settings = new ListViewSelectionSettings();
            builder = new ListViewSelectionSettingsBuilder(settings);
        }
        
        [Fact]
        public void Enabled_sets_true_settings()
        {
            builder.Enabled(true);

            Assert.True(settings.Enabled);
            Assert.Equal(ListViewSelectionMode.Single ,settings.Mode);
        }

        [Fact]
        public void Mode_sets_mode_to_settings()
        {
            builder.Mode(ListViewSelectionMode.Multiple);
            
            Assert.Equal(ListViewSelectionMode.Multiple, settings.Mode);
        } 
    }
}