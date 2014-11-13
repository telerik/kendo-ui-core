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
            SchedulerDayView view = new SchedulerDayView(container);

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
            SchedulerDayView view = new SchedulerDayView(container);

            container.Views.Add(view);
        }

        /// <summary>
        /// Defines a custom view 
        /// </summary>
        /// <param name="type">The JavaScript type name</param>
        public void CustomView(string type)
        {
            SchedulerCustomView view = new SchedulerCustomView(type, container);
            container.Views.Add(view);
        }

        /// <summary>
        /// Defines a custom view 
        /// </summary>
        /// <param name="type">The JavaScript type name</param>
        /// <param name="addViewAction">The action for configuring the custom view</param>
        public SchedulerCustomViewBuilder<SchedulerCustomView> CustomView(string type, Action<SchedulerCustomViewBuilder<SchedulerCustomView>> addViewAction)
        {
            SchedulerCustomView view = new SchedulerCustomView(type, container);

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
            SchedulerWorkWeekView view = new SchedulerWorkWeekView(container);

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
            SchedulerWorkWeekView view = new SchedulerWorkWeekView(container);

            container.Views.Add(view);
        }

        /// <summary>
        /// Defines a Scheduler week view.
        /// </summary>
        /// <returns></returns>
        public SchedulerWeekViewBuilder<SchedulerWeekView> WeekView(Action<SchedulerWeekViewBuilder<SchedulerWeekView>> addViewAction)
        {
            SchedulerWeekView view = new SchedulerWeekView(container);

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
            SchedulerWeekView view = new SchedulerWeekView(container);

            container.Views.Add(view);
        }

        /// <summary>
        /// Defines a Scheduler month view.
        /// </summary>
        /// <returns></returns>
        public SchedulerMonthViewBuilder<SchedulerMonthView> MonthView(Action<SchedulerMonthViewBuilder<SchedulerMonthView>> addViewAction)
        {
            SchedulerMonthView view = new SchedulerMonthView(container);

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
            SchedulerMonthView view = new SchedulerMonthView(container);

            container.Views.Add(view);
        }

        /// <summary>
        /// Defines a Scheduler agenda view.
        /// </summary>
        /// <returns></returns>
        public SchedulerAgendaViewBuilder<SchedulerAgendaView> AgendaView(Action<SchedulerAgendaViewBuilder<SchedulerAgendaView>> addViewAction)
        {
            SchedulerAgendaView view = new SchedulerAgendaView(container);

            container.Views.Add(view);

            SchedulerAgendaViewBuilder<SchedulerAgendaView> builder = new SchedulerAgendaViewBuilder<SchedulerAgendaView>(view);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Enables a Scheduler timeline view.
        /// </summary>
        /// <returns></returns>
        public void TimelineView()
        {
            SchedulerTimelineView view = new SchedulerTimelineView(container);

            container.Views.Add(view);
        }

        /// <summary>
        /// Defines a Scheduler timeline view.
        /// </summary>
        /// <returns></returns>
        public SchedulerTimelineViewBuilder<SchedulerTimelineView> TimelineView(Action<SchedulerTimelineViewBuilder<SchedulerTimelineView>> addViewAction)
        {
            SchedulerTimelineView view = new SchedulerTimelineView(container);

            container.Views.Add(view);

            SchedulerTimelineViewBuilder<SchedulerTimelineView> builder = new SchedulerTimelineViewBuilder<SchedulerTimelineView>(view);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Enables a Scheduler timeline week view.
        /// </summary>
        /// <returns></returns>
        public void TimelineWeekView()
        {
            SchedulerTimelineWeekView view = new SchedulerTimelineWeekView(container);

            container.Views.Add(view);
        }

        /// <summary>
        /// Defines a Scheduler timelineWeek view.
        /// </summary>
        /// <returns></returns>
        public SchedulerTimelineWeekViewBuilder<SchedulerTimelineWeekView> TimelineWeekView(Action<SchedulerTimelineWeekViewBuilder<SchedulerTimelineWeekView>> addViewAction)
        {
            SchedulerTimelineWeekView view = new SchedulerTimelineWeekView(container);

            container.Views.Add(view);

            SchedulerTimelineWeekViewBuilder<SchedulerTimelineWeekView> builder = new SchedulerTimelineWeekViewBuilder<SchedulerTimelineWeekView>(view);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Enables a Scheduler timeline work week view.
        /// </summary>
        /// <returns></returns>
        public void TimelineWorkWeekView()
        {
            SchedulerTimelineWorkWeekView view = new SchedulerTimelineWorkWeekView(container);

            container.Views.Add(view);
        }

        /// <summary>
        /// Defines a Scheduler timelineWorkWeek view.
        /// </summary>
        /// <returns></returns>
        public SchedulerTimelineWorkWeekViewBuilder<SchedulerTimelineWorkWeekView> TimelineWorkWeekView(Action<SchedulerTimelineWorkWeekViewBuilder<SchedulerTimelineWorkWeekView>> addViewAction)
        {
            SchedulerTimelineWorkWeekView view = new SchedulerTimelineWorkWeekView(container);

            container.Views.Add(view);

            SchedulerTimelineWorkWeekViewBuilder<SchedulerTimelineWorkWeekView> builder = new SchedulerTimelineWorkWeekViewBuilder<SchedulerTimelineWorkWeekView>(view);

            addViewAction(builder);

            return builder;
        }


        /// <summary>
        /// Enables a Scheduler timeline month view.
        /// </summary>
        /// <returns></returns>
        public void TimelineMonthView()
        {
            SchedulerTimelineMonthView view = new SchedulerTimelineMonthView(container);

            container.Views.Add(view);
        }

        /// <summary>
        /// Defines a Scheduler timeline month view.
        /// </summary>
        /// <returns></returns>
        public SchedulerTimelineMonthViewBuilder<SchedulerTimelineMonthView> TimelineMonthView(Action<SchedulerTimelineMonthViewBuilder<SchedulerTimelineMonthView>> addViewAction)
        {
            SchedulerTimelineMonthView view = new SchedulerTimelineMonthView(container);

            container.Views.Add(view);

            SchedulerTimelineMonthViewBuilder<SchedulerTimelineMonthView> builder = new SchedulerTimelineMonthViewBuilder<SchedulerTimelineMonthView>(view);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Enables a Scheduler agenda view.
        /// </summary>
        /// <returns></returns>
        public void AgendaView()
        {
            SchedulerAgendaView view = new SchedulerAgendaView(container);

            container.Views.Add(view);
        }
    }
}
