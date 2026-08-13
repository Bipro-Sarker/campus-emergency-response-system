const db = require('./config/db'); // ডাটাবেস কানেকশন ইম্পোর্ট করা

const makeAdmin = async () => {
    try {
        console.log("🔄 Updating user role to admin...");
        
        // bipro@gmail.com ইমেইলওয়ালা ইউজারের রোল admin করে দেওয়া
        const [result] = await db.execute(
            "UPDATE users SET role = 'admin' WHERE email = ?", 
            ['bipro@gmail.com']
        );

        if (result.affectedRows > 0) {
            console.log("✅ Success! bipro@gmail.com is now an Admin.");
        } else {
            console.log("⚠️ No user found with this email. Please check if 'bipro@gmail.com' is registered.");
        }

        process.exit(0);
    } catch (err) {
        console.error("❌ Error updating role:", err.message);
        process.exit(1);
    }
};

makeAdmin();