
const express = require('express');
const router = express.Router();
const pool = require('../controller/databaseController');


//Obtener cadena de pacientes
router.get('/api/patients', async (req, res ) => {

    try {
          await pool.query('SELECT * FROM pacients', (err, result) => {
            if(!err){
                //res.send(result);
                res.status(200).json(result);
            } else {
                res.status(404).json(`Not found`);
                console.log(err);
               
            }
        });
    } catch (e) {
        res.status(500).json(e);
         next(e);
    }

    
})

//obtener 1 dato 
router.get('/api/patients/:id', async (req, res) => {
    
    try {
       const {id} = req.params;
       await pool.query('SELECT * FROM pacients WHERE id = ?', [id], (err, result) => {
        if(!err){
            res.status(200).json(result[0]);
        } else {
            res.status(404).json(`Not found`)
            console.log(err);     
        }
    });
        
    } catch (e) {
        res.status(500).json(e);
        next(e);
    }

})

//agrega pacientes
router.post("/api/patients", async (req, res ) => {

    try {
        const {name, last_name, age, email, DNI, estadocivil, telefono, direccion, ciudad, country} = req.body;
    
        const sqlInsert = 
        "INSERT INTO pacients (name, last_name, age, email, DNI, estadocivil, telefono, direccion, ciudad, country) VALUES (?,?,?,?,?,?,?,?,?,?)";
        
      await pool.query(sqlInsert, [name, last_name, age, email, DNI,
             estadocivil, telefono, direccion, ciudad, country], (err, result) => {
                if(!err){
                    res.status(200).json({status:`Paciente agregado`, result});
                    console.log(result);
                } else {
                    res.status(404),json(`Not Found`);
                    console.log(err);      
                }
        });
    
        
    } catch (e) {
        res.status(500).json(e);
        next(e);
    }
   
})

//Elimina paciente
router.delete('/api/patients/:id', async (req,res)=>{
    try {
        const {id} = req.params;

        const sqlDelete = 'delete from pacients where id = ?';
    
       await pool.query(sqlDelete, [id], (err, result) => {
            if(!err){
                res.status(200).json({status:`Paciente eliminado`,result}); 
            } else {
                res.status(404),json(`Not Found`);
                console.log(err);     
            }
        })
        
    } catch (e) {
        res.status(500).json(e);
        next(e);
        
    }
   

})

//Modifica paciente
router.put('/api/patients/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const {name, last_name, age, email, DNI, estadocivil, telefono, direccion, ciudad, country} = req.body;
        const sqlUpdate = `UPDATE pacients SET name = '${name}', last_name='${last_name}', age = '${age}', email =  '${email}', DNI =  '${DNI}', estadocivil =  '${estadocivil}', telefono =  '${telefono}',direccion =  '${direccion}', ciudad =  '${ciudad}',country =  '${country}' WHERE id = ${id}`;
    
      await pool.query(sqlUpdate, (err, result) => {
            if(!err){
                res.status(200).json({status:`Paciente actualizado`,result}); 
            } else {
                res.status(404),json(`Not Found`);
                console.log(err);      
            }
        })
        
    } catch (e) {
        res.status(500).json(e);
        next(e);
    }
   

})


//obtiene turnos

router.get('/api/turns', async (req, res ) => {

    try {
          await pool.query('Select pacients.name,turn.tipodeservicio,turn.estado from pacients  inner join turn on turn.idpatient = pacients.id', (err, result) => {
            if(!err){
                //res.send(result);
                res.status(200).json(result);
            } else {
                res.status(404).json(`Not found`);
                console.log(err);
               
            }
        });
    } catch (e) {
        res.status(500).json(e);
         next(e);
    }

    
})



module.exports = router;