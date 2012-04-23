// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Tests
{
    using System.IO;
    using System.Web;

    using Xunit;

    public class HttpHandlerBaseTests
    {
        private readonly DummyHandler _httpHandler;

        public HttpHandlerBaseTests()
        {
            _httpHandler = new DummyHandler();
        }

        [Fact]
        public void IsReusable_should_be_false()
        {
            Assert.False(_httpHandler.IsReusable);
        }

        [Fact]
        public void ProcessRequest_should_not_throw_exception_when_not_running_in_web_server()
        {
            HttpRequest request = new HttpRequest("asset.axd", "http://localhost/asset.axd", string.Empty);
            HttpResponse response = new HttpResponse(new StringWriter());
            HttpContext context = new HttpContext(request, response);

            Assert.DoesNotThrow(() => _httpHandler.ProcessRequest(context));
        }

        private sealed class DummyHandler : HttpHandlerBase
        {
            public override void ProcessRequest(HttpContextBase context)
            {
            }
        }
    }
}