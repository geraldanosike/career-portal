/* eslint-disable require-jsdoc */
/**
 * @description BaseRepository
 * @class BaseRepository
 */

class BaseRepository {
  /**
   * @description create a new document
   * @param {Model} Model
   * @param {option} options
   * @returns {document} returns a newly created document
   */

  static async create(Model, options) {
    try {
      const document = await Model.create(options);

      return document;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetch documents by field
   * @param {object} Model
   * @param {string} field
   * @param {any} value
   * @returns {Document} Resolves to array of documents.
   */

  static async findByField(Model, field, value) {
    try {
      const documents = await Model.find({ [field]: value }).exec();
      return documents;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetch all documents
   * @param {object} Model
   * @param {object} query
   * @param {object} options Query options
   * @returns {Document} Resolves paginated array of documents.
   */

  static async findAll(Model, query, options) {
    try {
      const documents = await Model.paginate(query, options);
      return documents;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Fetch one document
   * @param {object} Model
   * @param {object} query
   * @param {object} options Query options
   * @returns {Document} Gets a particular agent
   */

  static async findById(Model, id) {
    try {
      const documents = Model.findOne({ _id: id }).exec();
      return documents;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description update a document
   * @param {object} Model
   * @param {object} query
   * @param {object} options Query options
   * @returns {Document} Gets a particular agent
   */

  static async update(Model, id, options) {
    try {
      const documents = Model.findOneAndUpdate({ _id: id }, options, {
        new: true
      });
      return documents;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description deletes a document
   * @param {object} Model
   * @param {object} query
   * @param {object} options Query options
   * @returns {Document} Gets a particular agent
   */

  static async delete(Model, id) {
    try {
      const documents = await Model.findByIdAndRemove({ _id: id });

      return documents;
    } catch (error) {
      throw error;
    }
  }
}

export default BaseRepository;
