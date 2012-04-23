// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Tests
{
    using System.Web.Caching;

    using Infrastructure;

    using Moq;
    using Xunit;

    public class XmlSiteMapTests
    {
        private readonly Mock<IPathResolver> pathResolver;
        private readonly Mock<IVirtualPathProvider> fileSystem;
        private readonly Mock<ICacheProvider> cacheProvider;

        private readonly XmlSiteMap _siteMap;

        public XmlSiteMapTests()
        {
            pathResolver = new Mock<IPathResolver>();
            fileSystem = new Mock<IVirtualPathProvider>();
            cacheProvider = new Mock<ICacheProvider>();

            _siteMap = new XmlSiteMap(pathResolver.Object, fileSystem.Object, cacheProvider.Object);
        }

        [Fact]
        public void Default_constructor_should_not_throw_exception()
        {
            Assert.DoesNotThrow(() => new XmlSiteMap());
        }

        [Fact]
        public void Should_be_able_to_set_default_path()
        {
            XmlSiteMap.DefaultPath = "~/App_Data/Web.sitemap";

            Assert.Equal("~/App_Data/Web.sitemap", XmlSiteMap.DefaultPath);

            XmlSiteMap.DefaultPath = "~/Web.sitemap";
        }

        [Fact]
        public void Load_should_populate_site_map_from_default_xml()
        {
            SetupLoad();

            _siteMap.Load();

            Assert.Equal("Home", _siteMap.RootNode.Title);
            Assert.Equal("Home", _siteMap.RootNode.RouteName);
            Assert.Equal("bar", _siteMap.RootNode.Attributes["foo"]);
            Assert.Equal("Products", _siteMap.RootNode.ChildNodes[0].Title);
            Assert.Equal("ProductList", _siteMap.RootNode.ChildNodes[0].RouteName);
            Assert.Equal("Product 1", _siteMap.RootNode.ChildNodes[0].ChildNodes[0].Title);
            Assert.Equal("Product", _siteMap.RootNode.ChildNodes[0].ChildNodes[0].ControllerName);
            Assert.Equal("Detail", _siteMap.RootNode.ChildNodes[0].ChildNodes[0].ActionName);
            Assert.Equal("1", _siteMap.RootNode.ChildNodes[0].ChildNodes[0].RouteValues["id"]);
            Assert.Equal("Product 2", _siteMap.RootNode.ChildNodes[0].ChildNodes[1].Title);
            Assert.Equal("Product", _siteMap.RootNode.ChildNodes[0].ChildNodes[1].ControllerName);
            Assert.Equal("Detail", _siteMap.RootNode.ChildNodes[0].ChildNodes[1].ActionName);
            Assert.Equal("2", _siteMap.RootNode.ChildNodes[0].ChildNodes[1].RouteValues["id"]);
            Assert.Equal("Faq", _siteMap.RootNode.ChildNodes[1].Title);
            Assert.Equal("~/faq", _siteMap.RootNode.ChildNodes[1].Url);
        }

        [Fact]
        public void Load_should_use_path_resolver()
        {
            SetupLoad();
            _siteMap.Load();

            pathResolver.Verify();
        }

        [Fact]
        public void Load_should_use_file_System()
        {
            SetupLoad();
            _siteMap.Load();

            fileSystem.Verify();
        }

        [Fact]
        public void Load_should_cache_file_path()
        {
            SetupLoad();
            _siteMap.Load();

            cacheProvider.Verify();
        }

        [Fact]
        public void Should_reload_when_xml_file_is_changed()
        {
            Mock<XmlSiteMap> siteMap = new Mock<XmlSiteMap>(pathResolver.Object, fileSystem.Object, cacheProvider.Object);

            siteMap.Setup(sm => sm.InternalLoad(It.IsAny<string>())).Verifiable();

            siteMap.Object.OnCacheItemRemoved("foo", @"C:\Temp\Web.sitemap", CacheItemRemovedReason.DependencyChanged);
        }

        private void SetupLoad()
        {
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
        }
    }
}