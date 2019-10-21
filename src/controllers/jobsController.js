import Jobs from "../models/jobs";
import BaseRepository from "../repositories/baseRepository";
import dotenv from "dotenv";

dotenv.config();
class JobsController {
  /**
   * @description creates a new Jobs
   * @param  {object} req
   * @param {object} res
   * @returns {object} a newly created Jobs
   * @memberof JobsController
   */

  static async createJobs(req, res) {
    try {
      const {
        JobDescription,
        JobTitle,
        jobResponsibilities,
        companyInformation,
        JobType,
        salary
      } = req.body;

      const options = {
        JobDescription,
        JobTitle,
        jobResponsibilities,
        companyInformation,
        JobType,
        salary
      };

      const createJobs = await BaseRepository.create(Jobs, options)
      return res.status(201).send(createJobs);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  /**
   * @description Get all Jobs
   * @param  {object} req
   * @param {object} res
   * @returns {object}All Jobs
   * @memberof JobsController
   */

  static async getAllJobs(req, res) {
    try {
      // set pagination parameters
      const { limit = 5, page = 1 } = req.query;
      const options = { limit: Number(limit), page };

      const allJobss = await BaseRepository.findAll(Jobs, {}, options);
      return res.status(200).send(allJobss);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  /**
   * @description Get a Job
   * @param  {object} req
   * @param {object} res
   * @returns {object}A Job
   * @memberof JobsController
   */

  static async getAJob(req, res) {
    try {
    const { JobId } = req.params;

      const aJob = await BaseRepository.findById(Jobs, { _id: JobId });

       if (!aJob) {
         return res.status(404).send("job not found");
       }

       if (aJob) {
         return res.status(200).send(aJob);
       }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  /**
   * @description Update a Job
   * @param  {object} req
   * @param {object} res
   * @returns {object}Update A Job
   * @memberof JobsController
   */

  static async updateAJob(req, res) {
    try {
    const { JobId } = req.params;

const {
  JobDescription,
  JobTitle,
  jobResponsibilities,
  companyInformation,
  JobType,
  salary
} = req.body;

const options = {
  JobDescription,
  JobTitle,
  jobResponsibilities,
  companyInformation,
  JobType,
  salary
};
     const updateJob = await BaseRepository.update(
       Jobs,
       { _id: JobId },
       options
     );

     if (!updateJob) {
       return res.status(404).send("This job doesnt exist");
     }

     if (updateJob) {
       return res
         .status(200)
         .send( updateJob );
     }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  /**
   * @description Delete Jobs
   * @param  {object} req
   * @param {object} res
   * @returns {object}Delete Jobs
   * @memberof JobsController
   */

  static async deleteJobs(req, res) {
    try {
      const { JobsId } = req.params;

      const deleteJobs = await Jobs.findByIdAndDelete({ _id: JobsId });
      if (!deleteJobs) return res.status(404).send("Job does not exist");

      if (deleteJobs) return res.status(200).send("Job deleted");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

export default JobsController;
