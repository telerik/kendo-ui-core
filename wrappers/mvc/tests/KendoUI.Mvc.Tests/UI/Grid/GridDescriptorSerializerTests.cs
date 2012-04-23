

namespace KendoUI.Mvc.UI.Tests
{
    using Moq;
    using System.Linq;
    using Xunit;

    public class GridDescriptorSerializerTests
    {
        [Fact]
        public void Should_concatenate_serialized_descriptors()
        {
            var descriptor = new Mock<IDescriptor>();
            descriptor.Setup(d => d.Serialize()).Returns("foo");

            var result = GridDescriptorSerializer.Serialize(new [] 
            { 
                descriptor.Object,
                descriptor.Object
            });

            result.ShouldEqual("foo~foo");
        }        
        
        [Fact]
        public void Should_return_single_serialized_descriptors()
        {
            var descriptor = new Mock<IDescriptor>();
            descriptor.Setup(d => d.Serialize()).Returns("foo");

            var result = GridDescriptorSerializer.Serialize(new [] 
            { 
                descriptor.Object
            });

            result.ShouldEqual("foo");
        }        
        
        [Fact]
        public void Should_return_tilde_if_no_descriptor_is_supplied()
        {
            var result = GridDescriptorSerializer.Serialize(new IDescriptor[0]); 

            result.ShouldEqual("~");
        }
        
        [Fact]
        public void Should_deserialize_descriptors()
        {
            var result = GridDescriptorSerializer.Deserialize<SortDescriptor>("foo-asc~bar-desc");

            result.Count.ShouldEqual(2);

            result.First().Member.ShouldNotBeNull();
            result.Last().Member.ShouldNotBeNull();
        }
        
        [Fact]
        public void Should_deserialize_empty_list()
        {
            var result = GridDescriptorSerializer.Deserialize<SortDescriptor>("");

            result.Count.ShouldEqual(0);
        }
    }
}