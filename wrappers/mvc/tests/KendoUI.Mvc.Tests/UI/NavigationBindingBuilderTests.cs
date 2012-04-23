namespace Telerik.Web.Mvc.UI.Tests
{
    using Xunit;

    public class NavigationBindingBuilderTests
    {
        private readonly NavigationItemTestDouble item;
        private readonly NavigationBindingTestDouble bindingItem;
        private readonly NavigationBindingBuilderTestsDouble builder;

        public NavigationBindingBuilderTests()
        {
            item = new NavigationItemTestDouble();
            bindingItem = new NavigationBindingTestDouble();
            builder = new NavigationBindingBuilderTestsDouble(bindingItem);
        }

        [Fact]
        public void Children_should_set_bindingItem_children_property() 
        {
            builder.Children(o => o.childObjects);

            Assert.NotNull(bindingItem.Children);
        }

        [Fact]
        public void Children_returns_builder()
        {
            var returnedBuilder = builder.Children(o => o.childObjects);

            Assert.IsType(typeof(NavigationBindingBuilderTestsDouble), returnedBuilder);
        }

        [Fact]
        public void ItemDataBound_should_set_bindingItem_children_property()
        {
            builder.ItemDataBound((i, o) => i.Text = o.Text);

            Assert.NotNull(bindingItem.ItemDataBound);
        }

        [Fact]
        public void ItemDataBound_returns_builder()
        {
            var returnedBuilder = builder.ItemDataBound((i,o) => i.Text = o.Text);

            Assert.IsType(typeof(NavigationBindingBuilderTestsDouble), returnedBuilder);
        }
    }

    public class NavigationBindingBuilderTestsDouble : NavigationBindingBuilder<NavigationItemTestDouble, TestObject> 
    {
        public NavigationBindingBuilderTestsDouble(NavigationBindingTestDouble binding) : base(binding)
        { }
    }
}
