namespace Telerik.Web.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.UI;
    using Xunit;

    public class NavigationItemTests
    {
        NavigationItemTestDouble item;

        public NavigationItemTests()
        {
            item = new NavigationItemTestDouble();
        }

        [Fact]
        public void Setting_RouteName_should_reset_controllerName_actionName_url()
        {
            const string routeName = "Default";

            item.RouteName = routeName;
            Assert.Null(item.ControllerName);
            Assert.Null(item.ActionName);
            Assert.Null(item.Url);
        }

        [Fact]
        public void Setting_ControllerName_should_reset_routeName_url()
        {
            const string controllerName = "Home";

            item.ControllerName = controllerName;
            Assert.Null(item.RouteName);
            Assert.Null(item.Url);
        }

        [Fact]
        public void Setting_ActionName_should_reset_routeName_actionName_url()
        {
            const string actionName = "Home";

            item.ActionName = actionName;
            Assert.Null(item.RouteName);
            Assert.Null(item.Url);
        }

        [Fact]
        public void Setting_Url_should_reset_controllerName_actionName_routeName()
        {
            const string url = "url";

            item.Url = url;
            Assert.Null(item.ControllerName);
            Assert.Null(item.ActionName);
            Assert.Null(item.RouteName);
        }
    }

    public class NavigationItemTestDouble : NavigationItem<NavigationItemTestDouble>, INavigationItemContainer<NavigationItemTestDouble>
    {
        public NavigationItemTestDouble()
        {
            Items = new LinkedObjectCollection<NavigationItemTestDouble>(this);
        }

        public IList<NavigationItemTestDouble> Items
        {
            get;
            set;
        }

    }
}
