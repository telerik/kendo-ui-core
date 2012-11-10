using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;

namespace ResourceUploader.Core.Tests
{
    [TestFixture]
    public class RetryFilterTests
    {
        Mock<IResourceFilter> _innerFilter = new Mock<IResourceFilter>();

        [Test]
        public void RetryCount_Default_ReturnsThree()
        {
            var retryFilter = new RetryFilter(_innerFilter.Object);

            Assert.That(retryFilter.RetryCount, Is.EqualTo(3));
        }

        [Test]
        public void RetryCount_RetryCount_ReturnsSetValue()
        {
            var retryCount = 1;
            var retryFilter = new RetryFilter(_innerFilter.Object) { RetryCount = retryCount };

            Assert.That(retryFilter.RetryCount, Is.EqualTo(retryCount));
        }

        [Test]
        public void Implements_IResourceFilter()
        {
            Assert.That(typeof(IResourceFilter).IsAssignableFrom(typeof(RetryFilter)), Is.True);
        }

        public class ExceptionResultFilter : IResourceFilter
        {
            bool[] _excecutionPlan;
            IResource _result;
            IList<Exception> _exceptions;
            int _filterCallCount = 0;

            public ExceptionResultFilter(IResource result, IList<Exception> exceptions, params bool[] executionPlan)
            {
                _excecutionPlan = executionPlan;
                _result = result;
                _exceptions = exceptions;
            }

            public IResource Filter(IResource source)
            {
                if (_excecutionPlan[_filterCallCount++])
                {
                    _filterCallCount = 0;

                    return _result;
                }
                else throw _exceptions[new Random().Next(0, _exceptions.Count - 1)];
            }
        }

        [Test]
        [ExpectedException(typeof(IndexOutOfRangeException))]
        public void Filter_HasListOfExceptions_ReThrowsAnyFromInnerFilterNotInList()
        {
            var exceptions = new List<Exception>();
            exceptions.Add(new IndexOutOfRangeException());

            var innerFilter = new ExceptionResultFilter(null, exceptions, new[] { false });

            var supportedExceptions = new List<Type>();
            supportedExceptions.Add(typeof(ArgumentNullException));

            var retryFilter = new RetryFilter(innerFilter, supportedExceptions) { RetryCount = 1 };
            var resourceMock = new Mock<IResource>();

            retryFilter.Filter(resourceMock.Object);
        }

        [Test]
        public void Filter_HasListOfExceptions_CatchesThemWhenThrownByInnerFilter()
        {
            var exceptions = new List<Exception>();
            exceptions.Add(new IndexOutOfRangeException());

            var result = new Mock<IResource>();
            var innerFilter = new ExceptionResultFilter(result.Object, exceptions, new[] { false, true });

            var supportedExceptions = new List<Type>();
            supportedExceptions.Add(typeof(IndexOutOfRangeException));

            var retryFilter = new RetryFilter(innerFilter, supportedExceptions) { RetryCount = 1 };
            var resourceMock = new Mock<IResource>();

            var processedResult = retryFilter.Filter(resourceMock.Object);

            Assert.That(processedResult, Is.EqualTo(result.Object));
        }

        [TestCase(0, new[] { true }, null, null)]
        [TestCase(1, new[] { false, true }, typeof(Exception), "Stops after an exception.")]
        [TestCase(0, new[] { false }, typeof(ArgumentOutOfRangeException), "argument out of range",
            ExpectedException = typeof(ArgumentOutOfRangeException), ExpectedMessage = "argument out of range")]
        public void Filter_RetryCountIsSet_InnerFilterThrowsExceptionsUntilGivenTry_ReturnsProcessedResource(
            int retryCount, bool[] _resultPlan, Type thrownException, string exceptionMessage)
        {
            var filterOutputMock = new Mock<IResource>();
            var exceptions = new List<Exception>();

            if (thrownException != null)
                exceptions.Add((Exception)Activator.CreateInstance(thrownException, exceptionMessage, new Exception())); // Best parameter match.

            var innerFilter = new ExceptionResultFilter(filterOutputMock.Object, exceptions, _resultPlan);
            var retryFilter = new RetryFilter(innerFilter) { RetryCount = retryCount };
            var resourceMock = new Mock<IResource>();

            IResource processedResource = retryFilter.Filter(resourceMock.Object);

            Assert.That(processedResource, Is.SameAs(filterOutputMock.Object));
        }

        [Test]
        public void Filter_RetryCountIsOne_InnerFilterSucceedsOnSecondTry_TwoConsequtiveResourcesProcessedSuccesfully()
        {
            var filterOutputMock = new Mock<IResource>();
            var exceptions = new List<Exception>();
            exceptions.Add(new ArgumentOutOfRangeException("", "argument out of range"));

            var innerFilter = new ExceptionResultFilter(
                filterOutputMock.Object, exceptions, new[] { false, true });

            var retryFilter = new RetryFilter(innerFilter) { RetryCount = 1 };
            var resourceMock = new Mock<IResource>();

            retryFilter.Filter(resourceMock.Object);

            IResource processedResource = retryFilter.Filter(resourceMock.Object);

            Assert.That(processedResource, Is.SameAs(filterOutputMock.Object));
        }

        [Test]
        public void Filter_InnerFilterResultIsNull_Finishes()
        {
            var innerFilter = new ExceptionResultFilter(null, null, new[] { true });
            var retryFilter = new RetryFilter(innerFilter);
            var resourceMock = new Mock<IResource>();

            var result = retryFilter.Filter(resourceMock.Object);

            Assert.That(result, Is.Null);
        }
    }
}
