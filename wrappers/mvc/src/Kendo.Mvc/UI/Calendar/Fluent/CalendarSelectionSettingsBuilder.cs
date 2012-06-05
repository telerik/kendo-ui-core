namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc.Html;
    using System.Web.Routing;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Calendar.CalendarSelectionSettings"/>.
    /// </summary>
    public class CalendarSelectionSettingsBuilder : IHideObjectMembers
    {
        private CalendarSelectionSettings settings;

        /// <summary>
        /// Initializes a new instance of the <see cref="CalendarSelectionSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The selection settings.</param>
        public CalendarSelectionSettingsBuilder(CalendarSelectionSettings settings)
        {
            this.settings = settings;
        }

        /// <summary>
        /// Defines list of dates. This list determines which dates to be rendered with action link.
        /// </summary>
        /// <param name="dates">List of <see cref="System.DateTime"/> objects</param>
        public CalendarSelectionSettingsBuilder Dates(IList<DateTime> dates)
        {
            settings.Dates = dates;

            return this;
        }

        /// <summary>
        /// Sets the action to which the date should navigate
        /// </summary>
        /// <param name="routeValues">The route values of the Action method.</param>
        public CalendarSelectionSettingsBuilder Action(RouteValueDictionary routeValues)
        {
            settings.Action(routeValues);

            return this;
        }

        /// <summary>
        /// Sets the action to which the item should navigate
        /// </summary>
        /// <param name="action">Name of the action.</param>
        /// <param name="controller">Name of the controller.</param>
        /// <param name="values">The route values.</param>
        public CalendarSelectionSettingsBuilder Action(string action, string controller, object values)
        {
            settings.ActionName = action;
            settings.ControllerName = controller;
            settings.RouteValues = new RouteValueDictionary(values);

            return this;
        }
    }
}
