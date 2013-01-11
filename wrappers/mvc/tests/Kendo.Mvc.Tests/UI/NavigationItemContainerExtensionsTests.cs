namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using System;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI;
    using Xunit;

    public class NavigationItemContainerExtensionsTests
    {
        ContentNavigationItemTestDouble contentItem;
        ContentNavigationItemComponentTestDouble component;

        public NavigationItemContainerExtensionsTests()
        {
            contentItem = new ContentNavigationItemTestDouble();
            component = new ContentNavigationItemComponentTestDouble();
            component.Name = "Component";
            component.Items.Add(contentItem);
            component.UrlGeneratorMock.Setup<string>(g => g.Generate(It.IsAny<RequestContext>(), It.IsAny<INavigatable>())).Returns(() => contentItem.Url);
        }

        [Fact]
        public void GetItemContentId_returns_correct_content_id()
        {
            Assert.Equal("Component-1", NavigationItemContainerExtensions.GetItemContentId(component, contentItem));
        }

        [Fact]
        public void GetItemUrl_should_return_hashed_url_for_items_with_Template_without_Url()
        {
            contentItem.Template.Html = "<strong>foo</strong>";

            Assert.Equal("#Component-1", NavigationItemContainerExtensions.GetItemUrl(component, contentItem));
        }

        [Fact]
        public void GetItemUrl_should_return_ContentUrl_if_no_Url_is_set()
        {
            contentItem.ContentUrl = "foo/bar";

            Assert.Equal("foo/bar", NavigationItemContainerExtensions.GetItemUrl(component, contentItem));
        }
        
        [Fact]
        public void GetItemUrl_should_return_Url_even_when_ContentUrl_is_set()
        {
            const string url = "url", contentUrl = "contentUrl";
            contentItem.Url = url;
            contentItem.ContentUrl = contentUrl;

            Assert.Equal(url, NavigationItemContainerExtensions.GetItemUrl(component, contentItem));
        }
    }

    public class ContentNavigationItemTestDouble : NavigationItem<ContentNavigationItemTestDouble>, IAsyncContentContainer
    {
        public ContentNavigationItemTestDouble() { }

        public string  ContentUrl
        {
	          get;
	          set;
        }
    }

    public class ContentNavigationItemComponentTestDouble : WidgetBase, INavigationItemComponent<ContentNavigationItemTestDouble>
    {

        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        public INavigationItemAuthorization Authorization
        {
            get;
            private set;
        }

        public IList<ContentNavigationItemTestDouble> Items
        {
            get;
            private set;
        }

        public Action<ContentNavigationItemTestDouble> ItemAction
        {
            get;
            set;
        }

        public SecurityTrimming SecurityTrimming
        {
            get;
            set;
        }
        
        public Mock<INavigationItemAuthorization> AuthorizationMock;
        public Mock<IUrlGenerator> UrlGeneratorMock;

        public ContentNavigationItemComponentTestDouble()
            : base(TestHelper.CreateViewContext())
        {
            AuthorizationMock = new Mock<INavigationItemAuthorization>();
            Authorization = AuthorizationMock.Object;

            UrlGeneratorMock = new Mock<IUrlGenerator>();
            UrlGenerator = UrlGeneratorMock.Object;

            Items = new List<ContentNavigationItemTestDouble>();
        }
    }
}
