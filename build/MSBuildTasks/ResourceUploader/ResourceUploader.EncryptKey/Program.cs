using System;
using System.Security.Cryptography;
using System.Text;

namespace ResourceUploader.EncryptKey
{
    class Program
    {
        static readonly byte[] salt = System.Text.Encoding.Unicode.GetBytes("y50ZWxlcmlrLmNvbS9hdXR");

        public static string EncryptString(string input)
        {
            byte[] encryptedData = ProtectedData.Protect(
                Encoding.Unicode.GetBytes(input),
                salt,
                DataProtectionScope.CurrentUser);
            return Convert.ToBase64String(encryptedData);
        }
        
        static void Main(string[] args)
        {
            Console.WriteLine("ResourceUploader.EncryptKey: Encrypts a string using the current users key (via DPAPI)");

            if (args.Length != 1)
            {
                Console.WriteLine("Syntax: ResourceUploader.EncryptKey <key>");
                return;
            }

            Console.WriteLine();

            Console.WriteLine(EncryptString(args[0]));
        }
    }
}
    