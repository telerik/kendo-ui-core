namespace Telerik.Web.Mvc.Tests.TabStrip
{
    using Telerik.Web.Mvc.UI;
    using Xunit;

    public class TabStripItemTests
    {
        private readonly TabStripItem _tabStripItem;

        public TabStripItemTests()
        {
            _tabStripItem = new TabStripItem();
        }

        [Fact]
        public void HtmlAttributes_should_be_empty_when_new_instance_is_created()
        {
            Assert.Empty(_tabStripItem.HtmlAttributes);
        }

        [Fact]
        public void Should_be_able_to_set_selected()
        {
            _tabStripItem.Selected = true;

            Assert.True(_tabStripItem.Selected);
        }

        [Fact]
        public void Selected_should_reset_enable_to_true()
        {
            _tabStripItem.Enabled = false;

            _tabStripItem.Selected = true;

            Assert.True(_tabStripItem.Enabled);
        }

        [Fact]
        public void Should_be_able_to_set_enabled()
        {
            _tabStripItem.Enabled = true;

            Assert.True(_tabStripItem.Enabled);
        }

        [Fact]
        public void Disabled_should_reset_selected_to_false()
        {
            _tabStripItem.Selected = true;

            _tabStripItem.Enabled = false;

            Assert.False(_tabStripItem.Selected);
        }
    }
}