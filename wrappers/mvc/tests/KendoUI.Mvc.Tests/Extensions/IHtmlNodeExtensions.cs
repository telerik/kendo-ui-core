namespace Telerik.Web.Mvc.UI.Tests.Extensions
{
    using Xunit;

    public static class IHtmlNodeExtensions
    {
        public static IHtmlNode ShouldHaveClass(this IHtmlNode node, string @class)
        {
            node.Attribute("class").ShouldContain(@class);

            return node;
        }

        public static IHtmlNode ShouldNotHaveClass(this IHtmlNode node, string @class)
        {
            node.Attribute("class").ShouldNotContain(@class);

            return node;
        }

        public static IHtmlNode ShouldHaveClasses(this IHtmlNode node, params string[] classes)
        {
            foreach (var @class in classes)
            {
                node.ShouldHaveClass(@class);
            }

            return node;
        }

        public static IHtmlNode ShouldNotHaveClasses(this IHtmlNode node, params string[] classes)
        {
            foreach (var @class in classes)
            {
                node.ShouldNotHaveClass(@class);
            }

            return node;
        }
    }
}
