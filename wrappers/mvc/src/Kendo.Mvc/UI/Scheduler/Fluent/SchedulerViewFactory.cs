namespace Kendo.Mvc.UI.Fluent
{
    using System;

    /// <summary>
    /// Creates views for the <see cref="Scheduler{TModel}" /> class.
    /// </summary>
    public class SchedulerViewFactory<TModel> : IHideObjectMembers
         where TModel : class, ISchedulerEvent
    {
        private readonly IScheduler<TModel> container;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerViewFactory{TModel}"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        public SchedulerViewFactory(Scheduler<TModel> container)
        {
            this.container = container;
        }

        /// <summary>
        /// Defines a Scheduler day view.
        /// </summary>
        /// <returns></returns>
        public SchedulerDayViewBuilder<SchedulerDayView> DayView(Action<SchedulerDayViewBuilder<SchedulerDayView>> addViewAction)
        {
            SchedulerDayView view = new SchedulerDayView();

            container.Views.Add(view);

            SchedulerDayViewBuilder<SchedulerDayView> builder = new SchedulerDayViewBuilder<SchedulerDayView>(view);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Enables a Scheduler day view.
        /// </summary>
        /// <returns></returns>
        public void DayView()
        {
            SchedulerDayView view = new SchedulerDayView();

            container.Views.Add(view);
        }

        /// <summary>
        /// Defines a custom view 
        /// </summary>
        /// <param name="type">The JavaScript type name</param>
        public void CustomView(string type)
        {
            SchedulerCustomView view = new SchedulerCustomView(type);
            container.Views.Add(view);
        }

        /// <summary>
        /// Defines a custom view 
        /// </summary>
        /// <param name="type">The JavaScript type name</param>
        /// <param name="addViewAction">The action for configuring the custom view</param>
        public SchedulerCustomViewBuilder<SchedulerCustomView> CustomView(string type, Action<SchedulerCustomViewBuilder<SchedulerCustomView>> addViewAction)
        {
            SchedulerCustomView view = new SchedulerCustomView(type);

            container.Views.Add(view);

            SchedulerCustomViewBuilder<SchedulerCustomView> builder = new SchedulerCustomViewBuilder<SchedulerCustomView>(view);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Defines a Scheduler workWeek view.
        /// </summary>
        /// <returns></returns>
        public SchedulerWorkWeekViewBuilder<SchedulerWorkWeekView> WorkWeekView(Action<SchedulerWorkWeekViewBuilder<SchedulerWorkWeekView>> addViewAction)
        {
            SchedulerWorkWeekView view = new SchedulerWorkWeekView();

            container.Views.Add(view);

            SchedulerWorkWeekViewBuilder<SchedulerWorkWeekView> builder = new SchedulerWorkWeekViewBuilder<SchedulerWorkWeekView>(view);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Enables a Scheduler workWeek view.
        /// </summary>
        /// <returns></returns>
        public void WorkWeekView()
        {
            SchedulerWorkWeekView view = new SchedulerWorkWeekView();

            container.Views.Add(view);
        }

        /// <summary>
        /// Defines a Scheduler week view.
        /// </summary>
        /// <returns></returns>
        public SchedulerWeekViewBuilder<SchedulerWeekView> WeekView(Action<SchedulerWeekViewBuilder<SchedulerWeekView>> addViewAction)
        {
            SchedulerWeekView view = new SchedulerWeekView();

            container.Views.Add(view);

            SchedulerWeekViewBuilder<SchedulerWeekView> builder = new SchedulerWeekViewBuilder<SchedulerWeekView>(view);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Enables a Scheduler week view.
        /// </summary>
        /// <returns></returns>
        public void WeekView()
        {
            SchedulerWeekView view = new SchedulerWeekView();

            container.Views.Add(view);
        }

        /// <summary>
        /// Defines a Scheduler month view.
        /// </summary>
        /// <returns></returns>
        public SchedulerMonthViewBuilder<SchedulerMonthView> MonthView(Action<SchedulerMonthViewBuilder<SchedulerMonthView>> addViewAction)
        {
            SchedulerMonthView view = new SchedulerMonthView();

            container.Views.Add(view);

            SchedulerMonthViewBuilder<SchedulerMonthView> builder = new SchedulerMonthViewBuilder<SchedulerMonthView>(view);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Enables a Scheduler month view.
        /// </summary>
        /// <returns></returns>
        public void MonthView()
        {
            SchedulerMonthView view = new SchedulerMonthView();

            container.Views.Add(view);
        }

        /// <summary>
        /// Defines a Scheduler agenda view.
        /// </summary>
        /// <returns></returns>
        public SchedulerAgendaViewBuilder<SchedulerAgendaView> AgendaView(Action<SchedulerAgendaViewBuilder<SchedulerAgendaView>> addViewAction)
        {
            SchedulerAgendaView view = new SchedulerAgendaView();

            container.Views.Add(view);

            SchedulerAgendaViewBuilder<SchedulerAgendaView> builder = new SchedulerAgendaViewBuilder<SchedulerAgendaView>(view);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Enables a Scheduler agenda view.
        /// </summary>
        /// <returns></returns>
        public void AgendaView()
        {
            SchedulerAgendaView view = new SchedulerAgendaView();

            container.Views.Add(view);
        }
    }
}
