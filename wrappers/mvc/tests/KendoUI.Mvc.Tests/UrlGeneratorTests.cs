// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Tests
{
    using System.Web.Routing;

    using Moq;
    using Xunit;

    public class UrlGeneratorTests
    {
        private readonly UrlGenerator _urlGenerator;

        public UrlGeneratorTests()
        {
            TestHelper.RegisterDummyRoutes();

            _urlGenerator = new UrlGenerator();
        }

        [Fact]
        public void GenerateUrl_should_return_correct_url_for_route()
        {
            Mock<INavigatable> navigationItem = new Mock<INavigatable>();

            navigationItem.SetupGet(item => item.RouteName).Returns("ProductList");
            navigationItem.SetupGet(item => item.RouteValues).Returns(new RouteValueDictionary());

            string url = _urlGenerator.Generate(TestHelper.CreateRequestContext(), navigationItem.Object);

            Assert.Contains("/Products", url);
        }

        [Fact]
        public void GenerateUrl_should_return_correct_url_for_controller_and_action()
        {
            Mock<INavigatable> navigationItem = new Mock<INavigatable>();

            navigationItem.SetupGet(item => item.ControllerName).Returns("Product");
            navigationItem.SetupGet(item => item.ActionName).Returns("Detail");
            navigationItem.SetupGet(item => item.RouteValues).Returns(new RouteValueDictionary{ { "id", 1 }});

            string url = _urlGenerator.Generate(TestHelper.CreateRequestContext(), navigationItem.Object);

            Assert.Contains("/Products/Detail/1", url);
        }

        [Fact]
        public void GenerateUrl_should_return_correct_url_for_controller_and_action_with_specific_Area()
        {
            Mock<INavigatable> navigationItem = new Mock<INavigatable>();

            System.Collections.Generic.Dictionary<string, object> dictionary = new System.Collections.Generic.Dictionary<string,object>();
            dictionary.Add("id", 1);
            dictionary.Add("Area", "Test");

            var routeValues = new RouteValueDictionary(dictionary);

            navigationItem.SetupGet(item => item.ControllerName).Returns("Product");
            navigationItem.SetupGet(item => item.ActionName).Returns("Detail");
            navigationItem.SetupGet(item => item.RouteValues).Returns(routeValues);

            string url = _urlGenerator.Generate(TestHelper.CreateRequestContext(), navigationItem.Object);

            Assert.Contains("Products/Detail/1?Area=Test", url);
        }

        [Fact]
        public void GenerateUrl_should_return_correct_url_for_url()
        {
            Mock<INavigatable> navigationItem = new Mock<INavigatable>();

            navigationItem.SetupGet(item => item.Url).Returns("~/Faq");
            navigationItem.SetupGet(item => item.RouteValues).Returns(new RouteValueDictionary());

            string url = _urlGenerator.Generate(TestHelper.CreateRequestContext(), navigationItem.Object);

            Assert.Contains("/Faq", url);
        }
    }
}