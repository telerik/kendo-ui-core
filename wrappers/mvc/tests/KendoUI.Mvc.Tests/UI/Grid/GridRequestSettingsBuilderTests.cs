namespace Telerik.Web.Mvc.UI.Tests
{
    using System.Web.Routing;
    using Fluent;
    using Xunit;

    public class GridRequestSettingsBuilderTests
    {
        private GridRequestSettingsBuilder builder;
        private RequestSettings settings;

        public GridRequestSettingsBuilderTests()
        {
            settings = new RequestSettings();
            builder = new GridRequestSettingsBuilder(settings);
        }

        [Fact]
        public void Action_should_be_able_to_set_controller_name_and_action_name()
        {
            builder.Action("Index", "Home");

            Assert.Equal("Home", settings.ControllerName);
            Assert.Equal("Index", settings.ActionName);
        }

        [Fact]
        public void Action_should_be_able_to_set_controller_name_and_route_values_from_routeValues()
        {
            RouteValueDictionary routeValues = new RouteValueDictionary();
            routeValues.Add("action", "Index");
            routeValues.Add("controller", "Home");
            routeValues.Add("test", "test");

            builder.Action(routeValues);

            Assert.Equal("Home", settings.ControllerName);
            Assert.Equal("Index", settings.ActionName);
            Assert.Equal("test", settings.RouteValues["test"]);
        }

        [Fact]
        public void Action_should_be_able_to_set_controller_name_and_route_values()
        {
            RouteValueDictionary routeValues = new RouteValueDictionary();
            routeValues.Add("test", "test");
            builder.Action("Index", "Home", routeValues);

            Assert.Equal("Home", settings.ControllerName);
            Assert.Equal("Index", settings.ActionName);
            Assert.Equal("test", settings.RouteValues["test"]);
        }

        [Fact]
        public void Action_should_be_able_to_set_controller_name_and_route_values__from_object()
        {
            builder.Action("Index", "Home", new { test = "test" });

            Assert.Equal("Home", settings.ControllerName);
            Assert.Equal("Index", settings.ActionName);
            Assert.Equal("test", settings.RouteValues["test"]);
        }

        [Fact]
        public void Route_should_be_able_to_set_route_name_and_values()
        {
            RouteValueDictionary routeValues = new RouteValueDictionary();
            routeValues.Add("test", "test");
            builder.Route("Home", routeValues);

            Assert.Equal("Home", settings.RouteName);
            Assert.Equal("test", settings.RouteValues["test"]);
        }

        [Fact]
        public void Route_should_be_able_to_set_route_name_and_values_from_object()
        {
            builder.Route("Home", new { test = "test" });

            Assert.Equal("Home", settings.RouteName);
            Assert.Equal("test", settings.RouteValues["test"]);
        }

        [Fact]
        public void Route_should_be_able_to_set_route_name()
        {
            builder.Route("Home");

            Assert.Equal("Home", settings.RouteName);
        }
    }
}
