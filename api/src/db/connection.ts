const connectionString = process.env.MONGODB_URI || 'localhost/mevnStack';
import monk from 'monk';

export default monk(connectionString);
