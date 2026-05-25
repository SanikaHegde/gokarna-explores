const Database = require('better-sqlite3');
const db = new Database('./dev.db');

async function main() {
  const count = db.prepare('SELECT count(*) as count FROM Package').get().count;
  if (count > 0) {
    console.log('Database already seeded!');
    return;
  }

  console.log('Seeding packages...');
  
  const packages = [
    {
      title: 'Ultimate Dandeli River Rafting & Jungle Stay',
      description: 'Experience the thrill of white water river rafting in the Kali river followed by a serene stay in the dense jungles of Dandeli.',
      location: 'Dandeli',
      price: 2500,
      imageUrl: 'https://images.unsplash.com/photo-1544485586-4f40078b66e1?q=80&w=800&auto=format&fit=crop',
      duration: '2 Days 1 Night',
    },
    {
      title: 'Gokarna Beach Trek & Camping',
      description: 'Trek through the five pristine beaches of Gokarna, culminating in a beautiful sunset camp at Half Moon beach with a bonfire.',
      location: 'Gokarna',
      price: 1800,
      imageUrl: 'https://images.unsplash.com/photo-1582260424578-83b63cc9b1fa?q=80&w=800&auto=format&fit=crop',
      duration: '3 Days 2 Nights',
    },
    {
      title: 'Dandeli Wildlife Safari & Resort',
      description: 'Spot black panthers, hornbills, and more on a guided wildlife safari, followed by a luxury resort stay with a swimming pool.',
      location: 'Dandeli',
      price: 4500,
      imageUrl: 'https://images.unsplash.com/photo-1614088924151-50e59a6078e9?q=80&w=800&auto=format&fit=crop',
      duration: '2 Days 1 Night',
    },
    {
      title: 'Gokarna Spiritual & Scuba Package',
      description: 'Visit the famous Mahabaleshwar temple and dive into the deep sea of Netrani Island for a spectacular scuba diving experience.',
      location: 'Gokarna',
      price: 6000,
      imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',
      duration: '3 Days 2 Nights',
    }
  ];

  const insert = db.prepare(`
    INSERT INTO Package (id, title, description, location, price, imageUrl, duration, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const pkg of packages) {
    const id = Math.random().toString(36).substring(2, 15);
    const now = new Date().toISOString();
    insert.run(id, pkg.title, pkg.description, pkg.location, pkg.price, pkg.imageUrl, pkg.duration, now, now);
  }

  console.log('Seeding finished.');
}

main().catch(console.error);
