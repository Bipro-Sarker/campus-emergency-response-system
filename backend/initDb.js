const fs = require('fs');
const path = require('path');
const pool = require('./config/db'); // আপনার db.js ফাইলটি কানেক্ট করা হলো

const initDatabase = async () => {
    try {
        console.log('🔄 Initializing database tables on Aiven...');

        // schema.sql ফাইলটি পড়া
        const schemaPath = path.join(__dirname, '../database/schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        // একাধিক কুয়েরি আলাদা করে এক্সিকিউট করা
        const queries = schemaSql
            .split(';')
            .map(q => q.trim())
            .filter(q => q.length > 0 && !q.toUpperCase().startsWith('CREATE DATABASE') && !q.toUpperCase().startsWith('USE'));

        for (let query of queries) {
            try {
                await pool.query(query);
            } catch (err) {
                // যদি টেবিল বা জিনিসটি আগে থেকেই থাকে, তবে ক্র্যাশ না করে শুধু স্কিপ করবে
                if (err.code === 'ER_TABLE_EXISTS_ERROR' || err.errno === 1050) {
                    console.log(`⚠️ Notice: Table already exists, skipping...`);
                } else {
                    // অন্য কোনো সিরিয়াস এরর হলে থ্রো করবে
                    throw err;
                }
            }
        }

        console.log('✅ All tables and seed data successfully created on Live Aiven Database!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating tables:', error.message);
        process.exit(1);
    }
};

initDatabase();