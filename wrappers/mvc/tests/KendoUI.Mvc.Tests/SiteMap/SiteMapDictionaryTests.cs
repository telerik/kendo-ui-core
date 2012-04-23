// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Tests
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using Telerik.Web.Mvc.Extensions;
    using Xunit;

    public class SiteMapDictionaryTests
    {
        private readonly SiteMapDictionary _sitemaps;

        public SiteMapDictionaryTests()
        {
            _sitemaps = new SiteMapDictionary();
        }

        [Fact]
        public void Should_be_able_to_set_default_site_map_factory()
        {
            Func<SiteMapBase> oldFactory = SiteMapDictionary.DefaultSiteMapFactory;
            Func<SiteMapBase> newFactory = () => null;

            SiteMapDictionary.DefaultSiteMapFactory = newFactory;

            Assert.Same(newFactory, SiteMapDictionary.DefaultSiteMapFactory);

            SiteMapDictionary.DefaultSiteMapFactory = oldFactory;
        }

        [Fact]
        public void Should_be_able_to_set_default_site_map()
        {
            SiteMapBase xml = new XmlSiteMap();

            _sitemaps.DefaultSiteMap = xml;

            Assert.Same(xml, _sitemaps.DefaultSiteMap);
        }

        [Fact]
        public void Count_should_be_zero_when_new_instance_is_created()
        {
            Assert.Equal(0, _sitemaps.Count);
        }

        [Fact]
        public void IsReadonly_should_be_always_false()
        {
            Assert.False(_sitemaps.IsReadOnly);
        }

        [Fact]
        public void Keys_should_be_empty_when_new_instance_is_created()
        {
            Assert.Empty(_sitemaps.Keys);
        }

        [Fact]
        public void Values_should_be_empty_when_new_instance_is_created()
        {
            Assert.Empty(_sitemaps.Values);
        }

        [Fact]
        public void Should_be_able_to_set_site_map()
        {
            SiteMapBase siteMap = new XmlSiteMap();

            _sitemaps["foo"] = siteMap;

            Assert.Same(siteMap, _sitemaps["foo"]);
        }

        [Fact]
        public void Should_be_able_to_register_site_map()
        {
            _sitemaps.Register<XmlSiteMap>("foo", sitmap => { });

            Assert.True(_sitemaps.ContainsKey("foo"));
        }

        [Fact]
        public void Should_be_able_to_add()
        {
            _sitemaps.Add("foo", new XmlSiteMap());
        }

        [Fact]
        public void Should_be_able_to_add_with_key_value_pair()
        {
            _sitemaps.Add(new KeyValuePair<string, SiteMapBase>("foo", new XmlSiteMap()));
        }

        [Fact]
        public void Clear_should_make_the_dictionary_empty()
        {
            _sitemaps.Add("foo", new XmlSiteMap());
            _sitemaps.Add("bar", new XmlSiteMap());

            _sitemaps.Clear();

            Assert.Equal(0, _sitemaps.Count);
        }

        [Fact]
        public void Contains_should_return_true_when_exists()
        {
            KeyValuePair<string, SiteMapBase> pair = new KeyValuePair<string, SiteMapBase>("foo", new XmlSiteMap());

            _sitemaps.Add(pair);

            Assert.True(_sitemaps.Contains(pair));
        }

        [Fact]
        public void ContainsKey_should_return_true_when_exists()
        {
            _sitemaps.Add("foo", new XmlSiteMap());

            Assert.True(_sitemaps.ContainsKey("foo"));
        }

        [Fact]
        public void CopyTo_should_copy_correct_items()
        {
            _sitemaps.Add("foo", new XmlSiteMap());
            _sitemaps.Add("bar", new XmlSiteMap());

            KeyValuePair<string, SiteMapBase>[] array = new KeyValuePair<string, SiteMapBase>[2];

            _sitemaps.CopyTo(array, 0);

            array.Each(item => Assert.True(_sitemaps.Contains(item)));
        }

        [Fact]
        public void GetEnumerator_should_return_correct_iterator()
        {
            _sitemaps.Add("foo", new XmlSiteMap());

            IEnumerator<KeyValuePair<string, SiteMapBase>> iterator = _sitemaps.GetEnumerator();

            bool iterated = false;

            while (iterator.MoveNext())
            {
                iterated = true;
                break;
            }

            Assert.True(iterated);
        }

        [Fact]
        public void Remove_with_key_value_pair_should_return_true_when_removed()
        {
            KeyValuePair<string, SiteMapBase> pair = new KeyValuePair<string, SiteMapBase>("foo", new XmlSiteMap());

            _sitemaps.Add(pair);

            Assert.True(_sitemaps.Remove(pair));
        }

        [Fact]
        public void Remove_should_return_true_when_removed()
        {
            _sitemaps.Add("foo", new XmlSiteMap());

            Assert.True(_sitemaps.Remove("foo"));
        }

        [Fact]
        public void TryGetValue_should_retunr_true_when_item_not_exist()
        {
            SiteMapBase siteMap;

            Assert.False(_sitemaps.TryGetValue("foo", out siteMap));
        }

        [Fact]
        public void Generic_GetEnumerator_should_return_correct_iterator()
        {
            _sitemaps.Add("foo", new XmlSiteMap());

            bool iterated = false;

            IEnumerable iterator = _sitemaps;

            #pragma warning disable 168
            foreach(var obj in iterator)
            #pragma warning restore 168
            {
                iterated = true;
                break;
            }

            Assert.True(iterated);
        }
    }
}