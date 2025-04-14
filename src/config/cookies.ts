import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

const cookieOpt: Partial<ResponseCookie> = {
    path: "/",
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: false,
    secure: true,
    partitioned: true
};

export { cookieOpt };