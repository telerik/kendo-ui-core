namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI;
    using System.Linq;

    public class ModelDescriptorTests
    {
        private readonly ModelDescriptor model;

        public ModelDescriptorTests()
        {
            model = new ModelDescriptor(typeof(Customer));
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
        public void ToJson_children_dataSource_is_serialized_if_set()
        {
            model.ChildrenDataSource = new DataSource();
            model.ToJson().ContainsKey("children").ShouldBeTrue();
        }

        [Fact]
        public void ToJson_children_dataSource_is_serialized_if_both_dataSource_and_member_are_set()
        {
            model.ChildrenDataSource = new DataSource();
            model.ChildrenMember = "items";
            model.ToJson()["children"].ShouldNotEqual("items");
        }

        [Fact]
        public void ToJson_serializes_enum_field_underlying_value()
        {
            var modelField = model.Fields.First(f => f.Member.Equals("Gender"));
            modelField.DefaultValue = Gender.Male;
            var json = model.ToJson();
            var fields = json["fields"] as Dictionary<string, object>;
            var field = fields["Gender"] as Dictionary<string, object>;
            field["defaultValue"].ShouldEqual(1);
        }

        [Fact]
        public void ToJson_does_not_conver_enum_field_if_the_default_value_is_not_enum()
        {
            var modelField = model.Fields.First(f => f.Member.Equals("Gender"));
            modelField.DefaultValue = new Kendo.Mvc.ClientHandlerDescriptor();
            var json = model.ToJson();
            var fields = json["fields"] as Dictionary<string, object>;
            var field = fields["Gender"] as Dictionary<string, object>;
            field["defaultValue"].ShouldBeSameAs(modelField.DefaultValue);
        }

    }
}
