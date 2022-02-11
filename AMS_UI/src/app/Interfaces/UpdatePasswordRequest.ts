export interface UpdatePasswordRequest
{
    UserId : number;
    NewPassword : string;
    OldPassword : string;
}