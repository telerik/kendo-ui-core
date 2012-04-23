// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Extensions.Tests
{
    using System.Threading;

    using Xunit;

    public class ReaderWriterLockSlimExtensionsTests
    {
        private readonly ReaderWriterLockSlim _lock;
        private int _x;

        public ReaderWriterLockSlimExtensionsTests()
        {
            _lock = new ReaderWriterLockSlim();
        }

        [Fact]
        public void Should_be_able_to_read_and_write()
        {
            using (_lock.ReadAndWrite())
            {
                if (_x == 0)
                {
                    using (_lock.Write())
                    {
                        _x = 5;
                    }
                }
            }

            Assert.Equal(5, _x);
        }

        [Fact]
        public void Should_be_able_to_read()
        {
            int y;

            using (_lock.Read())
            {
                y = _x;
            }

            Assert.Equal(0, y);
        }

        [Fact]
        public void Should_be_able_to_write()
        {
            using (_lock.Write())
            {
                _x = 10;
            }

            Assert.Equal(10, _x);
        }
    }
}