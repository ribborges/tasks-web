import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { apiURL } from "./env";

const cookieOpt: Partial<ResponseCookie> = {
    path: "/",
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "none",
    secure: true,
    partitioned: true,
    domain: apiURL
};

export { cookieOpt };