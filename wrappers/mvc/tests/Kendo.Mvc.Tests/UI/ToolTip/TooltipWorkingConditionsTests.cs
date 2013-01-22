namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using System.IO;
    using Xunit;
    using System;

    public class TooltipWorkingConditionsTests
    {
        private readonly Tooltip tooltip;

        public TooltipWorkingConditionsTests()
        {            
            tooltip = TooltipTestHelper.CreateTooltip();
            tooltip.Container = "#Tooltip";
        }

        [Fact]
        public void Does_not_throw_if_name_is_not_set()
        {
            
            Assert.DoesNotThrow(() => tooltip.VerifySettings());   
        }

        [Fact]
        public void Throws_if_container_is_not_set()
        {
            tooltip.Container = "";
            Assert.Throws<InvalidOperationException>(() => tooltip.VerifySettings());
        }
    }
}
