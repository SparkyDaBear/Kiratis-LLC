const jsonCache = new Map();

async function loadJson(path) {
  if (!jsonCache.has(path)) {
    jsonCache.set(
      path,
      fetch(path).then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to load ${path}`);
        }

        return response.json();
      })
    );
  }

  return jsonCache.get(path);
}

async function loadText(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Unable to load ${path}`);
  }

  return response.text();
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = value;
  });
}

function setLink(selector, href, label) {
  document.querySelectorAll(selector).forEach((node) => {
    node.setAttribute('href', href);
    if (label) {
      node.textContent = label;
    }
  });
}

function parseCsv(text) {
  const rows = [];
  let currentRow = [];
  let currentCell = '';
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const nextCharacter = text[index + 1];

    if (character === '"' && inQuotes && nextCharacter === '"') {
      currentCell += '"';
      index += 1;
      continue;
    }

    if (character === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (character === ',' && !inQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
      continue;
    }

    if ((character === '\n' || character === '\r') && !inQuotes) {
      if (character === '\r' && nextCharacter === '\n') {
        continue;
      }

      if (currentCell.length > 0 || currentRow.length > 0) {
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
      }

      currentRow = [];
      currentCell = '';
      continue;
    }

    currentCell += character;
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    rows.push(currentRow);
  }

  return rows;
}

function csvRowsToObjects(text) {
  const rows = parseCsv(text).filter((row) => row.some((cell) => cell !== ''));

  if (rows.length === 0) {
    return [];
  }

  const headers = rows.shift().map((header) => header.trim());

  return rows.map((row) => {
    const entry = {};

    headers.forEach((header, index) => {
      entry[header] = row[index] ?? '';
    });

    return entry;
  });
}

function renderServiceCards(container, services) {
  if (!container || !services.length) {
    return;
  }

  container.innerHTML = services
    .map(
      (service) => `
        <article class="service-card glass-card">
          <div>
            <span class="eyebrow">${service.kicker}</span>
            <h3>${service.title}</h3>
            <p>${service.summary}</p>
          </div>
          <a class="card-link" href="${service.href}">${service.linkText}</a>
        </article>
      `
    )
    .join('');
}

function renderBuildCards(container, builds) {
  if (!container) {
    return;
  }

  if (!builds.length) {
    container.innerHTML = '<article class="build-card glass-card"><h3>No builds loaded yet</h3><p>Add rows to data/computer-builds.csv to populate this section.</p></article>';
    return;
  }

  container.innerHTML = builds
    .map((build) => {
      const specs = [
        ['Price', build.price],
        ['Category', build.category],
        ['CPU', build.cpu],
        ['GPU', build.gpu],
        ['RAM', build.ram],
        ['Storage', build.storage],
        ['Condition', build.condition],
        ['Availability', build.availability],
      ]
        .filter(([, value]) => value)
        .map(
          ([label, value]) => `
            <div class="spec-line"><strong>${label}</strong><span>${value}</span></div>
          `
        )
        .join('');

      return `
        <article class="build-card glass-card">
          <span class="eyebrow">${build.category || 'Custom build'}</span>
          <h3>${build.name || 'Unnamed build'}</h3>
          <p>${build.description || 'No description provided yet.'}</p>
          <div class="build-specs">
            ${specs}
          </div>
          ${build.notes ? `<p class="build-meta">${build.notes}</p>` : ''}
        </article>
      `;
    })
    .join('');
}

async function bootstrap() {
  const page = document.body.dataset.page;

  try {
    const site = await loadJson('data/site.json');
    const contact = await loadJson('data/contact.json');

    setText('[data-site-brand]', site.brand || 'Kiratis LLC');
    setText('[data-site-tagline]', site.tagline || 'Science, service, and systems.');

    const email = contact.email || 'hello@kiratisllc.com';
    const phone = contact.phone || '(814) 555-0124';
    const location = contact.location || 'State College, PA';
    const hours = contact.hours || 'By appointment';

    setLink('[data-contact-email]', `mailto:${email}`, email);
    setLink('[data-contact-phone]', `tel:${contact.phoneDial || '+18145550124'}`, phone);
    setText('[data-contact-location]', location);
    setText('[data-contact-hours]', hours);

    if (page === 'home') {
      const services = await loadJson('data/services.json');
      const container = document.querySelector('[data-service-cards]');
      renderServiceCards(container, services.services || []);
    }

    if (page === 'junk-removal') {
      const junk = await loadJson('data/junk-removal.json');
      setText('[data-junk-service-area]', (junk.serviceArea || []).join(', '));

      const jobList = document.querySelector('[data-junk-jobs]');
      if (jobList && Array.isArray(junk.jobs) && junk.jobs.length) {
        jobList.innerHTML = junk.jobs.map((job) => `<li>${job}</li>`).join('');
      }
    }

    if (page === 'computer-builds') {
      const buildText = await loadText('data/computer-builds.csv');
      const builds = csvRowsToObjects(buildText);
      renderBuildCards(document.querySelector('[data-builds]'), builds);
    }
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', bootstrap);