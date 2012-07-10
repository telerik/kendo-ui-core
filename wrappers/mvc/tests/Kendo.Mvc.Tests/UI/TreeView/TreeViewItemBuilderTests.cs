namespace Kendo.Mvc.Tests.Menu
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
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
