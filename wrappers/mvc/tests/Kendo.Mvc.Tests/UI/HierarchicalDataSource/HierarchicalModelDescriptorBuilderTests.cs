namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

    public class HierarchicalModelDescriptorBuilderTests
    {
        private readonly HierarchicalModelDescriptorBuilder<object> builder;
        private readonly ModelDescriptor model;

        public HierarchicalModelDescriptorBuilderTests()
        {
            model = new ModelDescriptor(typeof(object));
            builder = new HierarchicalModelDescriptorBuilder<object>(model, TestHelper.CreateViewContext(), new UrlGenerator());
        }

        [Fact]
        public void Id_should_return_builder()
        {
            builder.Id("ID").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Id_should_set_id_member()
        {
            builder.Id("ID");
            model.Id.Name.ShouldEqual("ID");
        }

        [Fact]
        public void Children_should_return_builder()
        {
            builder.Children("items").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Children_should_set_children_member()
        {
            builder.Children("items");
            model.ChildrenMember.ShouldEqual("items");
        }

        [Fact]
        public void Children_DataSource_should_return_builder()
        {
            builder.Children(c => c.Model(m => { })).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Children_DataSource_should_set_ChildrenDataSource()
        {
            builder.Children(c => c.Model(m => { }));
            model.ChildrenDataSource.ShouldNotBeNull();
        }

        [Fact]
        public void HasChildren_should_return_builder()
        {
            builder.HasChildren("hasChildren").ShouldBeSameAs(builder);
        }

        [Fact]
        public void HasChildren_should_set_children_member()
        {
            builder.HasChildren("hasChildren");
            model.HasChildrenMember.ShouldEqual("hasChildren");
        }

        [Fact]
        public void Field_should_return_builder()
        {
            builder.Field("ID", typeof(int)).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Field_should_add_a_member_descriptor()
        {
            builder.Field("ID", typeof(int));
            var field = model.Fields[0];
            field.Member.ShouldEqual("ID");
            field.MemberType.ShouldEqual(typeof(int));
        }
    }
}
