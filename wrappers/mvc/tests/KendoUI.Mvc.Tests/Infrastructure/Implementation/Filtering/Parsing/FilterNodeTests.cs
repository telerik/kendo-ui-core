namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using Moq;
    using Telerik.Web.Mvc.Infrastructure.Implementation;
    using Xunit;

    public class FilterNodeTests
    {
        Mock<IFilterNodeVisitor> visitor;

        public FilterNodeTests()
        {
            visitor = new Mock<IFilterNodeVisitor>();
        }

        [Fact]
        public void PropertyNode_should_accept_visitor()
        {
            visitor.Setup(v => v.Visit(It.IsAny<PropertyNode>())).Verifiable();

            new PropertyNode().Accept(visitor.Object);

            visitor.Verify();
        }

        [Fact]
        public void NumberNode_should_accept_visitor()
        {
            visitor.Setup(v => v.Visit(It.IsAny<NumberNode>())).Verifiable();

            new NumberNode().Accept(visitor.Object);

            visitor.Verify();
        }

        [Fact]
        public void StringNode_should_accept_visitor()
        {
            visitor.Setup(v => v.Visit(It.IsAny<StringNode>())).Verifiable();

            new StringNode().Accept(visitor.Object);

            visitor.Verify();
        }

        [Fact]
        public void DateTimeNode_should_accept_visitor()
        {
            visitor.Setup(v => v.Visit(It.IsAny<DateTimeNode>())).Verifiable();

            new DateTimeNode().Accept(visitor.Object);

            visitor.Verify();
        }

        [Fact]
        public void BooleanNode_should_accept_visitor()
        {
            visitor.Setup(v => v.Visit(It.IsAny<BooleanNode>())).Verifiable();

            new BooleanNode().Accept(visitor.Object);

            visitor.Verify();
        }

        [Fact]
        public void ComparisonNode_should_accept_visitor()
        {
            visitor.Setup(v => v.StartVisit(It.IsAny<ComparisonNode>())).Verifiable();
            visitor.Setup(v => v.EndVisit()).Verifiable();
            Mock<IFilterNode> first = new Mock<IFilterNode>();
            first.Setup(f => f.Accept(It.IsAny<IFilterNodeVisitor>())).Verifiable();

            Mock<IFilterNode> second = new Mock<IFilterNode>();
            second.Setup(f => f.Accept(It.IsAny<IFilterNodeVisitor>())).Verifiable();

            ComparisonNode comparisonNode = new ComparisonNode
            {
                First = first.Object,
                Second = second.Object
            };

            comparisonNode.Accept(visitor.Object);

            visitor.VerifyAll();
            first.Verify();
            second.Verify();
        }

        [Fact]
        public void FunctionNode_should_accept_visitor()
        {
            visitor.Setup(v => v.StartVisit(It.IsAny<FunctionNode>())).Verifiable();
            visitor.Setup(v => v.EndVisit()).Verifiable();
            
            Mock<IFilterNode> first = new Mock<IFilterNode>();
            first.Setup(f => f.Accept(It.IsAny<IFilterNodeVisitor>())).Verifiable();

            FunctionNode functionNode = new FunctionNode
            {
                Arguments = { first.Object }
            };

            functionNode.Accept(visitor.Object);

            visitor.VerifyAll();
            first.Verify();
        }

        [Fact]
        public void AndNode_should_accept_visitor()
        {
            visitor.Setup(v => v.StartVisit(It.IsAny<ILogicalNode>())).Verifiable();
            visitor.Setup(v => v.EndVisit()).Verifiable();

            Mock<IFilterNode> first = new Mock<IFilterNode>();
            first.Setup(f => f.Accept(It.IsAny<IFilterNodeVisitor>())).Verifiable();

            Mock<IFilterNode> second = new Mock<IFilterNode>();
            second.Setup(f => f.Accept(It.IsAny<IFilterNodeVisitor>())).Verifiable();

            AndNode andNode = new AndNode
            {
                First = first.Object,
                Second = second.Object
            };

            andNode.Accept(visitor.Object);

            visitor.VerifyAll();
            first.Verify();
            second.Verify();
        }

        [Fact]
        public void OrNode_should_accept_visitor()
        {
            visitor.Setup(v => v.StartVisit(It.IsAny<ILogicalNode>())).Verifiable();
            visitor.Setup(v => v.EndVisit()).Verifiable();

            Mock<IFilterNode> first = new Mock<IFilterNode>();
            first.Setup(f => f.Accept(It.IsAny<IFilterNodeVisitor>())).Verifiable();

            Mock<IFilterNode> second = new Mock<IFilterNode>();
            second.Setup(f => f.Accept(It.IsAny<IFilterNodeVisitor>())).Verifiable();

            OrNode orNode = new OrNode
            {
                First = first.Object,
                Second = second.Object
            };

            orNode.Accept(visitor.Object);

            visitor.VerifyAll();
            first.Verify();
            second.Verify();
        }
    }
}