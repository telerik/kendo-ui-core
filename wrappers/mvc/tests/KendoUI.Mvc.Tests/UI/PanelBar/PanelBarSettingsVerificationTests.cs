namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using Xunit;
    
    public class PanelBarSettingsVerificationTests
    {
        private readonly PanelBar panelbar;

        public PanelBarSettingsVerificationTests()
        {
            panelbar = PanelBarTestHelper.CreatePanelbar();
            panelbar.Name = "PanelBar";
        }

        [Fact]
        public void Should_throw_if_t_panelbar_rtl_class_is_set()
        {
            panelbar.HtmlAttributes["class"] = "t-panelbar-rtl";

            Assert.Throws<NotSupportedException>(() => panelbar.VerifySettings());
        }
    }
}
