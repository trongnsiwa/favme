Create your own .env file with:<br/>
DATABASE_URL=<<YOUR_MONGODB_URL>><br/>
NEXTAUTH_SECRET=<<YOUR_NEXTAUTH_SECRET>><br/>
NEXTAUTH_URL=<<YOUR_NEXTAUTH_URL>><br/>
GITHUB_ID=<<YOUR_GITHUB_OAUTH_ID>><br/>
GITHUB_SECRET=<<YOUR_GITHUB_OAUTH_SECRET>><br/>
NODE_ENV=development<br/>

Currently, I have set comments for authentication using Google, Discord and Email. (Email alone can't be used!)<br/>
You can go to "schema.mjs" file in env folder to view their provider name.<br/>
To use Google and Discord provider, you should remove or comment the field "refresh_token_expires_in" in schema.prisma.<br/>

Use local only.
