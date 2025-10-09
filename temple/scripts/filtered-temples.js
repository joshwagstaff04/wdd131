
const temples = [
  { name:"Salt Lake Temple",           location:"Salt Lake City, Utah, USA", dedicated:"1893-04-06", area:382207, imageUrl:"images/temple-picture1.jpg", alt:"Salt Lake Temple" },
  { name:"Laie Hawaii Temple",         location:"Laie, Hawaii, USA",         dedicated:"1919-11-27", area:42073,  imageUrl:"images/temple-picture2.jpg", alt:"Laie Hawaii Temple" },
  { name:"Rome Italy Temple",          location:"Rome, Italy",               dedicated:"2019-03-10", area:41010,  imageUrl:"images/temple-picture3.avif", alt:"Rome Italy Temple" },
  { name:"Payson Utah Temple",         location:"Payson, Utah, USA",         dedicated:"2015-06-07", area:96630,  imageUrl:"images/temple-picture4.jpg", alt:"Payson Utah Temple" },
  { name:"Nauvoo Illinois Temple",     location:"Nauvoo, Illinois, USA",     dedicated:"2002-06-27", area:54000,  imageUrl:"images/temple-picture5.jpg", alt:"Nauvoo Illinois Temple" },
  { name:"Tucson Arizona Temple",      location:"Tucson, Arizona, USA",      dedicated:"2017-08-13", area:38700,  imageUrl:"images/temple-picture6.jpg", alt:"Tucson Arizona Temple" },
  { name:"Gilbert Arizona Temple",     location:"Gilbert, Arizona, USA",     dedicated:"2014-03-02", area:85326,  imageUrl:"images/temple-picture7.jpg", alt:"Gilbert Arizona Temple" },
  { name:"Logan Utah Temple",          location:"Logan, Utah, USA",          dedicated:"1884-05-17", area:119619, imageUrl:"images/temple-picture8.jpg", alt:"Logan Utah Temple" },
  { name:"Fort Lauderdale Florida Temple", location:"Fort Lauderdale, Florida, USA", dedicated:"2014-05-04", area:30600, imageUrl:"images/temple-picture9.jpg", alt:"Fort Lauderdale Florida Temple" },

  
  { name:"Paris France Temple",        location:"Le Chesnay, France",        dedicated:"2017-05-21", area:44175,  imageUrl:"images/temple-picture10.jpg", alt:"Paris France Temple" },
  { name:"Palmyra New York Temple",    location:"Palmyra, New York, USA",    dedicated:"2000-04-06", area:10700,  imageUrl:"images/temple-picture11.jpg", alt:"Palmyra New York Temple" },
  { name:"Hong Kong China Temple",     location:"Hong Kong, China",          dedicated:"1996-05-26", area:51921,  imageUrl:"images/temple-picture12.jpg",  alt:"Hong Kong China Temple" },

];


const gallery   = document.querySelector("#gallery");          
const nav       = document.querySelector("#primary-nav");      
const navLinks  = nav.querySelectorAll('a[data-filter]');


const setBusy = (isBusy) => {
  gallery.setAttribute("aria-busy", isBusy ? "true" : "false");
};

function clearCards() {
  gallery.innerHTML = "";
}

function makeCard(t) {
  const fig = document.createElement("figure");
  fig.className = "card";

  const a = document.createElement("a");
  a.href = t.imageUrl;                 
  a.target = "_blank";
  a.rel = "noopener";
  a.className = "card-link";
  a.setAttribute("aria-label", `${t.name} — open image`);

  const img = document.createElement("img");
  img.loading = "lazy";
  img.src = t.imageUrl;
  img.alt = t.alt || t.name;
  img.width = 600;
  img.height = 400;

  const cap = document.createElement("figcaption");
  const dedicatedDate = new Date(t.dedicated).toLocaleDateString(undefined, {
    year: "numeric", month: "long", day: "numeric"
  });
  cap.innerHTML = `
    <strong>${t.name}</strong><br>
    ${t.location}<br>
    Dedicated: ${dedicatedDate}<br>
    Area: ${t.area.toLocaleString()} ft²
  `;

  a.append(img, cap);
  fig.append(a);
  return fig;
}
function render(list) {
  setBusy(true);
  clearCards();
  const frag = document.createDocumentFragment();
  list.forEach(t => frag.appendChild(makeCard(t)));
  gallery.appendChild(frag);
  setBusy(false);
}


function filterTemples(kind) {
  switch (kind) {
    case "old":   return temples.filter(t => new Date(t.dedicated).getFullYear() < 1900);
    case "new":   return temples.filter(t => new Date(t.dedicated).getFullYear() > 2000);
    case "large": return temples.filter(t => t.area >= 90000);
    case "small": return temples.filter(t => t.area <= 10000);
    case "home":
    default:      return temples.slice();
  }
}


nav.addEventListener("click", (e) => {
  const link = e.target.closest('a[data-filter]');
  if (!link) return;
  const kind = link.getAttribute("data-filter");

 
  navLinks.forEach(a => a.removeAttribute("aria-current"));
  link.setAttribute("aria-current", "page");

  render(filterTemples(kind));
});


render(temples);


document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;
