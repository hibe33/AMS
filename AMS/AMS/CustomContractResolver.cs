namespace AMS
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using Newtonsoft.Json.Serialization;

    public class CustomContractResolver : DefaultContractResolver
    {
        public CustomContractResolver() { }

        public CustomContractResolver(NamingStrategy namingStrategy)
        {
            base.NamingStrategy = namingStrategy;
        }
        protected override JsonContract CreateContract(Type objectType)
        {
            #region Contract for Dictionary as Array

            if (objectType.GetInterfaces().Any(i => i == typeof(IDictionary) ||
                                                    (i.IsGenericType && i.GetGenericTypeDefinition() == typeof(Dictionary<,>))))
            {
                return base.CreateArrayContract(objectType);
            }

            return base.CreateContract(objectType);
            #endregion
        }
    }
}
