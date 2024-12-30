import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';
import userRouter from './routes/user.js';
import metricsRouter from './routes/metrics.js';
import errorMiddleware from './middlewares/error-middleware.js';
import passport from './config/passport.js';
import session from 'express-session';
import { FRONTEND_URL } from './config/utils.js';
import swStats from 'swagger-stats';
import apiSpec from './docs/swagger.json';
import { collectDefaultMetrics } from 'prom-client';
import { registry } from './config/metrics.js';

const app = express();

// enable default metrics like CPU usage, memory usage, etc.
collectDefaultMetrics({ register: registry })

app.use(
  cors({
    // added origin
    origin: [FRONTEND_URL as string, 'http://localhost:3000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(swStats.getMiddleware({swaggerSpec:apiSpec}))

// API route
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/metrics', metricsRouter);

app.get('/', (req, res) => {
  res.send('Yay!! Backend of wanderlust app is now accessible');
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    success: false,
    message: '!Oops page not found',
  });
});

app.use(errorMiddleware);
export default app;
