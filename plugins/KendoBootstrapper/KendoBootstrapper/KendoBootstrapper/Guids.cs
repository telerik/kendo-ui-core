// Guids.cs
// MUST match guids.h
using System;

namespace Company.KendoBootstrapper
{
    static class GuidList
    {
        public const string guidKendoBootstrapperPkgString = "67fc9fc6-d614-41bf-bf14-7c645eadb07f";
        public const string guidKendoBootstrapperCmdSetString = "be6bca02-8fe6-4d9e-8f12-c66589190e94";

        public static readonly Guid guidKendoBootstrapperCmdSet = new Guid(guidKendoBootstrapperCmdSetString);
    };
}