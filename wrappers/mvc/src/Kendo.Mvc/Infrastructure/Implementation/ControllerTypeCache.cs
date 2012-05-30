namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;
    using System.Web.Compilation;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    internal class ControllerTypeCache : IControllerTypeCache
    {
        private IDictionary<string, ILookup<string, Type>> controllerNames;
        private readonly ICache cache;

        private Func<IEnumerable<Assembly>> referencedAssemblies = () => BuildManager.GetReferencedAssemblies().Cast<Assembly>().Where(assembly => !assembly.GlobalAssemblyCache);

        public ControllerTypeCache(ICache cache)
        {
            this.cache = cache;
        }

        public Func<IEnumerable<Assembly>> ReferencedAssemblies
        {
            get
            {
                return referencedAssemblies;
            }

            set
            {
                referencedAssemblies = value;
            }
        }

        public IList<Type> GetControllerTypes(string controllerName)
        {
            return GetControllerTypesWithinNamespaces(controllerName, null);
        }

        public IList<Type> GetControllerTypes(RequestContext requestContext, string controllerName)
        {
            object routeNamespacesAsObject;
            IList<Type> matches = new List<Type>();

            if (requestContext != null && requestContext.RouteData.DataTokens.TryGetValue("Namespaces", out routeNamespacesAsObject))
            {
                IEnumerable<string> routeNamespacesAsStrings = routeNamespacesAsObject as IEnumerable<string>;

                if (routeNamespacesAsStrings != null && routeNamespacesAsStrings.Any())
                {
                    HashSet<string> routeNamespaces = new HashSet<string>(routeNamespacesAsStrings, StringComparer.OrdinalIgnoreCase);

                    matches = GetControllerTypesWithinNamespaces(controllerName, routeNamespaces);

                    if (matches.Count > 0)
                    {
                        return matches;
                    }
                }
            }

            // then search in the application's default namespace collection
            if ((requestContext != null) && (ControllerBuilder.Current.DefaultNamespaces.Count > 0))
            {
                HashSet<string> nsDefaults = new HashSet<string>(ControllerBuilder.Current.DefaultNamespaces, StringComparer.OrdinalIgnoreCase);

                matches = GetControllerTypesWithinNamespaces(controllerName, nsDefaults);

                if (matches.Count > 0)
                {
                    return matches;
                }
            }

            return (requestContext != null) ? GetControllerTypesWithinNamespaces(controllerName, null /* namespaces */) : null;
        }

        private IList<Type> GetControllerTypesWithinNamespaces(string controllerName, IEnumerable<string> namespaces)
        {
            controllerNames = cache.Get("controllerNames", () =>
            {
                var controllerTypes = GetAllControllerTypes();

                var groupedByName = controllerTypes.GroupBy(t => t.Name.Substring(0, t.Name.Length - "Controller".Length), StringComparer.OrdinalIgnoreCase);

                return groupedByName.ToDictionary(g => g.Key, g => g.ToLookup(t => t.Namespace ?? string.Empty, StringComparer.OrdinalIgnoreCase), StringComparer.OrdinalIgnoreCase);
            });

            var matchingTypes = new HashSet<Type>();

            ILookup<string, Type> nsLookup;

            if (controllerNames.TryGetValue(controllerName, out nsLookup))
            {
                // this friendly name was located in the cache, now cycle through namespaces
                if (namespaces != null)
                {
                    foreach (string requestedNamespace in namespaces)
                    {
                        foreach (var targetNamespaceGrouping in nsLookup)
                        {
                            if (IsNamespaceMatch(requestedNamespace, targetNamespaceGrouping.Key))
                            {
                                matchingTypes.UnionWith(targetNamespaceGrouping);
                            }
                        }
                    }
                }
                else
                {
                    // if the namespaces parameter is null, search *every* namespace
                    foreach (var nsGroup in nsLookup)
                    {
                        matchingTypes.UnionWith(nsGroup);
                    }
                }
            }

            return matchingTypes.ToList();
        }
        
        private IList<Type> GetAllControllerTypes()
        {
            IList<Type> controllerTypes = new List<Type>();

            Func<Type, bool> isController = type => type != null &&
                                                    type.Name.EndsWith("Controller", StringComparison.OrdinalIgnoreCase) &&
                                                    !type.IsAbstract &&
                                                    typeof(IController).IsAssignableFrom(type);

            foreach (Assembly assembly in ReferencedAssemblies())
            {
                Type[] types;

                try
                {
                    types = assembly.GetTypes();
                }
                catch (ReflectionTypeLoadException rte)
                {
                    types = rte.Types;
                }

                controllerTypes.AddRange(types.Where(isController));
            }

            return controllerTypes;
        }

        private static bool IsNamespaceMatch(string requestedNamespace, string targetNamespace)
        {
            // degenerate cases
            if (requestedNamespace == null)
            {
                return false;
            }

            if (requestedNamespace.Length == 0)
            {
                return true;
            }

            if (!requestedNamespace.EndsWith(".*", StringComparison.OrdinalIgnoreCase))
            {
                // looking for exact namespace match
                return String.Equals(requestedNamespace, targetNamespace, StringComparison.OrdinalIgnoreCase);
            }

            // looking for exact or sub-namespace match

            requestedNamespace = requestedNamespace.Substring(0, requestedNamespace.Length - ".*".Length);
            if (!targetNamespace.StartsWith(requestedNamespace, StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }

            if (requestedNamespace.Length == targetNamespace.Length)
            {
                // exact match
                return true;
            }

            if (targetNamespace[requestedNamespace.Length] == '.')
            {
                // good prefix match, e.g. requestedNamespace = "Foo.Bar" and targetNamespace = "Foo.Bar.Baz"
                return true;
            }

            // bad prefix match, e.g. requestedNamespace = "Foo.Bar" and targetNamespace = "Foo.Bar2"
            return false;
        }
    }
}
