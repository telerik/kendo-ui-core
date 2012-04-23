// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Tests
{
    using System.Linq;
    using Telerik.Web.Mvc.Infrastructure.Implementation;
    using Xunit;
    
    public class AggregateDescriptorTests
    {
        private readonly AggregateDescriptor descriptor;

        public AggregateDescriptorTests()
        {
            descriptor = new AggregateDescriptor();
        }

        [Fact]
        public void Should_serialize_member_and_aggregate_function_name()
        {
            descriptor.Member = "foo";
            descriptor.Aggregates.Add(new SumFunction());

            var result = descriptor.Serialize();

            result.ShouldEqual("foo-sum");
        }        
        
        [Fact]
        public void Should_concatenate_aggregate_function_names()
        {
            descriptor.Member = "foo";
            descriptor.Aggregates.Add(new SumFunction());
            descriptor.Aggregates.Add(new SumFunction());

            var result = descriptor.Serialize();

            result.ShouldEqual("foo-sum-sum");
        }

        [Fact]
        public void Should_deserialize_member()
        {
            descriptor.Deserialize("foo");

            descriptor.Member.ShouldEqual("foo");
        }
 
        [Fact]
        public void Should_deserialize_count_aggregate()
        {
            descriptor.Deserialize("foo-count");

            var aggregate = descriptor.Aggregates.First() as CountFunction;

            aggregate.ShouldNotBeNull();
            aggregate.SourceField.ShouldEqual("foo");
        }
        
        [Fact]
        public void Should_deserialize_average_aggregate()
        {
            AssertAggregateFunctionWithSourceField<AverageFunction>("foo-average");
        }
        
        [Fact]
        public void Should_deserialize_sum_aggregate()
        {
            AssertAggregateFunctionWithSourceField<SumFunction>("foo-sum");
        }
        
        [Fact]
        public void Should_deserialize_min_aggregate()
        {
            AssertAggregateFunctionWithSourceField<MinFunction>("foo-min");
        }
        
        [Fact]
        public void Should_deserialize_max_aggregate()
        {
            AssertAggregateFunctionWithSourceField<MaxFunction>("foo-max");
        }

        [Fact]
        public void Should_deserialize_aggregates()
        {
            descriptor.Deserialize("foo-min-max");

            var min = descriptor.Aggregates.First() as MinFunction;
            var max = descriptor.Aggregates.Last() as MaxFunction;

            min.ShouldNotBeNull();
            min.SourceField.ShouldEqual("foo");

            max.ShouldNotBeNull();
            max.SourceField.ShouldEqual("foo");
        }

        private void AssertAggregateFunctionWithSourceField<T>(string source) where T : EnumerableSelectorAggregateFunction
        {
            descriptor.Deserialize(source);
            
            var aggregate = descriptor.Aggregates.First() as T;

            aggregate.ShouldNotBeNull();
            aggregate.SourceField.ShouldEqual(source.Split('-')[0]);
        }
    }
}
