package com.eldar.ejercicio.cumpleanos.controller;

import com.eldar.ejercicio.cumpleanos.entity.Persona;
import com.eldar.ejercicio.cumpleanos.service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.awt.desktop.PrintFilesEvent;
import java.io.Console;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("persona")
public class PersonaController {

    @Autowired
    PersonaService personaService;

    @GetMapping("/{id}")
    public ResponseEntity<Persona> getPersonaById(@PathVariable Integer id){
        Persona per = personaService.findById(id);
        return new ResponseEntity<>(per, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<Persona>> getPersonas(){
        List<Persona> personas = personaService.findAll();
        return new ResponseEntity<>(personas, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Persona> createPersona(@RequestBody Persona p){
        Persona per = personaService.create(p);
        return new ResponseEntity<>(per, HttpStatus.OK);
    }

    @PutMapping("")
    public ResponseEntity<Persona> updatePersona(@RequestBody Persona p){
        Persona per = personaService.update(p);
        return new ResponseEntity<>(per, HttpStatus.OK);
    }

    @PutMapping("/confirmar")
    public ResponseEntity<String> updatePersonas(@RequestBody List<Persona> p){
        List<Persona> per = personaService.updateMany(p);
        for(Persona persona : p){
            System.out.println("Confirmada la invitación para " + persona.getNombre() + " " + persona.getApellido());
        }
        return new ResponseEntity<>("Invitaciones confirmadas", HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePersona(@PathVariable Integer id){
        personaService.delete(id);
        return new ResponseEntity<>( "Persona id = " + id + " borrada.", HttpStatus.OK);
    }
}
