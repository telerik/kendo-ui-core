using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Moq;
using NUnit.Framework;

namespace ResourceUploader.Core.Tests
{
    [TestFixture]
    public class ResourcePipelineTests
    {
        [Test]
        [ExpectedException(typeof(InvalidOperationException))]
        public void Cannot_create_empty_pipeline()
        {
            new ResourcePipeline();
        }

        [Test]
        public void Pipeline_executes_filters_in_order()
        {
            var filterOne = new Mock<IResourceFilter>();
            var filterTwo = new Mock<IResourceFilter>();

            var pipeline = new ResourcePipeline(filterOne.Object, filterTwo.Object);

            var resource = new Mock<IResource>();

            filterOne
                .Setup(filter => filter.Filter(resource.Object))
                .Returns(resource.Object)
                .Callback(() => 
                    filterTwo.Setup(filter => filter.Filter(resource.Object))
                );

            pipeline.Process(resource.Object);

            filterOne.VerifyAll();
            filterTwo.VerifyAll();
        }

        [Test]
        public void Pipeline_feeds_last_output_as_input()
        {
            var filterOne = new Mock<IResourceFilter>();
            var filterTwo = new Mock<IResourceFilter>();

            var pipeline = new ResourcePipeline(filterOne.Object, filterTwo.Object);

            var resource = new Mock<IResource>();
            var processedResource = new Mock<IResource>();

            filterOne
            .Setup(filter => filter.Filter(resource.Object))
            .Returns(processedResource.Object)
            .Callback(() => 
                      filterTwo.Setup(filter => filter.Filter(processedResource.Object)));

            pipeline.Process(resource.Object);

            filterOne.VerifyAll();
            filterTwo.VerifyAll();
        }

        [Test]
        public void Pipeline_aborts_execution_if_last_output_is_null()
        {
            var filterOne = new Mock<IResourceFilter>();
            var filterTwo = new Mock<IResourceFilter>();

            var pipeline = new ResourcePipeline(filterOne.Object, filterTwo.Object);

            var resource = new Mock<IResource>();

            filterOne
                .Setup(filter => filter.Filter(resource.Object))
                .Returns((IResource) null);

            pipeline.Process(resource.Object);

            filterOne.VerifyAll();
            filterTwo.Verify(filter => filter.Filter(null), Times.Never());
        }
    }
}
