using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using AMS.Entities;

namespace AMS.Services
{
    public static class NotificationHelper
    {
        private static void SendMail(string emailAdrress, string message, string subject)
        {
            MailMessage msg = new MailMessage(); //Mesaj gövdesini tanımlıyoruz...
            msg.Subject = subject;
            msg.From = new MailAddress("ragtherinfo@gmail.com");
            msg.To.Add(new MailAddress(emailAdrress));

            msg.IsBodyHtml = true;
            msg.Body = message;

            msg.Priority = MailPriority.High;

            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            NetworkCredential accountInfo = new NetworkCredential("ragtherinfo@gmail.com", "123456789.Tr");
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = accountInfo;
            smtp.EnableSsl = true;

            try
            {
                smtp.Send(msg);
            }
            catch (Exception ex)
            {
                throw new ApplicationException(ex.Message);
            }
        }

        public static void SendMailForNewAccount(SystemUser user)
        {
            var message = $"Welcome to AMS {user.FirstName}. \n \n Your Password: {user.Pass}";
            SendMail(user.Mail, message, "AMS New Account !");
        }

        public static void SendMailForForgetPassword(SystemUser user, string newPassword)
        {
            var message = $"Hello From AMS to {user.FirstName}. \n \n Your New Password: {newPassword}";
            SendMail(user.Mail, message, "AMS New Account !");
        }
    }
}
