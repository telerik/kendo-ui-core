namespace KendoUI.Mvc.Infrastructure
{
    using System;

    internal static class PathHelper
    {
        public static string CombinePath(string directory, string fileName)
        {
            const string Slash = "/";

            string path = (directory.EndsWith(Slash, StringComparison.Ordinal) ? directory : directory + Slash) +
                          (fileName.StartsWith(Slash, StringComparison.Ordinal) ? fileName.Substring(1) : fileName);

            return path;
        }
    }
}