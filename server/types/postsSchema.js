const zod = require('zod');

const postSchema = zod.object({
    description: zod.string().nonempty(),
})

module.exports = { postSchema };