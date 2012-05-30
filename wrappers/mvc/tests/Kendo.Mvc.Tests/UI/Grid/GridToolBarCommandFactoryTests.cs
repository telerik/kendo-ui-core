namespace Kendo.Mvc.UI.Tests.Grid
{
    using System;
    using Fluent;
    using Xunit;

    public class GridToolBarCommandFactoryTests
    {
        private readonly GridToolBarSettings<object> toolBarSettings;
        private readonly GridToolBarCommandFactory<object> factory;

        public GridToolBarCommandFactoryTests()
        {
            toolBarSettings = new GridToolBarSettings<object>(GridTestHelper.CreateGrid<object>());
            factory = new GridToolBarCommandFactory<object>(toolBarSettings);
        }       

        [Fact]
        public void Should_set_template_of_toolbar_settings_using_action()
        {
            Action expectedTemplate = () => { };

            factory.Template(expectedTemplate);
            var inlineTemplate = toolBarSettings.Template.Content;

            inlineTemplate.ShouldEqual(expectedTemplate);
        }

        [Fact]
        public void Should_set_template_of_toolbar_settings_using_string()
        {
            const string expectedHtml = "text";
            factory.Template(expectedHtml);
            var templateHtml = toolBarSettings.Template.Html;

            templateHtml.ShouldEqual(expectedHtml);
        }
    }
}