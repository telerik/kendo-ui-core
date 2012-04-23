// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using System;
    using System.Web;

    using Moq;
    using Xunit;

    public class HttpResponseCacherTests
    {
        private readonly HttpResponseCacher _cacher;

        public HttpResponseCacherTests()
        {
            _cacher = new HttpResponseCacher();
        }

        [Fact]
        public void Should_be_able_to_cache()
        {
            Mock<HttpCachePolicyBase> httpCache = new Mock<HttpCachePolicyBase>();

            httpCache.Setup(cache => cache.SetCacheability(HttpCacheability.Public));
            httpCache.Setup(cache => cache.SetOmitVaryStar(true));
            httpCache.Setup(cache => cache.SetExpires(It.IsAny<DateTime>()));
            httpCache.Setup(cache => cache.SetValidUntilExpires(true));
            httpCache.Setup(cache => cache.SetLastModified(It.IsAny<DateTime>()));
            httpCache.Setup(cache => cache.SetLastModifiedFromFileDependencies());

            Mock<HttpResponseBase> httpResponse = new Mock<HttpResponseBase>();
            httpResponse.SetupGet(response => response.Cache).Returns(httpCache.Object);

            Mock<HttpContextBase> httpContext = new Mock<HttpContextBase>();
            httpContext.SetupGet(context => context.Timestamp).Returns(DateTime.Now);
            httpContext.SetupGet(context => context.Response).Returns(httpResponse.Object);

            _cacher.Cache(httpContext.Object, TimeSpan.FromDays(365));

            httpCache.VerifyAll();
        }
    }
}