// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
#if MVC3
    using System.Web.WebPages;
#endif    
    using Telerik.Web.Mvc.Extensions;

    public class HtmlTemplate : HtmlTemplate<object>
    {
        private Action content;

        public Action Content
        {
            get 
            { 
                return content; 
            }
            set 
            { 
                content = value;
                if (value != null)
                {
                    CodeBlockTemplate = delegate { content(); };
                }
                else
                {
                    CodeBlockTemplate = null;
                }
            }
        }

        public void Apply(IHtmlNode node)
        {
            Apply(null, node);
        }
    }

    public class HtmlTemplate<T> 
        where T : class 
    {
        private string html;
        private Action<T> codeBlockTemplate;
        private Func<T, object> inlineTemplate;
        private Action<T, IHtmlNode> binder;
        
        public string Html
        {
            get 
            { 
                return html; 
            }
            set 
            { 
                html = value;
                
                binder = (dataItem, node) => node.Html(html);
                
                codeBlockTemplate = null;
                inlineTemplate = null;
            }
        }

        public Action<T> CodeBlockTemplate
        {
            get 
            { 
                return codeBlockTemplate; 
            }
            set 
            { 
                codeBlockTemplate = value;

                binder = (dataItem, node) => node.Template((writer) => CodeBlockTemplate(dataItem));

                html = null;
                inlineTemplate = null;
            }
        }

        public Func<T, object> InlineTemplate
        {
            get 
            { 
                return inlineTemplate; 
            }
            set 
            { 
                inlineTemplate = value;

                binder = (dataItem, node) => node.Template((writer) => 
                    {
                        var result = InlineTemplate(dataItem);
#if MVC3
                        var helperResult = result as HelperResult;
                        
                        if (helperResult != null)
                        {
                            helperResult.WriteTo(writer);
                            return;
                        }
#endif
                        if (result != null)
                        {
                            writer.Write(result.ToString());
                        }
                    });
                
                codeBlockTemplate = null;
                html = null;
            }
        }

        public void Apply(T dataItem, IHtmlNode node)
        {
            if (HasValue())
            {
                binder(dataItem, node);
            }
        }

        public bool HasValue()
        {
            return Html.HasValue() || InlineTemplate != null || CodeBlockTemplate != null;
        }
    }
}
