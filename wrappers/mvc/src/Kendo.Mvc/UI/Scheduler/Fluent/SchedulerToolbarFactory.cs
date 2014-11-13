namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Creates toolbar commands for the <see cref="Scheduler{TModel}" /> class.
    /// </summary>
    public class SchedulerToolbarFactory<TModel> : IHideObjectMembers
        where TModel : class, ISchedulerEvent
    {
        private readonly IScheduler<TModel> container;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerToolbarFactory{TModel}"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        public SchedulerToolbarFactory(Scheduler<TModel> container)
        {
            this.container = container;
        }

        /// <summary>
        /// Enables Pdf command.
        /// </summary>
        /// <returns></returns>
        public void Pdf()
        {
            SchedulerToolbarCommand command = new SchedulerToolbarCommand(SchedulerToolbarCommandType.Pdf);

            container.ToolbarCommands.Add(command);
        }
    }
}
