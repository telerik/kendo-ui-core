#if MVC2 || MVC3
namespace Telerik.Web.Mvc.UI.Tests 
{
    using System.Data;
    using Telerik.Web.Mvc.Extensions;
    using Xunit;

    public class GridRowViewDataKeyTests
    {
        [Fact]
        public void Should_retrive_value_from_given_dataRowView_instance()
        {
            const string memberName = "Kind";
            const string expectedValue = "Cat";

            DataTable dataTable = GetDataTable(memberName, expectedValue);

            new GridRowViewDataKey(memberName)
                .GetValue(dataTable.DefaultView[0])
                .ShouldEqual(expectedValue);
        }

        [Fact]
        public void Should_return_html_for_hidden_field()
        {
            const string memberName = "Kind";
            const string expectedValue = "Cat";

            DataTable dataTable = GetDataTable(memberName, expectedValue);

            new GridRowViewDataKey(memberName)
                .HiddenFieldHtml(TestHelper.CreateHtmlHelper(dataTable.DefaultView[0]))
                .ShouldEqual(
                            "<input name=\"{0}\" type=\"hidden\" value=\"{1}\" />"
                            .FormatWith(memberName, expectedValue)
                            );
        }

        private DataTable GetDataTable(string memberName, string firstRowValue)
        {
            var dataTable = new DataTable();
            dataTable.Columns.Add("Name");
            dataTable.Columns.Add(memberName);
            dataTable.Rows.Add("Tom", firstRowValue);
            dataTable.Rows.Add("Jerry", "Mouse");
            return dataTable;
        }
    }
}
#endif