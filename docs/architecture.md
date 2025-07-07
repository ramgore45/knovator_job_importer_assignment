🏗️ System Architecture Overview

📄 Overview

A scalable job importer system pulling data from multiple job feed APIs (XML), converting them to JSON, storing jobs in MongoDB, and tracking import history logs.

📦 Components (component - techstack - purpose)

1. API Fetcher - Axios + xml2js - Fetch job XML feeds and convert to JSON

2. Queue Processor - BullMQ + Redis - Asynchronously queue job imports

3. Job Store - MongoDB (via Mongoose) - Store job listings

4. Import Logs - MongoDB (via Mongoose) - Store job import history logs

5. Cron Scheduler - node-cron - Schedule hourly job imports

6. Frontend - Next.js + Tailwind CSS + SWR - Display import logs dashboard


🔀 Data Flow

- Cron triggers every 1 hour (or via API manually)

- Jobs fetched from each feed URL via Axios (XML to JSON)

- Jobs pushed to BullMQ queue

- Job Worker processes each job:

    Check if job exists (via jobId)

    If exists → update

    Else → insert new job

- Track log: total, new, updated, failed counts

- Import log saved to ImportLog collection

- Frontend fetches logs via /importLogs API (uses SWR with refresh interval)


📊 Collections

1. jobs

    jobId

    title

    company

    location

    url

    datePosted

    jobType

    mediaContent

2. import_logs

    fileName

    importDateTime

    total

    new

    updated

    failed

    failedReasons


🔧 Scalability Considerations

    Job queue concurrency configurable

    Can scale to multiple worker processes

    Ready for microservices by splitting:

    Feed fetch service

    Queue service

    API service

    Frontend service

    Redis Cloud for distributed queues

    MongoDB Atlas for cloud-hosted DB