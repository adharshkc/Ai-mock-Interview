/**@type{import("drizzle-kit").Config} */
export default{
    schema:"./utils/schema.js",
    dialect:'postgresql',
    dbCredentials:{
        url:'postgresql://ai_interview_owner:npg_loczm8tWKfY0@ep-snowy-voice-a4pdjvds-pooler.us-east-1.aws.neon.tech/ai_interview?sslmode=require&connect_timeout=10"',
    }
};