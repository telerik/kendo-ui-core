namespace Kendo.Mvc
{
    using System;
    using System.ComponentModel;

    // Based on Daniel Cazzulino's blog post http://blogs.clariusconsulting.net/kzu/how-to-hide-system-object-members-from-your-interfaces/
    [EditorBrowsable(EditorBrowsableState.Never)]
    public interface IHideObjectMembers
    {
        [EditorBrowsable(EditorBrowsableState.Never)]
        bool Equals(object value);

        [EditorBrowsable(EditorBrowsableState.Never)]
        int GetHashCode();

        [EditorBrowsable(EditorBrowsableState.Never)]
        Type GetType();

        [EditorBrowsable(EditorBrowsableState.Never)]
        string ToString();
    }
}