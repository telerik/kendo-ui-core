namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI;

    public class HierarchicalModelDescriptorTests
    {
        private readonly HierarchicalModelDescriptor model;

        public HierarchicalModelDescriptorTests()
        {
            model = new HierarchicalModelDescriptor();
        }

        [Fact]
        public void ToJson_id_field_is_not_serialized_if_not_set()
        {
            model.ToJson().ContainsKey("id").ShouldBeFalse();
        }

        [Fact]
        public void ToJson_id_field_is_serialized_if_set()
        {
            model.IdMember = "ID";
            model.ToJson()["id"].ShouldEqual("ID");
        }

        [Fact]
        public void ToJson_hasChildren_field_is_not_serialized_if_not_set()
        {
            model.ToJson().ContainsKey("hasChildren").ShouldBeFalse();
        }

        [Fact]
        public void ToJson_hasChildren_field_is_serialized_if_set()
        {
            model.HasChildrenMember = "HasChildren";
            model.ToJson()["hasChildren"].ShouldEqual("HasChildren");
        }

        [Fact]
        public void ToJson_children_field_is_not_serialized_if_not_set()
        {
            model.ToJson().ContainsKey("children").ShouldBeFalse();
        }

        [Fact]
        public void ToJson_children_field_is_serialized_if_set()
        {
            model.ChildrenMember = "items";
            model.ToJson()["children"].ShouldEqual("items");
        }

        [Fact]
        public void ToJson_fields_is_not_serialized_if_not_set()
        {
            model.ToJson().ContainsKey("fields").ShouldBeFalse();
        }

        [Fact]
        public void ToJson_fields_is_serialized_if_set()
        {
            model.Fields.Add(new ModelFieldDescriptor
                {
                     Member = "ID",
                     MemberType = typeof(int)
                });
            model.ToJson().ContainsKey("fields").ShouldBeTrue();
        }

        [Fact]
        public void ToJson_fields_member_is_serialized()
        {
            model.Fields.Add(new ModelFieldDescriptor
            {
                Member = "ID",
                MemberType = typeof(int)
            });
            model.ToJson().ContainsKey("fields").ShouldBeTrue();
            var fields = model.ToJson()["fields"] as IDictionary<string, object>;
            fields.ContainsKey("ID").ShouldBeTrue();
        }

        [Fact]
        public void ToJson_fields_member_type_is_serialized()
        {
            model.Fields.Add(new ModelFieldDescriptor
            {
                Member = "ID",
                MemberType = typeof(int)
            });
            var fields = model.ToJson()["fields"] as IDictionary<string, object>;
            var id = fields["ID"] as IDictionary<string, object>;
            id["type"].ShouldEqual("number");
        }

        [Fact]
        public void AddDescriptor_adds_descriptor_to_fields()
        {
            model.AddDescriptor("ID", typeof(int));
            model.Fields[0].Member.ShouldEqual("ID");
            model.Fields[0].MemberType.ShouldEqual(typeof(int));
        }
    }
}
