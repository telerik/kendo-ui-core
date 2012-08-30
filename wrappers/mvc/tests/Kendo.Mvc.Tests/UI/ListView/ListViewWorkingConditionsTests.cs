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
            listView.ClientTemplateId = "foo";
        }

        [Fact]
        public void Should_throw_when_ClientTemplateId_is_not_set()
        {
            listView.ClientTemplateId = string.Empty;            
            Assert.Throws<NotSupportedException>(() => listView.VerifySettings());
        }

        [Fact]
        public void Should_throw_when_WrapperTagName_is_not_set()
        {            
            listView.TagName = string.Empty;
            Assert.Throws<NotSupportedException>(() => listView.VerifySettings());
        }

        [Fact]
        public void Should_throw_when_mode_id_not_set_and_editing_enabled()
        {
            listView.Editable.Enabled = true;
            Assert.Throws<NotSupportedException>(() => listView.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_autobind_is_set_with_server_binding()
        {           
            listView.DataSource.Type = DataSourceType.Server;
            listView.AutoBind = true;
            Assert.Throws<NotSupportedException>(() => listView.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_autobind_is_set_with_initial_ajax_binding()
        {            
            listView.DataSource.Data = new Customer[] { new Customer() };
            listView.DataSource.Type = DataSourceType.Ajax;
            listView.AutoBind = false;
            Assert.Throws<NotSupportedException>(() => listView.VerifySettings());
        }

        [Fact]
        public void Should_not_throw_if_autobind_is_set_and_no_data_is_supplied_ajax_binding()
        {
            listView.DataSource.Data = new Customer[] { new Customer() };
            listView.DataSource.Type = DataSourceType.Ajax;
            listView.AutoBind = false;
            Assert.Throws<NotSupportedException>(() => listView.VerifySettings());
        }
    }
}
