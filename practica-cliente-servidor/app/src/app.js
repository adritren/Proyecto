const fastify = require('fastify')
const mongoose = require('mongoose')

const server = fastify({logger: true})
const db = await mongoose.connect('mongodb://user:pwd@database:27017')




// Ruta raiz
server.get('/', (request, reply) => {
    reply.send({ hello: 'world'})
})

// Todo: Ruta get (READ)
server.get('/notas', (request, reply) => {
    //con mongoose busco las notas
    reply.send({ notas: '[las notas]'})
})


// Todo: Ruta post (CREATE)
// Todo: Ruta put (UPDATE)
server.put('/notas/:id', async (request, reply) => {
    const { id } = request.params;
    const { titulo, contenido } = request.body;

    try {
        // Buscar la nota por ID y actualizarla en la base de datos
        const notaActualizada = await Nota.findByIdAndUpdate(id, { titulo, contenido }, { new: true });

        if (!notaActualizada) {
            return reply.code(404).send({ mensaje: 'Nota no encontrada' });
        }

        return reply.send({ mensaje: 'Nota actualizada correctamente', nota: notaActualizada });
    } catch (error) {
        console.error('Error al actualizar la nota:', error);
        return reply.code(500).send({ mensaje: 'Error interno del servidor' });
    }
});
// Todo: Ruta delete (DELETE)
server.delete('/notas/:id', async (request, reply) => {
    const { id } = request.params;

    try {
        // Buscar la nota por ID y eliminarla de la base de datos
        const notaEliminada = await Nota.findByIdAndDelete(id);

        if (!notaEliminada) {
            return reply.code(404).send({ mensaje: 'Nota no encontrada' });
        }

        return reply.send({ mensaje: 'Nota eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la nota:', error);
        return reply.code(500).send({ mensaje: 'Error interno del servidor' });
    }
});


server.listen({port: 3000})