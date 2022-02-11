namespace AMS.Dto
{
    public class UpdatePasswordRequest
    {
        public int UserId { get; set; }
        public string NewPassword { get; set; }
        public string OldPassword { get; set; }
    }
}
