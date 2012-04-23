namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using System;
    using Xunit;

    public class FilterNodeVisitorTests
    {
        private FilterNodeVisitor visitor;

        public FilterNodeVisitorTests()
        {
            visitor = new FilterNodeVisitor();
        }

        [Fact]
        public void Should_return_filter_descriptor_for_comparison()
        {
            ComparisonNode comparisonNode = NumberComparison();

            comparisonNode.Accept(visitor);

            FilterDescriptor result = (FilterDescriptor)visitor.Result;
            Assert.Equal(FilterOperator.IsEqualTo, result.Operator);
            Assert.Equal("Age", result.Member);
            Assert.Equal(10, Convert.ToInt32(result.Value));
        }

        [Fact]
        public void Should_return_filter_descriptor_for_function()
        {
            FunctionNode functionNode = StringFunction();

            functionNode.Accept(visitor);

            FilterDescriptor result = (FilterDescriptor)visitor.Result;
            Assert.Equal(FilterOperator.StartsWith, result.Operator);
            Assert.Equal("Name", result.Member);
            Assert.Equal("J", result.Value);
        }

        [Fact]
        public void Should_return_filter_descriptor_for_boolean()
        {
            ComparisonNode comparison = BooleanComparison();
            comparison.Accept(visitor);

            FilterDescriptor result = (FilterDescriptor)visitor.Result;
            Assert.Equal(FilterOperator.IsEqualTo, result.Operator);
            Assert.Equal("Active", result.Member);
            Assert.Equal(true, result.Value);
        }

        [Fact]
        public void Should_return_composite_descriptor_for_or_node()
        {
            OrNode orNode = new OrNode()
            {
                First = DateTimeComparison(),
                Second = StringFunction()
            };

            orNode.Accept(visitor);

            CompositeFilterDescriptor descriptor = (CompositeFilterDescriptor)visitor.Result;
            Assert.Equal(FilterCompositionLogicalOperator.Or, descriptor.LogicalOperator);
            Assert.Equal(FilterOperator.IsEqualTo, ((FilterDescriptor)descriptor.FilterDescriptors[0]).Operator);
            Assert.Equal(FilterOperator.StartsWith, ((FilterDescriptor)descriptor.FilterDescriptors[1]).Operator);
        }

        [Fact]
        public void Should_return_composite_descriptor_for_and_node()
        {
            AndNode andNode = new AndNode()
            {
                First = DateTimeComparison(),
                Second = StringFunction()
            };

            andNode.Accept(visitor);

            CompositeFilterDescriptor descriptor = (CompositeFilterDescriptor)visitor.Result;
            Assert.Equal(FilterCompositionLogicalOperator.And, descriptor.LogicalOperator);
            Assert.Equal(FilterOperator.IsEqualTo, ((FilterDescriptor)descriptor.FilterDescriptors[0]).Operator);
            Assert.Equal(FilterOperator.StartsWith, ((FilterDescriptor)descriptor.FilterDescriptors[1]).Operator);
        }

        [Fact]
        public void Should_return_composite_descriptor_for_nested_nodes()
        {
            AndNode andNode = new AndNode()
            {
                First = new OrNode
                {
                    First = DateTimeComparison(),
                    Second = DateTimeComparison()
                },
                Second = StringFunction()
            };
            andNode.Accept(visitor);
            CompositeFilterDescriptor descriptor = (CompositeFilterDescriptor)visitor.Result;
            Assert.Equal(FilterCompositionLogicalOperator.And, descriptor.LogicalOperator);
            Assert.Equal(FilterCompositionLogicalOperator.Or, ((CompositeFilterDescriptor)descriptor.FilterDescriptors[0]).LogicalOperator);
            Assert.Equal(FilterOperator.StartsWith, ((FilterDescriptor)descriptor.FilterDescriptors[1]).Operator);
        }

        private ComparisonNode NumberComparison()
        {
            ComparisonNode comparisonNode = new ComparisonNode
            {
                FilterOperator = FilterOperator.IsEqualTo,
                First = new PropertyNode
                {
                    Name = "Age"
                },
                Second = new NumberNode
                {
                    Value = 10
                }
            };
            return comparisonNode;
        }

        private ComparisonNode BooleanComparison()
        {
            return new ComparisonNode
            {
                FilterOperator = FilterOperator.IsEqualTo,
                First = new PropertyNode
                {
                    Name = "Active"
                },
                Second = new BooleanNode 
                {
                    Value = true
                }
            };
        }
        private ComparisonNode DateTimeComparison()
        {
            return new ComparisonNode
            {
                FilterOperator = FilterOperator.IsEqualTo,
                First = new PropertyNode
                {
                    Name = "BirthDay"
                },
                Second = new DateTimeNode
                {
                    Value = DateTime.Now
                }
            };
        }

        private FunctionNode StringFunction()
        {
            FunctionNode comparisonNode = new FunctionNode
            {
                FilterOperator = FilterOperator.StartsWith,
                Arguments = 
                {
					new PropertyNode
                    {
						Name = "Name"
					},
					new StringNode
                    {
						Value = "J"
					}
                }
            };
            return comparisonNode;
        }
    }
}
