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
        public SchedulerViewDayBuilder<SchedulerViewDay> DayView(Action<SchedulerViewDayBuilder<SchedulerViewDay>> addViewAction)
        {
            SchedulerViewDay view = new SchedulerViewDay();

            container.Views.Add(view);

            SchedulerViewDayBuilder<SchedulerViewDay> builder = new SchedulerViewDayBuilder<SchedulerViewDay>(view);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Enables a Scheduler day view.
        /// </summary>
        /// <returns></returns>
        public void DayView()
        {
            SchedulerViewDay view = new SchedulerViewDay();

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
        public SchedulerCustomViewBuilder<SchedulerCustomView> CustomView(string type, Action<SchedulerCustomViewBuilder<SchedulerCustomView>> addViewAction)
        {
            SchedulerCustomView view = new SchedulerCustomView(type);

            container.Views.Add(view);

            SchedulerCustomViewBuilder<SchedulerCustomView> builder = new SchedulerCustomViewBuilder<SchedulerCustomView>(view);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Defines a Scheduler week view.
        /// </summary>
        /// <returns></returns>
        public SchedulerViewWeekBuilder<SchedulerViewWeek> WeekView(Action<SchedulerViewWeekBuilder<SchedulerViewWeek>> addViewAction)
        {
            SchedulerViewWeek view = new SchedulerViewWeek();

            container.Views.Add(view);

            SchedulerViewWeekBuilder<SchedulerViewWeek> builder = new SchedulerViewWeekBuilder<SchedulerViewWeek>(view);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Enables a Scheduler week view.
        /// </summary>
        /// <returns></returns>
        public void WeekView()
        {
            SchedulerViewWeek view = new SchedulerViewWeek();

            container.Views.Add(view);
        }

        /// <summary>
        /// Defines a Scheduler month view.
        /// </summary>
        /// <returns></returns>
        public SchedulerViewMonthBuilder<SchedulerViewMonth> MonthView(Action<SchedulerViewMonthBuilder<SchedulerViewMonth>> addViewAction)
        {
            SchedulerViewMonth view = new SchedulerViewMonth();

            container.Views.Add(view);

            SchedulerViewMonthBuilder<SchedulerViewMonth> builder = new SchedulerViewMonthBuilder<SchedulerViewMonth>(view);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Enables a Scheduler month view.
        /// </summary>
        /// <returns></returns>
        public void MonthView()
        {
            SchedulerViewMonth view = new SchedulerViewMonth();

            container.Views.Add(view);
        }

        /// <summary>
        /// Defines a Scheduler agenda view.
        /// </summary>
        /// <returns></returns>
        public SchedulerViewAgendaBuilder<SchedulerViewAgenda> AgendaView(Action<SchedulerViewAgendaBuilder<SchedulerViewAgenda>> addViewAction)
        {
            SchedulerViewAgenda view = new SchedulerViewAgenda();

            container.Views.Add(view);

            SchedulerViewAgendaBuilder<SchedulerViewAgenda> builder = new SchedulerViewAgendaBuilder<SchedulerViewAgenda>(view);

            addViewAction(builder);

            return builder;
        }

        /// <summary>
        /// Enables a Scheduler agenda view.
        /// </summary>
        /// <returns></returns>
        public void AgendaView()
        {
            SchedulerViewAgenda view = new SchedulerViewAgenda();

            container.Views.Add(view);
        }
    }
}
