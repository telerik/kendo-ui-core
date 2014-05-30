namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Xunit;

    public class SchedulerCurrentTimeMarkerBuilderTests
    {
        private readonly SchedulerCurrentTimeMarkerSettings currentTimeMarker;
        private readonly SchedulerCurrentTimeMarkerSettingsBuilder builder;

        public SchedulerCurrentTimeMarkerBuilderTests() 
        {
            currentTimeMarker = new SchedulerCurrentTimeMarkerSettings();
            builder = new SchedulerCurrentTimeMarkerSettingsBuilder(currentTimeMarker);
        }

        [Fact]
        public void UseLocalTimezone_sets_the_corresponding_property()
        {
            var useLocalTimezone = false;
            builder.UseLocalTimezone(useLocalTimezone);

            Assert.Equal(useLocalTimezone, currentTimeMarker.UseLocalTimezone);
        }

        [Fact]
        public void UpdateInterval_sets_the_corresponding_property()
        {
            var updateInterval = 100;
            builder.UpdateInterval(updateInterval);

            Assert.Equal(updateInterval, currentTimeMarker.UpdateInterval);
        }
    }
}
