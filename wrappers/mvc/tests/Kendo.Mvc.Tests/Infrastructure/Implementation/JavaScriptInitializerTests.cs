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
            initializer.Serialize(data).ShouldEqual("{\"foo\":\"bar\"}");
        }

        [Fact]
        public void Should_serialize_int()
        {
            int foo = 1;
            data["foo"] = foo;
            initializer.Serialize(data).ShouldEqual("{\"foo\":1}");
        }

        [Fact]
        public void Should_serialize_guid()
        {
            Guid foo = new Guid("76c360e8-c796-4906-a611-45401ee0df7c");
            data["foo"] = foo;
            initializer.Serialize(data).ShouldEqual("{\"foo\":\"76c360e8-c796-4906-a611-45401ee0df7c\"}");
        }

        [Fact]
        public void Should_escape_strings()
        {
            data["foo"] = "\nbar";
            initializer.Serialize(data).ShouldEqual("{\"foo\":\"\\nbar\"}");
        }

        [Fact]
        public void Should_serialize_nested_dictionaries()
        {
            data["foo"] = new Dictionary<string, object> () { { "bar", "bar" } };

            initializer.Serialize(data).ShouldEqual("{\"foo\":{\"bar\":\"bar\"}}");
        }

        [Fact]
        public void Should_output_init_statement()
        {
            data["foo"] = "foo";
            initializer.Initialize("#foo", "Foo", data).ShouldEqual("jQuery(function(){jQuery(\"#foo\").kendoFoo({\"foo\":\"foo\"});});");
        }

        [Fact]
        public void Should_escape_invalid_selector_characters_in_the_id()
        {
            data["foo"] = "foo";
            initializer.Initialize("#foo.bar[0]", "Foo", data).ShouldEqual("jQuery(function(){jQuery(\"#foo\\\\.bar\\\\[0\\\\]\").kendoFoo({\"foo\":\"foo\"});});");
        }

        [Fact]
        public void Should_output_init_statement_with_selector()
        {
            data["foo"] = "foo";
            initializer.InitializeFor("#foo", "Foo", data).ShouldEqual("jQuery(function(){jQuery(\"#foo\").kendoFoo({\"foo\":\"foo\"});});");
        }

        [Fact]
        public void Should_not_escape_invalid_selector_characters_in_the_selector()
        {
            data["foo"] = "foo";
            initializer.InitializeFor("#foo.bar[0]", "Foo", data).ShouldEqual("jQuery(function(){jQuery(\"#foo.bar[0]\").kendoFoo({\"foo\":\"foo\"});});");
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

            initializer.Serialize(data).ShouldEqual("{\"foo\":[\"foo\"]}");
        }

        [Fact]
        public void Should_serialize_boolean()
        {
            data["foo"] = true;

            initializer.Serialize(data).ShouldEqual("{\"foo\":true}");
        }

        [Fact]
        public void Should_serialize_decimal()
        {
            decimal foo = 12.3M;
            data["foo"] = foo;

            initializer.Serialize(data).ShouldEqual("{\"foo\":12.3}");
        }

        [Fact]
        public void Should_serialize_double()
        {
            double foo = 12.3;
            data["foo"] = foo;

            initializer.Serialize(data).ShouldEqual("{\"foo\":12.3}");
        }

        [Fact]
        public void Should_serialize_float()
        {
            float foo = 12.3f;
            data["foo"] = foo;

            initializer.Serialize(data).ShouldEqual("{\"foo\":12.3}");
        }

        [Fact]
        public void Should_serialize_date()
        {
            data["foo"] = new DateTime(2000, 1, 1, 1, 1, 1, 1);

            initializer.Serialize(data).ShouldEqual("{\"foo\":new Date(2000,0,1,1,1,1,1)}");
        }

        [Fact]
        public void Should_serialize_array_of_dates()
        {
            data["dates"] = new List<DateTime> { new DateTime(2000, 1, 1, 1, 1, 1, 1) };

            initializer.Serialize(data).ShouldEqual("{\"dates\":[new Date(2000,0,1,1,1,1,1)]}");
        }

        [Fact]
        public void Should_serialize_array_of_dates_without_a_comma_at_the_end()
        {
            data["dates"] = new List<DateTime> { new DateTime(2000, 1, 1, 1, 1, 1, 1), new DateTime(2010, 1, 1, 1, 1, 1, 1), new DateTime(2020, 1, 1, 1, 1, 1, 1) };

            initializer.Serialize(data).ShouldEqual("{\"dates\":[new Date(2000,0,1,1,1,1,1),new Date(2010,0,1,1,1,1,1),new Date(2020,0,1,1,1,1,1)]}");
        }

        [Fact]
        public void Should_serialize_array_of_dates_as_empty_array()
        {
            data["dates"] = new List<DateTime>();

            initializer.Serialize(data).ShouldEqual("{\"dates\":[]}");
        }

        [Fact]
        public void Should_serialize_null()
        {
            data["foo"] = null;

            initializer.Serialize(data).ShouldEqual("{\"foo\":null}");
        }

        [Fact]
        public void Should_serialize_client_event_handler_name()
        {
            data["foo"] = new ClientHandlerDescriptor
                {
                    HandlerName = "bar"
                };

            initializer.Serialize(data).ShouldEqual("{\"foo\":bar}");
        }

        [Fact]
        public void Should_serialize_nested_object_client_event_handler_name_within_an_array()
        {
            var nested = new Dictionary<string, object>() 
            {
                { "bar", new ClientHandlerDescriptor { HandlerName = "baz" } }
            };

            data["foo"] = new[] { nested };

            initializer.Serialize(data).ShouldEqual("{\"foo\":[{\"bar\":baz}]}");
        }

        [Fact]
        public void Should_serialize_comma_separated_key_value_pairs()
        {
            data["foo"] = null;
            data["bar"] = null;

            initializer.Serialize(data).ShouldEqual("{\"foo\":null,\"bar\":null}");
        }

        [Fact]
        public void Should_serialize_client_event_inline_handler()
        {
            data["foo"] = new ClientHandlerDescriptor
                {
                    TemplateDelegate = delegate (object x) {
                        return "function(){}";
                    }
                };

            initializer.Serialize(data).ShouldEqual("{\"foo\":function(){}}");
        }

        private enum FooEnum
        {
            Bar
        }

        [Fact]
        public void Should_serialize_enum_value()
        {
            data["foo"] = FooEnum.Bar;

            initializer.Serialize(data).ShouldEqual("{\"foo\":\"bar\"}");
        }

        [Fact]
        public void Should_serialize_objects()
        {
            data["foo"] = new { bar = "baz" };

            initializer.Serialize(data).ShouldEqual("{\"foo\":{\"bar\":\"baz\"}}");
        }
    }
}


