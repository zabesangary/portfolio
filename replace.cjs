const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// replace skills
html = html.replace(
  '<ul><li>Vue, jQuery, React</li></ul>\n              </span>\n            </li>',
  `<ul><li>Vue, jQuery, React</li></ul>\n              </span>\n            </li>\n            <li>\n              <i class="fa-solid fa-cart-shopping"></i>\n              <span><strong>E-commerce CMS, </strong>Shopify, Shopware</span>\n            </li>`
);

// replace all project tags
const newTags = `\n                <span class="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10">HTML5</span>\n                <span class="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10">SASS</span>\n                <span class="text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10">JavaScript</span>\n              `;

html = html.replace(/<div class="flex flex-wrap gap-2 mb-6">[\s\S]*?<\/div>/g, `<div class="flex flex-wrap gap-2 mb-6">${newTags}</div>`);

fs.writeFileSync('index.html', html);
