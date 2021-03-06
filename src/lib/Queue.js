import Bee from 'bee-queue';

import NewOrderMail from '../app/jobs/NewOrderMail';
import redisConfig from '../config/redis';

const jobs = [NewOrderMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  // TODO: send this error to sentry
  handleFailure(job, err) {
    console.error(`Queue ${job.queue.name} FAILED with:`, err);
  }
}

export default new Queue();
