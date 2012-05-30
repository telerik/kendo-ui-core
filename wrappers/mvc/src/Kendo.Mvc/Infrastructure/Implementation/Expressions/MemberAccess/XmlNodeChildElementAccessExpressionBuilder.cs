namespace Kendo.Mvc.Infrastructure.Implementation.Expressions
{
    using System.Linq.Expressions;
    using System.Reflection;
    using System.Xml;

    internal class XmlNodeChildElementAccessExpressionBuilder : MemberAccessExpressionBuilderBase
    {
        private static readonly MethodInfo ChildElementInnerTextMethod =
            typeof(XmlNodeExtensions).GetMethod("ChildElementInnerText", new[] { typeof(XmlNode), typeof(string) });

        public XmlNodeChildElementAccessExpressionBuilder(string memberName) : base(typeof(XmlNode), memberName)
        {
        }

        public override Expression CreateMemberAccessExpression()
        {
            ConstantExpression childNameExpression = Expression.Constant(this.MemberName);

            MethodCallExpression childElementInnterTextExtensionMethodExpression =
                Expression.Call(
                    ChildElementInnerTextMethod,
                    this.ParameterExpression,
                    childNameExpression);

            return childElementInnterTextExtensionMethodExpression;
        }
    }
}