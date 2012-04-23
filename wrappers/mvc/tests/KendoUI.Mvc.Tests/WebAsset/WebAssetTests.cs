// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using Moq;
    using Telerik.Web.Mvc;
    using Telerik.Web.Mvc.Infrastructure;
    using Xunit;

    public class WebAssetTests
    {
        private readonly WebAsset asset;
        private Mock<IWebAssetChecker> checker;
        private Mock<IWebAssetGroupSerializer> serializer;
        private Mock<IWebAssetResolverFactory> resolverFactory;

        public WebAssetTests()
        {
            checker = new Mock<IWebAssetChecker>();
            serializer = new Mock<IWebAssetGroupSerializer>();
            resolverFactory = new Mock<IWebAssetResolverFactory>();
            asset = new WebAsset("~/Script/content1.js");
        }

        [Fact]
        public void Source_should_be_same_which_is_passed_in_constructor()
        {
            Assert.Equal("~/Script/content1.js", asset.Source);
        }
    }
}