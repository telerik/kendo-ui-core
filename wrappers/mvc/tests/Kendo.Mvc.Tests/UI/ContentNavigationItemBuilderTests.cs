namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Web.Mvc;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ContentNavigationItemBuilderTests
    {
        ContentNavigationItemTestDouble item;
        ContentNavigationItemBuilderTestDouble builder;

        public ContentNavigationItemBuilderTests()
        {
            var viewContext = TestHelper.CreateViewContext();

            this.item = new ContentNavigationItemTestDouble();
            this.builder = new ContentNavigationItemBuilderTestDouble(item, viewContext);
        }
        
        [Fact]
        public void LoadContentFrom_should_set_contentUrl_of_item()
        {
            const string value = "test";

            builder.LoadContentFrom(value);

            Assert.Equal(value, item.ContentUrl);
        }

        [Fact]
        public void LoadContentFrom_should_return_TBuilder_object()
        {
            const string value = "test";

            var returnedBuilder = builder.LoadContentFrom(value);

            Assert.IsType(typeof(ContentNavigationItemBuilderTestDouble), returnedBuilder);
        }

    }

    public class ContentNavigationItemBuilderTestDouble : ContentNavigationItemBuilder<ContentNavigationItemTestDouble, ContentNavigationItemBuilderTestDouble>, IHideObjectMembers
    {
        public ContentNavigationItemBuilderTestDouble(ContentNavigationItemTestDouble Item, ViewContext viewContext)
            : base(Item, viewContext)
        {
        }
    }
}