namespace Telerik.Web.Mvc.Tests.TabStrip
{
    using System.Collections.Generic;
    using System.Web.Mvc;
    using Moq;
    using Telerik.Web.Mvc.UI;
    using Xunit;

    public class TabItemFactoryTests
    {
		private readonly Mock<INavigationItemContainer<TabStripItem>> _container;
        private readonly IList<TabStripItem> _items;
        private readonly TabStripItemFactory _factory;

        public TabItemFactoryTests()
        {
            Mock<ViewContext> viewContext = new Mock<ViewContext>();

            _items = new List<TabStripItem>();

			_container = new Mock<INavigationItemContainer<TabStripItem>>();
            _container.SetupGet(container => container.Items).Returns(_items);

            _factory = new TabStripItemFactory(_container.Object, viewContext.Object);
        }

        [Fact]
        public void Add_should_return_new_instance()
        {
            Assert.NotNull(_factory.Add());
        }

        [Fact]
        public void Add_should_register_new_instance_in_container()
        {
            _factory.Add();

            Assert.NotEmpty(_items);
        }
    }
}