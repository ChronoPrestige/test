import 'dotenv/config';
import bcrypt from "bcryptjs";
import {connectToDB} from "../db/connect.db.js";
import User from "../db/models/user.model.js";

const createAdmin = async () => {
    await connectToDB();

    const existedAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (existedAdmin) {
        console.log('admin already exists');
        process.exit(0);
    }

    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 8);
    await User.create({
        name: process.env.ADMIN_NAME,
        birthdate: process.env.ADMIN_BIRTHDATE,
        email: process.env.ADMIN_EMAIL,
        password: hash,
        role: 'admin',
        isActive: true,
    });

    console.log('admin created successfully');
    process.exit(0);
}

createAdmin().catch((err) => {
    console.error(err);
    process.exit(1);
});
