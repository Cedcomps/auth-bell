import { type NextRequest } from "next/server";
import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';

export default withMiddlewareAuthRequired();

export const config = {
  matcher: ['/protected', '/admin'], // Spécifiez les routes que vous souhaitez protéger
};