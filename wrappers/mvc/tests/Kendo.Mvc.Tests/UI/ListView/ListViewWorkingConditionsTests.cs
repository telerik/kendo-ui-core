namespace Kendo.Mvc.UI.Tests.ListView
{

    using System;
    using Xunit;

    public class ListViewWorkingConditionsTests
    {
        private readonly ListView<Customer> listView;
        private readonly Customer customer;

        public ListViewWorkingConditionsTests()
        {
            listView = ListViewTestHelper.CreateListView<Customer>();

            customer = new Customer { Id = 1, Name = "John Doe" };
            listView.DataSource.Data = new[] { customer };
        }

        [Fact]
        public void Should_throw_when_ClientTemplateId_is_not_set()
        {                        
            Assert.Throws<NotSupportedException>(() => listView.VerifySettings());
        }

        [Fact]
        public void Should_throw_when_WrapperTagName_is_not_set()
        {
            listView.ClientTemplateId = "foo";
            listView.TagName = string.Empty;
            Assert.Throws<NotSupportedException>(() => listView.VerifySettings());
        }
    }
}
