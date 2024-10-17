const { getEntityRepository } = require('shared');

module.exports = async (pipeline) => {
  try {
    const db = getEntityRepository();
    return await db.show.aggregate(pipeline);
  } catch (error) {
    throw error;
  }
};
