namespace Telerik.Web.Mvc.UI.Tests
{
    using System.Web.Mvc;
    using Moq;
    using Xunit;

    public class PanelBarItemFactoryTests
    {
        private readonly PanelBarItemFactory factory;
        private PanelBarItem item;

        public PanelBarItemFactoryTests()
        {
            Mock<ViewContext> viewContext = new Mock<ViewContext>();

            item = new PanelBarItem();
            factory = new PanelBarItemFactory(item, viewContext.Object);
        }

        [Fact]
        public void Add_should_add_enabled_item_before_action() 
        {
            factory.Add();
            Assert.True(item.Items[0].Enabled);
        }

        [Fact]
        public void Add_should_return_new_builder_with_new_item()
        {
            var builder = factory.Add();
            Assert.NotNull(builder);
        }
    }
}
