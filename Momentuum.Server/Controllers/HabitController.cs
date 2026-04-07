using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Momentuum.Server.Data;
using Momentuum.Server.Models;
using Momentuum.Server.Models.DTOs;
using Momentuum.Server.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
namespace Momentuum.Server.Controllers{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class HabitController : ControllerBase
    {
        private readonly IHabitService _habitService;
        public HabitController(IHabitService habitService){
            _habitService = habitService;
        }
        [HttpGet]
        public async Task<IActionResult> GetHabits(){
            var habits = await _habitService.GetAllAsync();
            return Ok(habits);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHabitById(long id){
            var habit = await _habitService.GetByIdAsync(id);
            if (habit == null){
                return NotFound();
            }
            return Ok(habit);
        }
        [HttpPost]
        public async Task<IActionResult> CreateHabit([FromBody] CreateHabitRequest request){
            var habit = await _habitService.CreateAsync(request);
            return CreatedAtAction(nameof(GetHabitById), new { id = habit.HabitId }, habit);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHabit(long id, [FromBody] UpdateHabitRequest request){
            var habit = await _habitService.UpdateAsync(id,request);
            if (habit == null){
                return NotFound();
            }
            return Ok(habit);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHabit(long id){
            var success =  await _habitService.DeleteAsync(id);
            if (!success){
                return NotFound();
            }
            return NoContent();
        }
    }
}