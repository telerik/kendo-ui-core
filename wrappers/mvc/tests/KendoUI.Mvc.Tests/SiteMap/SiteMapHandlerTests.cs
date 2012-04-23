// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Tests
{
    using System;
    using System.IO;
    using System.Web;
    using System.Web.Routing;

    using Infrastructure;

    using Moq;
    using Xunit;

    public class SiteMapHandlerTests
    {
        private readonly SiteMapDictionary _siteMaps;
        private readonly Mock<IHttpResponseCompressor> _compressor;
        private readonly Mock<IHttpResponseCacher> _cacher;
        private readonly Mock<IUrlGenerator> _urlGenerator;
        private readonly Mock<HttpContextBase> _httpContext;

        private readonly SiteMapHandler _handler;

        public SiteMapHandlerTests()
        {
            _siteMaps = new SiteMapDictionary();
            _compressor = new Mock<IHttpResponseCompressor>();
            _cacher = new Mock<IHttpResponseCacher>();
            _urlGenerator = new Mock<IUrlGenerator>();
            _httpContext = TestHelper.CreateMockedHttpContext(true);

            _handler = new SiteMapHandler(_siteMaps, _compressor.Object, _cacher.Object, _urlGenerator.Object);
        }

        [Fact]
        public void Default_constructor_should_not_throw_exception()
        {
            Assert.DoesNotThrow(() => new SiteMapHandler());
        }

        [Fact]
        public void Should_be_able_to_set_default_path()
        {
            SiteMapHandler.DefaultPath = "~/handlers/sitemap.axd";

            Assert.Equal("~/handlers/sitemap.axd", SiteMapHandler.DefaultPath);

            SiteMapHandler.DefaultPath = "~/sitemap.axd";
        }

        [Fact]
        public void ProcessRequest_should_write_site_map()
        {
            Mock<Stream> outputStream = new Mock<Stream>();

           Process(outputStream);

            outputStream.Verify();
        }

        [Fact]
        public void ProcessRequest_should_compress_response()
        {
            Process(new Mock<Stream>());

            _compressor.Verify();
        }

        [Fact]
        public void ProcessRequest_should_cache_response()
        {
            Process(new Mock<Stream>());

            _cacher.Verify();
        }

        [Fact]
        public void ProcessRequest_should_generate_url()
        {
            Process(new Mock<Stream>());

            _urlGenerator.Verify();
        }

        private void Process(Mock<Stream> outputStream)
        {
            TestHelper.RegisterDummyRoutes();

            _siteMaps.Register<XmlSiteMap>("x", siteMap =>
                                                                 {
                                                                     SiteMapNodeBuilder rootNode = siteMap.RootNode;

                                                                     rootNode.Title("Home")
                                                                             .Route("Default")
                                                                             .LastModifiedAt(DateTime.UtcNow)
                                                                             .ChangeFrequency(SiteMapChangeFrequency.Hourly)
                                                                             .UpdatePriority(SiteMapUpdatePriority.Critical)
                                                                             .ChildNodes(node =>
                                                                                         {
                                                                                             node.Add()
                                                                                                 .Title("Products")
                                                                                                 .Route("ProductList")
                                                                                                 .ChildNodes(childNode =>
                                                                                                                             {
                                                                                                                                 childNode.Add()
                                                                                                                                          .Title("Product1")
                                                                                                                                          .Action("Detail", "Product", new { id = 1 });

                                                                                                                                 childNode.Add()
                                                                                                                                          .Title("Product2")
                                                                                                                                          .Action("Detail", "Product", new { id = 2 });
                                                                                                                             }
                                                                                                            );

                                                                                             node.Add()
                                                                                                 .Title("Faq")
                                                                                                 .Url("~Faq");
                                                                                         });
                                                                 }
                                             );

            _httpContext.Setup(context => context.Response.OutputStream).Returns(outputStream.Object);

            _compressor.Setup(compressor => compressor.Compress(_httpContext.Object)).Verifiable();
            _cacher.Setup(cacher => cacher.Cache(_httpContext.Object, It.IsAny<TimeSpan>())).Verifiable();
            _urlGenerator.Setup(generater => generater.Generate(It.IsAny<RequestContext>(), It.IsAny<INavigatable>())).Returns("http://localhost/Griffin/Home").Verifiable();

            outputStream.SetupGet(stream => stream.CanRead).Returns(true);
            outputStream.SetupGet(stream => stream.CanWrite).Returns(true);
            outputStream.SetupGet(stream => stream.CanSeek).Returns(true);

            outputStream.Setup(stream => stream.Write(It.IsAny<byte[]>(), It.IsAny<int>(), It.IsAny<int>())).Verifiable();

            _httpContext.Object.Request.QueryString.Add("name", "x");

            _handler.ProcessRequest(_httpContext.Object);
        }
    }
}