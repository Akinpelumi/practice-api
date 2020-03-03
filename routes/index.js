import postRoutes from './post';
import authRoutes from './auth';
import userRoutes from './user';


const routes = app => {
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/posts', postRoutes);
}

export default routes;