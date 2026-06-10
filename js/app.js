const routes = [

  {
    id:"glucolisis",
    name:"Glucólisis",
    color:"#c25e2a",
    x:180,
    y:360
  },

  {
    id:"piruvato",
    name:"Piruvato",
    color:"#c25e2a",
    x:420,
    y:360
  },

  {
    id:"krebs",
    name:"Ciclo de Krebs",
    color:"#c25e2a",
    x:820,
    y:260
  },

  {
    id:"lipidos",
    name:"Síntesis de lípidos",
    color:"#2f6fb0",
    x:820,
    y:590
  },

  {
    id:"urea",
    name:"Ciclo de la urea",
    color:"#4a9a52",
    x:400,
    y:600
  }

];

const arrows = [

  {
    from:[230,360],
    to:[380,360],
    label:"Glucosa",
    type:"in"
  },

  {
    from:[460,340],
    to:[690,270],
    label:"Acetil-CoA",
    type:"out"
  },

  {
    from:[820,390],
    to:[820,540],
    label:"Citrato",
    type:"out"
  },

  {
    from:[420,390],
    to:[420,560],
    label:"NH₄⁺",
    type:"in"
  }

];

const SVGNS = "http://www.w3.org/2000/svg";

const layerNodes =
  document.getElementById("layerNodes");

const layerFlows =
  document.getElementById("layerFlows");

const routeList =
  document.getElementById("routeList");

function createSVG(tag, attrs){

  const el =
    document.createElementNS(SVGNS, tag);

  for(const key in attrs){
    el.setAttribute(key, attrs[key]);
  }

  return el;
}

function drawNodes(){

  routes.forEach(route=>{

    const g =
      createSVG("g",{
        class:"node",
        "data-id":route.id
      });

    const width = 150;
    const height = 34;

    const rect =
      createSVG("rect",{
        x:route.x - width/2,
        y:route.y - height/2,
        width:width,
        height:height,
        rx:16,
        fill:"#fff",
        stroke:route.color
      });

    const text =
      createSVG("text",{
        x:route.x,
        y:route.y
      });

    text.textContent = route.name;

    g.appendChild(rect);
    g.appendChild(text);

    layerNodes.appendChild(g);

  });

}

function drawFlows(){

  arrows.forEach(flow=>{

    const path =
      createSVG("path",{
        d:`M${flow.from[0]},${flow.from[1]}
           L${flow.to[0]},${flow.to[1]}`,
        class:`route-arrow ${flow.type}`
      });

    layerFlows.appendChild(path);

    const mx =
      (flow.from[0] + flow.to[0]) / 2;

    const my =
      (flow.from[1] + flow.to[1]) / 2;

    const bg =
      createSVG("rect",{
        x:mx - 45,
        y:my - 18,
        width:90,
        height:20,
        rx:8,
        class:"route-label-bg"
      });

    const label =
      createSVG("text",{
        x:mx,
        y:my - 5,
        class:"route-label"
      });

    label.textContent = flow.label;

    layerFlows.appendChild(bg);
    layerFlows.appendChild(label);

  });

}

function buildPanel(){

  routes.forEach(route=>{

    const div =
      document.createElement("div");

    div.className = "route";

    div.innerHTML = `
      <strong>${route.name}</strong>
    `;

    div.addEventListener("click",()=>{

      document
        .querySelectorAll(".route")
        .forEach(el=>el.classList.remove("active"));

      div.classList.add("active");

    });

    routeList.appendChild(div);

  });

}

drawNodes();
drawFlows();
buildPanel();