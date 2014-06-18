namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;
    using System;

    /// <summary>
    /// Defines the fluent API for adding views to Gantt for ASP.NET MVC
    /// </summary>
    public class GanttViewFactory : IHideObjectMembers
    {
        private readonly List<GanttView> container;

        public GanttViewFactory(List<GanttView> container)
        {
            this.container = container;
        }

        private GanttViewBuilder Add(GanttViewType type)
        {
            var view = new GanttView { Type = type };

            container.Add(view);

            return new GanttViewBuilder(view);
        }

        public virtual GanttViewBuilder DayView(Action<GanttViewBuilder> addViewAction)
        {
            var builder = Add(GanttViewType.Day);

            addViewAction(builder);

            return builder;
        }

        public void DayView()
        {
            Add(GanttViewType.Day);
        }

        public virtual GanttViewBuilder WeekView(Action<GanttViewBuilder> addViewAction)
        {
            var builder = Add(GanttViewType.Week);

            addViewAction(builder);

            return builder;
        }

        public void WeekView()
        {
            Add(GanttViewType.Week);
        }

        public virtual GanttViewBuilder MonthView(Action<GanttViewBuilder> addViewAction)
        {
            var builder = Add(GanttViewType.Month);

            addViewAction(builder);

            return builder;
        }

        public void MonthView()
        {
            Add(GanttViewType.Month);
        }
    }
}

