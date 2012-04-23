// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Tests.Menu
{
    using System.IO;
    using System.Web.UI;
    using Infrastructure;
    using Moq;
    using UI;
    using Xunit;

    public class MenuHtmlBuilderTests
    {
        private Menu menu;
        private MenuItem item;
        private MenuHtmlBuilder builder;

        public MenuHtmlBuilderTests()
        {
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(TextWriter.Null);

            menu = MenuTestHelper.CreateMenu(writer.Object, null);
            menu.Name = "Menu1";

            item = new MenuItem();

            builder = new MenuHtmlBuilder(menu, new Mock<IActionMethodCache>().Object);
        }

        [Fact]
        public void Should_output_menu_root_tag_with_id_and_css_classes()
        {
            IHtmlNode tag = builder.Build();

            Assert.Equal(menu.Name, tag.Attribute("id"));
            Assert.Equal("t-widget t-reset t-header t-menu", tag.Attribute("class"));
            Assert.Equal("ul", tag.TagName);
        }

        [Fact]
        public void Render_should_output_custom_menu_css_class_when_set()
        {
            menu.HtmlAttributes.Add("class", "custom");
            
            IHtmlNode tag = builder.Build();

            Assert.Equal("t-widget t-reset t-header t-menu custom", tag.Attribute("class"));
        }

        [Fact]
        public void Should_tag_name()
        {
            item.Enabled = true;
            IHtmlNode tag = builder.ItemTag(item);
            Assert.Equal("li", tag.TagName);
        }

        [Fact]
        public void Should_apply_disabled_state() 
        {
            item.Enabled = false;
            IHtmlNode tag = builder.ItemTag(item);

            Assert.Equal("t-item t-state-disabled", tag.Attribute("class"));
        }

        [Fact]
        public void Should_apply_selected_state()
        {
            item.Enabled = true;
            item.Selected = true;
            IHtmlNode tag = builder.ItemTag(item);

            Assert.Equal("t-item t-state-selected", tag.Attribute("class"));
        }

        [Fact]
        public void Should_apply_default_state()
        {
            item.Enabled = true;
            IHtmlNode tag = builder.ItemTag(item);

            Assert.Equal("t-item t-state-default", tag.Attribute("class"));
        }

        [Fact]
        public void Should_output_link_for_item()
        {
            item.Text = "text";
            item.Url = "http://www.telerik.com/";

            IHtmlNode tag = builder.ItemInnerContentTag(item, false);

            Assert.Equal(UIPrimitives.Link, tag.Attribute("class"));
            Assert.Equal("http://www.telerik.com/", tag.Attribute("href"));
            Assert.Equal("a", tag.TagName);
            Assert.Equal("text", tag.Children[0].InnerHtml);
        }

        [Fact]
        public void Should_output_span_for_item_without_link()
        {
            item.Text = "text";
            item.Url = "#";

            IHtmlNode tag = builder.ItemInnerContentTag(item, false);

            Assert.Equal(UIPrimitives.Link, tag.Attribute("class"));
            Assert.False (tag.Attributes().ContainsKey("href"));
            Assert.Equal("span", tag.TagName);
            Assert.Equal("text", tag.Children[0].InnerHtml);
        }

        [Fact]
        public void Should_apply_vertical_css_class()
        {
            menu.Orientation = MenuOrientation.Vertical;

            IHtmlNode tag = builder.Build();

            Assert.Equal("t-widget t-reset t-header t-menu t-menu-vertical", tag.Attribute("class"));
        }

        [Fact]
        public void Should_render_image_if_image_url_set()
        {
            const string url = "testUrl";

            item.ImageUrl = url;

            IHtmlNode tag = builder.ItemInnerContentTag(item, false);

            Assert.Equal("img", tag.Children[0].TagName);
            Assert.Equal(url, tag.Children[0].Attribute("src"));
            Assert.Equal("image", tag.Children[0].Attribute("alt"));
        }

        [Fact]
        public void Should_output_sprite_if_sprite_css_classes_is_set()
        {
            item.SpriteCssClasses = "sprite";
            item.Items.Clear();

            IHtmlNode tag = builder.ItemInnerContentTag(item, false);

            Assert.Equal("span", tag.Children[0].TagName);
            Assert.Equal("t-sprite sprite", tag.Children[0].Attribute("class"));
		}

		[Fact]
		public void Should_output_an_expand_arrow_for_items_with_children()
		{
			item.Items.Add(new MenuItem() { Text = "My child item" });

            IHtmlNode tag = builder.ItemInnerContentTag(item, true);

            Assert.Equal("span", tag.Children[1].TagName);
            Assert.Equal("t-icon t-arrow-down", tag.Children[1].Attribute("class"));
		}

        [Fact]
        public void Should_output_an_expand_arrow_for_root_items_with_content()
        {
            item.Items.Clear();
            item.Content = () => { };

            IHtmlNode tag = builder.ItemInnerContentTag(item, true);

            Assert.Equal("span", tag.Children[1].TagName);
            Assert.Equal("t-icon t-arrow-down", tag.Children[1].Attribute("class"));
        }

		[Fact]
		public void Should_output_an_horizontal_expand_arrow_for_root_items_with_children_in_vertical_menus()
		{
			item.Items.Add(new MenuItem() { Text = "My child item" });

			menu.Orientation = MenuOrientation.Vertical;

            IHtmlNode tag = builder.ItemInnerContentTag(item, true);

            Assert.Equal("span", tag.Children[1].TagName);
            Assert.Equal("t-icon t-arrow-next", tag.Children[1].Attribute("class"));
		}

        [Fact]
        public void Should_not_output_an_expand_arrow_if_no_child_items()
        {
            item.Items.Clear();
            
            IHtmlNode tag = builder.ItemInnerContentTag(item, false /*no child items*/);

            Assert.Equal(1, tag.Children.Count); //only text node
        }

        [Fact]
        public void Should_render_content_css_class_and_id_attr()
        {
            item.Content = () => { };

            IHtmlNode tag = builder.ItemContentTag(item).Children[0].Children[0];

            Assert.Equal(UIPrimitives.Content, tag.Attribute("class"));
            Assert.Equal("div", tag.TagName);
            Assert.NotNull(tag.Attribute("id"));
        }

        [Fact]
        public void Should_render_content()
        {
            item.Content = () => { };

            IHtmlNode tag = builder.ItemContentTag(item).Children[0].Children[0];

            Assert.NotNull(tag.Template());
        }
    }
}
