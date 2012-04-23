// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using System.IO;
    using System.Web.UI;

    using Infrastructure;

    using Moq;
    using Xunit;

    public class TreeViewHtmlBuilderTests
    {
        private TreeView treeView;
        private TreeViewItem item;
        private Mock<HtmlTextWriter> writer;
        private TreeViewHtmlBuilder renderer;

        public TreeViewHtmlBuilderTests()
        {
            writer = new Mock<HtmlTextWriter>(TextWriter.Null);

            treeView = TreeViewTestHelper.CreateTreeView(writer.Object, null, null);
            treeView.Name = "TreeView1";

            treeView.Items.Add(new TreeViewItem());
            treeView.Items.Add(new TreeViewItem());
            treeView.Items.Add(new TreeViewItem());

            item = new TreeViewItem();

            renderer = new TreeViewHtmlBuilder(treeView, new Mock<IActionMethodCache>().Object);
        }

        [Fact]
        public void TreeViewStart_should_output_start_tag()
        {
            IHtmlNode tag = renderer.TreeViewTag();

            Assert.Equal("div", tag.TagName);
        }

        [Fact]
        public void TreeViewStart_should_render_id()
        {
            IHtmlNode tag = renderer.TreeViewTag();
            Assert.Equal(treeView.Id, tag.Attribute("id"));
        }

        [Fact]
        public void TreeViewStart_should_render_class()
        {
            IHtmlNode tag = renderer.TreeViewTag();

            Assert.Equal("t-widget t-treeview t-reset", tag.Attribute("class"));
        }

        [Fact]
        public void TreeViewStart_should_render_ul_start_tag_and_class()
        {
            IHtmlNode tag = renderer.TreeViewTag().Children[0];
            Assert.Equal("ul", tag.TagName);
            Assert.Equal("t-group t-treeview-lines", tag.Attribute("class"));
        }

        [Fact]
        public void TreeViewStart_should_not_render_treeview_lines_class_if_they_are_disabled()
        {
            treeView.ShowLines = false;

            IHtmlNode tag = renderer.TreeViewTag().Children[0];
            Assert.Equal("ul", tag.TagName);
            Assert.Equal("t-group", tag.Attribute("class"));
        }

        [Fact]
        public void Should_append_custom_class()
        {
            item.HtmlAttributes["class"] = "custom";
            IHtmlNode node = renderer.ItemTag(item, false);

            Assert.Equal("t-item t-first t-last custom", node.Attribute("class"));
        }

        [Fact]
        public void Should_append_first_class_if_first_item_and_parent_is_null()
        {
            IHtmlNode node = renderer.ItemTag(treeView.Items[0], false);

            Assert.Equal("t-item t-first", node.Attribute("class"));
        }

        [Fact]
        public void Should_append_last_class_if_last_item()
        {
            item.Parent = new TreeViewItem();
            IHtmlNode node = renderer.ItemTag(item, false);

            Assert.Equal("t-item t-last", node.Attribute("class"));
        }

        [Fact]
        public void Should_output_child_ul()
        {
            IHtmlNode tag = renderer.ChildrenTag(item);

            Assert.Equal("ul", tag.TagName);
            Assert.Equal("t-group", tag.Attribute("class"));
        }

        [Fact]
        public void ListGroupStart_should_hide_group_if_expanded_property_is_false()
        {
            item.Url = "#";
            item.Text = "treeViewItem1";
            item.Enabled = true;
            item.Expanded = false;

            item.Items.Add(new TreeViewItem { Text = "subItem", Enabled = true });

            IHtmlNode tag = renderer.ChildrenTag(item);
            Assert.Equal("display:none", tag.Attribute("style"));
        }

        [Fact]
        public void Should_render_li_for_item()
        {
            IHtmlNode tag = renderer.ItemTag(item, false);

            Assert.Equal("li", tag.TagName);
        }

        [Fact]
		public void Should_render_selected_class_if_it_is_enabled_and_item_is_selected()
		{
            item.Enabled = true;
            item.Selected = true;

            IHtmlNode tag = renderer.ItemInnerContent(item);

            Assert.Equal("t-in t-state-selected", tag.Attribute("class"));
		}

        [Fact]
        public void Should_render_disabled_state()
        {
            item.Text = "text";
            item.Enabled = false;

            IHtmlNode tag = renderer.ItemInnerContent(item);

            Assert.Equal("t-in t-state-disabled", tag.Attribute("class"));
        }

        [Fact]
        public void Should_render_span_for_item_if_no_url()
        {
            item.Text = "text";
            item.Enabled = true;

            IHtmlNode tag = renderer.ItemInnerContent(item);

            Assert.Equal("t-in", tag.Attribute("class"));
            Assert.Equal("span", tag.TagName);
            Assert.Equal("text", tag.Children[0].InnerHtml);
        }

        [Fact]
        public void Should_render_link_for_item()
        {
            item.Url = "#";
            item.Text = "text";
            item.Enabled = true;

            IHtmlNode tag = renderer.ItemInnerContent(item);

            Assert.Equal("t-link t-in", tag.Attribute("class"));
            Assert.Equal("#", tag.Attribute("href"));
            Assert.Equal("a", tag.TagName);
            Assert.Equal("text", tag.Children[0].InnerHtml);
        }

        [Fact]
        public void Should_render_expand_icon_if_any_items()
        {
            item.Enabled = true;
            item.Expanded = false;

            item.Items.Add(new TreeViewItem { Text = "subItem", Enabled = true });

            IHtmlNode tag = renderer.ItemTag(item, true /*there are items*/).Children[0].Children[0];

            Assert.Equal("span", tag.TagName);
            Assert.Equal("t-icon t-plus", tag.Attribute("class"));
        }

        [Fact]
        public void Should_render_disabled_arrow_when_disabled()
        {
            item.Enabled = false;

            item.Items.Add(new TreeViewItem { Text = "subItem", Enabled = true });

            IHtmlNode tag = renderer.ItemTag(item, true /*there are items*/).Children[0].Children[0];

            Assert.Equal("t-icon t-plus-disabled", tag.Attribute("class"));
        }

        [Fact]
        public void Should_render_collaspe_icon()
        {
            item.Enabled = true;
            item.Expanded = true;

            item.Items.Add(new TreeViewItem { Text = "subItem", Enabled = true });

            IHtmlNode tag = renderer.ItemTag(item, true /*there are items*/).Children[0].Children[0];

            Assert.Equal("span", tag.TagName);
            Assert.Equal("t-icon t-minus", tag.Attribute("class"));
        }

        [Fact]
        public void Should_not_render_expand_icon_if_no_children()
        {
            item.Enabled = true;
            item.Expanded = true;

            IHtmlNode tag = renderer.ItemTag(item, false).Children[0];

            Assert.Equal(0, tag.Children.Count);
        }

        [Fact]
        public void Should_not_render_href_when_item_is_disabled()
        {
            item.Url = "#";
            item.Enabled = false;

            IHtmlNode tag = renderer.ItemInnerContent(item);
            Assert.False(tag.Attributes().ContainsKey("href"));
        }

        [Fact]
        public void Should_apply_link_html_attributes()
        {
            item.Url = "#";
            item.LinkHtmlAttributes["class"] = "custom";
            item.LinkHtmlAttributes["href"] = "overriden";

            IHtmlNode tag = renderer.ItemInnerContent(item);

            Assert.Equal("t-link t-in custom", tag.Attribute("class"));
            Assert.Equal("overriden", tag.Attribute("href"));
        }
        
        [Fact]
        public void Should_output_image()
        {
            item.ImageUrl = "#";

            IHtmlNode tag = renderer.ItemInnerContent(item);
            Assert.Equal("img", tag.Children[0].TagName);
            Assert.Equal("#", tag.Children[0].Attribute("src"));
        }

        [Fact]
        public void Should_output_sprite()
        {
            item.SpriteCssClasses = "sprite";
            item.Text = "text";

            IHtmlNode tag = renderer.ItemInnerContent(item);

            Assert.Equal("span", tag.Children[0].TagName);
            Assert.Equal("text", tag.Children[1].InnerHtml);

            Assert.Equal("t-sprite sprite", tag.Children[0].Attribute("class"));
        }

        [Fact]
        public void Should_output_hidden_field_with_value()
        {
            const string value = "fakeValue";
            item.Value = value;

            IHtmlNode tag = renderer.ItemHiddenInputValue(item);
            Assert.Equal("input", tag.TagName);
            Assert.Equal("hidden", tag.Attribute("type"));
            Assert.Equal("itemValue", tag.Attribute("name"));
            Assert.Equal(value, tag.Attribute("value"));
        }

        public void ItemTag_should_render_disabled_checkbox_if_item_is_disabled() 
        {
            treeView.ShowCheckBox = true;
            item.Checkable = true;
            item.Enabled = false;
            
            IHtmlNode tag = renderer.ItemTag(item, false);
            IHtmlNode checkbox = tag.Children[0].Children[0].Children[1];

            Assert.Equal("input", checkbox.TagName);
            Assert.Equal("checkbox", checkbox.Attribute("type"));
            Assert.Equal("disabled", checkbox.Attribute("disabled"));
        }
    }
}
