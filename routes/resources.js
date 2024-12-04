const { resourceRepository } = require("./../../repositories/resource.repo");

module.exports = {
  async resourcesRouter(fastify) {
    // Create a resource
    fastify.route(require("./resources/createResource").createResource);

    // Get a single resource by ID
    fastify.get("/resources/:id", async (request, reply) => {
      try {
        const { id } = request.params;
        const resource = await resourceRepository.findByPK(id);
        return reply.code(200).send(resource);
      } catch (error) {
        request.log.error(error);
        return reply.code(404).send({ error: "Resource not found" });
      }
    });

    // List resources with query params
    fastify.get("/resources", async (request, reply) => {
      try {
        const { term, limit = 10, offset = 0, sort = "createdAt" } = request.query;
        const resources = await resourceRepository.find({
          term,
          limit: parseInt(limit, 10),
          offset: parseInt(offset, 10),
          sort,
        });
        return reply.code(200).send(resources);
      } catch (error) {
        request.log.error(error);
        return reply.code(500).send({ error: "Failed to fetch resources" });
      }
    });

    // Update a resource
    fastify.put("/resources/:id", async (request, reply) => {
      try {
        const { id } = request.params;
        const updateData = request.body;

        const updatedResource = await resourceRepository.update(id, updateData);
        return reply.code(200).send(updatedResource);
      } catch (error) {
        request.log.error(error);
        return reply.code(404).send({ error: "Resource not found or failed to update" });
      }
    });

    // Delete a resource
    fastify.delete("/resources/:id", async (request, reply) => {
      try {
        const { id } = request.params;

        const deletedResource = await resourceRepository.delete(id);
        return reply.code(200).send(deletedResource);
      } catch (error) {
        request.log.error(error);
        return reply.code(404).send({ error: "Resource not found or failed to delete" });
      }
    });
  },
};
