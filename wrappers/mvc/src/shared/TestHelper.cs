// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Collections.Specialized;
    using System.IO;
    using System.Text;
    using System.Web;
    using System.Web.Caching;
    using System.Web.Mvc;
    using System.Web.Routing;
    using System.Web.UI;
    using Infrastructure;
    using Moq;


#if MVC2 || MVC3
    class ValueProvider : IValueProvider
    {
        private readonly IDictionary<string, ValueProviderResult> data;

        public ValueProvider(IDictionary<string, ValueProviderResult> data)
        {
            this.data = data;
        }

        public bool ContainsPrefix(string prefix)
        {
            throw new System.NotImplementedException();
        }

        public ValueProviderResult GetValue(string key)
        {
            ValueProviderResult result;
            bool found = data.TryGetValue(key, out result);
            if (found)
            {
                return result;
            }
            
            return null;
        }

    }
#endif

    public class ControllerTestDouble : Controller
    {
        public ControllerTestDouble(IDictionary<string, ValueProviderResult> valueProviderData, ViewDataDictionary viewData)
        {
#if MVC1
            ValueProvider = valueProviderData;
#endif
#if MVC2 || MVC3
            ValueProvider = new ValueProvider(valueProviderData);
#endif
            ViewData = viewData;
            ControllerContext = new ControllerContext(TestHelper.CreateRequestContext(), this);
        }
    }


    public static class TestHelper
    {
        public const string AppPathModifier = "/$(SESSION)";
        public const string ApplicationPath = "/app/";

        public static HtmlHelper CreateHtmlHelper()
        {
            Mock<IViewDataContainer> viewDataContainer = new Mock<IViewDataContainer>();

            viewDataContainer.SetupGet(container => container.ViewData).Returns(new ViewDataDictionary());

            ViewContext viewContext = TestHelper.CreateViewContext();

            HtmlHelper helper = new HtmlHelper(viewContext, viewDataContainer.Object);

            return helper;
        }

#if MVC2 || MVC3
        public static HtmlHelper<TModel> CreateHtmlHelper<TModel>() where TModel : class, new()
        {
            return CreateHtmlHelper(new TModel());
        }

        public static HtmlHelper<TModel> CreateHtmlHelper<TModel>(TModel value)
        {
            var viewDataContainer = new Mock<IViewDataContainer>();

            viewDataContainer.SetupGet(container => container.ViewData).Returns(new ViewDataDictionary { Model = value });

            var viewContext = CreateViewContext();

            var helper = new HtmlHelper<TModel>(viewContext, viewDataContainer.Object);

            return helper;
        }
#endif
        private static Mock<HttpContextBase> httpContext;
        private static object sync = new object();

        public static Mock<HttpContextBase> CreateMockedHttpContext(bool createNew)
        {
            if (createNew)
            {
                return MockedHttpContext();
            }

            if (httpContext == null)
            {
                lock (sync)
                {
                    if (httpContext == null)
                    {
                        httpContext = MockedHttpContext();
                    }
                }
            }

            httpContext.Setup(context => context.Items).Returns(new Hashtable());

            return httpContext;
        }

        public static Mock<HttpContextBase> CreateMockedHttpContext()
        {
            return CreateMockedHttpContext(false);
        }

        private static Mock<HttpContextBase> MockedHttpContext()
        {
            Mock<HttpContextBase> result = new Mock<HttpContextBase>();
            result.Setup(context => context.Server).Returns(new Mock<HttpServerUtilityBase>().Object);
            result.Setup(context => context.Request.AppRelativeCurrentExecutionFilePath).Returns("~/");
            result.Setup(context => context.Request.ApplicationPath).Returns(ApplicationPath);
            result.Setup(context => context.Request.Url).Returns(new Uri("http://localhost"));
            result.Setup(context => context.Request.PathInfo).Returns(string.Empty);
            result.Setup(context => context.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns((TextWriter tw) => new HtmlTextWriter(tw));
            result.Setup(context => context.Request.Browser.EcmaScriptVersion).Returns(new Version("5.0"));
            result.Setup(context => context.Request.Browser.SupportsCss).Returns(true);
            result.Setup(context => context.Request.Browser.MajorVersion).Returns(7);
            result.Setup(context => context.Request.Browser.IsBrowser("IE")).Returns(false);
            result.Setup(context => context.Request.QueryString).Returns(new NameValueCollection());
            result.Setup(context => context.Request.Headers).Returns(new NameValueCollection { { "Accept-Encoding", "gzip" } });
            result.Setup(context => context.Items).Returns(new Hashtable());
            result.Setup(context => context.Response.Output).Returns(new Mock<TextWriter>().Object);

            result.Setup(context => context.Response.Filter).Returns(new Mock<Stream>().Object);
            // ReSharper disable AccessToStaticMemberViaDerivedType
            result.Setup(context => context.Response.ContentEncoding).Returns(UTF8Encoding.Default);
            // ReSharper restore AccessToStaticMemberViaDerivedType
            result.Setup(context => context.Response.ApplyAppPathModifier(It.IsAny<string>())).Returns<string>(r => AppPathModifier + r);
            return result;
        }
        public static RequestContext CreateRequestContext()
        {
            return new RequestContext(CreateMockedHttpContext().Object, new RouteData
                {
                    Values =
                    {
                        {"controller", "home"},
                        {"action", "index"}
                    }
                });
        }

        public static void RegisterDummyRoutes(RouteCollection routes)
        {
            routes.Clear();

            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute("ProductList", "Products", new { controller = "Product", action = "List" });
            routes.MapRoute("ProductDetail", "Products/Detail/{id}", new { controller = "Product", action = "Detail", id = string.Empty });
            routes.MapRoute("Default", "{controller}/{action}/{id}", new { controller = "Home", action = "Index", id = string.Empty });
        }
        
        public static ViewContext CreateViewContext()
        {
            return new ViewContext(CreateControllerContext(), new Mock<IView>().Object, new ViewDataDictionary(), new TempDataDictionary()
#if MVC2 || MVC3
                , TextWriter.Null
#endif            
            );
        }

        public static ControllerContext CreateControllerContext()
        {
            return new ControllerContext(CreateRequestContext(), new ControllerTestDouble(new Dictionary<string, 
                ValueProviderResult>(), new Mock<IViewDataContainer>().Object.ViewData));
        }
        public static void RegisterDummyRoutes()
        {
            RegisterDummyRoutes(RouteTable.Routes);
        }

        private static XmlSiteMap siteMap;
        private static object syncSiteMap = new object();
        public static SiteMapBase CreateXmlSiteMap()
        {
            if (siteMap == null)
            {
                lock (syncSiteMap)
                {
                    if (siteMap == null)
                    {
                        Mock<IPathResolver> pathResolver = new Mock<IPathResolver>();
                        Mock<IVirtualPathProvider> fileSystem = new Mock<IVirtualPathProvider>();
                        Mock<ICacheProvider> cacheProvider = new Mock<ICacheProvider>();

                        const string Xml = @"<?xml version=""1.0"" encoding=""utf-8"" ?>" + "\r\n" +
                                           @"<siteMap compress=""false"" cacheDurationInMinutes=""120"" generateSearchEngineMap=""true"">" +
                                           "\r\n" +
                                           @"    <siteMapNode title=""Home"" route=""Home"" foo=""bar"">" + "\r\n" +
                                           @"        <siteMapNode title=""Products"" route=""ProductList"" visible=""true"" " +
                                           @"lastModifiedAt=""2009/1/3"" changeFrequency=""hourly"" updatePriority=""high"" >" +
                                           "\r\n" +
                                           @"            <siteMapNode title=""Product 1"" controller=""Product"" action=""Detail"">" +
                                           "\r\n" +
                                           @"                <routeValues>" + "\r\n" +
                                           @"                    <id>1</id>" + "\r\n" +
                                           @"                </routeValues>" + "\r\n" +
                                           @"            </siteMapNode>" + "\r\n" +
                                           @"            <siteMapNode title=""Product 2"" controller=""Product"" action=""Detail"" " +
                                           @"includeInSearchEngineIndex=""true"">" + "\r\n" +
                                           @"                <routeValues>" + "\r\n" +
                                           @"                    <id>2</id>" + "\r\n" +
                                           @"                </routeValues>" + "\r\n" +
                                           @"            </siteMapNode>" + "\r\n" +
                                           @"        </siteMapNode>" + "\r\n" +
                                           @"        <siteMapNode title=""Faq"" url=""~/faq"" />" + "\r\n" +
                                           @"    </siteMapNode>" + "\r\n" +
                                           @"</siteMap>";

                        pathResolver.Setup(p => p.Resolve(It.IsAny<string>())).Returns("C:\\Web.sitemap").Verifiable();
                        fileSystem.Setup(f => f.ReadAllText(It.IsAny<string>())).Returns(Xml).Verifiable();
                        cacheProvider.Setup(cache => cache.Insert(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CacheItemRemovedCallback>(), It.IsAny<string>())).Verifiable();

                        siteMap = new XmlSiteMap(pathResolver.Object, fileSystem.Object, cacheProvider.Object);
                        siteMap.Load();
                    }
                }
            }
            return siteMap;
        }
    }
}