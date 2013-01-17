namespace Kendo.Mvc.UI.Tests
{
    using System.IO;
    using Kendo.Mvc.UI;
    using Moq;
    using Xunit;
    using System.Collections.Generic;

    public class TooltipSerializationTests
    {
        private readonly Tooltip tooltip;
        private readonly Mock<TextWriter> textWriter;
        private string output;

        public TooltipSerializationTests()
        {
            textWriter = new Mock<TextWriter>();
            textWriter.Setup(tw => tw.Write(It.IsAny<string>())).Callback<string>(s => output += s);

            tooltip = TooltipTestHelper.CreateTooltip();
            tooltip.Container = "#Tooltip";
        }

        [Fact]
        public void Default_configuration_outputs_empty_kendoTooltip_init()
        {
            tooltip.Container = "#Tooltip";
            tooltip.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("jQuery(\"#Tooltip\").kendoTooltip({});");
        }

        [Fact]
        public void Sharps_are_escpaed_if_in_client_template()
        {
            tooltip.Container = "#Tooltip";
            output = tooltip.ToClientTemplate().ToHtmlString();            

            output.ShouldContain("jQuery(\"\\#Tooltip\").kendoTooltip({});");
        }

        [Fact]
        public void Sharps_are_escpaed_if_in_client_template_using_template_blocks()
        {
            tooltip.Container = "#foo[#=Tooltip#]";
            output = tooltip.ToClientTemplate().ToHtmlString();

            output.ShouldContain("jQuery(\"\\#foo[#=Tooltip#]\").kendoTooltip({});");
        }

        [Fact]
        public void Filter_is_serialized()
        {
            tooltip.Filter = "foo";
            tooltip.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"filter\":\"foo\"}");
        }

        [Fact]
        public void Filter_with_sharp_is_escaped_when_in_client_template()
        {
            tooltip.Filter = "#foo";
            output = tooltip.ToClientTemplate().ToString();

            output.ShouldContain("{\"filter\":\"\\\\#foo\"}");
        }   
    }
}