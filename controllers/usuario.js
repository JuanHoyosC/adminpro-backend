const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        usuarios
    })
}


const CrearUsuario = async(req, res) => {
    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El email ya se encuentra registrado"
            })
        }


        const usuario = new Usuario(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();

        const token = await generarJWT(usuario._id);

        res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado revisar logs"
        })
    }
}


const actualizarUsuario = async(req, res) => {
    const { google, password, email, ...campos } = req.body;
    const uid = req.params.id
    console.log(uid)

    try {

        const usuarioDb = await Usuario.findById(uid);

        if (!usuarioDb) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe con ese id"
            })
        }

        if (usuarioDb.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "El correo electronico ya se encuentra registrado"
                })
            }
        }

        campos.email = email;


        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuarioActualizado
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado revisar logs"
        })
    }
}


const borrarUsuario = async(req, res) => {
    const uid = req.params.id;
    try {

        const usuarioDb = await Usuario.findById(uid);

        if (!usuarioDb) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe con ese id"
            })
        }

        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: "Usuario eliminado"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado revisar logs"
        })
    }
}

module.exports = {
    getUsuarios,
    CrearUsuario,
    actualizarUsuario,
    borrarUsuario
}