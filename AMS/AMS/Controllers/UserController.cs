using System;
using System.IO;
using AMS.Dto;
using AMS.Entities;
using AMS.Services.ArticleService;
using AMS.Services.UserService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AMS.Controllers
{
    public class UserController : ApiController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("Login")]
        public IActionResult Login(LoginRequest loginRequest)
        {
            return Ok(_userService.Login(loginRequest.UserName, loginRequest.Password));
        }

        [HttpPost("Register")]
        public IActionResult Register(SystemUser user)
        {
            _userService.CreateUser(user);
            return Ok();
        }

        [HttpGet("ForgetPassword")]
        public IActionResult ForgetPassword(string mail)
        {
            _userService.ForgetPassword(mail);
            return Ok();
        }

        [HttpGet]
        public IActionResult GetReferees()
        {
            return Ok(_userService.GetReferees());
        }

        [HttpPost("UpdatePassword")]
        public IActionResult UpdatePassword(UpdatePasswordRequest updatePassword)
        {
            _userService.UpdatePassword(updatePassword.UserId, updatePassword.OldPassword, updatePassword.NewPassword);
            return Ok();
        }
    }
}