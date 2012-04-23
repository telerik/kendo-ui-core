namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Xunit;
    using System.Web.Routing;

    public class CalendarSelectionSettingsBuilderTests
    {
        private CalendarSelectionSettingsBuilder builder;
        private CalendarSelectionSettings settings;
        private ViewContext viewContext;

        public CalendarSelectionSettingsBuilderTests()
        {
            settings = new CalendarSelectionSettings();
            settings.RouteValues = new RouteValueDictionary();
            viewContext = TestHelper.CreateViewContext();
            builder = new CalendarSelectionSettingsBuilder(settings, viewContext);
        }

        [Fact]
        public void Dates_should_set_IEnumerable_collection_property_of_selection_settings() 
        {
            IList<DateTime> dates = new List<DateTime>{ DateTime.Now };
            builder.Dates(dates);

            Assert.NotNull(settings.Dates);
        }

        [Fact]
        public void Dates_should_return_builder()
        {
            IList<DateTime> dates = new List<DateTime> { DateTime.Now };

            Assert.IsType(typeof(CalendarSelectionSettingsBuilder), builder.Dates(dates));
        }

        [Fact]
        public void Action_method_with_RouteValueDinctionary_populated_from_MVCT4_templates_should_set_controller_action_and_routevalues()
        {
            const string actionName = "Index";
            const string controllerName = "Home";

            RouteValueDictionary values = new RouteValueDictionary();
            values.Add("action", actionName);
            values.Add("controller", controllerName);
            values.Add("id", 1);
            values.Add("test", "test");

            builder.Action(values);

            Assert.Equal(actionName, settings.ActionName);
            Assert.Equal(controllerName, settings.ControllerName);
            Assert.Equal(1, settings.RouteValues["id"]);
            Assert.Equal("test", settings.RouteValues["test"]);
        }

        [Fact]
        public void Action_method_with_RouteValueDinctionary_should_populate_action_and_controller_name_if_no_routeValues_is_presented_in_the_argument_dictionary()
        {
            const string actionName = "Index";
            const string controllerName = "Home";

            RouteValueDictionary values = new RouteValueDictionary();
            values.Add("action", actionName);
            values.Add("controller", controllerName);

            builder.Action(values);

            Assert.Equal(actionName, settings.ActionName);
            Assert.Equal(controllerName, settings.ControllerName);
            Assert.Equal(0, settings.RouteValues.Count);
        }

        [Fact]
        public void Action_should_set_action_and_route_Values()
        {
            string actionName = "Index";
            object routeValue = new { date = DateTime.Today.ToShortDateString() };

            builder.Action(actionName, routeValue);

            Assert.False(string.IsNullOrEmpty(settings.ActionName));
            Assert.NotNull(settings.RouteValues);
        }

        [Fact]
        public void Action_with_two_params_should_return_builder()
        {
            string actionName = "Index";
            object routeValue = new { date = DateTime.Today.ToShortDateString() };
            
            Assert.IsType(typeof(CalendarSelectionSettingsBuilder),  builder.Action(actionName, routeValue));
        }

        [Fact]
        public void Action_without_controller_param_should_set_default_controller_name() 
        {
            string controllerName = viewContext.Controller.GetType().Name.Replace("Controller", "");

            builder.Action("Index", new { });

            Assert.Equal(controllerName, settings.ControllerName);
        }

        [Fact]
        public void Action_should_set_action_and_controller_and_route_Values()
        {
            string actionName = "Index";
            string controllerName = "Home";
            object routeValue = new { date = DateTime.Today.ToShortDateString() };

            builder.Action(actionName, controllerName, routeValue);

            Assert.False(string.IsNullOrEmpty(settings.ActionName));
            Assert.False(string.IsNullOrEmpty(settings.ControllerName));
            Assert.NotNull(settings.RouteValues);
        }

        [Fact]
        public void Action_with_3_params_should_return_builder()
        {
            string actionName = "Index";
            string controllerName = "Home";
            object routeValue = new { date = DateTime.Today.ToShortDateString() };

            Assert.IsType(typeof(CalendarSelectionSettingsBuilder), builder.Action(actionName, controllerName, routeValue));
        }
    }
}
