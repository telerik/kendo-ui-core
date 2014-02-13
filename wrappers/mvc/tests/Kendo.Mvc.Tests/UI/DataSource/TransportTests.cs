namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.UI;
    using System;
    using System.Collections.Generic;
    using Xunit;

    public class TransportTests
    {
        private Transport transport; 
        private readonly Func<object, object> nullFunc;
        private readonly string handlerName;
        private readonly Dictionary<string, object> customSettings;
        private readonly ClientHandlerDescriptor customHandler;

        public TransportTests()
        {
            transport = new Transport();
            handlerName = "handler";
            nullFunc = (o) => null;
            customSettings = new Dictionary<string, object>();
            customSettings.Add("beforeSend", "ClientHandlerDescriptor for example");
            customHandler = new ClientHandlerDescriptor();
            customHandler.HandlerName = "SomeHandler";
        }

        [Fact]
        public void Prefix_is_not_serialized_if_serializeEmptyprefix_is_false()
        {
            transport.SerializeEmptyPrefix = false;

            var result = (IDictionary<string,object>)transport.ToJson();

            result.ContainsKey("prefix").ShouldBeFalse();
        }


        [Fact]
        public void ParameterMap_with_string_should_set_HandlerName()
        {
            transport.ParameterMap.HandlerName = handlerName;

            var result = transport.ToJson();
            ((ClientHandlerDescriptor)result["parameterMap"]).HandlerName.ShouldEqual(handlerName);
        }

        [Fact]
        public void ParameterMap_with_Func_should_set_TemplateDelegate()
        {
            transport.ParameterMap.TemplateDelegate = nullFunc;

            var result = transport.ToJson();
            ((ClientHandlerDescriptor)result["parameterMap"]).TemplateDelegate.ShouldEqual(nullFunc);
        }

        [Fact]
        public void ParameterMap_should_not_be_serialized_if_not_set()
        {
            var result = transport.ToJson();

            result.ContainsKey("parameterMap").ShouldBeFalse();
        }

        [Fact]
        public void CustomRead_option_is_serialized_correctly()
        {
            transport.CustomRead = customSettings;

            var result = transport.ToJson();
            result["read"].ShouldEqual(customSettings);
        }

        [Fact]
        public void Only_CustomRead_option_is_serialized_when_is_set()
        {
            transport.Read.Url = "someUrl";
            transport.CustomRead = customSettings;

            var result = transport.ToJson();
            result["read"].ShouldEqual(customSettings);
        }

        [Fact]
        public void FunctionRead_option_is_serialized_correctly()
        {
            transport.FunctionRead = customHandler;

            var result = transport.ToJson();
            result["read"].ShouldEqual(customHandler);
        }

        [Fact]
        public void Only_FunctionRead_option_is_serialized_when_is_set()
        {
            transport.Read.Url = "someUrl";
            transport.FunctionRead = customHandler;

            var result = transport.ToJson();
            result["read"].ShouldEqual(customHandler);
        }

        [Fact]
        public void CustomCreate_option_is_serialized_correctly()
        {
            transport.CustomCreate = customSettings;

            var result = transport.ToJson();
            result["create"].ShouldEqual(customSettings);
        }

        [Fact]
        public void Only_CustomCreate_option_is_serialized_when_is_set()
        {
            transport.Create.Url = "someUrl";
            transport.CustomCreate = customSettings;

            var result = transport.ToJson();
            result["create"].ShouldEqual(customSettings);
        }

        [Fact]
        public void FunctionCreate_option_is_serialized_correctly()
        {
            transport.FunctionCreate = customHandler;

            var result = transport.ToJson();
            result["create"].ShouldEqual(customHandler);
        }

        [Fact]
        public void Only_FunctionCreate_option_is_serialized_when_is_set()
        {
            transport.Create.Url = "someUrl";
            transport.FunctionCreate = customHandler;

            var result = transport.ToJson();
            result["create"].ShouldEqual(customHandler);
        }

        [Fact]
        public void CustomUpdate_option_is_serialized_correctly()
        {
            transport.CustomUpdate = customSettings;

            var result = transport.ToJson();
            result["update"].ShouldEqual(customSettings);
        }

        [Fact]
        public void Only_CustomUpdate_option_is_serialized_when_is_set()
        {
            transport.Update.Url = "someUrl";
            transport.CustomUpdate = customSettings;

            var result = transport.ToJson();
            result["update"].ShouldEqual(customSettings);
        }

        [Fact]
        public void FunctionUpdate_option_is_serialized_correctly()
        {
            transport.FunctionUpdate = customHandler;

            var result = transport.ToJson();
            result["update"].ShouldEqual(customHandler);
        }

        [Fact]
        public void Only_FunctionUpdate_option_is_serialized_when_is_set()
        {
            transport.Update.Url = "someUrl";
            transport.FunctionUpdate = customHandler;

            var result = transport.ToJson();
            result["update"].ShouldEqual(customHandler);
        }

        [Fact]
        public void CustomDestroy_option_is_serialized_correctly()
        {
            transport.CustomDestroy = customSettings;

            var result = transport.ToJson();
            result["destroy"].ShouldEqual(customSettings);
        }

        [Fact]
        public void Only_CustomDestroy_option_is_serialized_when_is_set()
        {
            transport.Destroy.Url = "someUrl";
            transport.CustomDestroy = customSettings;

            var result = transport.ToJson();
            result["destroy"].ShouldEqual(customSettings);
        }

        [Fact]
        public void FunctionDestroy_option_is_serialized_correctly()
        {
            transport.FunctionDestroy = customHandler;

            var result = transport.ToJson();
            result["destroy"].ShouldEqual(customHandler);
        }

        [Fact]
        public void Only_FunctionDestroy_option_is_serialized_when_is_set()
        {
            transport.Destroy.Url = "someUrl";
            transport.FunctionDestroy = customHandler;

            var result = transport.ToJson();
            result["destroy"].ShouldEqual(customHandler);
        }

    }
}
