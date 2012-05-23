using System;
using System.Collections.Generic;
using System.Linq;
using Moq;
using Xunit;

namespace Kendo.Mvc.Infrastructure.Implementation.Tests
{
    public class JavaScriptInitializerTests
    {
        private readonly JavaScriptInitializer initializer;
        private readonly Dictionary<string, object> data;

        public JavaScriptInitializerTests()
        {
            initializer = new JavaScriptInitializer();
            data = new Dictionary<string, object>();
        }

        [Fact]
        public void Should_serialize_empty_object()
        {
            initializer.Serialize(data).ShouldEqual("{}");
        }

        [Fact]
        public void Should_serialize_string()
        {
            data["foo"] = "bar";
            initializer.Serialize(data).ShouldEqual("{foo:\"bar\"}");
        }

        [Fact]
        public void Should_serialize_int()
        {
            int foo = 1;
            data["foo"] = foo;
            initializer.Serialize(data).ShouldEqual("{foo:1}");
        }

        [Fact]
        public void Should_escape_strings()
        {
            data["foo"] = "\nbar";
            initializer.Serialize(data).ShouldEqual("{foo:\"\\nbar\"}");
        }

        [Fact]
        public void Should_serialize_nested_dictionaries()
        {
            data["foo"] = new Dictionary<string, object> () { { "bar", "bar" } };

            initializer.Serialize(data).ShouldEqual("{foo:{bar:\"bar\"}}");
        }

        [Fact]
        public void Should_output_init_statement()
        {
            data["foo"] = "foo";
            initializer.Initialize("foo", "Foo", data).ShouldEqual("jQuery(function(){jQuery(\"#foo\").kendoFoo({foo:\"foo\"});});");
        }

        [Fact]
        public void Should_escape_invalid_selector_characters_in_the_id()
        {
            data["foo"] = "foo";
            initializer.Initialize("foo.bar[0]", "Foo", data).ShouldEqual("jQuery(function(){jQuery(\"#foo\\\\.bar\\\\[0\\\\]\").kendoFoo({foo:\"foo\"});});");
        }

        [Fact]
        public void Should_create_serializer_when_serializing_enumerable()
        {
            data["foo"] = new [] { "foo" };

            var mock = new Mock<JavaScriptInitializer>() { CallBase = true };

            mock.Setup(m => m.CreateSerializer()).Returns(new DefaultJavaScriptSerializer());

            mock.Object.Serialize(data);

            mock.Verify(m => m.CreateSerializer());
        }

        [Fact]
        public void Should_serialize_enumerables_as_array()
        {
            data["foo"] = new [] { "foo" };

            initializer.Serialize(data).ShouldEqual("{foo:[\"foo\"]}");
        }
    }
}


