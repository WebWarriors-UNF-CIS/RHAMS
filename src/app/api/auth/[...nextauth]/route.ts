import NextAuth from "next-auth/next"
import Credentials from "next-auth/providers/credentials"
import { remult } from "remult"
import { User } from "@/shared/user"

const userRepo = remult.repo(User);
async function findUser(email?: string) {return email ? await userRepo.findFirst({ email: email }) : null;}

const auth = NextAuth
({
  providers: 
  [
    Credentials
    ({
      credentials: 
      {
        email:    { label: "Email",    type: "text"},
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => 
        {
            if (!credentials?.email || !credentials.password) {return null;}              // Return null if credentials are missing
            const user = await findUser(credentials.email);                               // Now we're sure email is defined.
            if (user && await user.verifyPassword(credentials.password)) {return user;}   // Return user if password is verified.
            return null;                                                                  // Return null if the user is not found or password verification fails.
        }
    })
  ],
  callbacks: 
  {
    session: async ({ session, user }) => 
        {
            // Safely access user.email using optional chaining
            if (user?.email) 
            {
                session.user = session.user || {};  // Ensure session.user is an object if it was undefined
                session.user.email = user.email;    // Safely assign email to session.user
            }
            return session;
        }
    }
});

export default auth;
