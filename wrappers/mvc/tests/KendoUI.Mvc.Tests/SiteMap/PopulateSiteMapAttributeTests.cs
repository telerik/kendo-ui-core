// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Tests
{
    using System.Web.Mvc;
    using System.Web.Routing;

    using Moq;
    using Xunit;

    public class PopulateSiteMapAttributeTests
    {
        private readonly PopulateSiteMapAttribute _attribute;
        private readonly Mock<SiteMapBase> _siteMap;

        public PopulateSiteMapAttributeTests()
        {
            _siteMap = new Mock<SiteMapBase>();

            SiteMapDictionary siteMaps = new SiteMapDictionary
                                                {
                                                    { "mySiteMap", _siteMap.Object }
                                                };

            _attribute = new PopulateSiteMapAttribute(siteMaps)
                             {
                                 SiteMapName = "mySiteMap"
                             };
        }

        [Fact]
        public void Default_constructor_should_not_throw_exception()
        {
            Assert.DoesNotThrow(() => new PopulateSiteMapAttribute());
        }

        [Fact]
        public void Should_be_able_to_set_default_view_data_Key()
        {
            PopulateSiteMapAttribute.DefaultViewDataKey = "mySiteMap";

            Assert.Equal("mySiteMap", PopulateSiteMapAttribute.DefaultViewDataKey);

            PopulateSiteMapAttribute.DefaultViewDataKey = "siteMap";
        }

        [Fact]
        public void OnExecuting_should_fill_view_data()
        {
            Mock<ControllerBase> controller = new Mock<ControllerBase>();

            ControllerContext controllerContext = new ControllerContext(TestHelper.CreateMockedHttpContext().Object, new RouteData(), controller.Object);
            ResultExecutingContext executingContext = new ResultExecutingContext(controllerContext, new EmptyResult());

            _attribute.OnResultExecuting(executingContext);

            Assert.Same(_siteMap.Object, controller.Object.ViewData[PopulateSiteMapAttribute.DefaultViewDataKey]);
        }

        [Fact]
        public void OnResultExecuted_does_nothing()
        {
            _attribute.OnResultExecuted(new ResultExecutedContext());
        }
    }
}