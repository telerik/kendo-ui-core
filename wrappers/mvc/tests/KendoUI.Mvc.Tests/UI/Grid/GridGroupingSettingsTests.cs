
namespace Telerik.Web.Mvc.UI.Tests
{
    using System.Linq;

    using Xunit;
    
    public class GridGroupingSettingsTests
    {
        [Fact]
        public void Should_serialize_group_descriptors()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            ((IGridBindingContext)grid).GroupDescriptors.Add(new GroupDescriptor
            {
                Member = "Id"
            });

            var groupDescriptors = grid.Grouping.SerializeDescriptors();

            Assert.Equal("Id", groupDescriptors.First()["member"]);
            Assert.Equal("Id", groupDescriptors.First()["title"]);
            Assert.Equal("asc", groupDescriptors.First()["order"]);
        }

        [Fact]
        public void Should_serialize_group_expression()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            ((IGridBindingContext)grid).GroupDescriptors.Add(new GroupDescriptor
            {
                Member = "Id"
            });
            Assert.Equal("Id-asc", grid.Grouping.SerializeExpression());
        }
    }
}
