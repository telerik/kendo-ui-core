namespace Telerik.Web.Mvc.UI.Fluent
{
    using System.Web.Routing;
    using Xunit;

    public class TreeViewBindingSettingsBuilderBuilderTests
    {
        private TreeViewBindingSettings settings;
        private TreeViewBindingSettingsBuilder builder;

        public TreeViewBindingSettingsBuilderBuilderTests()
        {
            settings = new TreeViewBindingSettings();
            builder = new TreeViewBindingSettingsBuilder(settings);
        }

        [Fact]
        public void Enabled_sets_the_enabled_property()
        {
            builder.Enabled(true);

            Assert.True(settings.Enabled);
        }

        [Fact]
        public void Select_should_be_able_to_set_controller_name_and_action_name()
        {
            builder.Select("Index", "Home");

            Assert.Equal("Home", settings.Select.ControllerName);
            Assert.Equal("Index", settings.Select.ActionName);
        }

        [Fact]
        public void Select_should_be_able_to_set_controller_name_and_route_values_from_routeValues()
        {
            RouteValueDictionary routeValues = new RouteValueDictionary();
            routeValues.Add("action", "Index");
            routeValues.Add("controller", "Home");
            routeValues.Add("test", "test");

            builder.Select(routeValues);

            Assert.Equal("Home", settings.Select.ControllerName);
            Assert.Equal("Index", settings.Select.ActionName);
            Assert.Equal("test", settings.Select.RouteValues["test"]);
        }

        [Fact]
        public void Select_should_be_able_to_set_controller_name_and_route_values()
        {
            RouteValueDictionary routeValues = new RouteValueDictionary();
            routeValues.Add("test", "test");
            builder.Select("Index", "Home", routeValues);

            Assert.Equal("Home", settings.Select.ControllerName);
            Assert.Equal("Index", settings.Select.ActionName);
            Assert.Equal("test", settings.Select.RouteValues["test"]);
        }

        [Fact]
        public void Select_should_be_able_to_set_controller_name_and_route_values__from_object()
        {
            builder.Select("Index", "Home", new { test = "test" });

            Assert.Equal("Home", settings.Select.ControllerName);
            Assert.Equal("Index", settings.Select.ActionName);
            Assert.Equal("test", settings.Select.RouteValues["test"]);
        }

        [Fact]
        public void Select_should_be_able_to_set_route_name_and_values()
        {
            RouteValueDictionary routeValues = new RouteValueDictionary();
            routeValues.Add("test", "test");
            builder.Select("Home", routeValues);

            Assert.Equal("Home", settings.Select.RouteName);
            Assert.Equal("test", settings.Select.RouteValues["test"]);
        }

        [Fact]
        public void Select_should_be_able_to_set_route_name_and_values_from_object()
        {
            builder.Select("Home", new { test = "test" });

            Assert.Equal("Home", settings.Select.RouteName);
            Assert.Equal("test", settings.Select.RouteValues["test"]);
        }

        [Fact]
        public void Select_should_be_able_to_set_route_name()
        {
            builder.Select("Home");

            Assert.Equal("Home", settings.Select.RouteName);
        }
    }
}
