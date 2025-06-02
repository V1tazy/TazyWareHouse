using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TazyWareHouse.Api.Contracts;
using TazyWareHouse.Api.Contracts.Profiles;
using TazyWareHouse.Application.Interfaces;
using TazyWareHouse.Application.Services;
using TazyWareHouse.Core.Entityes.Users;

namespace TazyWareHouse.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;


        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }


        [HttpPost("change-password")]
        public async Task<IActionResult> ProfileChangePassword([FromBody] ProfileChangePasswordRequest request)
        {
            return Ok("Nigger");
        }

        [HttpPost("LoadDataProfile")]
        public async Task<IActionResult> ProfileLoadData([FromBody] ProfileLoadDataRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
            {
                return BadRequest("Email is required.");
            }

            var user = await _profileService.GetProfileData(request.Email);

            var response = new ProfileResponse
            {
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
            };

            return Ok(response);
        }

        [HttpPost("UpdateProfile")]
        public async Task<IActionResult> ProfileUpdate([FromBody] ProfileUpdateRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
            {
                return BadRequest("Email is required.");
            }

            var user = await _profileService.GetProfileData(request.Email);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            var updatedUser = new User
            {
                Email = user.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                PhoneNumber = request.PhoneNumber,
                HashedPassword = user.HashedPassword,
                Id = user.Id,
                Position = user.Position,
            };

            await _profileService.UpdateProfileData(updatedUser);

            var response = new ProfileResponse
            {
                Email = updatedUser.Email,
                FirstName = updatedUser.FirstName,
                LastName = updatedUser.LastName,
                PhoneNumber = updatedUser.PhoneNumber,
            };

            return Ok(response);
        }

        [HttpPost("LoadDataActivities")]
        public async Task<IActionResult> ProfileActivityLoad([FromBody] ProfileLoadDataRequest request)
        {
            if (string.IsNullOrEmpty(request.Email))
            {
                return BadRequest("Email is required.");
            }

            var ActiveList = await _profileService.GetDashboardActivitiesByCurrentUser(request.Email);

            if (ActiveList == null || !ActiveList.Any())
            {
                return NotFound("No activities found for the specified user.");
            }

            return Ok(ActiveList);
        }


        [HttpPost("GetEquipmentProfile")]
        public async Task<IActionResult> ProfileGetEquipment([FromBody] ProfileLoadDataRequest request)
        {
            return Ok();
        }
    }
}