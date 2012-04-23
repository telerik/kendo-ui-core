namespace Telerik.Web.Mvc.UI.Tests
{
    using Moq;
    using System.IO;
    using System.Web.UI;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.UI;
    using Xunit;

    public class TabStripRenderingTests
    {
        private readonly TabStrip tabStrip;
        private readonly Mock<ITabStripHtmlBuilder> builder;

        public TabStripRenderingTests()
        {
            Mock<TextWriter> textWriter = new Mock<TextWriter>();
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(textWriter.Object);

            builder = new Mock<ITabStripHtmlBuilder>();
            builder.Setup(r => r.TabStripTag()).Returns(() => 
            {
                IHtmlNode result = new HtmlElement("div");

                new HtmlElement("ul").AppendTo(result);

                return result;
            });
            builder.Setup(r => r.ItemTag(It.IsAny<TabStripItem>())).Returns(() => new HtmlElement("li"));
            builder.Setup(r => r.ItemContentTag(It.IsAny<TabStripItem>())).Returns(() => new HtmlElement("div"));
            builder.Setup(r => r.ItemInnerTag(It.IsAny<TabStripItem>())).Returns(() => new HtmlElement("a"));

            tabStrip = TabStripTestHelper.CreateTabStrip(writer.Object, builder.Object);
            tabStrip.Name = "TabStrip1";

            tabStrip.Items.Add(new TabStripItem { Text = "TabStripItem1", RouteName = "ProductList" });
            tabStrip.Items.Add(new TabStripItem { Text = "TabStripItem2", RouteName = "ProductList" });
            tabStrip.Items.Add(new TabStripItem { Text = "TabStripItem3", RouteName = "ProductList" });
        }

        [Fact]
        public void Render_should_output_start_div_if_items_are_not_zero()
        {
            builder.Setup(r => r.TabStripTag()).Returns(() =>
            {
                IHtmlNode result = new HtmlElement("div");

                new HtmlElement("ul").AppendTo(result);

                return result;
            });

            tabStrip.Render();

            builder.Verify(r => r.TabStripTag());
        }

        [Fact]
        public void Render_should_output_item_tag()
        {
            builder.Setup(r => r.ItemTag(It.IsAny<TabStripItem>())).Returns(() => new HtmlElement("li"));

            tabStrip.Render();

            builder.Verify(r => r.ItemTag(It.IsAny<TabStripItem>()));
        }

        [Fact]
        public void Render_should_call_ItemContent_as_many_times_as_items_count()
        {
            builder.Setup(r => r.ItemInnerTag(It.IsAny<TabStripItem>())).Returns(() => new HtmlElement("a"));

            tabStrip.Render();

            builder.Verify(r => r.ItemInnerTag(It.IsAny<TabStripItem>()), Times.Exactly(tabStrip.Items.Count));
        }

        [Fact]
        public void Render_should_not_ItemContent_if_it_is_not_visible()
        {
            tabStrip.Items.Clear();
            tabStrip.Items.Add(new TabStripItem { Text = "TabStripItem1", RouteName = "ProductList", Visible = false });

            builder.Setup(r => r.ItemInnerTag(It.IsAny<TabStripItem>())).Verifiable();

            tabStrip.Render();

            builder.Verify(r => r.ItemInnerTag(It.IsAny<TabStripItem>()), Times.Never());            
        }

        [Fact]
        public void Render_should_not_ItemContent_if_it_is_not_accessible()
        {
            tabStrip.Items.Clear();
            tabStrip.Items.Add(new TabStripItem { Text = "TabStripItem1", RouteName = "ProductList", Visible = true });

            TabStripTestHelper.authorization.Setup(a => a.IsAccessibleToUser(TabStripTestHelper.viewContext.RequestContext, It.IsAny<INavigatable>())).Returns(false);

            builder.Setup(r => r.ItemInnerTag(It.IsAny<TabStripItem>())).Verifiable();

            tabStrip.Render();

            builder.Verify(r => r.ItemInnerTag(It.IsAny<TabStripItem>()), Times.Never());
        }

        [Fact]
        public void Render_should_call_ItemContentTag_if_Content_is_not_null()
        {
            tabStrip.Items[0].Content = () => { };

            builder.Setup(r => r.ItemContentTag(It.IsAny<TabStripItem>())).Returns(() => new HtmlElement("a")).Verifiable();

            tabStrip.Render();

            builder.Verify();
        }

        [Fact]
        public void Render_should_call_ItemContentTag_if_Html_is_not_null()
        {
            tabStrip.Items[0].Html = "Html";

            builder.Setup(r => r.ItemContentTag(It.IsAny<TabStripItem>())).Returns(() => new HtmlElement("a")).Verifiable();

            tabStrip.Render();

            builder.Verify();
        }

        [Fact]
        public void Render_should_call_ItemContentTag_if_ContentUrl_is_not_null()
        {
            tabStrip.Items[0].ContentUrl = "URL";

            builder.Setup(r => r.ItemContentTag(It.IsAny<TabStripItem>())).Returns(() => new HtmlElement("a")).Verifiable();

            tabStrip.Render();

            builder.Verify();
        }

        public void When_urlGenerator_returns_null_url_should_be_ds() 
        {
            TabStripTestHelper.urlGenerator.Setup(g => g.Generate(TabStripTestHelper.viewContext.RequestContext, It.IsAny<INavigatable>())).Returns(()=>null);

            tabStrip.Render();

            Assert.Equal("#", tabStrip.Items[0].Url);
        }

        [Fact]
        public void ItemAction_should_set_items_Css_sprite_images()
        {
            const string value = "test";
            tabStrip.ItemAction = (item) =>
            {
                item.SpriteCssClasses = value;
            };

            tabStrip.Render();

            Assert.Equal(value, tabStrip.Items[0].SpriteCssClasses);
        }

        [Fact]
        public void Render_should_output_selected_item_if_selectedIndex_is_in_range()
        {
            tabStrip.SelectedIndex = 1;

            tabStrip.Render();

            Assert.True(tabStrip.Items[1].Selected);
        }

        ////

        [Fact]
        public void Render_should_call_objectWriter_start_method()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            TabStripTestHelper.clientSideObjectWriter.Setup(ow => ow.Start()).Verifiable();

            tabStrip.WriteInitializationScript(writer.Object);

            TabStripTestHelper.clientSideObjectWriter.Verify(ow => ow.Start());
        }

        [Fact]
        public void ObjectWriter_should_call_objectWriter_complete_method()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            TabStripTestHelper.clientSideObjectWriter.Setup(w => w.Complete());

            tabStrip.WriteInitializationScript(writer.Object);

            TabStripTestHelper.clientSideObjectWriter.Verify(w => w.Complete());
        }

        [Fact]
        public void ObjectWriter_should_append_Select_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            tabStrip.ClientEvents.OnSelect.CodeBlock = () => { };

            TabStripTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onSelect", tabStrip.ClientEvents.OnSelect)).Verifiable();

            tabStrip.WriteInitializationScript(writer.Object);

            TabStripTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onSelect", tabStrip.ClientEvents.OnSelect));
        }


        [Fact]
        public void ObjectWriter_should_append_Error_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            tabStrip.ClientEvents.OnError.CodeBlock = () => { };

            TabStripTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onError", tabStrip.ClientEvents.OnError)).Verifiable();

            tabStrip.WriteInitializationScript(writer.Object);

            TabStripTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onError", tabStrip.ClientEvents.OnError));
        }

        [Fact]
        public void ObjectWriter_should_append_Load_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            tabStrip.ClientEvents.OnLoad.CodeBlock = () => { };

            TabStripTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onLoad", tabStrip.ClientEvents.OnLoad)).Verifiable();

            tabStrip.WriteInitializationScript(writer.Object);

            TabStripTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onLoad", tabStrip.ClientEvents.OnLoad));
        }
    }
}
