
namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using Xunit;
    
    public class MenuSettingsVerificationTests
    {
        private readonly Menu menu;
        
        public MenuSettingsVerificationTests()
        {
            menu = MenuTestHelper.CreateMenu();
            menu.Name = "Menu";
        }

        [Fact]
        public void Should_throw_if_t_menu_rtl_class_is_set()
        {
            menu.HtmlAttributes["class"] = "t-menu-rtl";

            Assert.Throws<NotSupportedException>(() => menu.VerifySettings());
        }
    }
}
