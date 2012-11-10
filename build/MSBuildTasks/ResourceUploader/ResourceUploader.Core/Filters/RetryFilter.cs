using System;
using System.Collections.Generic;

namespace ResourceUploader.Core
{
    public class RetryFilter : IResourceFilter
    {
        private IResourceFilter _filter;
        private IList<Type> _exceptionsToCatch;
        private int _retryCount = 3;

        public int RetryCount
        {
            get { return _retryCount; }
            set { _retryCount = value; }
        }

        /// <summary>
        /// Creates a RetryFilter object, which catches all types of Exceptions.
        /// </summary>
        /// <param name="filter">The inner filter which is executed.</param>
        public RetryFilter(IResourceFilter filter) : this(filter, new List<Type>() { typeof(Exception) }) { }

        /// <summary>
        /// Creates a RetryFilter object, which catches all exceptions of the specified exception types.
        /// </summary>
        /// <param name="filter">The inner filter which is executed.</param>
        /// <param name="exceptionsToCatch">A list of exception types that the filter catches.</param>
        public RetryFilter(IResourceFilter filter, IList<Type> caughtExceptionTypes)
        {
            _filter = filter;
            _exceptionsToCatch = caughtExceptionTypes;
        }

        public IResource Filter(IResource source)
        {
            IResource result = null;
            int retriesLeft = _retryCount;
            bool success = false;

            while (!success)
            {
                try
                {
                    result = _filter.Filter(source);
                    success = true;
                }
                catch (Exception e)
                {
                    if (GetShouldCatchException(e) && retriesLeft > 0)
                        retriesLeft--;
                    else throw e;
                }
            }

            return result;
        }

        private bool GetShouldCatchException(Exception exception)
        {
            Type exceptionType = exception.GetType();

            foreach (var caughtExceptionType in _exceptionsToCatch)
                if (exceptionType.IsSubclassOf(caughtExceptionType) || caughtExceptionType == exceptionType)
                    return true;

            return false;
        }
    }
}