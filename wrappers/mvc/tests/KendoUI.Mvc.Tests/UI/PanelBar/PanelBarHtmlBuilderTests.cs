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

    public class PanelBarHtmlBuilderTests
    {
        private PanelBar panelBar;
        private PanelBarItem item;
        private Mock<HtmlTextWriter> writer;
        private PanelBarHtmlBuilder renderer;

        public PanelBarHtmlBuilderTests()
        {
            writer = new Mock<HtmlTextWriter>(TextWriter.Null);

            panelBar = PanelBarTestHelper.CreatePanelbar(writer.Object, null);
            panelBar.Name = "PanelBar1";

            item = new PanelBarItem();

            renderer = new PanelBarHtmlBuilder(panelBar, new Mock<IActionMethodCache>().Object);
        }

        [Fact]
        public void PanelBarStart_should_render_ul()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal("ul", tag.TagName);
        }

        [Fact]
        public void PanelBarStart_should_render_id()
        {
            IHtmlNode tag = renderer.Build();
            Assert.Equal(panelBar.Id, tag.Attribute("id"));
        }

        [Fact]
        public void Should_append_custom_class()
        {
            item.HtmlAttributes["class"] = "custom";
            IHtmlNode node = renderer.ItemTag(item);

            Assert.Equal("t-item t-state-default custom", node.Attribute("class"));
        }

        [Fact]
        public void PanelBarStart_should_render_class()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal("t-widget t-panelbar t-reset", tag.Attribute("class"));
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
            item.Text = "panelBarItem1";
            item.Enabled = true;
            item.Expanded = false;

            item.Items.Add(new PanelBarItem { Text = "subItem", Enabled = true });

            IHtmlNode tag = renderer.ChildrenTag(item);
            Assert.Equal("display:none", tag.Attribute("style"));
        }

        [Fact]
        public void Should_render_li_for_item()
        {
            IHtmlNode tag = renderer.ItemTag(item);

            Assert.Equal("li", tag.TagName);
        }

        [Fact]
        public void Should_render_header_class_if_is_enabled_and_not_selected()
        {
            item.Enabled = true;
            item.Selected = false;

            IHtmlNode tag = renderer.ItemTag(item);
            
            Assert.Equal("t-item t-state-default", tag.Attribute("class"));
		}

		[Fact]
		public void Should_render_selected_class_if_item_is_selected()
		{
            item.Items.Clear();
            item.Items.Add(new PanelBarItem
            {
                Selected = true
            });

            IHtmlNode tag = renderer.ItemInnerContentTag(item.Items[0], false);

            Assert.Equal("t-link t-state-selected", tag.Attribute("class"));
		}

        [Fact]
        public void Should_render_header_class()
        {
            IHtmlNode tag = renderer.ItemInnerContentTag(item, false);

            Assert.Equal("t-link t-header", tag.Attribute("class"));
        }

        [Fact]
        public void Should_render_item_in_active_state_if_it_is_enabled_and_expanded()
        {
            item.Enabled = true;
			item.Expanded = true;

            IHtmlNode tag = renderer.ItemTag(item);

            Assert.Equal("t-item t-state-active", tag.Attribute("class"));
        }

        [Fact]
        public void Should_render_disabled_state()
        {
            item.Enabled = false;
			item.Expanded = false;

            IHtmlNode tag = renderer.ItemTag(item);

            Assert.Equal("t-item t-state-disabled", tag.Attribute("class"));
        }

        [Fact]
        public void Should_render_link_for_item()
        {
            item.Url = "http://www.google.com/";
            item.Text = "text";
            item.Enabled = true;

            IHtmlNode tag = renderer.ItemInnerContentTag(item, false);

            Assert.Equal("t-link t-header", tag.Attribute("class"));
            Assert.Equal("http://www.google.com/", tag.Attribute("href"));
            Assert.Equal("a", tag.TagName);
            Assert.Equal("text", tag.Children[0].InnerHtml);
        }

        [Fact]
        public void Should_render_expand_arrow_if_any_children()
        {
            item.Enabled = true;
            item.Expanded = true;

            item.Items.Add(new PanelBarItem { Text = "subItem", Enabled = true });

            IHtmlNode tag = renderer.ItemInnerContentTag(item, true /*there are children*/).Children[1];

            Assert.Equal("span", tag.TagName);
            Assert.Equal("t-icon t-arrow-up t-panelbar-collapse", tag.Attribute("class"));
        }

        [Fact]
        public void Should_not_render_expand_arrow_if_no_children()
        {
            item.Enabled = true;
            item.Expanded = true;

            IHtmlNode tag = renderer.ItemInnerContentTag(item, false /*there are no children*/);

            Assert.Equal(1, tag.Children.Count);
        }

        [Fact]
        public void Should_render_span_with_collapsed_css_class_if_expanded_property_is_false()
        {
            item.Enabled = true;
            item.Expanded = false;

            item.Items.Add(new PanelBarItem { Text = "subItem", Enabled = true });

            IHtmlNode tag = renderer.ItemInnerContentTag(item, true).Children[1];

            Assert.Equal("t-icon t-arrow-down t-panelbar-expand", tag.Attribute("class"));
        }

        [Fact]
        public void Should_render_href_when_item_is_disabled()
        {
            item.Url = "http://www.microsoft.com/";
            item.Enabled = false;

            IHtmlNode tag = renderer.ItemInnerContentTag(item, false);
            Assert.True(tag.Attributes().ContainsKey("href"));
        }

        [Fact]
        public void Should_render_span_if_content_is_set_and_items_are_0_or_contentUrl_is_empty()
        {
            item.Items.Clear();

            item.Content = () => { };

            IHtmlNode tag = renderer.ItemInnerContentTag(item, false).Children[1];

            Assert.Equal("span", tag.TagName);
        }

        [Fact]
        public void ItemContent_should_render_span_if_contentUrl_is_set_and_items_are_0_or_content_is_null()
        {
            item.Items.Clear();

            item.ContentUrl = "testUrl";

            IHtmlNode tag = renderer.ItemInnerContentTag(item, false).Children[1];

            Assert.Equal("span", tag.TagName);
        }

        [Fact]
        public void Should_render_content_css_class_and_id_attr()
        {
            item.ContentUrl = "url";
            item.Content = () => { };

            IHtmlNode tag = renderer.ItemContentTag(item);
            
            Assert.Contains(UIPrimitives.Content, tag.Attribute("class"));
            Assert.NotNull(tag.Attribute("id"));
        }

        [Fact]
        public void Should_apply_content_html_attributes()
        {
            item.ContentUrl = "url";
            item.ContentHtmlAttributes["class"] = "custom";
 
            IHtmlNode tag = renderer.ItemContentTag(item);

            Assert.Contains(UIPrimitives.Content + " custom", tag.Attribute("class"));
        }

        [Fact]
        public void Should_apply_link_html_attributes()
        {
            item.Url = "#";
            item.LinkHtmlAttributes["class"] = "custom";
            item.LinkHtmlAttributes["href"] = "overriden";

            IHtmlNode tag = renderer.ItemInnerContentTag(item, false);

            Assert.Equal("t-link t-header custom", tag.Attribute("class"));
            Assert.Equal("overriden", tag.Attribute("href"));
        }
        [Fact]
        public void Should_render_start_div_tag()
        {
            item.ContentUrl = "url";
            item.Content = () => { };

            IHtmlNode tag = renderer.ItemContentTag(item);
            Assert.Equal("div", tag.TagName);
        }

        [Fact]
        public void Should_hide_content_if_expanded_property_is_false()
        {
            item.Content = () => { };
            item.Expanded = false;
            item.Enabled = true;

            IHtmlNode tag = renderer.ItemContentTag(item);

            Assert.Contains("display:none", tag.Attribute("style"));
        }

        [Fact]
        public void Should_hide_content_if_enabled_property_is_false()
        {
            item.Content = () => { };
            item.Expanded = true;
            item.Enabled = false;

            IHtmlNode tag = renderer.ItemContentTag(item);

            Assert.Contains("display:none", tag.Attribute("style"));
        }

        [Fact]
        public void Should_output_image()
        {
            item.ImageUrl = "#";

            IHtmlNode tag = renderer.ItemInnerContentTag(item, false).Children[0];
            Assert.Equal("img", tag.TagName);
            Assert.Equal("#", tag.Attribute("src"));
        }

        [Fact]
        public void Should_output_sprite()
        {
            item.SpriteCssClasses = "sprite";
            item.Text = "text";

            IHtmlNode tag = renderer.ItemInnerContentTag(item, false);

            Assert.Equal("text", tag.Children[1].InnerHtml);
            Assert.Equal("span", tag.Children[0].TagName);
            Assert.Equal("t-sprite sprite", tag.Children[0].Attribute("class"));
        }

        [Fact]
        public void Should_render_down_arrow_when_disabled_and_there_are_children() 
        {
            item.Enabled = false;
            item.ContentUrl = "#";

            IHtmlNode tag = renderer.ItemInnerContentTag(item, true).Children[1];
            Assert.Equal("t-icon t-arrow-down t-panelbar-expand", tag.Attribute("class"));
        }
    }
}
