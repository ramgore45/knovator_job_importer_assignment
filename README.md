🚀 Setup & Usage

📦 Backend (Node.js + Express + BullMQ + MongoDB + Redis)

📑 Prerequisites:

    Node.js v20+

    Redis (local or Redis Cloud URL)

    MongoDB Atlas or local Mongo instance


📥 Install dependencies:

    cd server
    npm install


📝 Create .env file:

    PORT=5000
    MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/job-importer
    REDIS_HOST=<redis-host>
    REDIS_PORT=<redis-port>
    REDIS_PASSWORD=<redis-password>

▶️ Run server:

    npm run dev


💻 Frontend (Next.js + TailwindCSS)

📥 Install dependencies:

    cd client
    npm install


📝 Create .env.local:

    NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1

▶️ Run client:

    npm run dev


🎛️ API Endpoints

1. POST

    /api/v1/import

    Import jobs from a feed URL

2. GET

    /api/v1/importLogs

    Retrieve import history logs


⏰ Scheduled Job (Cron)

    Runs every hour (configurable in src/crons/jobCron.js)

    Iterates over pre-configured XML feed URLs and queues job imports


📊 Job Import History Table (Frontend)

    Displays list of import logs with: fileName, timestamp, total, new, updated, failed counts

    Auto-refreshes every 30 minutes using SWR


📑 Test Import via cURL:

    curl -X POST http://localhost:5000/api/v1/import \
    -H 'Content-Type: application/json' \
    -d '{"feedUrl":"https://jobicy.com/?feed=job_feed"}'

