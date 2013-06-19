namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Linq.Expressions;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;

    /// <summary>
    /// Creates views for the <see cref="Scheduler" /> class.
    /// </summary>
    public class SchedulerViewFactory<TModel> : IHideObjectMembers
         where TModel : class, ISchedulerEvent
    {
        private readonly IScheduler<TModel> container;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerViewFactory"/> class.
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
        public ISchedulerViewBuilder DayView(Action<SchedulerDayViewBuilder> addViewAction)
        {
            SchedulerDayView view = new SchedulerDayView();

            container.Views.Add(view);

            SchedulerDayViewBuilder builder = new SchedulerDayViewBuilder(view);

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
        /// Defines a Scheduler week view.
        /// </summary>
        /// <returns></returns>
        public ISchedulerViewBuilder WeekView(Action<SchedulerWeekViewBuilder> addViewAction)
        {
            SchedulerWeekView view = new SchedulerWeekView();

            container.Views.Add(view);

            SchedulerWeekViewBuilder builder = new SchedulerWeekViewBuilder(view);

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
        public ISchedulerViewBuilder MonthView(Action<SchedulerMonthViewBuilder> addViewAction)
        {
            SchedulerMonthView view = new SchedulerMonthView();

            container.Views.Add(view);

            SchedulerMonthViewBuilder builder = new SchedulerMonthViewBuilder(view);

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
        public ISchedulerViewBuilder AgendaView(Action<SchedulerAgendaViewBuilder> addViewAction)
        {
            SchedulerAgendaView view = new SchedulerAgendaView();

            container.Views.Add(view);

            SchedulerAgendaViewBuilder builder = new SchedulerAgendaViewBuilder(view);

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
