const Usuario = require('../models/usuario');
const bycript = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');

const login = async(req, res) => {

    const { email, password } = req.body;

    try {


        const usuarioDb = await Usuario.findOne({ email });

        if (!usuarioDb) {
            return res.status(404).json({
                ok: false,
                msg: "El correo no existe"
            })
        }

        const validarPass = bycript.compareSync(password, usuarioDb.password);

        if (!validarPass) {
            return res.status(400).json({
                ok: false,
                msg: "La contraseña es invalida"
            })
        }

        const token = await generarJWT(usuarioDb._id);

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado revisar logs"
        })
    }
}


module.exports = { login }