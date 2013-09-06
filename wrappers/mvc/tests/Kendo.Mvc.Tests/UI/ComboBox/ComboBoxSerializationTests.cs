namespace Kendo.Mvc.UI.Tests.Upload
{
    using Kendo.Mvc.UI;
    using Moq;
    using System.Globalization;
    using System.IO;
    using System.Web.Mvc;
    using Xunit;

    public class ComboBoxSerializationTests
    {
        private readonly ComboBox combobox;
        private readonly Mock<TextWriter> textWriter;
        private string output;
        private Mock<IValueProvider> valueProvider;

        public ComboBoxSerializationTests()
        {
            textWriter = new Mock<TextWriter>();
            textWriter.Setup(tw => tw.Write(It.IsAny<string>())).Callback<string>(s => output += s);
            valueProvider = new Mock<IValueProvider>();

            combobox = ComboBoxTestHelper.CreateComboBoxWithValueProider(valueProvider);
            combobox.Name = "combobox";
        }

        [Fact]
        public void ComboBox_returns_posted_selected_text_if_widget_has_value()
        {
            combobox.Value = "1";
            valueProvider.Setup(v => v.GetValue("combobox_input")).Returns(new ValueProviderResult("test", "test", new CultureInfo("en-US")));

            combobox.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("jQuery(function(){jQuery(\"#combobox\").kendoComboBox({\"text\":\"test\"});});");
        }

        [Fact]
        public void ComboBox_does_not_return_selected_text_if_widget_has_no_value()
        {
            valueProvider.Setup(v => v.GetValue("combobox_input")).Returns(new ValueProviderResult("test", "test", new CultureInfo("en-US")));

            combobox.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("jQuery(function(){jQuery(\"#combobox\").kendoComboBox({});});");
        }
    }
}