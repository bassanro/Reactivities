using System.Collections.Generic;
using System.Threading;
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
            public Handler(DataContext context, ILogger<ListH> logger)
            {
                _context = context;
            }

            public async System.Threading.Tasks.Task<List<Activity>> Handle(Query request,
                    CancellationToken cancellationToken)
            {

                // get all activities from DB and return them.
                var activities = await _context.Activities.ToListAsync();
                return activities;
            }
        }
    }
}