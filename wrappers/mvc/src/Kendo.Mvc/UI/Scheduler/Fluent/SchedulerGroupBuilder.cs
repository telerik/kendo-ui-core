namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Creates resources grouping for the <see cref="Scheduler{TModel}" /> class.
    /// </summary>
    public class SchedulerGroupBuilder<TModel> : IHideObjectMembers
        where TModel : class, ISchedulerEvent
    {
        private readonly IScheduler<TModel> container;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerGroupBuilder{TModel}"/> class.
        /// </summary>
        /// <param name="container">The container</param>
        public SchedulerGroupBuilder(IScheduler<TModel> container)
        {
            this.container = container;
        }

        /// <summary>
        /// Sets the resources by which the scheduler will be grouped.
        /// </summary>
        /// <param name="names">The names of the resources</param>
        public SchedulerGroupBuilder<TModel> Resources(params string[] names)
        {
            container.Group.Resources = names;

            return this;
        }

        /// <summary>
        /// The orientation of the group headers.
        /// </summary>
        /// <param name="value">The orientation</param>        
        public SchedulerGroupBuilder<TModel> Orientation(SchedulerGroupOrientation value)
        {
            container.Group.Orientation = value;
            return this;
        }
    }
}
