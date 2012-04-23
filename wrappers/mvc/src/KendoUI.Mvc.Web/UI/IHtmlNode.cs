// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.Mvc;
    
    public interface IHtmlNode
    {
        string TagName
        {
            get;
        }

        string InnerHtml
        {
            get;
        }

        TagRenderMode RenderMode
        {
            get;
        }

        IList<IHtmlNode> Children
        {
            get;
        }

        IDictionary<string, string> Attributes();

        string Attribute(string key);

        IHtmlNode Attribute(string key, string value);

        IHtmlNode Attribute(string key, string value, bool replaceExisting);

        IHtmlNode Attributes<TKey, TValue>(IDictionary<TKey, TValue> attributes);

        IHtmlNode Attributes(object attributes);

        IHtmlNode Attributes<TKey, TValue>(IDictionary<TKey, TValue> attributes, bool replaceExisting);

        IHtmlNode AddClass(params string[] classes);

        IHtmlNode PrependClass(params string[] classes);

        IHtmlNode ToggleClass(string @class, bool condition);

        IHtmlNode ToggleAttribute(string key, string value, bool condition);

        IHtmlNode ToggleCss(string key, string value, bool condition);

        IHtmlNode Template(Action<TextWriter> value);

        IHtmlNode Css(string key, string value);

        Action<TextWriter> Template();

        IHtmlNode Html(string value);

        IHtmlNode Text(string value);

        void WriteTo(TextWriter output);

        IHtmlNode AppendTo(IHtmlNode parent);
    }
}
