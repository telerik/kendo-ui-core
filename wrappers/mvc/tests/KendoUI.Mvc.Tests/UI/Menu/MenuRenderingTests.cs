namespace Telerik.Web.Mvc.Tests.Menu
{
    using Moq;
    using System;
    using System.IO;
    using System.Web;
    using System.Web.Routing;
    using System.Web.UI;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.UI;
    using Xunit;

    public class MenuRenderingTests
    {
        private readonly Menu menu;
        private readonly Mock<INavigationComponentHtmlBuilder<MenuItem>> builder;

        public MenuRenderingTests()
        {
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(TextWriter.Null);

            builder = new Mock<INavigationComponentHtmlBuilder<MenuItem>>();
            builder.Setup(b => b.Build()).Returns(() => new HtmlElement("ul"));
            builder.Setup(r => r.ItemTag(It.IsAny<MenuItem>())).Returns(() => new HtmlElement("li"));
            builder.Setup(r => r.ItemInnerContentTag(It.IsAny<MenuItem>(), It.IsAny<bool>())).Returns(() => new HtmlElement("a"));
            builder.Setup(r => r.ChildrenTag(It.IsAny<MenuItem>())).Returns(() => new HtmlElement("ul"));

            menu = MenuTestHelper.CreateMenu(writer.Object, builder.Object);
            menu.Name = "Menu";

            menu.Items.Add(new MenuItem { Text = "MenuItem1" });
            menu.Items.Add(new MenuItem { Text = "MenuItem2" });
            menu.Items.Add(new MenuItem { Text = "MenuItem3" });
        }

        [Fact]
        public void Render_should_not_output_anything_when_there_are_no_items()
        {
            menu.Items.Clear();
            builder.Setup(r => r.Build());

            menu.Render();

            builder.Verify(r => r.Build(), Times.Never());
        }

        [Fact]
        public void Render_should_output_once_Menu_begin_tag_if_items_are_not_zero()
        {
            menu.Render();

            builder.Verify(r => r.Build(), Times.Exactly(1));
        }

        [Fact]
        public void Render_should_output_the_same_amount_of_items_as_there_are()
        {
            menu.Render();

            builder.Verify(r => r.ItemTag(It.IsAny<MenuItem>()), Times.Exactly(menu.Items.Count));
            builder.Verify(r => r.ItemInnerContentTag(It.IsAny<MenuItem>(), It.IsAny<bool>()), Times.Exactly(menu.Items.Count));
        }

        [Fact]
        public void Render_should_output_content_if_there_is_any() 
        {
            menu.Items[0].Content = () => { };

            builder.Setup(r => r.ItemContentTag(It.IsAny<MenuItem>())).Returns(new HtmlElement("div"));

            menu.Render();

            builder.Verify(r => r.ItemContentTag(It.IsAny<MenuItem>()), Times.Exactly(1));
        }

        [Fact]
        public void Render_should_output_content_if_there_is_Html_property_set()
        {
            menu.Items[0].Html = "Html";

            builder.Setup(r => r.ItemContentTag(It.IsAny<MenuItem>())).Returns(new HtmlElement("div")).Verifiable();

            menu.Render();

            builder.Verify();
        }

        [Fact]
        public void ItemAction_should_be_invoked()
        {
            menu.ItemAction = (item) =>
            {
                item.SpriteCssClasses = "test";
            };

            menu.Render();

            Assert.Equal("test", menu.Items[0].SpriteCssClasses);
        }

        [Fact]
        public void Render_should_throw_exception_if_selectedIndex_is_out_of_range()
        {
            menu.SelectedIndex = 20; //out of range.

            Assert.Throws(typeof(ArgumentOutOfRangeException),() => menu.Render());
        }

        [Fact]
        public void Render_should_select_only_first_child_item_because_of_diff_route_values()
        {
            menu.HighlightPath = true;

            var httpContext = new Mock<HttpContextBase>();

            menu.ViewContext.HttpContext = httpContext.Object;
            httpContext.Setup(h => h.Request.Url).Returns(new Uri("http://localhost/$(SESSION)/app/Grid/Basic/10"));
            httpContext.Setup(h => h.Response.Output).Returns(TextWriter.Null);

            menu.Items[0].Text = "Grid";
            menu.Items[0].Items.Add(new MenuItem
            {
                Text = "SubItem1",
                ControllerName = "Grid",
                ActionName = "Basic",
                RouteValues = new RouteValueDictionary(new { id = 5 })
            });
            menu.Items[0].Items.Add(new MenuItem
            {
                Text = "SubItem2",
                ControllerName = "Grid",
                ActionName = "Basic",
                RouteValues = new RouteValueDictionary(new { id = 10 })
            });

            menu.Render();

            Assert.False(menu.Items[0].Items[0].Selected);
            Assert.True(menu.Items[0].Items[1].Selected);
        }

        [Fact]
        public void Render_should_expand_second_level_if_highlightpath_is_true()
        {
            menu.HighlightPath = true;

            var httpContext = new Mock<HttpContextBase>();
            
            menu.ViewContext.HttpContext = httpContext.Object;
            httpContext.Setup(h => h.Request.Url).Returns(new Uri("http://localhost/$(SESSION)/app/Grid/FirstBasic"));
            httpContext.Setup(h => h.Response.Output).Returns(TextWriter.Null);

            menu.Items[0].Text = "Grid";
            menu.Items[0].Items.Add(new MenuItem { Text = "SubItem1" });
            menu.Items[0].Items.Add(new MenuItem { Text = "SubItem2", ControllerName = "Grid", ActionName = "InMemory", Enabled = true });

            menu.Items[0].Items[0].Items.Add(new MenuItem { Text = "SubSubItem1", ControllerName = "Grid", ActionName = "FirstBasic", });

            menu.Render();

            Assert.True(menu.Items[0].Items[0].Items[0].Selected);
            Assert.True(menu.Items[0].Items[0].HtmlAttributes["class"].ToString() == "t-highlighted");
        }
    }
}
