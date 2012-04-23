namespace Telerik.Web.Mvc.UI.Tests
{
    using Moq;
    using System.IO;
    using System.Collections.Generic;
    using Xunit;

    public class AutoCompleteRenderingTests
    {
        private readonly AutoComplete AutoComplete;
        private readonly Mock<IAutoCompleteHtmlBuilder> builder;
        private readonly Mock<IHtmlNode> rootTag;
        Mock<TextWriter> textWriter;

        public AutoCompleteRenderingTests()
        {
            builder = new Mock<IAutoCompleteHtmlBuilder>();
            rootTag = new Mock<IHtmlNode>();
            rootTag.SetupGet(t => t.Children).Returns(() => new List<IHtmlNode>());

            AutoComplete = AutoCompleteTestHelper.CreateAutocomplete();
            AutoComplete.Name = "Autocomplete";

            textWriter = new Mock<TextWriter>();
        }

        [Fact]
        public void ObjectWriter_should_call_objectWriter_Start_method()
        {
            AutoCompleteTestHelper.clientSideObjectWriter.Setup(w => w.Start());

            AutoComplete.WriteInitializationScript(textWriter.Object);

            AutoCompleteTestHelper.clientSideObjectWriter.Verify(w => w.Start());
        }

        [Fact]
        public void ObjectWriter_should_call_objectWriter_complete_method()
        {
            AutoCompleteTestHelper.clientSideObjectWriter.Setup(w => w.Complete());

            AutoComplete.WriteInitializationScript(textWriter.Object);

            AutoCompleteTestHelper.clientSideObjectWriter.Verify(w => w.Complete());
        }

        [Fact]
        public void Should_serialize_client_events()
        {
            var Autocomplete = AutoCompleteTestHelper.CreateAutocomplete();
            Autocomplete.ClientEvents.OnDataBinding.CodeBlock = Autocomplete.ClientEvents.OnDataBound.CodeBlock =
                Autocomplete.ClientEvents.OnError.CodeBlock = Autocomplete.ClientEvents.OnLoad.CodeBlock =
                Autocomplete.ClientEvents.OnChange.CodeBlock = Autocomplete.ClientEvents.OnOpen.CodeBlock =
                Autocomplete.ClientEvents.OnClose.CodeBlock = () => { };

            var writer = AutoCompleteTestHelper.clientSideObjectWriter;

            writer.Setup(w => w.AppendClientEvent("onLoad", It.IsAny<ClientEvent>()));
            writer.Setup(w => w.AppendClientEvent("onChange", It.IsAny<ClientEvent>()));
            writer.Setup(w => w.AppendClientEvent("onOpen", It.IsAny<ClientEvent>()));
            writer.Setup(w => w.AppendClientEvent("onClose", It.IsAny<ClientEvent>()));
            writer.Setup(w => w.AppendClientEvent("onDataBinding", It.IsAny<ClientEvent>()));
            writer.Setup(w => w.AppendClientEvent("onDataBound", It.IsAny<ClientEvent>()));
            writer.Setup(w => w.AppendClientEvent("onError", It.IsAny<ClientEvent>()));

            Autocomplete.WriteInitializationScript(textWriter.Object);

            writer.VerifyAll();
        }

        [Fact]
        public void Should_serialize_multiple_values_settings()
        {
            AutoComplete.Multiple.Enabled = true;
            AutoComplete.Multiple.Separator = " ";

            var writer = AutoCompleteTestHelper.clientSideObjectWriter;

            writer.Setup(w => w.Append("multiple", It.IsAny<bool>(), false));
            writer.Setup(w => w.Append("separator", It.IsAny<string>()));

            AutoComplete.WriteInitializationScript(textWriter.Object);

            writer.Verify(w => w.Append("multiple", It.IsAny<bool>(), false));
            writer.Verify(w => w.Append("separator", It.IsAny<string>()));
        }

        [Fact]
        public void Should_not_serialize_multiple_values_separator_if_default()
        {
            var writer = AutoCompleteTestHelper.clientSideObjectWriter;

            writer.Setup(w => w.Append("separator", It.IsAny<string>()));

            AutoComplete.WriteInitializationScript(textWriter.Object);

            writer.Verify(w => w.Append("separator", It.IsAny<string>()), Times.Never());
        }

        [Fact]
        public void ObjectWriter_should_serialize_Items()
        {
            AutoComplete.Items.Add("1");

            AutoCompleteTestHelper.clientSideObjectWriter.Setup(w => w.AppendCollection("data", It.IsAny<IList<string>>()));

            AutoComplete.WriteInitializationScript(textWriter.Object);

            AutoCompleteTestHelper.clientSideObjectWriter.Verify(w => w.AppendCollection("data", It.IsAny<IList<string>>()));
        }

        [Fact]
        public void ObjectWriter_should_serialize_DropDownHtmlAttributes()
        {
            AutoComplete.DropDownHtmlAttributes.Add("width", "200px");

            AutoCompleteTestHelper.clientSideObjectWriter.Setup(w => w.Append("dropDownAttr", It.IsAny<string>()));

            AutoComplete.WriteInitializationScript(textWriter.Object);

            AutoCompleteTestHelper.clientSideObjectWriter.Verify(w => w.Append("dropDownAttr", It.IsAny<string>()));
        }

        [Fact]
        public void ObjectWriter_should_call_append_method_to_serialize_AutoFill_property()
        {
            AutoCompleteTestHelper.clientSideObjectWriter.Setup(w => w.Append("autoFill", It.IsAny<bool>(), It.IsAny<bool>()));

            AutoComplete.WriteInitializationScript(textWriter.Object);

            AutoCompleteTestHelper.clientSideObjectWriter.Verify(w => w.Append("autoFill", It.IsAny<bool>(), It.IsAny<bool>()));
        }

        public void ObjectWriter_should_call_append_method_to_serialize_HighlightFirst_property()
        {
            AutoCompleteTestHelper.clientSideObjectWriter.Setup(w => w.Append("highlightFirst", It.IsAny<bool>(), It.IsAny<bool>()));

            AutoComplete.WriteInitializationScript(textWriter.Object);

            AutoCompleteTestHelper.clientSideObjectWriter.Verify(w => w.Append("highlightFirst", It.IsAny<bool>(), It.IsAny<bool>()));
        }

        [Fact]
        public void ObjectWriter_should_call_appendObject_when_ajax_settings_are_provided()
        {
            AutoComplete.DataBinding.Ajax.Enabled = true;

            AutoCompleteTestHelper.clientSideObjectWriter.Setup(w => w.AppendObject("ajax", It.IsAny<object>()));

            AutoComplete.WriteInitializationScript(textWriter.Object);

            AutoCompleteTestHelper.clientSideObjectWriter.Verify(w => w.AppendObject("ajax", It.IsAny<object>()));
        }

        [Fact]
        public void ObjectWriter_should_call_appendObject_when_ws_settings_are_provided()
        {
            AutoComplete.DataBinding.WebService.Enabled = true;

            AutoCompleteTestHelper.clientSideObjectWriter.Setup(w => w.AppendObject("ws", It.IsAny<object>()));

            AutoComplete.WriteInitializationScript(textWriter.Object);

            AutoCompleteTestHelper.clientSideObjectWriter.Verify(w => w.AppendObject("ws", It.IsAny<object>()));
        }

        [Fact]
        public void ObjectWriter_should_call_append_cache_time_when_loadOnDemand_is_enabled()
        {
            AutoComplete.DataBinding.Ajax.Enabled = true;

            AutoCompleteTestHelper.clientSideObjectWriter.Setup(w => w.Append("cache", It.IsAny<bool>(), It.IsAny<bool>()));

            AutoComplete.WriteInitializationScript(textWriter.Object);

            AutoCompleteTestHelper.clientSideObjectWriter.Verify(w => w.Append("cache", It.IsAny<bool>(), It.IsAny<bool>()));
        }

        [Fact]
        public void ObjectWriter_should_call_append_delay_time_when_loadOnDemand_is_enabled()
        {
            AutoComplete.DataBinding.Ajax.Enabled = true;

            AutoCompleteTestHelper.clientSideObjectWriter.Setup(w => w.Append("delay", It.IsAny<int>(), It.IsAny<int>()));

            AutoComplete.WriteInitializationScript(textWriter.Object);

            AutoCompleteTestHelper.clientSideObjectWriter.Verify(w => w.Append("delay", It.IsAny<int>(), It.IsAny<int>()));
        }

        [Fact]
        public void ObjectWriter_should_call_append_to_serialize_filterType_if_Filtering_is_enabled()
        {
            AutoCompleteTestHelper.clientSideObjectWriter.Setup(w => w.Append("filter", It.IsAny<int>()));

            AutoComplete.WriteInitializationScript(textWriter.Object);

            AutoCompleteTestHelper.clientSideObjectWriter.Verify(w => w.Append("filter", It.IsAny<int>()));
        }

        [Fact]
        public void ObjectWriter_should_call_append_to_serialize_minChars__if_Filtering_is_enabled()
        {
            AutoCompleteTestHelper.clientSideObjectWriter.Setup(w => w.Append("minChars", It.IsAny<int>(), It.IsAny<int>()));

            AutoComplete.WriteInitializationScript(textWriter.Object);

            AutoCompleteTestHelper.clientSideObjectWriter.Verify(w => w.Append("minChars", It.IsAny<int>(), It.IsAny<int>()));
        }

        [Fact]
        public void ObjectWriter_should_call_append_for_Encoded_property()
        {
            AutoCompleteTestHelper.clientSideObjectWriter.Setup(w => w.Append("encoded", It.IsAny<bool>(), true));

            AutoComplete.WriteInitializationScript(textWriter.Object);

            AutoCompleteTestHelper.clientSideObjectWriter.Verify(w => w.Append("encoded", It.IsAny<bool>(), true));
        }
    }
}