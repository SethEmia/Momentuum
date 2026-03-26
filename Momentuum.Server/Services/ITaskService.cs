using Momentuum.Server.Models;
using Momentuum .Server.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Momentuum.Server.Services
{
    public interface ITaskService
    {

        // GET
        Task<IEnumerable<Models.Task>> GetAllAsync();
        Task<Models.Task?> GetByIdAsync(long id);

        // POST
        Task<Models.Task> CreateAsync(CreateTaskRequest request);

        // PUT
        Task<Models.Task> UpdateAsync(long id, UpdateTaskRequest request);

        //DELETE
        Task<bool> DeleteAsync(long id);

    }
}
