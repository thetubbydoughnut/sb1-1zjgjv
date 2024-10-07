const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './mydb.sqlite'
  },
  useNullAsDefault: true
});

async function seed() {
  try {
    // Run migrations
    await knex.migrate.latest();
    console.log('Migrations completed successfully');

    // Clear existing entries
    await knex('posts').del();
    await knex('users').del();

    // Insert sample users
    const [user1Id] = await knex('users').insert({
      username: 'johndoe',
      email: 'john@example.com',
      password: 'hashed_password',
      profile_picture: 'https://example.com/john.jpg'
    });

    const [user2Id] = await knex('users').insert({
      username: 'janedoe',
      email: 'jane@example.com',
      password: 'hashed_password',
      profile_picture: 'https://example.com/jane.jpg'
    });

    // Insert sample posts
    await knex('posts').insert([
      {
        user_id: user1Id,
        content: 'Hello, world! This is my first post.',
        created_at: new Date().toISOString()
      },
      {
        user_id: user2Id,
        content: 'Excited to join this new social media platform!',
        created_at: new Date().toISOString()
      }
    ]);

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await knex.destroy();
  }
}

seed();