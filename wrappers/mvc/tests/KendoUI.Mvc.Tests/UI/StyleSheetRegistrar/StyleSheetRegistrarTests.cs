// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using Moq;
    using System;
    using System.Web;
    using System.Web.Mvc;
    using Telerik.Web.Mvc.Infrastructure;
    using Xunit;

    public class StyleSheetRegistrarTests
    {
        private readonly Mock<HttpContextBase> _httpContext;
        private readonly ViewContext _viewContext;
        private readonly WebAssetCollection _styleSheets;
        
        private readonly StyleSheetRegistrar _styleSheetRegistrar;

        public StyleSheetRegistrarTests()
        {
            _httpContext = TestHelper.CreateMockedHttpContext();
            _styleSheets = new WebAssetCollection(WebAssetDefaultSettings.StyleSheetFilesPath);

            _viewContext = new ViewContext
                               {
                                   HttpContext = _httpContext.Object,
                                   ViewData = new ViewDataDictionary()
                               };

            _styleSheetRegistrar = new StyleSheetRegistrar(_styleSheets, _viewContext, new Mock<IWebAssetCollectionResolver>().Object);
        }

        [Fact]
        public void Should_throw_exception_when_new_instance_is_created_for_the_same_http_context()
        {
            Assert.Throws<InvalidOperationException>(() => new StyleSheetRegistrar(_styleSheets, _viewContext, new Mock<IWebAssetCollectionResolver>().Object));
        }

        [Fact]
        public void AssetHandlerPath_should_be_set_to_default_asset_handler_path_when_new_instance_is_created()
        {
            Assert.Equal(WebAssetHttpHandler.DefaultPath, _styleSheetRegistrar.AssetHandlerPath);
        }
    }
}