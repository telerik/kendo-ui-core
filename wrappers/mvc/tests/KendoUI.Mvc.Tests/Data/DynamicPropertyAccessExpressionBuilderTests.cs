#if MVC3
namespace Telerik.Web.Mvc.UI.Tests.Data
{
    using Xunit;
    using Infrastructure.Implementation.Expressions;
    using System.Dynamic;
    using System.Linq.Expressions;
    using System;

    public class DynamicPropertyAccessExpressionBuilderTests
    {
        [Fact]
        public void Should_create_accessor_for_dynamic_object_property()
        {
            var propertyAccessExpression = new DynamicPropertyAccessExpressionBuilder(typeof(object), "Foo");
            Assert.NotNull(propertyAccessExpression.CreateMemberAccessExpression());
        }

        [Fact]
        public void Should_create_accessor_for_dynamic_object_with_indexer_property()
        {
            const string expectedValue = "Foo1";
            dynamic aDynamicObject = new ExpandoObject();
            aDynamicObject.Foos = new[] { expectedValue , "Foo2", "Foo3" };

            var accessBuilder = new DynamicPropertyAccessExpressionBuilder(typeof(object), "Foos[0]");
            var accessorExpression = accessBuilder.CreateMemberAccessExpression();

            var result = InvokeAccessorOn(aDynamicObject, accessBuilder, accessorExpression);

            Assert.Equal(expectedValue, (string)result);
        }

        [Fact]
        public void Should_create_accessor_for_dynamic_object_indexer()
        {
            const string expectedValue = "Foo1";
            dynamic aDynamicObject = new[] { expectedValue, "Foo2", "Foo3" };

            var accessBuilder = new DynamicPropertyAccessExpressionBuilder(typeof(object), "[0]");
            var accessorExpression = accessBuilder.CreateMemberAccessExpression();

            var result = InvokeAccessorOn(aDynamicObject, accessBuilder, accessorExpression);

            Assert.Equal(expectedValue, (string)result);
        }

        [Fact]
        public void Should_create_accessor_which_when_executed_returns_property_value()
        {
            const string expectedValue = "Bar";
            dynamic aDynamicObject = new ExpandoObject();
            aDynamicObject.Foo = expectedValue;

            var accessBuilder = new DynamicPropertyAccessExpressionBuilder(typeof(object), "Foo");            
            var accessorExpression = accessBuilder.CreateMemberAccessExpression();

            var result = InvokeAccessorOn(aDynamicObject, accessBuilder, accessorExpression);

            Assert.Equal(expectedValue, result);
        }

        [Fact]
        public void Should_not_throw_if_accessed_property_value_is_null()
        {
            const object nullValue = null;

            dynamic aDynamicObject = new ExpandoObject();
            aDynamicObject.Foo = nullValue;

            var accessBuilder = new DynamicPropertyAccessExpressionBuilder(typeof(object), "Foo");
            var accessorExpression = accessBuilder.CreateMemberAccessExpression();

            var result = InvokeAccessorOn(aDynamicObject, accessBuilder, accessorExpression);

            Assert.Null(result);
        }

        [Fact]
        public void Should_create_accessor_for_property_with_complex_type()
        {
            const string expectedValue = "Bar";
            dynamic aDynamicObject = new ExpandoObject();
            aDynamicObject.Complex = new Customer { Name = expectedValue };

            var accessBuilder = new DynamicPropertyAccessExpressionBuilder(typeof(object), "Complex.Name");
            var accessorExpression = accessBuilder.CreateMemberAccessExpression();

            var result = InvokeAccessorOn(aDynamicObject, accessBuilder, accessorExpression);
            Assert.Equal(expectedValue, result);
        }

        [Fact]
        public void Should_throw_for_accessor_for_anonymous_types()
        {
            const string expectedValue = "Bar";
            dynamic aDynamicObject = new { Foo = expectedValue };

            var accessBuilder = new DynamicPropertyAccessExpressionBuilder(typeof(object), "Foo");
            var accessorExpression = accessBuilder.CreateMemberAccessExpression();

            Assert.Throws<Microsoft.CSharp.RuntimeBinder.RuntimeBinderException>(() => InvokeAccessorOn(aDynamicObject, accessBuilder, accessorExpression));
        }    

        private static dynamic InvokeAccessorOn(dynamic aDynamicObject, DynamicPropertyAccessExpressionBuilder accessBuilder, 
            Expression accessorExpression)
        {
            var result = Expression.Lambda<Func<object, object>>(accessorExpression,
                                                                     new[] { accessBuilder.ParameterExpression })
                                                                     .Compile().Invoke(aDynamicObject);
            return result;
        }
    }    
}
#endif