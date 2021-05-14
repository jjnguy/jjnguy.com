import { writable } from 'svelte/store';

const defaultView = {
  viewName: "home",
  pathTemplate: "",
  metadata: {},
  calculatedPath: ""
};

let baseView = defaultView;

const currentView = writable(defaultView);

let views = {};
let routeTree = {};
function registerView(name, pathTemplate) {
  pathTemplate = cleanPath(pathTemplate);

  updateRouteTree(routeTree, pathTemplate.split('/'), name);

  views[name] = {
    pathTemplate: pathTemplate,
  }


  function updateRouteTree(tree, pathParts, viewName) {
    if (pathParts.length == 0) {
      tree["$"] = { viewName };
      return;
    }

    let currentNode = pathParts[0];
    let valLabel = null;

    if (currentNode[0] == "{") {
      valLabel = currentNode.slice(1, currentNode.length - 1);
      currentNode = "$val";
    }

    if (!tree[currentNode]) {
      tree[currentNode] = {};
    }

    if (valLabel) {
      tree[currentNode].valLabel = valLabel;
    }

    updateRouteTree(tree[currentNode], pathParts.slice(1), viewName);
  }
}

function resolvePath(path) {
  path = cleanPath(path);

  return traversePaths(path.split('/'), routeTree, {});

  function traversePaths(pathParts, resolutionData, metadataBundle) {
    if (pathParts.length == 0) {
      return {
        viewName: resolutionData["$"].viewName,
        metadata: {
          ...metadataBundle,
        }
      };
    } else {
      let nextPart = pathParts[0];
      if (resolutionData[nextPart]) {
        return traversePaths(pathParts.slice(1), resolutionData[nextPart], metadataBundle)
      } else if (resolutionData["$val"]) {
        let nextData = resolutionData["$val"];
        return traversePaths(pathParts.slice(1), nextData, {
          ...metadataBundle,
          [nextData.valLabel]: nextPart
        });
      } else {
        throw `Could not resolve path: ${path}`;
      }
    }
  }
}

function resolveView(viewName, metadata) {
  let resolved = views[viewName];
  let calculatedPath = resolved.pathTemplate.split('/').map(part => {
    if (part.indexOf("{") == 0) {
      return metadata[part.slice(1, part.length - 1)];
    } else {
      return part;
    }
  }).join("/");

  return {
    viewName: viewName,
    pathTemplate: resolved.pathTemplate,
    metadata: metadata,
    calculatedPath: calculatedPath
  };
}

function setView(path) {
  path = cleanPath(path);

  let viewData = resolvePath(path);
  let newView = resolveView(viewData.viewName, viewData.metadata);
  history.replaceState(newView, null, '/' + newView.calculatedPath)
  currentView.set(newView);
}

function navigate(viewName, metadata) {
  let newView = resolveView(viewName, metadata);
  history.pushState(newView, null, '/' + newView.calculatedPath);
  currentView.set(newView);
}

function back() {
  history.back();
}

window.onpopstate = function (event) {
  currentView.set(event.state || baseView);
};

function cleanPath(path) {
  if (path.startsWith('/')) {
    path = path.slice(1);
  }

  if (path.endsWith('/')) {
    path = path.slice(0, path.length - 1);
  }

  return path;
}

export { registerView, navigate, back, setView, currentView };