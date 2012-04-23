// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;
    using System.Reflection.Emit;
    using Telerik.Web.Mvc.Extensions;
    
    static class DynamicTypeBuilder
    {
        private const string Prefix = "Telerik.Web.Mvc.{Dynamic}";
        
        private static readonly ModuleBuilder dynamicModule = CreateDynamicModule();
        
        private static ModuleBuilder CreateDynamicModule()
        {
            return AppDomain.CurrentDomain.DefineDynamicAssembly(new AssemblyName(Prefix), AssemblyBuilderAccess.Run)
                                          .DefineDynamicModule(Prefix + ".dll");
        }

        public static Type GenerateType(Type baseType, IEnumerable<Type> interfaceTypes)
        {
            var newType = dynamicModule.DefineType(
                Prefix + "." + baseType.GetName(),
                TypeAttributes.AutoLayout | TypeAttributes.Public | TypeAttributes.Class,
                baseType);

            interfaceTypes.Each(interfaceType =>
            {
                newType.AddInterfaceImplementation(interfaceType);
                interfaceType.GetMethods().Each(method =>
                {
                    ImplementInterfaceMethod(newType, method);
                });
            });

            baseType.GetConstructors(BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance).Each(constructor =>
            {
                switch (constructor.Attributes & MethodAttributes.MemberAccessMask)
                {
                    case MethodAttributes.Family:
                    case MethodAttributes.Public:
                    case MethodAttributes.FamORAssem:
                        ImplementConstructor(newType, constructor);
                        break;
                }
            });

            return newType.CreateType();
        }

        private static void ImplementConstructor(TypeBuilder newType, ConstructorInfo baseConstructor)
        {
            var parameters = baseConstructor.GetParameters();
            var parameterTypes = parameters.Select(p => p.ParameterType).ToArray();

            var constructor = newType.DefineConstructor(MethodAttributes.Public, baseConstructor.CallingConvention, parameterTypes);

            // parameter 0 is 'this', so we start at index 1
            for (int i = 0; i < parameters.Length; i++)
            {
                constructor.DefineParameter(i + 1, parameters[i].Attributes, parameters[i].Name);
            }

            var ilGenerator = constructor.GetILGenerator();
            for (int i = 0; i <= parameterTypes.Length; i++)
            {
                ilGenerator.Emit(OpCodes.Ldarg_S, (byte)i);
            }
            
            ilGenerator.Emit(OpCodes.Call, baseConstructor);
            ilGenerator.Emit(OpCodes.Ret);
        }

        private static void ImplementInterfaceMethod(TypeBuilder newType, MethodInfo interfaceMethod)
        {
            var parameters = interfaceMethod.GetParameters();
            var parameterTypes = (from p in parameters select p.ParameterType).ToArray();

            var newMethod = newType.DefineMethod(interfaceMethod.DeclaringType.Name + "." + interfaceMethod.Name,
                MethodAttributes.Private | MethodAttributes.HideBySig | MethodAttributes.NewSlot | MethodAttributes.Virtual | MethodAttributes.Final,
                interfaceMethod.ReturnType, parameterTypes);

            var baseMethod = newType.BaseType.GetMethod(interfaceMethod.Name, parameterTypes);

            // parameter 0 is 'this', so we start at index 1
            for (int i = 0; i < parameters.Length; i++)
            {
                newMethod.DefineParameter(i + 1, parameters[i].Attributes, parameters[i].Name);
            }

            // load all arguments (including 'this') in proper order, then call and return
            var ilGenerator = newMethod.GetILGenerator();
            for (int i = 0; i <= parameterTypes.Length; i++)
            {
                ilGenerator.Emit(OpCodes.Ldarg_S, (byte)i);
            }
            ilGenerator.Emit(OpCodes.Call, baseMethod);
            ilGenerator.Emit(OpCodes.Ret);

            // finally, hook the new method up to the interface mapping
            newType.DefineMethodOverride(newMethod, interfaceMethod);
        }
    }
}
