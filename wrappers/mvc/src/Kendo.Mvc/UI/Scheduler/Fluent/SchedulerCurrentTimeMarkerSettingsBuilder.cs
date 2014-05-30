namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerCurrentTimeMarkerSettings"/>.
    /// </summary>
    public class SchedulerCurrentTimeMarkerSettingsBuilder
    {
        private readonly SchedulerCurrentTimeMarkerSettings container;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerCurrentTimeMarkerSettingsBuilder"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        public SchedulerCurrentTimeMarkerSettingsBuilder(SchedulerCurrentTimeMarkerSettings container)
        {
            this.container = container;
        }

        /// <summary>
        /// The update interval of the "current time" marker, in milliseconds.
        /// </summary>
        /// <param name="interval">The interval</param>
        public SchedulerCurrentTimeMarkerSettingsBuilder UpdateInterval(int interval)
        {
            container.UpdateInterval = interval;

            return this;
        }

        /// <summary>
        /// If set to `false` the "current time" marker would be displayed using the Scheduler Timezone.
        /// </summary>
        /// <param name="useLocalTimezone">The useLocalTimezone</param>
        public SchedulerCurrentTimeMarkerSettingsBuilder UseLocalTimezone(bool useLocalTimezone)
        {
            container.UseLocalTimezone = useLocalTimezone;

            return this;
        }
    }
}
