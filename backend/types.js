const zod = require('zod');

const userZod = zod.object({
    username: zod.string().email(),
    firstname: zod.string().max(50),
    lastname: zod.string().max(50),
    password: zod.string().min(6),
});

const updateInfo = zod.object({
    firstname: zod.string().max(50).optional(),
    lastname: zod.string().max(50).optional(),
    password: zod.string().min(6).optional()
})

module.exports = {userZod,updateInfo};
