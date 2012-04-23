namespace Telerik.Web.Mvc.Tests.Menu
{
    using Telerik.Web.Mvc.UI;
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;

    public class TreeViewItemBuilderTests
    {
        private readonly TreeViewItem item;
        private readonly TreeViewItemBuilder builder;

        public TreeViewItemBuilderTests()
        {
            var viewContext = TestHelper.CreateViewContext();

            item = new TreeViewItem();
            builder = new TreeViewItemBuilder(item, viewContext);
        }

        [Fact]
        public void Builder_should_set_expanded_property()
        {
            builder.Expanded(true);
            Assert.Equal(true, item.Expanded);
        }

        [Fact]
        public void Builder_should_set_value_property()
        {
            builder.Value("test");
            Assert.Equal("test", item.Value);
        }

        [Fact]
        public void Builder_should_set_checked_property()
        {
            builder.Checked(true);
            Assert.Equal(true, item.Checked);
        }

        [Fact]
        public void Builder_should_set_load_on_demand_property()
        {
            builder.LoadOnDemand(true);
            Assert.Equal(true, item.LoadOnDemand);
        }

        [Fact]
        public void Expanded_should_return_TreeViewItemBuilder_object()
        {
            var returnedBuilder = builder.Expanded(true);
            Assert.IsType(typeof(TreeViewItemBuilder), returnedBuilder);
        }

        [Fact]
        public void ChildItems_should_return_TreViewItemBuilder_object()
        {
            var returnedBuilder = builder.Items(item =>
            {
                item.Add().Text("Child 1");
            });

            Assert.IsType(typeof(TreeViewItemBuilder), returnedBuilder);
        }

        [Fact]
        public void ChildItems_action_should_add_one_item()
        {
            var returnedBuilder = builder.Items(item =>
            {
                item.Add().Text("Child 1");
            });

            var result = ((LinkedObjectCollection<TreeViewItem>)(((returnedBuilder.ToItem())).Items)).Count;
            Assert.Equal(1, result);
        }
    }
}
