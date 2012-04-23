namespace Telerik.Web.Mvc.UI.Tests
{
    using System.Web.Mvc;
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;

    public class TreeViewItemFactoryTests
    {
        private readonly TreeViewItemFactory factory;
        private TreeViewItem item;

        public TreeViewItemFactoryTests()
        {
            ViewContext viewContext = TestHelper.CreateViewContext();

            item = new TreeViewItem();
            factory = new TreeViewItemFactory(item, viewContext);
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
