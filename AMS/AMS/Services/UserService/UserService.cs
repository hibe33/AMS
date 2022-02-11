using System;
using System.Collections.Generic;
using System.Linq;
using AMS.Const;
using AMS.Data;
using AMS.Dto;
using AMS.Entities;
using AutoMapper;

namespace AMS.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public UserLoggedInDto Login(string username, string password)
        {
            var result = _unitOfWork
                .Query<SystemUser>()
                .FirstOrDefault(user => user.Mail == username && user.Pass == password);

            if (result == null)
            {
                throw new ApplicationException("User Not Found");
            }
            return new UserLoggedInDto(){Id = result.Id, Role = result.Role, FullName = $"{result.Title} {result.FirstName} {result.LastName}"};
        }

        public void CreateUser(SystemUser user)
        {
            if (_unitOfWork.Query<SystemUser>().Any(x => x.Mail == user.Mail))
            {
                throw new ApplicationException("Mail already exist !");
            }
            user.CreateDate = DateTime.Now;
            user.Pass = Guid.NewGuid().ToString();
            _unitOfWork.AddEntity(user);
            _unitOfWork.SaveChanges();
            NotificationHelper.SendMailForNewAccount(user);
        }

        public void UpdatePassword(int userId, string oldPassword, string newPassword)
        {
            var user = _unitOfWork
                .Query<SystemUser>()
                .FirstOrDefault(x => x.Id == userId);

            if (user != null && oldPassword != user.Pass)
            {
                throw new ApplicationException("Old Password is not Correct");
            }

            user.Pass = newPassword;

            _unitOfWork.UpdateEntity(user);
            _unitOfWork.SaveChanges();
        }

        public void ForgetPassword(string mail)
        {
            var user = _unitOfWork
                .Query<SystemUser>()
                .FirstOrDefault(x => x.Mail == mail);

            user.Pass = Guid.NewGuid().ToString();
            _unitOfWork.UpdateEntity(user);
            _unitOfWork.SaveChanges();
            NotificationHelper.SendMailForForgetPassword(user, user.Pass);
        }

        public List<RefereeDto> GetReferees()
        {
            return _unitOfWork
                .Query<SystemUser>()
                .Where(x => x.Role == Role.Referee.ToString())
                .AsEnumerable()
                .Select(x => _mapper.Map<RefereeDto>(x))
                .ToList();
        }
    }
}
