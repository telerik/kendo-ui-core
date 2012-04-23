namespace Telerik.Web.Mvc.UI.Tests
{
    using Moq;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using Xunit;

    public class ComboBoxRenderingTests
    {
        private readonly ComboBox comboBox;
        private readonly Mock<IDropDownHtmlBuilder> builder;
        private readonly Mock<IHtmlNode> rootTag;
        private readonly Mock<IHtmlNode> input;
        private readonly Mock<IHtmlNode> button;
        Mock<TextWriter> textWriter;

        public ComboBoxRenderingTests()
        {
            builder = new Mock<IDropDownHtmlBuilder>();
            rootTag = new Mock<IHtmlNode>();
            rootTag.SetupGet(t => t.Children).Returns(() => new List<IHtmlNode>());

            input = new Mock<IHtmlNode>();
            input.Setup(t => t.AppendTo(It.IsAny<IHtmlNode>())).Returns(input.Object);

            button = new Mock<IHtmlNode>();
            button.Setup(t => t.AppendTo(It.IsAny<IHtmlNode>())).Returns(button.Object);

            builder.Setup(t => t.Build()).Returns(rootTag.Object);
            builder.Setup(t => t.InnerContentTag()).Returns(button.Object);

            comboBox = ComboBoxTestHelper.CreateComboBox();
            comboBox.Name = "comboBox";

            textWriter = new Mock<TextWriter>();
        }

        [Fact]
        public void Render_method_should_set_selectedIndex_depending_on_returned_value_from_ValueProvider()
        {
            comboBox.Name = "DropDownList1";
            comboBox.Items.Add(new DropDownItem { Text = "Item1", Value = "1" });
            comboBox.Items.Add(new DropDownItem { Text = "Item2", Value = "2" });
            comboBox.Items.Add(new DropDownItem { Text = "Item3", Value = "3" });
            comboBox.SelectedIndex = 0;

            comboBox.ViewContext.ViewData.Add("DropDownList1", "3");

            comboBox.Render();

            Assert.Equal(2, comboBox.SelectedIndex);
        }

        [Fact]
        public void ObjectWriter_should_call_objectWriter_Start_method()
        {
            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.Start());

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.Start());
        }

        [Fact]
        public void ObjectWriter_should_call_objectWriter_complete_method()
        {
            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.Complete());

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.Complete());
        }

        [Fact]
        public void ObjectWriter_should_call_appendObject_when_ajax_settings_are_provided()
        {
            comboBox.DataBinding.Ajax.Enabled = true;

            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.AppendObject("ajax", It.IsAny<object>()));

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.AppendObject("ajax", It.IsAny<object>()));
        }

        [Fact]
        public void ObjectWriter_should_call_appendObject_when_ws_settings_are_provided()
        {
            comboBox.DataBinding.WebService.Enabled = true;

            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.AppendObject("ws", It.IsAny<object>()));

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.AppendObject("ws", It.IsAny<object>()));
        }

        [Fact]
        public void ObjectWriter_should_call_append_cache_time_when_loadOnDemand_is_enabled()
        {
            comboBox.DataBinding.Ajax.Enabled = true;

            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.Append("cache", It.IsAny<bool>(), It.IsAny<bool>()));

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.Append("cache", It.IsAny<bool>(), It.IsAny<bool>()));
        }

        [Fact]
        public void ObjectWriter_should_call_append_delay_time_when_loadOnDemand_is_enabled()
        {
            comboBox.DataBinding.Ajax.Enabled = true;

            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.Append("delay", It.IsAny<int>(), It.IsAny<int>()));

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.Append("delay", It.IsAny<int>(), It.IsAny<int>()));
        }

        [Fact]
        public void ObjectWriter_should_never_call_appendObject_for_items_when_collection_is_empty()
        {
            comboBox.Items.Clear();

            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.AppendObject("data", It.IsAny<object>()));

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.AppendObject("data", It.IsAny<object>()), Times.Never());
        }
        
        [Fact]
        public void ObjectWriter_should_call_append_if_selectedIndex_is_not_negative()
        {
            comboBox.SelectedIndex = 1;

            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.Append("index", It.IsAny<int>(), -1));

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.Append("index", It.IsAny<int>(), -1));
        }        
        
        [Fact]
        public void ObjectWriter_should_append_Load_property_of_clientEvents()
        {
            comboBox.ClientEvents.OnLoad.CodeBlock = () => { };

            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onLoad", comboBox.ClientEvents.OnLoad)).Verifiable();

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onLoad", comboBox.ClientEvents.OnLoad));
        }

        [Fact]
        public void ObjectWriter_should_append_Select_property_of_clientEvents()
        {
            comboBox.ClientEvents.OnChange.CodeBlock = () => { };

            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onChange", comboBox.ClientEvents.OnChange)).Verifiable();

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onChange", comboBox.ClientEvents.OnChange));
        }

        [Fact]
        public void ObjectWriter_should_append_PopUpOpen_property_of_clientEvents()
        {
            comboBox.ClientEvents.OnOpen.CodeBlock = () => { };

            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onOpen", comboBox.ClientEvents.OnOpen)).Verifiable();

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onOpen", comboBox.ClientEvents.OnOpen));
        }

        [Fact]
        public void ObjectWriter_should_append_PopUpClose_property_of_clientEvents()
        {
            comboBox.ClientEvents.OnClose.CodeBlock = () => { };

            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onClose", comboBox.ClientEvents.OnClose)).Verifiable();

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onClose", comboBox.ClientEvents.OnClose));
        }

        [Fact]
        public void ObjectWriter_should_append_databinding_property_of_clientEvents()
        {
            comboBox.ClientEvents.OnDataBinding.CodeBlock = () => { };

            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onDataBinding", comboBox.ClientEvents.OnDataBinding)).Verifiable();

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onDataBinding", comboBox.ClientEvents.OnDataBinding));
        }

        [Fact]
        public void ObjectWriter_should_append_databound_property_of_clientEvents()
        {
            comboBox.ClientEvents.OnDataBound.CodeBlock = () => { };

            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onDataBound", comboBox.ClientEvents.OnDataBound)).Verifiable();

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onDataBound", comboBox.ClientEvents.OnDataBound));
        }

        [Fact]
        public void ObjectWriter_should_call_append_if_DropDownHtmlAttributes_are_set()
        {
            comboBox.DropDownHtmlAttributes.Add("height", "100px");

            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.Append("dropDownAttr", It.IsAny<string>()));

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.Append("dropDownAttr", It.IsAny<string>()));
        }

        [Fact]
        public void ObjectWriter_should_call_append_to_serialize_filterType_if_Filtering_is_enabled()
        {
            comboBox.Filtering.Enabled = true;

            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.Append("filter", It.IsAny<int>()));

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.Append("filter", It.IsAny<int>()));
        }

        [Fact]
        public void ObjectWriter_should_call_append_to_serialize_minChars__if_Filtering_is_enabled()
        {
            comboBox.Filtering.Enabled = true;

            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.Append("minChars", It.IsAny<int>(), It.IsAny<int>()));

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.Append("minChars", It.IsAny<int>(), It.IsAny<int>()));
        }

        [Fact]
        public void ObjectWriter_should_call_append_to_serialize_autoFill_property()
        {
            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.Append("autoFill", It.IsAny<bool>(), It.IsAny<bool>()));

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.Append("autoFill", It.IsAny<bool>(), It.IsAny<bool>()));
        }

        [Fact]
        public void ObjectWriter_should_call_append_to_serialize_HighlightFirstMatch_property()
        {
            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.Append("highlightFirst", It.IsAny<bool>(), It.IsAny<bool>()));

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.Append("highlightFirst", It.IsAny<bool>(), It.IsAny<bool>()));
        }

        [Fact]
        public void ObjectWriter_should_call_append_for_Encoded_property()
        {
            ComboBoxTestHelper.clientSideObjectWriter.Setup(w => w.Append("encoded", It.IsAny<bool>(), true));

            comboBox.WriteInitializationScript(textWriter.Object);

            ComboBoxTestHelper.clientSideObjectWriter.Verify(w => w.Append("encoded", It.IsAny<bool>(), true));
        }
    }
}