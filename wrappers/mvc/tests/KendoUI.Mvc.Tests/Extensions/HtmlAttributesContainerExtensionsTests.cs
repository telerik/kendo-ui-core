// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Extensions.Tests
{
    using Moq;
    using System;
    using System.Collections.Generic;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.UI;
    using Xunit;

	public class HtmlAttributesContainerExtensionsTests
	{
        private readonly Mock<IHtmlAttributesContainer> container;
        private readonly IDictionary<string, object> attributes;
        
        public HtmlAttributesContainerExtensionsTests()
        {
            attributes = new Dictionary<string, object>();
            container = new Mock<IHtmlAttributesContainer>();
            container.SetupGet(c => c.HtmlAttributes).Returns(attributes);
        }

        [Fact]
		public void Should_add_a_css_class_to_attributes_collection_if_not_present()
		{
            HtmlAttributesContainerExtensions.AppendCssClass(container.Object, "foo");
            
			Assert.Equal("foo", attributes["class"]);
		}        
        
        [Fact]
		public void Should_append_class_to_existing_one()
		{
            attributes["class"] = "foo";
            
            HtmlAttributesContainerExtensions.AppendCssClass(container.Object, "bar");
            
			Assert.Equal("foo bar", attributes["class"]);
		}

        [Fact]
        public void Prepend_should_add_class_if_not_present()
        {
            HtmlAttributesContainerExtensions.PrependCssClass(container.Object, "foo");

            Assert.Equal("foo", attributes["class"]);
        }

        [Fact]
        public void Should_prepend_class_to_existing_one()
        {
            attributes["class"] = "foo";

            HtmlAttributesContainerExtensions.PrependCssClass(container.Object, "bar");

            Assert.Equal("bar foo", attributes["class"]);
        }

        [Fact]
        public void Should_not_throw_if_class_is_not_present()
        {
            Assert.DoesNotThrow(() => HtmlAttributesContainerExtensions.ThrowIfClassIsPresent(container.Object, "foo", "bar"));
        }        
        
        [Fact]
        public void Should_not_throw_if_class_is_null()
        {
            attributes["class"] = null;
            Assert.DoesNotThrow(() => HtmlAttributesContainerExtensions.ThrowIfClassIsPresent(container.Object, "foo", "bar"));
        }        
        
        [Fact]
        public void Should_not_throw_if_class_does_not_contain_argument()
        {
            attributes["class"] = "";
            Assert.DoesNotThrow(() => HtmlAttributesContainerExtensions.ThrowIfClassIsPresent(container.Object, "foo", "bar"));
        }        
        
        [Fact]
        public void Should_throw_if_class_contains_completely_the_argument()
        {
            attributes["class"] = "foo";
            Assert.Throws<NotSupportedException>(() => HtmlAttributesContainerExtensions.ThrowIfClassIsPresent(container.Object, "foo", "bar"));
        }

        [Fact]
        public void Should_not_throw_if_class_contains_partially_the_argument()
        {
            attributes["class"] = "foos";
            Assert.DoesNotThrow(() => HtmlAttributesContainerExtensions.ThrowIfClassIsPresent(container.Object, "foo", "bar"));
        }

    }
}