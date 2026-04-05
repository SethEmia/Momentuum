using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Momentuum.Server.Models;
using Momentuum.Server.Data;
using Momentuum.Server.Models.DTOs;
using Momentuum.Server.UserContexts;

namespace Momentuum.Server.Services
{
    public class TaskService : ITaskService
    {
        private readonly ApplicationDbContext _context;
        private readonly IUserContext _userContext;
        public TaskService(ApplicationDbContext context, IUserContext userContext)
        {
            _context = context;
            _userContext = userContext;
        }
        public async Task<IEnumerable<Models.Task>> GetAllAsync()
        {
            var userId = _userContext.UserId;

            var tasks = await _context.Tasks.Where(t => t.UserId == userId).ToListAsync();
            return tasks;
        }

        public async Task<Models.Task?> GetByIdAsync(long id)
        {
            var userId = _userContext.UserId;
            return await _context.Tasks.FirstOrDefaultAsync(t => t.UserId == userId && t.TaskId == id);
        }


        public async Task<Models.Task> CreateAsync(CreateTaskRequest request)
        {
            var userId = _userContext.UserId;
            var task = new Models.Task
            {
                UserId = userId,
                Title = request.Title,
                CreatedAt = DateTime.UtcNow,
                DueDate = request.DueDate,
                IsCompleted = false,
                isArchived = false,
                Status = request.Status,
                Priority = request.Priority
            };
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            
            return task;
        }

        public async Task<Models.Task> CompleteAsync(long id){
            var userId = _userContext.UserId;
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.TaskId == id && t.UserId == userId);
            if(task == null)
            {
                return null;
            }

            task.IsCompleted = true;
            task.CompletedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<Models.Task> UpdateAsync(long id, UpdateTaskRequest request)
        {
            var userId = _userContext.UserId;
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.TaskId == id && t.UserId == userId);
            if(task == null)
            {
                return null;
            }

            task.Title = request.Title;
            task.DueDate = request.DueDate;
            task.CompletedAt = request.CompletedAt;
            task.IsCompleted = request.IsCompleted;
            task.isArchived = request.IsArchived;
            task.Priority = request.Priority;
            task.Status = request.Status;

            await _context.SaveChangesAsync();
            
            return task;
        }

        public async Task<bool> DeleteAsync(long id)
        {
            var task = await _context.Tasks.
                FirstOrDefaultAsync(t => t.TaskId == id && t.UserId == _userContext.UserId);
            
            if (task == null) return false;
            
            
            task.isArchived = true;
            
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
