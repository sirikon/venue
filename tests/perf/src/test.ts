import { check } from "k6";
import http from "k6/http";

const VENUE_ADDRESS = __ENV.VENUE_ADDRESS || "http://127.0.0.1:8080";

export const options = {
  vus: 1000,
  duration: "10s",
};

export default function () {
  const res = http.get(`${VENUE_ADDRESS}/talk/the-mother-of-all-demos`);
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
}
