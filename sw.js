const VERSION="v21";
const CACHE=`brissy-${VERSION}`;
const FALLBACK=["./manifest.webmanifest","./icon.svg"];

self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FALLBACK)));
  self.skipWaiting();
});

self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("message",event=>{
  if(event.data==="SKIP_WAITING") self.skipWaiting();
});

async function networkFirst(request){
  const cache=await caches.open(CACHE);
  try{
    const response=await fetch(request,{cache:"reload"});
    if(response&&response.ok) cache.put(request,response.clone());
    return response;
  }catch(error){
    return (await cache.match(request)) || Response.error();
  }
}

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET") return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin) return;

  if(event.request.mode==="navigate"){
    event.respondWith((async()=>{
      const response=await networkFirst(event.request);
      if(!response || !response.ok) return response;
      let html=await response.text();
      if(!html.includes("makeover.css")) html=html.replace("</head>",`<link rel="stylesheet" href="./makeover.css?v=${VERSION}"><link rel="stylesheet" href="./final-polish.css?v=${VERSION}"></head>`);
      else if(!html.includes("final-polish.css")) html=html.replace("</head>",`<link rel="stylesheet" href="./final-polish.css?v=${VERSION}"></head>`);
      if(!html.includes("makeover.js")) html=html.replace("</body>",`<script src="./makeover.js?v=${VERSION}"></script></body>`);
      if(!html.includes("map-guide.js")) html=html.replace("</body>",`<script src="./map-guide.js?v=${VERSION}"></script></body>`);
      if(!html.includes("airbnb-shortcut.js")) html=html.replace("</body>",`<script src="./airbnb-shortcut.js?v=${VERSION}"></script></body>`);
      return new Response(html,{status:200,headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store, max-age=0","X-Brissy-Version":VERSION}});
    })());
    return;
  }

  event.respondWith(networkFirst(event.request));
});