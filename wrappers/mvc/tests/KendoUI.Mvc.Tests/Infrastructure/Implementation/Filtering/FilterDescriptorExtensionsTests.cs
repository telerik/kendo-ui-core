namespace Telerik.Web.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using System.Linq;
    using Infrastructure.Implementation;
    using Xunit;
    using Mvc.Tests;

#if MVC3
    using System.Dynamic;
#endif

    public class FilterDescriptorExtensionsTests
    {
        [Fact]
        public void Should_return_all_member_filter_descriptors_non_hierarchichal_filter()
        {
            IEnumerable<IFilterDescriptor> filters = new List<IFilterDescriptor>()
            {
                new FilterDescriptor(),
                new FilterDescriptor()                
            };

            IEnumerable<FilterDescriptor> result = filters.SelectMemberDescriptors();
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public void Should_return_all_member_filter_descriptors_hierarchichal_filter()
        {
            IEnumerable<IFilterDescriptor> filters = new List<IFilterDescriptor>()
            {
                new CompositeFilterDescriptor{                    
                    FilterDescriptors = {
                        new CompositeFilterDescriptor{                    
                            FilterDescriptors = {
                                new FilterDescriptor(),
                                new FilterDescriptor()
                            }
                        }
                    }
                }                
            };

            IEnumerable<FilterDescriptor> result = filters.SelectMemberDescriptors();
            Assert.Equal(2, result.Count());
        }

        [Fact]
        public void Should_return_empty_enumerable_if_no_member_filter_descriptors_exists()
        {
            IEnumerable<IFilterDescriptor> filters = new List<IFilterDescriptor>()
            {
                new CompositeFilterDescriptor()                
            };

            IEnumerable<FilterDescriptor> result = filters.SelectMemberDescriptors();
            Assert.False(result.Any());
        }

#if MVC3
        [Fact]
        public void Should_set_FilterDescriptor_MemberType_from_anonymous_dynamic()
        {
            dynamic aDynamicObject = new {StringValue = "Foo"};

            var filterDescriptor = new FilterDescriptor
                                       {
                                           Member = "StringValue"
                                       };

            filterDescriptor.SetMemberTypeFrom((object)aDynamicObject);
            filterDescriptor.MemberType.ShouldEqual(typeof (string));
        }

        [Fact]
        public void Should_set_FilterDescriptor_MemberType_from_DynamicObject()
        {
            dynamic aDynamicObject = new ExpandoObject();

            aDynamicObject.IntValue = 42;

            var filterDescriptor = new FilterDescriptor
            {
                Member = "IntValue"
            };

            filterDescriptor.SetMemberTypeFrom((object)aDynamicObject);
            filterDescriptor.MemberType.ShouldEqual(typeof(int));
        }

        [Fact]
        public void Should_set_FilterDescriptor_MemberType_to_null_from_complex_DynamicObject_returning_null()
        {
            dynamic aDynamicObject = new ExpandoObject();

            aDynamicObject.Complex = new SimpleFoo { Bar = null };

            var filterDescriptor = new FilterDescriptor
            {
                Member = "Complex.Bar"
            };

            filterDescriptor.SetMemberTypeFrom((object)aDynamicObject);
            filterDescriptor.MemberType.ShouldBeNull();
        }

        [Fact]
        public void Should_set_FilterDescriptor_MemberType_from_complex_anonymous_dynamic()
        {
            dynamic aDynamicObject = new { Complex = new {Foo = "Bar"} };
            

            var filterDescriptor = new FilterDescriptor
            {
                Member = "Complex.Foo"
            };

            filterDescriptor.SetMemberTypeFrom((object)aDynamicObject);
            filterDescriptor.MemberType.ShouldEqual(typeof(string));
        }

        [Fact]
        public void Should_set_FilterDescriptor_MemberType_from_complex_anonymous_dynamic_returning_null()
        {
            dynamic aDynamicObject = new SimpleFoo { Complex = new SimpleFoo { Bar = null } };

            var filterDescriptor = new FilterDescriptor
            {
                Member = "Complex.Bar"
            };

            filterDescriptor.SetMemberTypeFrom((object)aDynamicObject);
            filterDescriptor.MemberType.ShouldEqual(typeof(string));
        }

        [Fact]
        public void Should_set_FilterDescriptor_MemberType_from_complex_null_anonymous_dynamic()
        {
            dynamic aDynamicObject = new SimpleFoo { Complex = null };

            var filterDescriptor = new FilterDescriptor
            {
                Member = "Complex.Bar"
            };

            filterDescriptor.SetMemberTypeFrom((object)aDynamicObject);
            filterDescriptor.MemberType.ShouldEqual(typeof(string));
        }

        [Fact]
        public void Should_set_all_filter_descriptors_from_dynamic_type()
        {
            dynamic aDynamicObject = new ExpandoObject();
            aDynamicObject.Foo = 1;
            aDynamicObject.Bar = "someValue";

            IEnumerable<IFilterDescriptor> filters = new[] { 
                new FilterDescriptor {Member = "Foo"},
                new FilterDescriptor {Member = "Bar"},
            };

            var memberDescriptors = filters.SetMemberTypeFrom((object)aDynamicObject)
                                           .OfType<FilterDescriptor>();
             
            memberDescriptors.ElementAt(0).MemberType.ShouldEqual(typeof(int));
            memberDescriptors.ElementAt(1).MemberType.ShouldEqual(typeof(string));
        }

        public class SimpleFoo
        {
            public string Bar { get; set; }            
            public SimpleFoo Complex { get; set; }
        }
#endif

    }
}
