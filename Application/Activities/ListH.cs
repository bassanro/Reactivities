using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class ListH
    {
        public class Query : IRequest<List<Activity>> { }

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;
            private readonly ILogger<ListH> _logger;
            public Handler(DataContext context, ILogger<ListH> logger)
            {
                _logger = logger;
                _context = context;
            }

            public async System.Threading.Tasks.Task<List<Activity>> Handle(Query request,
                    CancellationToken cancellationToken)
            {
                try
                {
                    for (var i = 0; i < 10; i++)
                    {
                        cancellationToken.ThrowIfCancellationRequested();
                        await Task.Delay(1000, cancellationToken);
                        _logger.LogInformation($"Task {i} has completed");
                    }
                }
                catch (Exception ex) when (ex is TaskCanceledException)
                {

                    _logger.LogInformation("Task was cancelled");
                }

                // get all activities from DB and return them.
                var activities = await _context.Activities.ToListAsync(cancellationToken);
                return activities;
            }
        }
    }
}