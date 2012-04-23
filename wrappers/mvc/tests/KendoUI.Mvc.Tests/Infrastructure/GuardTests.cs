// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Tests
{
    using System;
    using System.Collections.Generic;

    using Xunit;

    public class GuardTests
    {
        [Fact]
        public void IsNotNull_should_throw_exception_when_passing_null_value()
        {
            // ReSharper disable ConvertToConstant.Local
            object x = null;
            // ReSharper restore ConvertToConstant.Local

            Assert.Throws<ArgumentNullException>(() => Guard.IsNotNull(x, "x"));
        }

        [Fact]
        public void IsNotNull_should_not_throw_exception_when_passing_non_null_value()
        {
            object x = new object();

            Assert.DoesNotThrow(() => Guard.IsNotNull(x, "x"));
        }

        [Fact]
        public void IsNotNullOrEmpty_should_throw_exception_when_passing_null_string()
        {
            // ReSharper disable ConvertToConstant.Local
            string x = null;
            // ReSharper restore ConvertToConstant.Local

            Assert.Throws<ArgumentException>(() => Guard.IsNotNullOrEmpty(x, "x"));
        }

        [Fact]
        public void IsNotNullOrEmpty_should_throw_exception_when_passing_empty_string()
        {
            string x = string.Empty;

            Assert.Throws<ArgumentException>(() => Guard.IsNotNullOrEmpty(x, "x"));
        }

        [Fact]
        public void IsNotNullOrEmpty_should_not_throw_exception_when_passing_non_empty_string()
        {
            // ReSharper disable ConvertToConstant.Local
            string x = "foo";
            // ReSharper restore ConvertToConstant.Local

            Assert.DoesNotThrow(() => Guard.IsNotNullOrEmpty(x, "x"));
        }

        [Fact]
        public void IsNotNullOrEmpty_should_throw_exception_when_passing_null_array()
        {
            // ReSharper disable ConvertToConstant.Local
            string[] x = null;
            // ReSharper restore ConvertToConstant.Local

            Assert.Throws<ArgumentNullException>(() => Guard.IsNotNullOrEmpty(x, "x"));
        }

        [Fact]
        public void IsNotNullOrEmpty_should_throw_exception_when_passing_empty_array()
        {
            string[] x = new string[0];

            Assert.Throws<ArgumentException>(() => Guard.IsNotNullOrEmpty(x, "x"));
        }

        [Fact]
        public void IsNotNullOrEmpty_should_not_throw_exception_when_passing_non_empty_array()
        {
            // ReSharper disable ConvertToConstant.Local
            string[] x = new[] { "", " " };
            // ReSharper restore ConvertToConstant.Local

            Assert.DoesNotThrow(() => Guard.IsNotNullOrEmpty(x, "x"));
        }

        [Fact]
        public void IsNotNullOrEmpty_should_throw_exception_when_passing_null_collection()
        {
            // ReSharper disable ConvertToConstant.Local
            IList<string> x = null;
            // ReSharper restore ConvertToConstant.Local

            Assert.Throws<ArgumentNullException>(() => Guard.IsNotNullOrEmpty(x, "x"));
        }

        [Fact]
        public void IsNotNullOrEmpty_should_throw_exception_when_passing_empty_collection()
        {
            IList<string> x = new List<string>();

            Assert.Throws<ArgumentException>(() => Guard.IsNotNullOrEmpty(x, "x"));
        }

        [Fact]
        public void IsNotNullOrEmpty_should_not_throw_exception_when_passing_non_empty_collection()
        {
            // ReSharper disable ConvertToConstant.Local
            IList<string> x = new List<string>{ "x" ,"y", "z"};
            // ReSharper restore ConvertToConstant.Local

            Assert.DoesNotThrow(() => Guard.IsNotNullOrEmpty(x, "x"));
        }

        [Fact]
        public void IsNotZeroOrNegative_should_throw_exception_when_passing_negative_integer()
        {
            // ReSharper disable ConvertToConstant.Local
            int x = -1;
            // ReSharper restore ConvertToConstant.Local

            Assert.Throws<ArgumentOutOfRangeException>(() => Guard.IsNotZeroOrNegative(x, "x"));
        }

        [Fact]
        public void IsNotZeroOrNegative_should_throw_exception_when_passing_zero()
        {
            // ReSharper disable ConvertToConstant.Local
            int x = 0;
            // ReSharper restore ConvertToConstant.Local

            Assert.Throws<ArgumentOutOfRangeException>(() => Guard.IsNotZeroOrNegative(x, "x"));
        }

        [Fact]
        public void IsNotZeroOrNegative_should_not_throw_exception_when_passing_positive_integer()
        {
            // ReSharper disable ConvertToConstant.Local
            int x = 1;
            // ReSharper restore ConvertToConstant.Local

            Assert.DoesNotThrow(() => Guard.IsNotZeroOrNegative(x, "x"));
        }

        [Fact]
        public void IsNotNegative_should_throw_exception_when_passing_negative_integer()
        {
            // ReSharper disable ConvertToConstant.Local
            int x = -1;
            // ReSharper restore ConvertToConstant.Local

            Assert.Throws<ArgumentOutOfRangeException>(() => Guard.IsNotNegative(x, "x"));
        }

        [Fact]
        public void IsNotNegative_should_not_throw_exception_when_passing_positive_integer()
        {
            // ReSharper disable ConvertToConstant.Local
            int x = 1;
            // ReSharper restore ConvertToConstant.Local

            Assert.DoesNotThrow(() => Guard.IsNotNegative(x, "x"));
        }

        [Fact]
        public void IsNotNegative_should_throw_exception_when_passing_negative_float()
        {
            // ReSharper disable ConvertToConstant.Local
            float x = -1;
            // ReSharper restore ConvertToConstant.Local

            Assert.Throws<ArgumentOutOfRangeException>(() => Guard.IsNotNegative(x, "x"));
        }

        [Fact]
        public void IsNotNegative_with_should_not_throw_exception_when_passing_positive_float()
        {
            // ReSharper disable ConvertToConstant.Local
            float x = 1;
            // ReSharper restore ConvertToConstant.Local

            Assert.DoesNotThrow(() => Guard.IsNotNegative(x, "x"));
        }

        [Fact]
        public void IsNotVirtualPath_should_throw_exception_when_passing_non_virtual_path()
        {
            // ReSharper disable ConvertToConstant.Local
            string x = "Content/x.js";
            // ReSharper restore ConvertToConstant.Local

            Assert.Throws<ArgumentException>(() => Guard.IsNotVirtualPath(x, "x"));
        }

        [Fact]
        public void IsNotVirtualPath_should_not_throw_exception_when_passing_virtual_path()
        {
            // ReSharper disable ConvertToConstant.Local
            string x = "~/Content/x.js";
            // ReSharper restore ConvertToConstant.Local

            Assert.DoesNotThrow(() => Guard.IsNotVirtualPath(x, "x"));
        }
    }
}