// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using System.Collections.Specialized;
    using System.IO;
    using System.Web;

    using Moq;
    using Xunit;

    public class HttpResponseCompressorTests
    {
        private readonly HttpResponseCompressor _compressor;

        public HttpResponseCompressorTests()
        {
            _compressor = new HttpResponseCompressor();
        }

        [Fact]
        public void Should_be_able_to_compress_when_header_contains_gzip()
        {
            Compress("gzip");
        }

        [Fact]
        public void Should_be_able_to_compress_when_header_contains_deflate()
        {
            Compress("deflate");
        }

        [Fact]
        public void Should_not_compress_for_ie6()
        {
            Mock<HttpRequestBase> httpRequest = new Mock<HttpRequestBase>();
            httpRequest.SetupGet(request => request.Headers).Returns(new NameValueCollection { { "Accept-Encoding", "gzip" } });
            httpRequest.SetupGet(request => request.Browser).Returns(new Mock<HttpBrowserCapabilitiesBase>().Object);
            httpRequest.SetupGet(request => request.Browser.MajorVersion).Returns(6);
            httpRequest.Setup(request => request.Browser.IsBrowser("IE")).Returns(true);

            Mock<HttpResponseBase> httpResponse = new Mock<HttpResponseBase>();
            httpResponse.Setup(response => response.AppendHeader("Content-encoding", It.IsAny<string>())).Verifiable();            

            Mock<HttpContextBase> httpContext = new Mock<HttpContextBase>();
            httpContext.SetupGet(context => context.Request).Returns(httpRequest.Object);
            httpContext.SetupGet(context => context.Response).Returns(httpResponse.Object);

            _compressor.Compress(httpContext.Object);

            httpResponse.Verify(response => response.AppendHeader("Content-encoding", It.IsAny<string>()), Times.Never());            
        }

        [Fact]
        public void Should_not_compress_when_supported_header_is_missing_in_request()
        {
            Mock<HttpRequestBase> httpRequest = new Mock<HttpRequestBase>();
            httpRequest.SetupGet(request => request.Headers).Returns(new NameValueCollection());
            httpRequest.SetupGet(request => request.Browser).Returns(new Mock<HttpBrowserCapabilitiesBase>().Object);

            Mock<HttpResponseBase> httpResponse = new Mock<HttpResponseBase>();
            httpResponse.Setup(response => response.AppendHeader("Content-encoding", It.IsAny<string>())).Verifiable();            

            Mock<HttpContextBase> httpContext = new Mock<HttpContextBase>();
            httpContext.SetupGet(context => context.Request).Returns(httpRequest.Object);
            httpContext.SetupGet(context => context.Response).Returns(httpResponse.Object);

            _compressor.Compress(httpContext.Object);

            httpResponse.Verify(response => response.AppendHeader("Content-encoding", It.IsAny<string>()), Times.Never());            
        }

        private void Compress(string type)
        {
            Mock<HttpRequestBase> httpRequest = new Mock<HttpRequestBase>();
            httpRequest.SetupGet(request => request.Headers).Returns(new NameValueCollection { { "Accept-Encoding", type } });

            httpRequest.SetupGet(request => request.Browser).Returns(new Mock<HttpBrowserCapabilitiesBase>().Object);

            Stream filter = new MemoryStream();

            Mock<HttpResponseBase> httpResponse = new Mock<HttpResponseBase>();
            httpResponse.Setup(response => response.AppendHeader("Content-encoding", type)).Verifiable();
            httpResponse.SetupGet(response => response.Filter).Returns(filter);            

            Mock<HttpContextBase> httpContext = new Mock<HttpContextBase>();
            httpContext.SetupGet(context => context.Request).Returns(httpRequest.Object);
            httpContext.SetupGet(context => context.Response).Returns(httpResponse.Object);

            _compressor.Compress(httpContext.Object);

            httpResponse.Verify();
            filter.Close();
        }
    }
}