const fs = require('fs');
let css = fs.readFileSync('src/style.css', 'utf8');

// Fix .section
css = css.replace(/\.section \{\n  min-height: 100vh;\n  scroll-snap-align: start;\n  display: flex;\n  flex-direction: column;\n  padding: 80px 2rem;\n  padding: 2rem;\n  position: relative;\n\}/g, 
`.section {
  min-height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  padding: 80px 2rem;
  position: relative;
}`);

// Fix .project-card .img-container
css = css.replace(/\.project-card \.img-container \{\n  height: 200px;\n  display: flex;\n  flex-direction: column;\n  padding: 80px 2rem;\n  padding: 20px;\n  background: var\(--card-img-bg\);\n\}/g,
`.project-card .img-container {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: var(--card-img-bg);
}`);

// Fix .contact-bg-icon
css = css.replace(/\.contact-bg-icon \{\n  font-size: 260px;\n  color: var\(--contact-bg-icon\);\n  display: flex;\n  flex-direction: column;\n  padding: 80px 2rem;\n\}/g,
`.contact-bg-icon {
  font-size: 260px;
  color: var(--contact-bg-icon);
  display: flex;
  align-items: center;
  justify-content: center;
}`);

// add margin: auto to container inside section
css += `\n.section .container { margin: auto; }\n`;

fs.writeFileSync('src/style.css', css);
