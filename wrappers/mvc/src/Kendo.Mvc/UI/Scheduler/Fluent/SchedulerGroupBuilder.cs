namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Creates resources grouping for the <see cref="Scheduler{TModel}" /> class.
    /// </summary>
    public class SchedulerGroupBuilder : IHideObjectMembers
    {
        private readonly SchedulerGroupSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerGroupBuilder{TModel}"/> class.
        /// </summary>
        /// <param name="container">The container</param>
        public SchedulerGroupBuilder(SchedulerGroupSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Sets the resources by which the scheduler will be grouped.
        /// </summary>
        /// <param name="names">The names of the resources</param>
        public SchedulerGroupBuilder Resources(params string[] names)
        {
            settings.Resources = names;

            return this;
        }

        /// <summary>
        /// The orientation of the group headers.
        /// </summary>
        /// <param name="value">The orientation</param>        
        public SchedulerGroupBuilder Orientation(SchedulerGroupOrientation value)
        {
            settings.Orientation = value;
            return this;
        }
    }
}
