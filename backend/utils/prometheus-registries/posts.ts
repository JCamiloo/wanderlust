import { Counter } from 'prom-client';
import { registry } from '../../config/metrics.js';

// create a counter to track the number of requests
export const requestHttpPostsCounter = new Counter({
  name: 'post_http_requests_total',
  help: 'Total number of Post HTTP requests',
  registers: [registry],
  labelNames: ['method', 'path', 'status'],
});

// create a counter to track the number of requests
export const requestErrorCreationHandlingPostsCounter = new Counter({
  name: 'post_error_handling_total',
  help: 'Total number of errors creating posts',
  registers: [registry],
  labelNames: ['method', 'path', 'status'],
});
