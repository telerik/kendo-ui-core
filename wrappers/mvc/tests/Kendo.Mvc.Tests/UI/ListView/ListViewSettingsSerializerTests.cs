namespace Kendo.Mvc.UI.Tests.ListView
{
    using System;
    using Xunit;
    using System.Collections.Generic;
    using Kendo.Mvc;

    public class ListViewSettingsSerializerTests
    {
        private readonly ListView<Customer> listView;
        private readonly ListViewSettingsSerializer<Customer> serializer;       

        public ListViewSettingsSerializerTests()
        {
            listView = ListViewTestHelper.CreateListView<Customer>();
            serializer = new ListViewSettingsSerializer<Customer>(listView);
        }

        [Fact]
        public void ClientTemplateId_should_be_serialized()
        {
            listView.ClientTemplateId = "foo";
            var json = new Dictionary<string, object>();

            serializer.Serialize(json);

            Assert.Equal("kendo.template(jQuery('#foo').html())", ((ClientHandlerDescriptor)json["template"]).HandlerName);
        }

        [Fact]
        public void Navigatable_should_be_serialized_if_set()
        {
            listView.Navigatable = true;
            var json = new Dictionary<string, object>();

            serializer.Serialize(json);

            Assert.Equal("true", json["navigatable"]);
        }

        [Fact]
        public void Navigatable_should_not_be_serialized_if_not_set()
        {
            listView.Navigatable = false;
            var json = new Dictionary<string, object>();

            serializer.Serialize(json);

            Assert.Equal(false, json.ContainsKey("navigatable"));            
        }

        [Fact]
        public void Selection_mode_single_should_be_serialized_if_enabled()
        {
            listView.Selectable.Enabled = true;
            var json = new Dictionary<string, object>();

            serializer.Serialize(json);

            Assert.Equal("single", json["selectable"]);
        }

        [Fact]
        public void Selectio_mode_should_not_be_serialized_when_not_enabled()
        {
            listView.Selectable.Mode = ListViewSelectionMode.Multiple;
            var json = new Dictionary<string, object>();

            serializer.Serialize(json);

            Assert.Equal(false, json.ContainsKey("selectable"));   
        }

        [Fact]
        public void Selection_mode_multiple_should_be_serialized_if_enabled()
        {
            listView.Selectable.Enabled = true;
            listView.Selectable.Mode = ListViewSelectionMode.Multiple;
            var json = new Dictionary<string, object>();

            serializer.Serialize(json);

            Assert.Equal("multiple", json["selectable"]);
        }

        [Fact]
        public void PagerId_should_be_serialized_if_paging_enabled()
        {
            listView.Pageable.Enabled = true;
            var json = new Dictionary<string, object>();

            serializer.Serialize(json);

            Assert.Equal("ListView_pager", ((Dictionary<string, object>)json["pageable"])["pagerId"]);
        }

        [Fact]
        public void Pageable_should_not_be_serialized_when_not_enabled()
        {            
            var json = new Dictionary<string, object>();

            serializer.Serialize(json);

            Assert.Equal(false, json.ContainsKey("pagable"));
        }

        [Fact]
        public void Edit_template_should_be_serialized_if_editing_enabled()
        {
            listView.Editable.Enabled = true;
            listView.EditorHtml = "foo";
            var json = new Dictionary<string, object>();

            serializer.Serialize(json);

            Assert.Equal("foo", json["editTemplate"]);
        }
        
        [Fact]
        public void Edit_template_should_not_be_serialized_if_editing_disabled()
        {
            listView.Editable.Enabled = false;
            listView.EditorHtml = "foo";
            var json = new Dictionary<string, object>();

            serializer.Serialize(json);

            Assert.Equal(false, json.ContainsKey("editTemplate"));
        }

        [Fact]
        public void Edit_template_should_not_be_serialized_if_not_present()
        {
            listView.Editable.Enabled = true;
            listView.EditorHtml = string.Empty;
            var json = new Dictionary<string, object>();

            serializer.Serialize(json);

            Assert.Equal(false, json.ContainsKey("editTemplate"));
        }
    }
}
