namespace Telerik.Web.Mvc.UI.Tests
{
    using Moq;
    using System;
    using System.IO;
    using Xunit;

    public class GridToolBarSettingsTests
    {
        private readonly GridToolBarSettings<object> toolBarSettings;

        public GridToolBarSettingsTests()
        {
            toolBarSettings = new GridToolBarSettings<object>(GridTestHelper.CreateGrid<object>());
        }

        [Fact]
        public void Enabled_should_return_true_if_commands_are_not_empty()
        {
            toolBarSettings.Commands.Add(new Mock<GridToolBarCommandBase<object>>().Object);
            toolBarSettings.Enabled.ShouldBeTrue();
        }

        [Fact]
        public void Enabled_should_return_true_if_template_is_not_empty()
        {
            toolBarSettings.Template.Content = () => { };
            toolBarSettings.Enabled.ShouldBeTrue();
        }
    }
}
