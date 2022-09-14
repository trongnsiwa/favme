Create your own .env file with:
DATABASE_URL=<<YOUR_MONGODB_URL>>
NEXTAUTH_SECRET=<<YOUR_NEXTAUTH_SECRET>>
NEXTAUTH_URL=<<YOUR_NEXTAUTH_URL>>
GITHUB_ID=<<YOUR_GITHUB_OAUTH_ID>>
GITHUB_SECRET=<<YOUR_GITHUB_OAUTH_SECRET>>
NODE_ENV=development

Currently, I have set comments for authentication using Google, Discord and Email. (Email alone can't be used!)
You can go to "schema.mjs" file in env folder to view their provider name.
To use Google and Discord provider, you should remove or comment the field "refresh_token_expires_in" in schema.prisma.

Use local only.
