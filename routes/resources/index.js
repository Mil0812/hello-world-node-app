
const { getResource } = require("./getResource");
const { getResources } = require("./getResources");
const { createResource } = require("./createResource");
const { updateResource } = require("./updateResource");
const { deleteResource } = require("./deleteResource");

module.exports.resourcesRouter = async function (fastify, opts) {
  fastify.route(getResources);
  fastify.route(getResource);
  fastify.route(createResource);
  fastify.route(updateResource);
  fastify.route(deleteResource);
};
