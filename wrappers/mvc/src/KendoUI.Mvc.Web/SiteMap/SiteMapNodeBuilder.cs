// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Reflection;
    using System.Web.Mvc;
    using System.Web.Routing;

    using UI;
    using Resources;
    using Extensions;
    using Infrastructure;

    /// <summary>
    /// Builder class for fluently configuring <see cref="SiteMapNode"/>.
    /// </summary>
    public class SiteMapNodeBuilder : IHideObjectMembers
    {
        private readonly SiteMapNode siteMapNode;

        /// <summary>
        /// Initializes a new instance of the <see cref="SiteMapNodeBuilder"/> class.
        /// </summary>
        /// <param name="siteMapNode">The site map node.</param>
        public SiteMapNodeBuilder(SiteMapNode siteMapNode)
        {
            Guard.IsNotNull(siteMapNode, "siteMapNode");

            this.siteMapNode = siteMapNode;
        }

        /// <summary>
        /// Performs an implicit conversion from <see cref="Telerik.Web.Mvc.SiteMapNodeBuilder"/> to <see cref="Telerik.Web.Mvc.SiteMapNode"/>.
        /// </summary>
        /// <param name="builder">The builder.</param>
        /// <returns>The result of the conversion.</returns>
        public static implicit operator SiteMapNode(SiteMapNodeBuilder builder)
        {
            Guard.IsNotNull(builder, "builder");

            return builder.ToNode();
        }

        /// <summary>
        /// Returns the internal node.
        /// </summary>
        /// <returns></returns>
        [EditorBrowsable(EditorBrowsableState.Never)]
        public SiteMapNode ToNode()
        {
            return siteMapNode;
        }

        /// <summary>
        /// Sets the title.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual SiteMapNodeBuilder Title(string value)
        {
            siteMapNode.Title = value;

            return this;
        }

        /// <summary>
        /// Sets the visibility.
        /// </summary>
        /// <param name="value">if set to <c>true</c> [value].</param>
        /// <returns></returns>
        public virtual SiteMapNodeBuilder Visible(bool value)
        {
            siteMapNode.Visible = value;

            return this;
        }

        /// <summary>
        /// Sets the Lasts the modified date..
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual SiteMapNodeBuilder LastModifiedAt(DateTime value)
        {
            siteMapNode.LastModifiedAt = value;

            return this;
        }

        /// <summary>
        /// Sets the route.
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <returns></returns>
        public virtual SiteMapNodeBuilder Route(string routeName, RouteValueDictionary routeValues)
        {
            siteMapNode.RouteName = routeName;

            SetRouteValues(routeValues);
            SetTitleIfEmpty(routeName);

            return this;
        }

        /// <summary>
        /// Sets the route.
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <param name="routeValues">The route values.</param>
        /// <returns></returns>
        public virtual SiteMapNodeBuilder Route(string routeName, object routeValues)
        {
            Route(routeName, null);

            SetRouteValues(routeValues);

            return this;
        }

        /// <summary>
        /// Sets the route.
        /// </summary>
        /// <param name="routeName">Name of the route.</param>
        /// <returns></returns>
        public virtual SiteMapNodeBuilder Route(string routeName)
        {
            return Route(routeName, (object) null);
        }

        /// <summary>
        /// Sets the action to which the date should navigate
        /// </summary>
        /// <param name="routeValues">The route values of the Action method.</param>
        public SiteMapNodeBuilder Action(RouteValueDictionary routeValues)
        {
            siteMapNode.Action(routeValues);

            return this;
        }

        /// <summary>
        /// Sets the action, controller and route values.
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <returns></returns>
        public virtual SiteMapNodeBuilder Action(string actionName, string controllerName, RouteValueDictionary routeValues)
        {
            siteMapNode.ControllerName = controllerName;
            siteMapNode.ActionName = actionName;

            SetRouteValues(routeValues);
            SetTitleIfEmpty(actionName);

            return this;
        }

        /// <summary>
        /// Sets the action, controller and route values.
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <param name="routeValues">The route values.</param>
        /// <returns></returns>
        public virtual SiteMapNodeBuilder Action(string actionName, string controllerName, object routeValues)
        {
            Action(actionName, controllerName, null);

            SetRouteValues(routeValues);

            return this;
        }

        /// <summary>
        /// Sets the action and controller.
        /// </summary>
        /// <param name="actionName">Name of the action.</param>
        /// <param name="controllerName">Name of the controller.</param>
        /// <returns></returns>
        public virtual SiteMapNodeBuilder Action(string actionName, string controllerName)
        {
            return Action(actionName, controllerName, (object)null);
        }

        /// <summary>
        /// Expression based controllerAction.
        /// </summary>
        /// <typeparam name="TController">The type of the controller.</typeparam>
        /// <param name="controllerAction">The action.</param>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1006:DoNotNestGenericTypesInMemberSignatures", Justification = "Need it for strongly type support.")]
        public virtual SiteMapNodeBuilder Action<TController>(Expression<Action<TController>> controllerAction) where TController : Controller
        {
            MethodCallExpression call = (MethodCallExpression) controllerAction.Body;

            string controllerName = typeof(TController).Name;

            if (!controllerName.EndsWith("Controller", StringComparison.OrdinalIgnoreCase))
            {
                throw new ArgumentException(TextResource.ControllerNameMustEndWithController, "controllerAction");
            }

            controllerName = controllerName.Substring(0, controllerName.Length - "Controller".Length);

            if (controllerName.Length == 0)
            {
                throw new ArgumentException(TextResource.CannotRouteToClassNamedController, "controllerAction");
            }

            if (call.Method.IsDefined(typeof(NonActionAttribute), false))
            {
                throw new ArgumentException(TextResource.TheSpecifiedMethodIsNotAnActionMethod, "controllerAction");
            }

            string actionName = call.Method.GetCustomAttributes(typeof(ActionNameAttribute), false)
                                           .OfType<ActionNameAttribute>()
                                           .Select(attribute => attribute.Name)
                                           .FirstOrDefault() ?? call.Method.Name;

            siteMapNode.ControllerName = controllerName;
            siteMapNode.ActionName = actionName;

            ParameterInfo[] parameters = call.Method.GetParameters();

            for (int i = 0; i < parameters.Length; i++)
            {
                Expression arg = call.Arguments[i];
                object value;
                ConstantExpression ce = arg as ConstantExpression;

                if (ce != null)
                {
                    value = ce.Value;
                }
                else
                {
                    Expression<Func<object>> lambdaExpression = Expression.Lambda<Func<object>>(Expression.Convert(arg, typeof(object)));
                    Func<object> func = lambdaExpression.Compile();
                    value = func();
                }

                siteMapNode.RouteValues.Add(parameters[i].Name, value);
            }

            return this;
        }

        /// <summary>
        /// Sets the url.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual SiteMapNodeBuilder Url(string value)
        {
            siteMapNode.Url = value;

            return this;
        }

        /// <summary>
        /// Sets the change frequency.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual SiteMapNodeBuilder ChangeFrequency(SiteMapChangeFrequency value)
        {
            siteMapNode.ChangeFrequency = value;

            return this;
        }

        /// <summary>
        /// Sets the update priority.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual SiteMapNodeBuilder UpdatePriority(SiteMapUpdatePriority value)
        {
            siteMapNode.UpdatePriority = value;

            return this;
        }

        /// <summary>
        /// Marks an item that it would be included in the search engine index.
        /// </summary>
        /// <param name="value">if set to <c>true</c> [value].</param>
        /// <returns></returns>
        public virtual SiteMapNodeBuilder IncludeInSearchEngineIndex(bool value)
        {
            siteMapNode.IncludeInSearchEngineIndex = value;

            return this;
        }

        /// <summary>
        /// Sets the attributes
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual SiteMapNodeBuilder Attributes(IDictionary<string, object> value)
        {
            Guard.IsNotNull(value, "value");

            siteMapNode.Attributes.Clear();
            siteMapNode.Attributes.Merge(value);

            return this;
        }

        /// <summary>
        /// Sets the attributes
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        public virtual SiteMapNodeBuilder Attributes(object value)
        {
            Guard.IsNotNull(value, "value");

            return Attributes(new RouteValueDictionary(value));
        }

        /// <summary>
        /// Executes the provided delegate to configure the child node.
        /// </summary>
        /// <param name="addActions">The add actions.</param>
        /// <returns></returns>
        public virtual SiteMapNodeBuilder ChildNodes(Action<SiteMapNodeFactory> addActions)
        {
            Guard.IsNotNull(addActions, "addActions");

            SiteMapNodeFactory factory = new SiteMapNodeFactory(siteMapNode);

            addActions(factory);

            return this;
        }

        private void SetRouteValues(ICollection<KeyValuePair<string, object>> values)
        {
            if (values != null && values.Any())
            {
                siteMapNode.RouteValues.Clear();
                siteMapNode.RouteValues.AddRange(values);
            }
        }

        private void SetRouteValues(object values)
        {
            if (values != null)
            {
                siteMapNode.RouteValues.Clear();
                siteMapNode.RouteValues.Merge(values);
            }
        }

        private void SetTitleIfEmpty(string value)
        {
            if (string.IsNullOrEmpty(siteMapNode.Title))
            {
                siteMapNode.Title = value;
            }
        }
    }
}