import { Business } from "@prisma/client";

declare module 'next-auth'{
    interface Session {
        user: Business
    }
}
