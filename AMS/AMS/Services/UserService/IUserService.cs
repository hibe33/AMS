using System.Collections.Generic;
using AMS.Dto;
using AMS.Entities;

namespace AMS.Services.UserService
{
    public interface IUserService
    {
        public UserLoggedInDto Login(string username, string password);
        public void CreateUser(SystemUser user);
        public void UpdatePassword(int userId, string oldPassword, string newPassword);
        public void ForgetPassword(string mail);
        public List<RefereeDto> GetReferees();
    }
}
