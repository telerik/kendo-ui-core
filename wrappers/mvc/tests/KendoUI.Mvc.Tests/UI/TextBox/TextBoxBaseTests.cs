namespace Telerik.Web.Mvc.UI.Tests
{
    using System.Web.Mvc;
    using Xunit;

    public class TextBoxBaseTests
    {
        private TextBoxBase<int> input;
        private ViewContext viewContext;

        public TextBoxBaseTests()
        {
            viewContext = TestHelper.CreateViewContext();
            input = TextBoxBaseTestHelper.CreateInput<int>(null, viewContext);
        }

#if MVC2 || MVC3
        [Fact]
        public void If_Name_is_not_set_it_should_be_get_from_TemplateInfo() 
        {
            const string htmlFieldPrefix = "TestPrefix";
            viewContext.ViewData.TemplateInfo.HtmlFieldPrefix = htmlFieldPrefix;

            Assert.DoesNotThrow(() => input.Render());
            Assert.Equal(htmlFieldPrefix, input.Name);
        }
#endif
    }
}
