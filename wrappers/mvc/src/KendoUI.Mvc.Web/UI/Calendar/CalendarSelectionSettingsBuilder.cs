// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using System.Web.Routing;
    
    using Infrastructure;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="Calendar.CalendarSelectionSettings"/>.
    /// </summary>
    public class CalendarSelectionSettingsBuilder : IHideObjectMembers
    {
        private CalendarSelectionSettings settings;
        private ViewContext viewContext;

        /// <summary>
        /// Initializes a new instance of the <see cref="CalendarSelectionSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The selection settings.</param>
        /// <param name="viewContext">The view context.</param>
        public CalendarSelectionSettingsBuilder(CalendarSelectionSettings settings, ViewContext viewContext)
        {
            this.viewContext = viewContext;
            this.settings = settings;
        }

        /// <summary>
        /// Defines list of dates. This list determines which dates to be rendered with action link.
        /// </summary>
        /// <param name="dates">List of <see cref="System.DateTime"/> objects</param>
        public CalendarSelectionSettingsBuilder Dates(IList<DateTime> dates)
        {
            Guard.IsNotNull(dates, "dates");

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
        /// Sets the action to which the date should navigate
        /// </summary>
        /// <param name="action">Name of the action.</param>
        /// <param name="values">The route values.</param>
        public CalendarSelectionSettingsBuilder Action(string action, object values)
        {
            Guard.IsNotNullOrEmpty(action, "action");
            Guard.IsNotNull(values, "values");
            
            settings.ActionName = action;
            settings.ControllerName = viewContext.Controller.GetType().Name.Replace("Controller", "");
            settings.RouteValues = new RouteValueDictionary(values);
            
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
            Guard.IsNotNullOrEmpty(action, "action");
            Guard.IsNotNullOrEmpty(controller, "controller");
            Guard.IsNotNull(values, "values");

            settings.ActionName = action;
            settings.ControllerName = controller;
            settings.RouteValues = new RouteValueDictionary(values);

            return this;
        }
    }
}
