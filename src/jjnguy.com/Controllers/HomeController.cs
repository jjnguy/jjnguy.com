using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace jjnguy.com.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet("")]
        [HttpGet("posts")]
        [HttpGet("posts/{postId}")]
        [HttpGet("posts/{postId}/{slug}")]
        [HttpGet("posts/tagged/{tagId}/{tagName}")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
