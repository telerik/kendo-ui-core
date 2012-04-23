namespace Telerik.Web.Mvc.UI.Tests.Chart
{
    using System.Web.Routing;
    using Telerik.Web.Mvc.UI;
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;

    public class ChartBindingSettingsBuilderTests
    {
        private readonly ChartBindingSettings settings;
        private readonly ChartBindingSettingsBuilder builder;

        public ChartBindingSettingsBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            settings = new ChartBindingSettings(chart);
            builder = new ChartBindingSettingsBuilder(settings);
        }

        [Fact]
        public void Enabled_should_set_enabled()
        {
            builder.Enabled(true);
            settings.Enabled.ShouldBeTrue();
        }

        [Fact]
        public void Select_should_set_actionName_from_routeValues()
        {
            var routeValues = new RouteValueDictionary 
            {
                { "action", "Action" },
                { "controller", "Controller" }
            };

            builder.Select(routeValues);
            settings.Select.ActionName.ShouldEqual("Action");
        }

        [Fact]
        public void Select_should_set_controllerName_from_routeValues()
        {
            var routeValues = new RouteValueDictionary 
            {
                { "action", "Action" },
                { "controller", "Controller" }
            };

            builder.Select(routeValues);
            settings.Select.ControllerName.ShouldEqual("Controller");
        }

        [Fact]
        public void Select_should_set_actionName()
        {
            builder.Select("Action", "Controller");
            settings.Select.ActionName.ShouldBeSameAs("Action");
        }

        [Fact]
        public void Select_should_set_controllerName()
        {
            builder.Select("Controller", "Controller");
            settings.Select.ControllerName.ShouldBeSameAs("Controller");
        }
    }
}
