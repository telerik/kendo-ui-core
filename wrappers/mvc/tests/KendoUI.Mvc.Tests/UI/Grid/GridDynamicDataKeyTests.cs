#if MVC3
namespace Telerik.Web.Mvc.UI.Tests 
{
    using Telerik.Web.Mvc.Extensions;
    using Xunit;

    public class GridDynamicDataKeyTests
    {
        [Fact]
        public void Should_retrive_value_from_given_dynamic_instance()
        {
            const string memberName = "Name";
            const string expectedValue = "Name1";

            dynamic customer = new Customer { Name = expectedValue };

            string value = new GridDynamicDataKey(memberName, ExpressionBuilder.Expression<dynamic, object>(memberName))
                .GetValue(customer);

            value.ShouldEqual(expectedValue);
        }

        [Fact]
        public void Should_return_html_for_hidden_field()
        {
            const string memberName = "Name";
            const string expectedValue = "Name1";

            dynamic customer = new Customer { Name = expectedValue };

            string htmlResult = new GridDynamicDataKey(memberName,
                                                       ExpressionBuilder.Expression<dynamic, object>(memberName))
                                    .HiddenFieldHtml(TestHelper.CreateHtmlHelper<object>(customer));

            htmlResult.ShouldEqual(
                "<input name=\"{0}\" type=\"hidden\" value=\"{1}\" />"
                    .FormatWith(memberName, expectedValue)
                );
        }
    }
}
#endif