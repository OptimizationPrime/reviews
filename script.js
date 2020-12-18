import http from 'k6/http';
import { check } from 'k6';

// Code inside default is called "VU code", and is run over and over for as long as the test is running. Code outside of it is called "init code", and is run only once per VU.

export let options = {
  discardResponseBodies: true,
  scenarios: {
    reviews: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 10 },
        { duration: '2m', target: 20 },
        { duration: '1m', target: 100 },
        { duration: '30s', target: 400 },
        { duration: '30s', target: 1000 },
        { duration: '30s', target: 700 },
        { duration: '1m', target: 400 },
        { duration: '1m', target: 200 },
      ],
      gracefulRampDown: '0s', // Time to wait for an already started iteration to finish before stopping it during a ramp down.
    },
  },
};

export default function () {
  let res = http.get('http://127.0.0.1:7010/listings/1/neighborhood');
  check(res, {'status was 200': (r) => r.status == 200 }) // checks whether execution pass/fail and stores the result w/o ever halting
  // sleep(1); // Probably don't want any sleeps during my stress test
}

// executor => A variable number of VUs execute as many iterations as possible for a specified amount of time

