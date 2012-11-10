using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using Moq;
using NUnit.Framework;

namespace ResourceUploader.Core.Tests
{
    [TestFixture]
    public class TypeResolverTests
    {
        [Test]
        public void Resolve_failure_drops_resource()
        {
            var resource = new Mock<IResource>();
           
            resource
                .SetupGet(res => res.Name)
                .Returns(".xls");

            var resolver = new TypeResolver();
            var result = resolver.Filter(resource.Object);

            Assert.That(result, Is.Null);
        }

        [Test]
        public void Resolve_JavaScript_resource()
        {
            var resource = new Mock<IResource>();

            resource
                .SetupGet(res => res.Name)
                .Returns(".js");

            var resolver = new TypeResolver();
            var result = resolver.Filter(resource.Object);

            Assert.That(result.Type, Is.EqualTo(MimeType.JavaScript));
        }
    }
}
