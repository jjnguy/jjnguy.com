using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace jjnguy.com.Controllers;

public class HomeController(IHostEnvironment env) : Controller
{
  [HttpGet("")]
  [HttpGet("word-find")]
  [HttpGet("webcam")]
  [HttpGet("posts")]
  [HttpGet("authors")]
  [HttpGet("authors/{authorId}")]
  [HttpGet("about")]
  [HttpGet("portfolio")]
  [HttpGet("posts/{postId}")]
  [HttpGet("posts/{postId}/{slug}")]
  [HttpGet("posts/tagged/{tagId}/{tagName}")]
  public IActionResult Index()
  {
    return base.PhysicalFile(Path.Combine(env.ContentRootPath, "wwwroot/index.html"), "text/html");
  }
}
