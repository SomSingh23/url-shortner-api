let z = require('zod');
const mySchema = z.string().url();
let checkUrl = (url)=>{
    let ans = mySchema.safeParse(url);
    return ans.success;
}
module.exports = checkUrl;